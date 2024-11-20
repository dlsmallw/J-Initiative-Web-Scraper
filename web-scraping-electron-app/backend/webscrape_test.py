import sys
import json
from bs4 import BeautifulSoup
import textwrap
import requests


class Scraper:
    def __textFormatter(self, text):
        text_arr = textwrap.wrap(text, 70, break_long_words=False)
        return "\n".join(["\t" + line for line in text_arr])

    def __format_body(self, raw_body):
        return "\n".join(self.__textFormatter(pg.text.strip()) for pg in raw_body)

    def scrape_url(self, url_to_scrape):
        try:
            print(f"[DEBUG] Scraping URL: {url_to_scrape}", file=sys.stderr)

            # Fetch the webpage
            raw_html = requests.get(url_to_scrape, timeout=10)
            raw_html.raise_for_status()  # Raise exception for HTTP errors
            print(f"[DEBUG] Response status: {raw_html.status_code}", file=sys.stderr)

            # Parse HTML with BeautifulSoup
            soup = BeautifulSoup(raw_html.content, "html.parser")

            raw_body = soup.find("body")
            formatted_text = self.__format_body(soup.find_all("p", class_="paragraph"))
            if not formatted_text:
                formatted_text = "No paragraphs found with class 'paragraph'."

            return {
                "ok": True,
                "url": url_to_scrape,
                "formattedData": formatted_text,
                "rawData": str(raw_body)
            }
        except requests.exceptions.RequestException as e:
            return {
                "ok": False,
                "error": f"Request failed: {str(e)}"
            }
        except Exception as e:
            return {
                "ok": False,
                "error": f"Error during scraping: {str(e)}"
            }


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"ok": False, "error": "No URL provided"}))
        sys.exit(1)

    url = sys.argv[1]
    scraper = Scraper()
    result = scraper.scrape_url(url)
    print(json.dumps(result))

