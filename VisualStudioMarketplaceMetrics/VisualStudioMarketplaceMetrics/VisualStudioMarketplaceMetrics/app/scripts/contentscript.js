//Set up the active tab to listen to for messages from popup.js 
chrome.runtime.onMessage.addListener(

    function (request, sender, sendResponse) {
        if (request.action === "sendTotalsToPopUp") {

            var theDetailsJsonArray = new Array();

            // $("[class^=gallery-item-card]").each(function () {
            //     $("gallery-item-card").each(function () {
             $("[class^=grid-item]").each(function () {


                var ratingTitle = $(this).find('.rating')[0].title;
                var startRating = ratingTitle.indexOf('(') + 1;
                var endRating = ratingTitle.indexOf(' ', startRating);
                var reviewCount = ratingTitle.substring(startRating, endRating);

                var theJsonDetails =
                {
                    InstallCount: $(this).find('.install-count')[0].innerText,
                    ItemTitle: $(this).find('.item-title')[0].innerText,
                    ReviewCount: reviewCount 
                };

                theDetailsJsonArray.push(theJsonDetails);
            });

            // Call the specified callback
            sendResponse(theDetailsJsonArray);
        }
    }
);

chrome.runtime.sendMessage({ action: "showPopUp" });