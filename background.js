
const channels =  chrome.storage.local.get(["channelNames"], function(result) {
    console.log('Value currently is ' + result.channels);
});
