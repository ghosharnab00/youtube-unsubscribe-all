chrome.webNavigation.onCompleted.addListener((details) => {
    chrome.runtime.sendMessage({type: "msg", msg: "start"});
  
    chrome.scripting.executeScript({
      target: {tabId: details.tabId},
      files: [
        "function.js"
      ],
    });
  }, {
    url: [
      {
        hostContains: '.youtube.',
        pathContains: 'feed/channels',
      },
    ]
  });