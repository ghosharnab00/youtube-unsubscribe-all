let prevent;

const unubscribeStop = () => {
  prevent = true;
  sendMessage("start again", false);
};

const unubscribeStart = async () => {
  const UNSUBSCRIBE_DELAY_TIME = 2000;

  const runAfterDelay = (fn, delay) => new Promise(resolve => setTimeout(() => { fn(); resolve(); }, delay));

  const subs = document.querySelectorAll('ytd-channel-renderer');

  if (!subs || subs.length === 0) {
    sendMessage("you don't have any subs", false);
    return;
  }

  prevent = false;
  sendMessage("click to stop", true);

  let counter = 0;

  for (const channel of subs) {
    if (prevent) break;

    await runAfterDelay(() => {
      channel.querySelector(`[aria-label^='Unsubscribe from']`).click();

      runAfterDelay(() => {
        document.getElementById("confirm-button").childNodes[1].childNodes[0].click();
        console.log(`Unsubscribed ${++counter}/${subs.length}`);
      }, UNSUBSCRIBE_DELAY_TIME);
    }, UNSUBSCRIBE_DELAY_TIME);
  }

  sendMessage("All are unsubscribed", false);
};

const sendMessage = (msg, running) => {
  chrome.runtime.sendMessage({ type: "msg", msg, running });
};

window.unubscribeStart = unubscribeStart;
window.unubscribeStop = unubscribeStop;
