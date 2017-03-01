//Set up the active tab to listen to for messages from popup.js 
chrome.runtime.onMessage.addListener(

    function (request, sender, sendResponse) {
        if (request.action === "sendTotalsToPopUp") {

            var theDetailsJsonArray = new Array();

           //$("[class^=gallery-item-card]").each(function () {
             $("[class^=grid-item]").each(function () {

                var installCountRounded = $(this).find('.install-count')[0].innerText;
                var installCount = installCountRounded
                                                    .replace("M", "000000")
                                                    .replace("K", "000")
                                                    .replace(".", "");

                var icon = $(this).find('.item-icon')[0].src;
                var itemTitle = $(this).find('.item-title')[0].innerText;
                var reviewTitle = $(this).find('.rating')[0].title;
                var startReview = reviewTitle.indexOf('(') + 1;
                var endReview = reviewTitle.indexOf(' ', startReview);
                var reviewCount = reviewTitle.substring(startReview, endReview);
                var reviewsAsPercentageOfInstalls = (reviewCount / installCount) * 100;//gregt divide by zero !
                var publisher = $(this).find('.publisher')[0].innerText;
                var price = $(this).find('.pricing-tag')[0].innerText;
               
                var averageReviewFull = $(this).find('.rating')[0].title;
                var averageReviewSplit = averageReviewFull
                    .replace(" ", "")
                    .split(":");
                var averageReviewNumberPlus = averageReviewSplit[1]
                    .split("(");
                
                var fullDescription = $(this).find('.description')[0].innerText;
                var url = $(this).find('.gallery-item-card-container')[0].href;

                var theJsonDetails =
                {
                    InstallCount: installCount,
                    Icon: icon,
                    ItemTitle: itemTitle,
                    ReviewCount: reviewCount,
                    ReviewsAsPercentageOfInstalls: reviewsAsPercentageOfInstalls,
                    Publisher: publisher,
                    Price: price,
                    AverageReview: averageReviewNumberPlus[0],
                    FullDescription: fullDescription,
                    URL: url,
                };

                theDetailsJsonArray.push(theJsonDetails);
            });

            // Call the specified callback
            sendResponse(theDetailsJsonArray);
        }
    }
);

chrome.runtime.sendMessage({ action: "showPopUp" });