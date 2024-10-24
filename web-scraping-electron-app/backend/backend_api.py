from fastapi import FastAPI

import asyncio
import uvicorn

app = FastAPI()

loop = None

HOST = "127.0.0.1"
PORT = 7777

# Testing API calls between JS and Python with this test function
@app.get("/")
async def testFunc():
    return {
        "message": "Hello JS from Python!",
        "formattedData": "FORMATTED TEST DATA",
        "rawData": "RAW TEST DATA"
    }

@app.get("/kill")
async def shutdown():
    loop.stop()
    return {
        "message": "Backend Successfully Shutdown!"
    }

if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(uvicorn.run(app, host=HOST, port=PORT))