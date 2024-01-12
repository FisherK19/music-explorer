document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('search-form');
    const lyricsSearch = document.getElementById('lyrics-search');
    const liveSearch = document.getElementById('live-search');
    const lyricsResults = document.getElementById('lyrics-results');
    const liveResults = document.getElementById('live-results');
    const geniusApiKey = '9xRbA32eXhmEx1y8PiT6ilBROAS6qe-6ymKJmCetD5KRXKtXYcngRt8uJh0k3C1O';

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const lyricsQuery = lyricsSearch.value;
        const liveQuery = liveSearch.value;

        if (lyricsQuery) {
            searchLyrics(lyricsQuery);
        }

        if (liveQuery) {
            searchLiveMusic(liveQuery);
        }
    });

    function searchLyrics(lyricsQuery) {
        const apiUrl = `https://api.genius.com/search?q=${encodeURIComponent(lyricsQuery)}&access_token=${geniusApiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Lyrics API response:", data);

                if (data.response && data.response.hits && data.response.hits.length > 0) {
                    displayLyricsResults(data.response.hits.slice(0, 5));
                } else {
                    displayError('No lyrics results found.');
                }
            })
            .catch(error => {
                displayError(`Error fetching lyrics data: ${error.message}`);
                console.error("Lyrics API error:", error);
            });
    }

    function displayLyricsResults(results) {
        lyricsResults.innerHTML = '';

        results.forEach(hit => {
            const resultItem = document.createElement('div');
            resultItem.textContent = hit.result.full_title;
            lyricsResults.appendChild(resultItem);
        });
    }

    function searchLiveMusic(liveQuery) {
        const apiUrl = `https://api.example.com/search-live?q=${encodeURIComponent(liveQuery)}`;
    
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Live music API response:", data); 
    
                if (data.results && data.results.length > 0) {
                    displayLiveResults(data.results.slice(0, 5));
                } else {
                    displayError('No live music results found.');
                }
            })
            .catch(error => {
                displayError(`Error fetching live music data: ${error.message}`);
                console.error("Live music API error:", error);
            });
    }
    
    function displayLiveResults(results) {
        liveResults.innerHTML = '';

        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.textContent = result.title;
            liveResults.appendChild(resultItem);
        });
    }

    function displayError(message) {
        console.error(message);
    }
});
