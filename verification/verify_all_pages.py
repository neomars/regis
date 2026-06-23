import asyncio
from playwright.async_api import async_playwright
import os

async def verify_all_pages():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        pages = [
            "index.html",
            "hypnocoaching.html",
            "coaching-sante.html",
            "expertise.html",
            "parcours.html"
        ]

        os.makedirs("verification/screenshots", exist_ok=True)

        for p_name in pages:
            file_path = f"file://{os.getcwd()}/{p_name}"
            await page.goto(file_path)
            # Wait for content to load
            await page.wait_for_selector('nav')

            # Check if CSS is loaded by checking a custom property or background color if possible
            # or just take a screenshot and we'll see
            await page.screenshot(path=f"verification/screenshots/{p_name.replace('.html', '')}.png")
            print(f"Verified {p_name}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_all_pages())
