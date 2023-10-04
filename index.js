const start = document.getElementById('start')

start.addEventListener('click', () => {
    const youtubeUrl = "https://www.youtube.com/feed/channels";
    const isRunning = start.getAttribute("running");

    

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        console.log(activeTab)
        if (activeTab.url === youtubeUrl) {
            start.innerText = 'Already on the correct page.';
        } else {
            start.innerText = "redirect to youtube ..";
          chrome.tabs.update(activeTab.id, { url: youtubeUrl });
        }
      });
})

