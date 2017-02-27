//Set up the active tab to listen to for messages from popup.js 
chrome.runtime.onMessage.addListener(

    function (request, sender, sendResponse) {
        if (request.action === "sendTotalsToPopUp") {

            var theDetailsJsonArray = new Array();

            jQuery('.core-info-cell').each(function () {
                var theJsonDetails =
                {
                    InstallCount: $(this).find('.install-count')[0].innerText,
                    ItemTitle: $(this).find('.item-title')[0].innerText
                };
                theDetailsJsonArray.push(theJsonDetails);
             });

            // Call the specified callback
            sendResponse(theDetailsJsonArray);
        }
    }
);

chrome.runtime.sendMessage({ action: "showPopUp" });