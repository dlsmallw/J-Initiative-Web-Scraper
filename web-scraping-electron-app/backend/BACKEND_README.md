# /backend Directory

FastAPI backend has the following key components:

Endpoint /url: Accepts a POST request with a JSON payload containing the URL to scrape.  
Endpoint /ping: Used to check if the backend is operational.  
Endpoint /kill: Shuts down the backend server.  
Scraper Class: Contains the logic to scrape the given URL and return formatted and raw data.  
Pydantic Models: Used for request validation and response formatting.  