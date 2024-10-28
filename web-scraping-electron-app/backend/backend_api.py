from fastapi import FastAPI
from pydantic import BaseModel

from webscrape_test import Scraper

import asyncio
import uvicorn

app = FastAPI()

loop = None

HOST = "127.0.0.1"
PORT = 7777

import requests
from bs4 import BeautifulSoup
import textwrap

scraper = Scraper()

class ScrapeRequest(BaseModel):
    url: str

# Testing API calls between JS and Python with this test function
@app.get("/")
async def testFunc():
    return {
        "ok": True,
        "message": "Hello JS from Python!",
        "formattedData": "FORMATTED TEST DATA",
        "rawData": "RAW TEST DATA"
    }

@app.post("/url")
async def scrape_request(scrape_request: ScrapeRequest):
    url = scrape_request.url
    try:
        result = scraper.scrape_url(url)
        return result
    except:
        return {
            "ok": False,
            "message": "Failed to scrape the requested url",
            "url": url
        }
    

@app.get("/ping")
async def ping_backend():
    return {
        "ok": True,
        "message": "Backend Is Currently Running"
    }

@app.get("/kill")
async def shutdown():
    loop.stop()
    return {
        "ok": True,
        "message": "Backend Successfully Shutdown!"
    }

if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(uvicorn.run(app, host=HOST, port=PORT))