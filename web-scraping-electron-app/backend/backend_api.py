from fastapi import FastAPI

app = FastAPI()

HOST = "127.0.0.1"
PORT = 7777

# Testing API calls between JS and Python

@app.get("/")
async def testFunc():
    return {"message": "Hello JS!"}

if __name__ == "__main__":
    import asyncio
    import uvicorn

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    loop.run_until_complete(uvicorn.run(app, host=HOST, port=PORT))