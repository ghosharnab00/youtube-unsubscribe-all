const start = document.getElementById('start')
const channelsList = document.getElementById('channels-list');


const isRunning = start.getAttribute("running");
  
start.addEventListener('click', () => {
  const youtubeUrl = "https://www.youtube.com/feed/channels";
  const isRunning = start.getAttribute("running");
  
  
  
  
  
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
      const activeTab = tabs[0];
      if (activeTab.url === youtubeUrl) {
          start.innerText = 'Already on YouTube.';
          

      } else {
          start.innerText = "Redirecting to YouTube...";
          chrome.tabs.update(activeTab.id, { url: youtubeUrl });

          // Listen for changes in the tab's status
          chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab) {
              if (tabId === activeTab.id && changeInfo.status === 'complete') {
                  // Update the text once the page has finished loading
                  start.innerText = 'Already on YouTube.';
              }
          });
      }
  });
});


// chrome.browserAction.onClicked.addListener(function(tab) {
//   const youtubeUrl = "https://www.youtube.com/feed/channels";
//   chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
//       const activeTab = tabs[0];
//       if (activeTab.url === youtubeUrl) {
//           start.innerText = 'Already on YouTube.';
//           // Additional logic or actions if needed when already on the correct page.
//           // For example, you may want to call scrapeChannels(activeTab.id) here.
//       } else {
//           start.innerText = 'Not on YouTube.';
//       }
//   });
// });







chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'updatePopup') {
      // Access channel names from the request object
      const channels = request.channelNames;
      console.log("channels inside index.js", channels)
      // Perform actions to manipulate the popup content
      updatePopupContent(channels);
  }
});
function updatePopupContent(channels) {
  const channelListElement = document.getElementById('channels-list');
  
  // Clear previous content
  channelListElement.innerHTML = '';

  // Create checkboxes for each channel and append them to the list
  channels.forEach(channel => {
    const channelItem = document.createElement('div');

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = channel; // You might want to set a unique ID for each checkbox
    // Add event listener if you want to do something when the checkbox is checked/unchecked
    checkbox.addEventListener('change', function() {
      console.log(`Checkbox with ID ${channel} is now ${this.checked ? 'checked' : 'unchecked'}`);
    });

    // Create label for the checkbox
    const label = document.createElement('label');
    label.htmlFor = channel;
    label.appendChild(document.createTextNode(channel));

    // Append checkbox and label to the channel item
    channelItem.appendChild(checkbox);
    channelItem.appendChild(label);

    // Append the channel item to the list
    channelListElement.appendChild(channelItem);
  });
}


// const channels = Array.from(document.querySelectorAll('.style-scope.ytd-channel-renderer'));