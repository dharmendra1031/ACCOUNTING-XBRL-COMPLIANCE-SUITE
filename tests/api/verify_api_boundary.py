#!/usr/bin/env python3
"""HTTP smoke test: never expose accounting data or writes to an anonymous caller.

This deliberately does NOT claim tenant isolation, RBAC or authentication is
implemented. Replace/extend with identity-backed tests once DEC-009 is signed.
Only Python's standard library and the built .NET API are required.
"""
from __future__ import annotations

import os
from pathlib import Path
import socket
import subprocess
import tempfile
import time
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[2]
API_DLL = ROOT / "src/Keifac.Api/bin/Release/net10.0/Keifac.Api.dll"
DENIED = {401, 403, 404}

# These are contract paths, not implemented business endpoints.
PROBES = (
    ("GET", "/api/v1/session/context"),
    ("GET", "/api/v1/companies"),
    ("GET", "/api/v1/companies/123"),
    ("GET", "/api/v1/companies/123/branches"),
    ("GET", "/api/v1/companies/123/fiscal-periods"),
    ("GET", "/api/v1/companies/123/accounts"),
    ("POST", "/api/v1/companies/123/accounts"),
    ("PATCH", "/api/v1/companies/123/accounts/456"),
    ("GET", "/api/v1/companies/123/journals"),
    ("POST", "/api/v1/companies/123/journals/456/post"),
)


def http_status(base_url: str, method: str, path: str, headers: dict[str, str] | None = None) -> int:
    # Body for mutations is syntactically JSON; authorization must run before
    # validating whether an unauthenticated caller can change anything.
    payload = b'{"code":"1000","name":"Unauthorized input","type":"Asset","normalBalance":"Debit"}'
    request = Request(
        base_url + path,
        data=payload if method in {"POST", "PATCH"} else None,
        headers={"Content-Type": "application/json", **(headers or {})},
        method=method,
    )
    try:
        with urlopen(request, timeout=4) as response:
            return response.status
    except HTTPError as error:
        return error.code


def wait_for_api(base_url: str, process: subprocess.Popen, seconds: float = 25) -> None:
    deadline = time.monotonic() + seconds
    while time.monotonic() < deadline:
        if process.poll() is not None:
            raise RuntimeError(f"API exited during startup with code {process.returncode}")
        try:
            if http_status(base_url, "GET", "/health") == 200:
                return
        except URLError:
            pass
        time.sleep(0.2)
    raise TimeoutError("API /health was not ready within 25 seconds")


def main() -> None:
    if not API_DLL.is_file():
        raise FileNotFoundError(f"Build API in Release first: {API_DLL}")

    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        port = sock.getsockname()[1]
    base_url = f"http://127.0.0.1:{port}"
    env = {
        **os.environ,
        "ASPNETCORE_URLS": base_url,
        "ASPNETCORE_ENVIRONMENT": "Production",
    }

    with tempfile.TemporaryFile(mode="w+t") as log:
        process = subprocess.Popen(
            ["dotnet", str(API_DLL)], cwd=ROOT, env=env,
            stdout=log, stderr=subprocess.STDOUT,
        )
        try:
            wait_for_api(base_url, process)
            modes = (
                ("anonymous", {}),
                ("forged headers", {
                    "Authorization": "Bearer invalid-token",
                    "X-Tenant-Id": "999",
                    "X-Company-Id": "123",
                    "X-User-Id": "attacker",
                }),
            )
            for caller, headers in modes:
                for method, path in PROBES:
                    status = http_status(base_url, method, path, headers)
                    if status not in DENIED:
                        raise AssertionError(
                            f"{caller}: {method} {path} returned HTTP {status}; "
                            "a protected accounting API must never be public"
                        )
            print(f"PASS API boundary: /health 200, {len(PROBES) * len(modes)} "
                  "anonymous/forged requests denied (401/403/404)")
            print("NOT TESTED: real identity, SQL persistence, company isolation or RBAC")
        except Exception:
            log.flush()
            log.seek(0)
            print("API process log:\n" + log.read())
            raise
        finally:
            process.terminate()
            try:
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait(timeout=5)


if __name__ == "__main__":
    main()
