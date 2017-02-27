//Set up the active tab to listen to for messages from popup.js (like "gimme all d/l count elements")
chrome.runtime.onMessage.addListener(

    function (request, sender, sendResponse) {
        if (request.action === "sendTotalsToPopUp") {

            var theDetailsJsonArray = new Array();

            //jQuery('.install-count').each(function () {
            //   console.log($(this).html());
            //});

            jQuery('.core-info-cell').each(function () {
                //debugger;
                //var en = $(this).innerHtml.$('.item-title').innerHtml;//$(this).Child1.innerText
                var itemtit = $(this).find('.item-title'); //$(this).find('.item-title').innerHtml;
                //debugger;
                var en = itemtit[0].innerText;
                //debugger;
                var dl = $(this).find('.install-count')[0].innerText;

                var theJsonDetails =
                {
                    DlCount: dl,
                    ExtnNam: en
                };
                theDetailsJsonArray.push(theJsonDetails);
             });

            // Call the specified callback, passing the web-page's DOM content as argument
            // sendResponse(document.all[0].outerHTML);
            sendResponse(theDetailsJsonArray);
        }
    }
);

//send a 'show me' msg to the pop up
chrome.runtime.sendMessage({ action: "showPopUp" });



// note: content scripts are the only component of an extension that has access to the web-page's DOM