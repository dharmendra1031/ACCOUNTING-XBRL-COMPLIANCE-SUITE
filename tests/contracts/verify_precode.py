#!/usr/bin/env python3
"""Read-only checks for the pre-code design pack, NOT application or acceptance tests.

Run after installing the pinned PyYAML dependency:
    python -m pip install PyYAML==6.0.2
    python tests/contracts/verify_precode.py
"""
from __future__ import annotations

from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import re
import sys

import yaml


ROOT = Path(__file__).resolve().parents[2]
DEV = ROOT / "docs/development-pack"
R2 = DEV / "round-2"
API = R2 / "03-accounting-core.openapi.yaml"


class StrictLoader(yaml.SafeLoader):
    pass


def reject_duplicate_keys(loader: StrictLoader, node: yaml.nodes.MappingNode, deep: bool = False):
    result = {}
    for key_node, value_node in node.value:
        key = loader.construct_object(key_node, deep=deep)
        if key in result:
            raise ValueError(f"Duplicate YAML mapping key: {key}")
        result[key] = loader.construct_object(value_node, deep=deep)
    return result


StrictLoader.add_constructor(
    yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG, reject_duplicate_keys
)


def require(condition: bool, message: str):
    if not condition:
        raise AssertionError(message)


def IDs(pattern: str, content: str) -> list[str]:
    return re.findall(pattern, content, flags=re.MULTILINE)


def check_exact_ids(found: list[str], expected: int, label: str):
    require(len(found) == expected, f"{label}: expected {expected} rows, got {len(found)}")
    require(len(set(found)) == expected, f"{label}: duplicate IDs")


def resolve_pointer(document: dict, pointer: str):
    require(pointer.startswith("#/"), f"Disallowed/non-local schema reference: {pointer}")
    value = document
    for component in pointer[2:].split("/"):
        component = component.replace("~1", "/").replace("~0", "~")
        require(isinstance(value, dict) and component in value, f"Missing local reference: {pointer}")
        value = value[component]
    return value


def all_references(node):
    if isinstance(node, dict):
        if "$ref" in node:
            yield node["$ref"]
        for value in node.values():
            yield from all_references(value)
    elif isinstance(node, list):
        for value in node:
            yield from all_references(value)


def check_openapi():
    content = API.read_text(encoding="utf-8")
    api = yaml.load(content, Loader=StrictLoader)
    require(api["openapi"].startswith("3.1."), "Expected OpenAPI 3.1 contract")
    require(api.get("security"), "Global OpenAPI authentication is missing")
    require(api.get("components", {}).get("securitySchemes"), "Missing security scheme")
    for pointer in all_references(api):
        resolve_pointer(api, pointer)

    allowed_methods = {"get", "post", "patch", "put", "delete"}
    operations = []
    for path, item in api["paths"].items():
        path_params = set(re.findall(r"{(\w+)}", path))
        for method, operation in item.items():
            if method not in allowed_methods:
                continue
            name = operation.get("operationId")
            require(name, f"{method.upper()} {path}: missing operationId")
            operations.append(name)
            require(operation.get("responses"), f"{name}: missing responses")
            params = operation.get("parameters", []) + item.get("parameters", [])
            resolved = [resolve_pointer(api, p["$ref"]) if "$ref" in p else p for p in params]
            names = {p["name"] for p in resolved if p.get("in") == "path" and p.get("required")}
            require(path_params <= names, f"{name}: unbound path vars {path_params - names}")
            if method in {"post", "put", "patch", "delete"}:
                headers = {p["name"].lower() for p in resolved if p.get("in") == "header"}
                require(
                    "idempotency-key" in headers or "if-match" in headers,
                    f"{name}: mutation needs transport replay or concurrency guard",
                )
    check_exact_ids(operations, 16, "OpenAPI operations")
    # Application-owned IDs are SQL BIGINT and API numeric int64, never UUID.
    require("format: uuid" not in content, "Internal API UUID IDs contradict numeric-ID policy")
    require("format: int64" in content, "Missing numeric int64 ID contract")
    for param in ("CompanyId", "AccountId", "JournalId"):
        schema = api["components"]["parameters"][param]["schema"]
        require(schema.get("type") == "integer" and schema.get("format") == "int64",
                f"{param} must be a numeric SQL BIGINT/int64 contract")
    require(api["components"]["schemas"]["IdPreview"]["properties"]["reservationStatus"]["enum"] == ["NotReserved"],
            "ID preview must be explicitly non-reserved")
    require(api["components"]["schemas"]["Journal"]["properties"]["journalNumber"]["type"] == ["integer", "null"],
            "Committed voucher serial must be nullable numeric int64, separate from JournalId")
    require("CanonicalEconomicEventId" in (DEV / "DEV-04-database-erd-sql.md").read_text(encoding="utf-8"), "Canonical financial key missing from DEV-04")
    print(f"PASS OpenAPI: {len(operations)} unique operations, local references, path parameters, guarded mutations")


def check_catalogue():
    gap = (DEV / "PRE-CODE-GAP-REGISTER.md").read_text(encoding="utf-8")
    screen = (R2 / "04-SCREEN-FIELD-ACTION-AND-UX-CONTRACTS.md").read_text(encoding="utf-8")
    ownership = (R2 / "08-FEATURE-CODE-OWNERSHIP-AND-DEPENDENCIES.md").read_text(encoding="utf-8")
    tests = (DEV / "DEV-11-qa-102-tests.md").read_text(encoding="utf-8")
    check_exact_ids(IDs(r"^\| SCR-(\d{3}) ", gap), 38, "Gap register screen links")
    check_exact_ids(IDs(r"^\| SCR-(\d{3}) ", screen), 38, "UI screen contracts")
    check_exact_ids(IDs(r"^\| SCR-(\d{3}) ", ownership), 38, "Backend ownership")
    for doc in (screen, ownership):
        require(
            set(IDs(r"^\| SCR-(\d{3}) ", doc))
            == set(IDs(r"^\| SCR-(\d{3}) ", gap)),
            "Cross-document screen IDs drifted",
        )
    check_exact_ids(IDs(r"^\| ((?:ACC|XBRL)-\d{3}) \|", gap), 58, "Report catalogue")
    check_exact_ids(IDs(r"^\- \*\*TC-(\d{3})\*\*", tests), 102, "Test catalogue")
    check_exact_ids(IDs(r"^### GAP-(\d{2}) —", gap), 24, "Open gap detail register")
    print("PASS catalogs: 38 screens mapped across 3 files, 58 reports, 102 TC IDs, 24 open gap categories")


class IDParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.external_assets = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "script" and "src" in attrs:
            self.external_assets.append(attrs["src"])
        if tag == "link" and "href" in attrs:
            self.external_assets.append(attrs["href"])


def check_prototype():
    html = (R2 / "prototypes/compact-accounting-workspace.html").read_text(encoding="utf-8")
    parser = IDParser()
    parser.feed(html)
    require(len(set(parser.ids)) == len(parser.ids), "Prototype has duplicate HTML IDs")
    require(not parser.external_assets, "Prototype must be self-contained, no external assets")
    require('id="coa-form"' in html and 'id="invoice-form"' in html, "Missing prototype form")
    require('Post (blocked)' in html and 'disabled title="No authorized posting or backend"' in html, "Financial Post must remain disabled")
    require('document.documentElement.dir' in html, "RTL direction preview missing")
    require('DESIGN PROTOTYPE ONLY' in html, "Missing demo/non-production warning")
    # Each entity-backed demo has the first field as a read-only estimated numeric ID.
    for input_id, preceding in (
        ("account-id", '<form id="coa-form" novalidate>'),
        ("journal-id", '<h2>Voucher information</h2>'),
        ("invoice-id", '<form id="invoice-form" novalidate>'),
    ):
        start = html.index(preceding)
        segment = html[start:start + 650]
        require(f'<label for="{input_id}">ID — next estimate, not reserved</label>' in segment,
                f"{input_id}: first-field estimate label is missing")
        require(re.search(rf'<input id="{re.escape(input_id)}"[^>]*\\breadonly\\b', segment) is not None,
                f"{input_id}: must be read-only")
    require("Assigned on issue" in html, "Business voucher number must remain separate")
    print("PASS static UX prototype: unique IDs, 3 workspaces, offline assets, disabled posting")
    print("NOT TESTED: browser layout at 1366x768, Arabic translations, keyboard, 200% zoom")


def check_event_identity():
    a = (R2 / "01-PHYSICAL-ERD-DESIGN-PROPOSAL.md").read_text(encoding="utf-8")
    b = (R2 / "02-POSTING-STATE-AND-EVENT-CONTRACT.md").read_text(encoding="utf-8")
    approved_key = "(TenantId,CompanyId,EventType,CanonicalEconomicEventId)"
    require(approved_key in a and approved_key in b, "Missing cross-source canonical identity candidate")
    old_key = "(TenantId,CompanyId,SourceSystem,EventType,StableEventId)"
    require(old_key not in a and old_key not in b, "Unsafe source-system-scoped posting key returned")
    require("Quarantined" in a and "Quarantine" in b, "Unverified alias quarantine design missing")
    require("NOT approved" in a or "NOT signed" in a, "ERD proposal must not assert business approval")
    print("PASS economic identity: canonical cross-source uniqueness and quarantine contract documented")
    print("NOT TESTED: physical SQL uniqueness, posting concurrency and actual Finance business policy")


def main():
    check_openapi()
    check_catalogue()
    check_prototype()
    check_event_identity()
    print("Pre-code static CONTRACT checks passed. This is NOT financial, UX or SQL acceptance evidence.")


if __name__ == "__main__":
    try:
        main()
    except (AssertionError, KeyError, ValueError, yaml.YAMLError) as exc:
        print(f"FAIL pre-code contract: {exc}", file=sys.stderr)
        sys.exit(1)
