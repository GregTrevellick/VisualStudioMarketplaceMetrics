//Set up the active tab to listen to for messages from popup.js 
chrome.runtime.onMessage.addListener(

    function (request, sender, popUpCallBackFn) {

        

        if (request.action === "requestDomFromVsmpPopUp") {

            //http://stackoverflow.com/questions/1789945/how-to-check-if-one-string-contains-another-substring-in-javascript
            //You can easily add a contains method to String with this statement:
            //String.prototype.contains = function (it) { return this.indexOf(it) != -1; };
            //Note: see the comments below for a valid argument for not using this. My advice: use your own judgement.
            //Alternatively:
            //if (typeof String.prototype.contains === 'undefined') { String.prototype.contains = function (it) { return this.indexOf(it) != -1; }; }

            //YES
            //https://marketplace.visualstudio.com
            //https://marketplace.visualstudio.com/vs
            //https://marketplace.visualstudio.com/vsts
            //https://marketplace.visualstudio.com/vscode
            //https://marketplace.visualstudio.com/search  IDE & VSTS & Code
            //https://marketplace.visualstudio.com/search?term=agile&target=VSTS&sortBy=Relevance
            //https://marketplace.visualstudio.com/search?term=trevellick&target=VS&sortBy=Relevance
            //https://marketplace.visualstudio.com/manage
            //https://social.msdn.microsoft.com/profile/Greg%20Trevellick/extensions

            console.log(window.location.href);

            var href = window.location.href;

            console.log(href);
            var typ = "";

            if (href.indexOf("marketplace.visualstudio.com/search") !=-1) {
                if (href.indexOf("&target=VS") !=-1) {
                    typ="search_VS";
                }
                if (href.indexOf("&target=VSTS") !=-1) {
                    typ="search_VSTS";
                }
            }
            console.log("typ="+typ);

            var vsmpDomJsonDataArray = new Array();

            //REPEATING LOOP FOR VS
            if (typ == "search_VS")
            {
                //$("[class^=gallery-item-card]").each(function () {
                $("[class^=grid-item]").each(function () {
                    var installCountRounded = $(this).find('.install-count')[0].innerText;
                    var installCount = installCountRounded.replace("M", "000000").replace("K", "000").replace(".", "");//gregt 1.9M is not 19000000
                    var icon = $(this).find('.item-icon')[0].src;
                    var itemTitle = $(this).find('.item-title')[0].innerText;
                    var reviewTitle = $(this).find('.rating')[0].title;
                    var startReview = reviewTitle.indexOf('(') + 1;
                    var endReview = reviewTitle.indexOf(' ', startReview);
                    var reviewCount = reviewTitle.substring(startReview, endReview);
                    var publisher = $(this).find('.publisher')[0].innerText;
                    var price = $(this).find('.pricing-tag')[0].innerText;
                    var averageReviewFull = $(this).find('.rating')[0].title;
                    var averageReviewSplit = averageReviewFull.replace(" ", "").split(":");
                    var averageReviewNumberPlus = averageReviewSplit[1].split("(");
                    var averageReview = averageReviewNumberPlus[0];
                    var fullDescription = $(this).find('.description')[0].innerText;
                    var url = $(this).find('.gallery-item-card-container')[0].href;
                    var vsmpDomJsonData =
                    {
                        InstallCount: installCount,
                        Icon: icon,
                        ItemTitle: itemTitle,
                        ReviewCount: reviewCount,
                        Publisher: publisher,
                        Price: price,
                        AverageReview: averageReview,
                        FullDescription: fullDescription,
                        URL: url,
                    };
                    vsmpDomJsonDataArray.push(vsmpDomJsonData);
                });
            }

            //REPEATING LOOP FOR VSTS
            if (typ == "search_VSTS") {

                console.log("carouseling");

                $("[class^=carousel-item]").each(function () {
                    var installCountRounded = $(this).find('.install-count')[0].innerText;
                    var installCount = installCountRounded.replace("M", "000000").replace("K", "000").replace(".", "");//gregt 1.9M is not 19000000
                    var icon = $(this).find('.item-icon')[0].src;
                    var itemTitle = $(this).find('.item-title')[0].innerText;
                    var reviewTitle = $(this).find('.rating')[0].title;
                    var startReview = reviewTitle.indexOf('(') + 1;
                    var endReview = reviewTitle.indexOf(' ', startReview);
                    var reviewCount = reviewTitle.substring(startReview, endReview);
                    var publisher = $(this).find('.publisher')[0].innerText;
                    var price = $(this).find('.pricing-tag')[0].innerText;
                    var averageReviewFull = $(this).find('.rating')[0].title;
                    var averageReviewSplit = averageReviewFull.replace(" ", "").split(":");
                    var averageReviewNumberPlus = averageReviewSplit[1].split("(");
                    var averageReview = averageReviewNumberPlus[0];
                    var fullDescription = $(this).find('.description')[0].innerText;
                    var url = $(this).find('.gallery-item-card-container')[0].href;
                    var vsmpDomJsonData =
                    {
                        InstallCount: installCount,
                        Icon: icon,
                        ItemTitle: itemTitle,
                        ReviewCount: reviewCount,
                        Publisher: publisher,
                        Price: price,
                        AverageReview: averageReview,
                        FullDescription: fullDescription,
                        URL: url,
                    };
                    vsmpDomJsonDataArray.push(vsmpDomJsonData);
                });
            }

            // Call the specified callback
            popUpCallBackFn(vsmpDomJsonDataArray);
        }
    }
);

chrome.runtime.sendMessage({ action: "openPopUp" });