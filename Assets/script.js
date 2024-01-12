document.addEventListener("DOMContentLoaded", function () {
    const lyricsSearchForm = document.getElementById("search-form");
    const lyricsResultsSection = document.getElementById("lyrics-results");

    lyricsSearchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const lyricsInput = document.getElementById("lyrics-search").value;
        searchLyrics(lyricsInput);
    });

    document.getElementById("lyrics-results").addEventListener("click", function () {
        const lyricsInput = document.getElementById("lyrics-search").value;

        if (lyricsInput.trim() !== "") {
            searchLyrics(lyricsInput);
        }
    });

    function searchLyrics(lyrics) {
        const apiKey = '9xRbA32eXhmEx1y8PiT6ilBROAS6qe-6ymKJmCetD5KRXKtXYcngRt8uJh0k3C1O';
        const apiUrl = `https://api.genius.com/search?q=${encodeURIComponent(lyrics)}&access_token=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayLyricsResults(data.response.hits))
            .catch(error => console.error("Error fetching lyrics:", error));
    }

    function displayLyricsResults(results) {
        lyricsResultsSection.innerHTML = "<h3>Lyrics Results</h3>";

        if (results.length === 0) {
            lyricsResultsSection.innerHTML += "<p>No results found</p>";
            return;
        }

        results.forEach(result => {
            const title = result.result.title;
            const artist = result.result.primary_artist.name;
            const url = result.result.url;

            const resultElement = document.createElement("p");
            resultElement.classList.add("lyrics-result-item");
            resultElement.innerHTML = `<a href="${url}" target="_blank">${title} by ${artist}</a>`;
            lyricsResultsSection.appendChild(resultElement);
        });
    }
});