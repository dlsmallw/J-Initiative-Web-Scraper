   Summary:

Logging & Annotation:
Logging and annotation features work correctly.

Webview Issue:
Attempts to load an external URL in the webview trigger a CORS error because the request is made from the renderer (browser) context, which lacks the necessary CORS headers.

Result:
The webview approach isn’t functioning as intended, preventing external content from loading.