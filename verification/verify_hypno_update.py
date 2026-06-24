import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})

        # Load the local file
        path = os.path.abspath("hypnocoaching.html")
        await page.goto(f"file://{path}")

        # Take a screenshot of the updated section
        # The section has py-section-padding which is usually py-24 or similar
        await page.screenshot(path="verification/screenshots/hypnocoaching_updated.png", full_page=True)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
