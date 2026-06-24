from playwright.sync_api import sync_playwright
import os

def run_verification(page, url, name):
    print(f"Verifying {url}...")
    page.goto(f"file://{os.getcwd()}/{url}")
    page.set_viewport_size({"width": 1280, "height": 800})
    page.wait_for_timeout(1000)
    page.screenshot(path=f"/home/jules/verification/screenshots/{name}.png", full_page=True)

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            run_verification(page, "index.html", "homepage_final")
        finally:
            context.close()
            browser.close()
