#work in progress, may change functionality, may move into separate files

import json

from bs4 import BeautifulSoup
import requests

result = { "success":False, "text":"", "html":"", "error":""} #variable used to store success status, website's text, website's html and any error

def get_html(url): #get and format html
    html_text = requests.get(url).text
    clean_text = BeautifulSoup(html_text, 'html.parser')

    return clean_text.prettify()


def get_result(): #return JSON object with data
    while True: #loop to allow user to retry if they enter an invalid url
        try:
            user_url = input("Enter URL of website: ")  # collect url from user
            result["html"] = get_html(user_url) #scrape html from user's url
            result["error"] = ""
            result["success"] = True

            break
        except requests.exceptions.MissingSchema: #invalid url due to missing protocol
            result["error"] = "requests.exceptions.MissingSchema"

            print("Error fetching website data. Did you enter the whole url and not just a shortened version of it? "
                  + "If you entered a url without a protocol (eg. https, http, etc), please retry entering a url, with the protocol attached.")
            user_continue = input("Try again? Y or N: ")

            if user_continue.upper() == "N":
                print("Closing program...")
                break
        except KeyboardInterrupt: #program unexpectedly closed, likely by user, so keep things looking clean
            result["error"] = "KeyboardInterrupt"

            print("\nKeyboard interrupted, closing program...")
            break
        except Exception as ex: #unexpected error, print info and then close
            result["error"] = str(ex)

            print("Error fetching website data. More info below, closing program.")
            print(ex)
            break

        return json.dumps(result) #JSON object