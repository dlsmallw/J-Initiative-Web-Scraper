#rough draft for sprint 2, may change functionality, may move into separate files, etc. for future sprints

import json

from bs4 import BeautifulSoup
import requests

result = { "success":False, "URL":"", "text":"", "html":"", "error":""} #variable used to store success status, website's text, website's html and any error

def get_html(url): #get and format html
    html_text = requests.get(url).text
    clean_text = BeautifulSoup(html_text, 'html.parser')

    return clean_text.prettify()

def get_text(element, element_class): #get text from website
    if result["html"] == "":
        print("To access text, a url has to have been scraped. Please use get_html() before using get_text()!")
        return

    try:
        h_text = requests.get(result.get("URL")).text
        preText = BeautifulSoup(h_text, "html.parser")

        middletext = preText.find_all(element, class_ = element_class)

        for text in middletext:
            result["text"] += text.get_text().strip().replace("\n", "") #need to find a way to clear out all \u
            break

    except Exception as e:
        print("Error encountered while trying to get the website's text: " + str(e))

def get_result(): #return JSON object with data
    while True: #loop to allow user to retry if they enter an invalid url
        try:
            user_url = input("Enter URL of website: ")  # collect url from user
            result["html"] = get_html(user_url) #scrape html from user's url
            result["error"] = ""
            result["URL"] = user_url
            result["success"] = True

            user_element = input("Enter element to be scraped: ")
            user_element_class = input("Please enter the class name of that element: ")

            get_text(user_element, user_element_class)
            print(json.dumps(result))
            return json.dumps(result)  # JSON object

        except requests.exceptions.MissingSchema: #invalid url due to missing protocol
            result["error"] = "requests.exceptions.MissingSchema"

            print("Error fetching website data. Did you enter the whole url and not just a shortened version of it? "
                  + "If you entered a url without a protocol (eg. https, http, etc), please retry entering a url, with the protocol attached.")
            user_continue = input("Try again? Y or N: ")

            if user_continue.upper() == "N":
                print("Closing program...")
                break
            else:
                continue
        except KeyboardInterrupt: #program unexpectedly closed, likely by user, so keep things looking clean
            result["error"] = "KeyboardInterrupt"

            print("\nKeyboard interrupted, closing program...")
            break
        except Exception as ex: #unexpected error, print info and then close
            result["error"] = str(ex)

            print("Error fetching website data. More info below, closing program.")
            print(ex)
            break