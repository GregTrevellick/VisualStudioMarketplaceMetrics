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

                var icon = "ii";//$(this).find('.item-title')[0].attr('src').value;//https://gregtrevellick.gallerycdn.vsassets.io/extensions/gregtrevellick/openinaltovaxmlspy/1.0.148/1485898805086/Microsoft.VisualStudio.Services.Icons.Default
                var itemTitle = $(this).find('.item-title')[0].innerText;
                var reviewTitle = $(this).find('.rating')[0].title;
                var startReview = reviewTitle.indexOf('(') + 1;
                var endReview = reviewTitle.indexOf(' ', startReview);
                var reviewCount = reviewTitle.substring(startReview, endReview);
                var reviewsAsPercentageOfInstalls = "reviewsAsPercentageOfInstalls";
                var publisher = $(this).find('.publisher')[0].innerText;
                var publishedDate = "publishedDate";
                var price = $(this).find('.pricing-tag')[0].innerText;
                var averageReview = "averageReview";
                var fullDescription = $(this).find('.description')[0].innerText;
                var url = "uu";//$(this).find('.gallery-item-card-container')[0].attr('href').value;///items?itemName=GregTrevellick.OpeninAltovaXMLSpy
                var UpdatedDate = "UpdatedDate";

                var theJsonDetails =
                {
                    InstallCount: installCount,
                    Icon: icon,
                    ItemTitle: itemTitle,
                    ReviewCount: reviewCount,
                    ReviewsAsPercentageOfInstalls: reviewsAsPercentageOfInstalls,
                    Publisher: publisher,
                    PublishedDate: publishedDate,
                    Price: price,
                    AverageReview: averageReview,
                    FullDescription: fullDescription,
                    URL: url,
                    UpdatedDate: UpdatedDate
                };

                theDetailsJsonArray.push(theJsonDetails);
            });

            // Call the specified callback
            sendResponse(theDetailsJsonArray);
        }
    }
);

chrome.runtime.sendMessage({ action: "showPopUp" });