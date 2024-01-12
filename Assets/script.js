document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const lyricsSearch = document.getElementById('lyrics-search');
    const liveSearch = document.getElementById('live-search');
    const lyricsResults = document.getElementById('lyrics-results');
    const liveResults = document.getElementById('live-results');
})
searchForm.addEventListener('submit', function(e) {
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
