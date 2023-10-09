// Delay runner. Wraps `setTimeout` so it can be `await`ed on.
var runAfterDelay = (fn, delay) => new Promise((resolve, reject) => {
    setTimeout(() => {
        fn();
        resolve();
    }, delay);
});

// Function to get channel names and send them to the background script
function getChannelNames() {
    // Get the channel list; this can be considered a row in the page.
    var channels = Array.from(document.getElementsByTagName('ytd-channel-renderer'));

    // Extract channel names and store them in an array
    var channelNames = channels.map(channel => {
        return channel.querySelector('.style-scope.ytd-channel-name yt-formatted-string').textContent.trim();
    });
    
    console.log(channelNames)
   // Send channel names to the background script
   chrome.storage.local.set({ channelNames: channels });
}


// Run the logic after the window has fully loaded
window.onload = function() {
    getChannelNames();
}
