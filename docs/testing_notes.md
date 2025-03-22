Blackbox testing results

Scrape page
-Data scrape mode radio button is clean and intuitive
-Under Manual mode, the "export to" field is not possible to type into (and is too narrow)
-127.0.0.1 as the destination for a scraping attempt generates a blank page. Unclear if this is the correct behavior
-When the primary hotkey is changed, the application doesn't the prevent default use of that hotkey within the page (ex. alt + click to save an element locally)
-Links with the target="\_blank" property (aka, links that open in a new tab) are nonfunctional within the browser. This might be acceptable behavior as this feature isn't commonly used (though it is used in some of the links from Twitter's homepage)
-Manual scraping is not functional in the current state.
-Hotkey choice and theme choice appear to be saved across sessions. This is likely desired behavior, but worth noting.

Log viewer: 
-Date filtering appears to have a bug. When I searched for errors generated on 03/21/2025 (after generating an error on another page on 03/21/2025), no errors appeared in the page. However, when I filtered by errors generated on 03/22/2025, the errors generated on 3/21 appeared in the page, listing their timestamps as occurring on 03/21/2025. 

Annotation
-Inputting certain inputs (ex. the text contents found on https://www.gutenberg.org/files/2701/2701-h/2701-h.htm ) into the URL text field causes the application to cease responding for an extended period, before returning an indecipherable error window.



Project structure comments
-The project restructuring seems solid overall. I've made one trivial change to the documentation to correct a typo in README.md.