//Set up the active tab to listen to for messages from popup.js 
chrome.runtime.onMessage.addListener(

    function (request, sender, sendResponse) {
        if (request.action === "sendTotalsToPopUp") {

            var theDetailsJsonArray = new Array();

            //jQuery('.core-info-cell').each(function () {
            //jQuery('.gallery-item-card').each(function () {
            $("[class^=gallery-item-card]").each(function () {

                var ratingTitle = $(this).find('.rating')[0].title;
                var startRating = ratingTitle.indexOf('(');
                var endRating = ratingTitle.indexOf(' ', startRating);

                var reviewCount = ratingTitle.substring(startRating, endRating);


               // debugger;
                var theJsonDetails =
                {
                    InstallCount: $(this).find('.install-count')[0].innerText,
                    ItemTitle: $(this).find('.item-title')[0].innerText,
                    ReviewCount: reviewCount //$(this).find('.rating')[0].title
                };
                theDetailsJsonArray.push(theJsonDetails);
            });


            //

            // Call the specified callback
            sendResponse(theDetailsJsonArray);
        }
    }
);

chrome.runtime.sendMessage({ action: "showPopUp" });