// When the extension is installed or upgraded ...
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

    if (request.action == "showPopUp") {
        chrome.tabs.query({ active: true, currentWindow: true },
            function (tabs) {
            chrome.pageAction.show(tabs[0].id);
        });
    }
});
