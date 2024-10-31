import asyncio
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from webscrape_test import Scraper
from JSON_Models import *

app = FastAPI()
scraper = Scraper()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/url")
async def scrape_request(request: ScrapeRequest):
    url = request.url
    try:
        data = scraper.scrape_url(url)
        return scrapeSuccessResp(data)
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Other endpoints...

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)
