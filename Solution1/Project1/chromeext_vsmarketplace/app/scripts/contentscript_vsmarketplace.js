//Set up the active tab to listen to for messages from popup.js (like "gimme all d/l count elements")
chrome.runtime.onMessage.addListener(

    function (request, sender, sendResponse) {
        if (request.action === "sendTotalsToPopUp") {

            // jQuery('.install-count').each(function () {
            //    console.log($(this).html());
            // });

            var theDetailsArray = new Array();

            jQuery('.core-info-cell').each(function () {
                var theDetails =
                {
                    ExtnNam: "oia",
                    DlCount: 2
                };
                theDetailsArray.push(theDetails);
             });

            // Call the specified callback, passing the web-page's DOM content as argument
            // sendResponse(document.all[0].outerHTML);
            sendResponse(theDetailsArray);
        }
    }
);

//send a 'show me' msg to the pop up
chrome.runtime.sendMessage({ action: "showPopUp" });



// note: content scripts are the only component of an extension that has access to the web-page's DOM