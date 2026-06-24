from playwright.sync_api import sync_playwright
import os

def run_verification(page, url, name):
    print(f"Verifying {url}...")
    page.goto(f"file://{os.getcwd()}/{url}")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"/home/jules/verification/screenshots/{name}.png")
    page.wait_for_timeout(500)

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_verification(page, "coaching-sante.html", "coaching_sante")
            run_verification(page, "expertise.html", "expertise")
        finally:
            context.close()
            browser.close()
