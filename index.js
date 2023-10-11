const worker = document.getElementById("start");
const youtubeUrl = "https://www.youtube.com/feed/channels";

const getTabId = () => new Promise((resolve) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    resolve(tabs[0].id);
  });
});

const stop = async () => {
  const id = await getTabId();
  chrome.scripting.executeScript({ target: { tabId: id }, func: () => window.unubscribeStop() });
};

const start = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const tab = tabs[0];
    if (tab.url === youtubeUrl) {
      if (tab.status === "complete") {
        chrome.scripting.executeScript({ target: { tabId: tab.id }, func: () => window.unubscribeStart() });
      } else {
        worker.innerHTML = "Page is loading..";
      }
      return;
    }
    worker.innerText = "Redirect to YouTube..";
    chrome.tabs.update(tab.id, { url: youtubeUrl });
  });
};

worker.addEventListener("click", async () => {
  const isRunning = worker.getAttribute("running");
  isRunning === "true" ? stop() : start();
});

chrome.runtime.onMessage.addListener((action) => {
  if (action.type === "msg") {
    worker.innerText = action.msg;
    console.log(action);
    worker.setAttribute("running", action.running.toString());
  }
});
