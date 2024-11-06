from pydantic import BaseModel


# Request JSON Models
#=======================================================================================================
# Models a scrape request message
class ScrapeRequest(BaseModel):
    url: str

# Response JSON Models
#=======================================================================================================
# Base Response Models
#-------------------------------------------------------------------------------------------------------
# Default base response structure
class Base_Response(BaseModel):
    ok: bool

# Default base error response
class Base_Err_Response(Base_Response, BaseModel):
    errType: str
    message: str

#-------------------------------------------------------------------------------------------------------
# Specific Response Models
#-------------------------------------------------------------------------------------------------------
# Scrape Success Response
class Scrape_Success_Response(Base_Response, BaseModel):
    url: str
    formattedData: str
    rawData: str

class Standard_Response(Base_Response, BaseModel):
    message: str

#-------------------------------------------------------------------------------------------------------
# Methods for spawning specific response types
#=======================================================================================================

# Scrape success response message
def scrapeSuccessResp(data: dict):
    return Scrape_Success_Response(
        ok=True, 
        url=data["url"],
        formattedData=data["formattedData"],
        rawData=data["rawData"]
    )

# Scrape fail response message
def scrapeFailResp():
    return Base_Err_Response(
        ok=False,
        errType="ScrapeError",
        message="Failed to scrape the specified URL"
    )

# Ping response message
def pingResp():
    return Standard_Response(
        ok=True,
        message="Backend Currently Operational"
    )

# Shutdown response message
def shutdownResp():
    return Standard_Response(
        ok=True,
        message="Shutdown Signal Received, Shutting Backend Down"
    )
#-------------------------------------------------------------------------------------------------------