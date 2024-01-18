/* const search-form, lyric results, search-form-live, live results */
document.addEventListener("DOMContentLoaded", function () {
    const lyricsSearchForm = document.getElementById("search-form");
    const lyricsResultsSection = document.getElementById("lyrics-results");
    const liveSearchForm = document.getElementById("search-form-live");
    const liveResultsSection = document.getElementById("live-results");
    /* Local storage */
    const storedLyricsResults = localStorage.getItem('lyricsResults');
    if (storedLyricsResults) {
        displayLyricsResults(JSON.parse(storedLyricsResults));
    }
    
    lyricsSearchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const lyricsInput = document.getElementById("lyrics-search").value;
        searchLyrics(lyricsInput);
    });

    const storedLiveResults = localStorage.getItem('liveResults');
    if (storedLiveResults) {
        displayLiveResults(JSON.parse(storedLiveResults));
    }

    /* submit and reset functions */
    lyricsSearchForm.addEventListener("reset", function () {
        lyricsResultsSection.innerHTML = '';
    });
    liveSearchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const artistInput = document.getElementById("live-search").value;
        searchLiveEvents(artistInput);
    });
    liveSearchForm.addEventListener("reset", function () {
        liveResultsSection.innerHTML = '';
    });
    /* API Key for genius */
    function searchLyrics(lyrics) {
        const apiKey = '9xRbA32eXhmEx1y8PiT6ilBROAS6qe-6ymKJmCetD5KRXKtXYcngRt8uJh0k3C1O';
        const apiUrl = `https://api.genius.com/search?q=${encodeURIComponent(lyrics)}&access_token=${apiKey}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayLyricsResults(data.response.hits))
            .catch(error => console.error("Error fetching lyrics:", error));
    }
    /* API Key for ticketmaster */
    function searchLiveEvents(artist) {
        const apiKey = 'OUGxCGP7zcUXvIN0sDQpOzHAdlJLM2ID';
        const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&keyword=${encodeURIComponent(artist)}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayLiveResults(data._embedded.events))
            .catch(error => console.error("Error fetching live events:", error));
    }
    /* display lyric results fucntions */
    function displayLyricsResults(results) {
        lyricsResultsSection.innerHTML = "<h3>Lyrics Results</h3>";
        if (results.length === 0) {
            lyricsResultsSection.innerHTML += "<p>No results found</p>";
            return;
            
        }
        /* local storage for lyrics results */
        localStorage.setItem('lyricsResults', JSON.stringify(results));
console.log('Saved to local storage:', results);



        results.forEach(result => {
            const title = result.result.title;
            const artist = result.result.primary_artist.name;
            const url = result.result.url;
            const resultElement = document.createElement("div");
            resultElement.classList.add("lyrics-result-item");
            resultElement.style.backgroundColor = "rgba(224, 224, 224, 0.7)";
            resultElement.style.padding = "10px 20px";
            resultElement.style.borderRadius = "8px";
            resultElement.innerHTML = `<strong><a href="${url}" target="_blank">${title} by ${artist}</a></strong>`;
            lyricsResultsSection.appendChild(resultElement);
        });
    }
    /* display live results functions */
     function displayLiveResults(events) {
        liveResultsSection.innerHTML = "<h3>Live Music Results</h3>";
        if (events.length === 0) {
            liveResultsSection.innerHTML += "<p>No live events found</p>";
            return;
        }
      /* localstorage for live results */
        localStorage.setItem('liveResults', JSON.stringify(events));

        events.forEach(event => {
            const eventName = event.name;
            const venueName = event._embedded.venues[0].name;
            const eventDate = new Date(event.dates.start.dateTime).toLocaleDateString();
            const eventTime = new Date(event.dates.start.dateTime).toLocaleTimeString();
            const eventUrl = event.url;
            const resultElement = document.createElement("div");
            resultElement.classList.add("live-result-item");
            resultElement.style.backgroundColor = "rgba(224, 224, 224, 0.7)";
            resultElement.style.padding = "10px 20px";
            resultElement.style.borderRadius = "8px";
            resultElement.innerHTML = `<strong><a href="${eventUrl}" target="_blank">${eventName}</a></strong> at ${venueName} on <a href="${eventUrl}" target="_blank">${eventDate} at ${eventTime}</a>`;
            liveResultsSection.appendChild(resultElement);
        });
    }
    
});
