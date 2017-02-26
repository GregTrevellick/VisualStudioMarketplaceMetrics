//Content scripts are the only component of an extension that has access to the web-page's DOM.








// Listen for messages
//Set up the active tab to listen to for messages from popup.js (like "gimme all d/l count elements")
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    // If the received message has the expected format...
    if (msg.action == "GetTotalBtn") {
        console.log("it was pressed");
    }

    if (msg.text === 'report_back') {
        // Call the specified callback, passing the web-page's DOM content as argument
        sendResponse(document.all[0].outerHTML);
    }

});

////chrome.runtime.sendMessage({ action: "show" });





