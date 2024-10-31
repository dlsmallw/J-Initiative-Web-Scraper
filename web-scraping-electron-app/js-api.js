const HOST_URL = 'http://127.0.0.1:7777/';

async function pingBackend() {
    try {
        const response = await fetch(HOST_URL + 'ping');
        const data = await response.json();
        console.log('Ping Response:', data);
        return data;
    } catch (error) {
        console.error('Ping Error:', error);
    }
}

async function stopPyBackend() {
    try {
        const response = await fetch(HOST_URL + 'kill');
        const data = await response.json();
        console.log('Shutdown Response:', data);
        return data;
    } catch (error) {
        console.error('Shutdown Error:', error);
    }
}

async function sendScrapeRequest(urlToScrape) {
    try {
        const response = await fetch(HOST_URL + 'url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: urlToScrape }),
        });

        const data = await response.json();

        if (response.ok && data.ok) {
            console.log('Scrape Successful:', data);
            // Display data.formattedData or data.rawData in the UI
        } else {
            console.error('Scrape Failed:', data.detail || data.message);
            // Display error message in the UI
        }
    } catch (error) {
        console.error('Network Error:', error);
        // Display network error message in the UI
    }
}

// Trigger the function, e.g., on form submission
document.getElementById('scrape-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const urlToScrape = document.getElementById('url-input').value.trim();
    sendScrapeRequest(urlToScrape);
});
