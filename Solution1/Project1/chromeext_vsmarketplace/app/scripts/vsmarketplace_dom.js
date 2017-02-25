chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.action == "GetTotalBtn") {
        console.log("it was pressed");
    }

});

chrome.runtime.sendMessage({ action: "show" });
