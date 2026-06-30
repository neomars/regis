import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get absolute path to index.html
        path = os.path.abspath("index.html")
        url = f"file://{path}"

        print(f"Opening {url}")
        await page.goto(url)

        # Wait for content to load (content-loader.js runs on DOMContentLoaded)
        await page.wait_for_timeout(1000)

        # Check hero title
        hero_title = await page.inner_text('[data-content="hero_title"]')
        print(f"Hero Title: {hero_title}")

        # Check hero description
        hero_desc = await page.inner_text('[data-content="hero_description"]')
        print(f"Hero Description: {hero_desc[:50]}...")

        await page.screenshot(path="screenshot_verify.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
