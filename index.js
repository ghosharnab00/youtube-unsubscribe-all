const start = document.getElementById('start')
const channelsList = document.getElementById('channels-list');

start.addEventListener('click', () => {
    const youtubeUrl = "https://www.youtube.com/feed/channels";
    const isRunning = start.getAttribute("running");

    

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        if (activeTab.url === youtubeUrl) {
            start.innerText = 'Already on the correct page.';
            scrapeChannels(activeTab.id);

        } else {
            start.innerText = "redirect to youtube ..";
          chrome.tabs.update(activeTab.id, { url: youtubeUrl });
          

        }
      });
})


function scrapeChannels(tabId) {
  chrome.tabs.executeScript(tabId, { code: `
       console.log("channels")    
  `});
}

// const channels = Array.from(document.querySelectorAll('.style-scope.ytd-channel-renderer'));