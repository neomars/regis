from playwright.sync_api import sync_playwright
import os

def run_verification(page):
    # Base URL for static files
    base_url = f"file://{os.getcwd()}/index.html"

    # 1. Verify Homepage Hero Text
    page.goto(base_url)
    page.wait_for_timeout(1000)

    # Check for "L'ANCRAGE MALOUIN"
    hero_title = page.locator("h1")
    print(f"Hero Title: {hero_title.inner_text()}")

    # Take screenshot of the hero section
    page.screenshot(path="/home/jules/verification/screenshots/homepage_hero.png")
    page.wait_for_timeout(500)

    # 2. Navigate to another page to verify external assets (CSS/JS)
    # Since we use file://, we need to click the link or goto the file
    page.get_by_role("link", name="Hypnocoaching").click()
    page.wait_for_timeout(1000)

    print(f"Current URL after click: {page.url}")
    page.screenshot(path="/home/jules/verification/screenshots/hypnocoaching_page.png")
    page.wait_for_timeout(500)

    # 3. Check if navigation scroll effect works (simulated)
    page.evaluate("window.scrollTo(0, 100)")
    page.wait_for_timeout(500)
    page.screenshot(path="/home/jules/verification/screenshots/scrolled_nav.png")

    page.wait_for_timeout(1000)

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
            run_verification(page)
        finally:
            context.close()
            browser.close()
