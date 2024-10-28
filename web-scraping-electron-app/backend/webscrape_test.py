import requests
from bs4 import BeautifulSoup
import textwrap


class Scraper:
    def __textFormatter(self, text):
        text_arr = textwrap.wrap(text, 70, break_long_words=False)
        joinedSt = ""

        for st in text_arr:
            joinedSt += "\t" + st + "\n"

        return joinedSt

    def __format_body(self, raw_body):
        body = ""

        for pg in raw_body:
            body += f"{self.__textFormatter(pg.text.strip())}"

        return body

    def __stringify(self, arr):
        string = ""

        for item in arr:
            string += f"\t{item}\n"

        return string

    def scrape_url(self, url):
        raw_html = requests.get(url)
        soup = BeautifulSoup(raw_html.content, "html.parser")

        raw_body = soup.find('body')
        formatted_text = self.__format_body(soup.find_all("p", class_="paragraph"))


        return {
            "ok": True,
            "url": url,
            "formattedData": formatted_text,
            "rawData": f"{raw_body}"
        }