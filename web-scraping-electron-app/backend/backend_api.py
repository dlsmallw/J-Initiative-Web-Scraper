import asyncio
import uvicorn
from fastapi import FastAPI

from webscrape_test import Scraper
from JSON_Models import *

loop = None
HOST = "127.0.0.1"
PORT = 7777

app = FastAPI()
scraper = Scraper()

# Handles a scrape request
@app.post("/url")
async def scrape_request(request: ScrapeRequest):
    url = request.url
    
    try:
        return scrapeSuccessResp(scraper.scrape_url(url))
    except:
        return scrapeFailResp()
    
# Responds to a ping message
@app.get("/ping")
async def ping_backend():
    return pingResp()

# Handles a shutdown request
@app.get("/kill")
async def shutdown():
    loop.stop()
    return shutdownResp()

if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(uvicorn.run(app, host=HOST, port=PORT))