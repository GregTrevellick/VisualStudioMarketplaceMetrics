//Set up the active tab to listen to for messages from popup.js 
chrome.runtime.onMessage.addListener(

    function (request, sender, sendResponse) {
        if (request.action === "sendTotalsToPopUp") {

            var theDetailsJsonArray = new Array();

           //$("[class^=gallery-item-card]").each(function () {
             $("[class^=grid-item]").each(function () {

                //Determine install count (gregt extract)
                var installCountRounded = $(this).find('.install-count')[0].innerText;
                var installCount = installCountRounded
                                                    .replace("M", "000000")
                                                    .replace("K", "000")
                                                    .replace(".", "");

                //Determine review count (gregt extract)
                var reviewTitle = $(this).find('.rating')[0].title;
                var startReview = reviewTitle.indexOf('(') + 1;
                var endReview = reviewTitle.indexOf(' ', startReview);
                var reviewCount = reviewTitle.substring(startReview, endReview);

                var theJsonDetails =
                {
                    InstallCount: installCount,
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