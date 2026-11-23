"""Real Chromium smoke/visual evidence for the eight UNAUTHENTICATED design-preview routes.

Run after: npm ci && npm run build
Requires: python -m pip install playwright==1.56.0
          python -m playwright install chromium
No finance, security or browser visual *approval* is implied by passing.
"""
from __future__ import annotations

import json
import os
from pathlib import Path
import subprocess
import time
from urllib.request import urlopen

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = Path(__file__).resolve().parent / "artifacts"
PORT = 4173
URL = f"http://127.0.0.1:{PORT}"
ROUTES = (
    "/sign-in",
    "/",
    "/accounts",
    "/journals",
    "/organization",
    "/periods",
    "/onboarding",
    "/access",
)
SIZES = (
    ("desktop", 1366, 768, "en"),
    ("mobile320", 320, 720, "en"),
    ("mobile375rtl", 375, 812, "ar"),
    ("zoom200-equivalent", 683, 384, "en"),
)


def wait_for_server(timeout: float = 35) -> None:
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        try:
            with urlopen(URL, timeout=1.5) as response:
                if response.status == 200:
                    return
        except (OSError, TimeoutError):
            time.sleep(0.3)
    raise RuntimeError("Vite preview server did not start")


def assert_visible_empty_states_fit(page, route: str, mode: str) -> None:
    # A horizontally scrollable table can clip its centered "No live records" copy
    # while the document itself reports NO overflow. Regression-proof that UX defect.
    width = page.evaluate("window.innerWidth")
    for state in page.locator(".empty-state").all():
        if not state.is_visible():
            continue
        rect = state.bounding_box()
        assert rect is not None
        assert rect["x"] >= -1 and rect["x"] + rect["width"] <= width + 1, (
            f"{mode} {route}: empty state clipped by horizontal table scroll: {rect}"
        )


def inspect_page(page, route: str, mode: str) -> dict:
    heading = page.locator("main h1")
    assert heading.count() == 1, f"{mode} {route}: expected one page heading"
    assert heading.first.is_visible(), f"{mode} {route}: heading not visible"
    size = page.evaluate("""() => ({
        viewport: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
        rtl: document.documentElement.dir === 'rtl',
        visibleMain: !!document.querySelector('main')
    })""")
    assert size["visibleMain"], f"{mode} {route}: no main"
    assert size["documentWidth"] <= size["viewport"] + 2, (
        f"{mode} {route}: page-wide horizontal overflow: {size}"
    )
    assert size["bodyWidth"] <= size["viewport"] + 2, (
        f"{mode} {route}: body horizontal overflow: {size}"
    )
    assert size["rtl"] == ("rtl" in mode), f"{mode} {route}: wrong language direction"
    assert page.locator(".skip-link").count() == 1, f"{mode} {route}: skip link missing"
    assert page.locator(".skip-link").get_attribute("href") in (
        "#main-content", "#auth-main"
    ), f"{mode} {route}: skip link target incorrect"
    assert page.locator('a[href="#main-content"], a[href="#auth-main"]').count() == 1
    assert_visible_empty_states_fit(page, route, mode)
    if route == "/sign-in":
        assert page.locator(".sidebar").count() == 0, "Auth page leaks company shell"
        assert page.locator("#auth-identity").is_disabled(), "Auth form must remain disabled"
    else:
        assert page.locator(".sidebar").count() == 1, "Workspace layout missing"
        assert page.locator(".preview-warning").is_visible(), "Preview notice missing"
    return {"path": route, "mode": mode, "heading": heading.inner_text().strip(), **size}


def verify_interactions(browser) -> None:
    page = browser.new_page(viewport={"width": 1366, "height": 768})
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))

    page.goto(URL + "/sign-in", wait_until="networkidle")
    page.get_by_role("button", name="Verify MFA").click()
    assert page.locator("#auth-code").is_disabled()
    page.get_by_role("button", name="Account recovery").click()
    assert page.locator("#auth-recovery-email").is_disabled()

    page.goto(URL + "/onboarding", wait_until="networkidle")
    page.get_by_role("button", name="Next preview step").click()
    assert page.locator(".wizard-step.current").count() == 1
    assert page.locator("#onboarding-fiscal").is_visible()
    assert page.locator("#onboarding-legal").is_hidden()

    mobile = browser.new_page(viewport={"width": 320, "height": 720})
    mobile.goto(URL + "/journals", wait_until="networkidle")
    assert_visible_empty_states_fit(mobile, "/journals", "mobile-regression")
    assert mobile.get_by_role("region", name="Debit and credit lines").count() == 1

    mobile.goto(URL + "/access", wait_until="networkidle")
    assert_visible_empty_states_fit(mobile, "/access", "mobile-regression")
    assert mobile.get_by_role("region", name="Approval policy matrix").count() == 1

    mobile.goto(URL + "/onboarding", wait_until="networkidle")
    mobile.locator(".wizard-step").nth(3).click()
    assert mobile.locator("#onboarding-opening").is_visible()
    assert_visible_empty_states_fit(mobile, "/onboarding-opening", "mobile-regression")
    mobile.screenshot(path=str(OUTPUT / "mobile320-onboarding-opening.png"),
                      full_page=True, animations="disabled")
    mobile.close()

    page.goto(URL + "/access", wait_until="networkidle")
    page.locator("#access-role").select_option("accountant")
    links = page.locator(".role-preview-links a")
    assert links.count() == 2, "Only existing accountant previews should appear"
    assert all(links.nth(i).get_attribute("href") in ("/accounts", "/journals")
               for i in range(links.count()))
    page.get_by_role("button", name="Reset fields").click()
    assert page.locator(".role-preview-links").count() == 0, "Role preview reset failed"

    page.goto(URL + "/accounts", wait_until="networkidle")
    page.get_by_role("button", name="Check required fields (preview)").click()
    assert page.locator("#account-code").evaluate(
        "(element) => element === document.activeElement"
    ), "First missing field should receive focus"
    page.locator("#account-code").fill("1000")
    page.locator("#account-name").fill("Cash")
    page.locator("#account-type").select_option("Asset")
    page.locator("#normal-balance").select_option("Debit")
    page.get_by_role("button", name="Check required fields (preview)").click()
    assert "Nothing was saved" in page.locator("form .preview-note").inner_text()
    assert not errors, f"Unexpected React errors: {errors}"
    page.close()


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    server = subprocess.Popen(
        [str(ROOT / "node_modules/.bin/vite"), "preview",
         "--host", "127.0.0.1", "--port", str(PORT), "--strictPort"],
        cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT
    )
    cases = []
    failures = []
    try:
        wait_for_server()
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True)
            try:
                for mode, width, height, lang in SIZES:
                    page = browser.new_page(viewport={"width": width, "height": height})
                    errors = []
                    page.on("pageerror", lambda error: errors.append(str(error)))
                    for route in ROUTES:
                        try:
                            page.goto(URL + route, wait_until="networkidle")
                            if lang == "ar":
                                page.locator(".lang-button").click()
                            result = inspect_page(page, route, mode)
                            safe_route = route.strip("/").replace("/", "-") or "overview"
                            page.screenshot(
                                path=str(OUTPUT / f"{mode}-{safe_route}.png"),
                                full_page=True,
                                animations="disabled",
                            )
                            assert not errors, f"{mode} {route}: script errors: {errors}"
                            cases.append(result)
                        except Exception as error:
                            failures.append(f"{mode} {route}: {error}")
                            raise
                    page.close()
                verify_interactions(browser)
            finally:
                browser.close()
    finally:
        server.terminate()
        try:
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            server.kill()
    report = {
        "cases": len(cases),
        "sizes": [item[0] for item in SIZES],
        "paths": list(ROUTES),
        "interactionChecks": "passed",
        "note": "zoom200-equivalent = 683px CSS viewport proxy, not browser Ctrl+Plus validation",
        "acceptance": "Automation-only; screenshots require human visual and design-owner review",
        "failures": failures,
        "results": cases,
    }
    (OUTPUT / "report.json").write_text(
        json.dumps(report, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"PASS {len(cases)} Chromium route/viewport checks + 4 interaction flows")
    print("Artifacts:", OUTPUT)


if __name__ == "__main__":
    main()
