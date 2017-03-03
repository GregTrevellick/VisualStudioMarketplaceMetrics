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

            var href = window.location.href;
            var typ = "";
            if (href == "https://marketplace.visualstudio.com/") {
                typ = "browse_Root";
            }
            if (href.indexOf("marketplace.visualstudio.com/search") != -1) {
                if (href.indexOf("&target=VS&") != -1) {
                    typ = "search_VS";
                }
                if (href.indexOf("&target=VSCode&") != -1) {
                    typ = "search_VSCode";
                }
                if (href.indexOf("&target=VSTS&") != -1) {
                    typ = "search_VSTS";
                }
            }
            if (href.indexOf("marketplace.visualstudio.com/vs") != -1) {
                typ = "browse_VS";
                if (href.indexOf(".com/vsts") != -1) {
                    typ = "browse_VSTS";
                }
                if (href.indexOf("com/vscode") != -1) {
                    typ = "browse_VSCode";
                }
            }

            var vsmpDomJsonDataArray = new Array();

            if (typ == "search_VS" ||
                typ == "search_VSCode")
            {
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

            if (typ == "browse_Root" ||
                typ == "browse_VS" ||
                typ == "browse_VSTS" ||
                typ == "browse_VSCode" ||
                typ == "search_VSTS")
            {
                $("[class^=gallery-item-card]").each(function () {
                    var installCountRounded = "asadssa";//$(this).find('.install-count')[0].innerText;
                    var installCount = "asadssa";//installCountRounded.replace("M", "000000").replace("K", "000").replace(".", "");//gregt 1.9M is not 19000000
                    var icon = "asadssa";//$(this).find('.item-icon')[0].src;
                    var itemTitle = "asadssa";//$(this).find('.item-title')[0].innerText;
                    var reviewTitle = "asadssa";//$(this).find('.rating')[0].title;
                    var startReview = "asadssa";//reviewTitle.indexOf('(') + 1;
                    var endReview = "asadssa";//reviewTitle.indexOf(' ', startReview);
                    var reviewCount = "asadssa";//reviewTitle.substring(startReview, endReview);
                    var publisher = "asadssa";//$(this).find('.publisher')[0].innerText;
                    var price = "asadssa";//$(this).find('.pricing-tag')[0].innerText;
                    var averageReviewFull = "asadssa";//$(this).find('.rating')[0].title;
                    var averageReviewSplit = "asadssa";//averageReviewFull.replace(" ", "").split(":");
                    var averageReviewNumberPlus = "asadssa";//averageReviewSplit[1].split("(");
                    var averageReview = "asadssa";//averageReviewNumberPlus[0];
                    var fullDescription = "asadssa";//$(this).find('.description')[0].innerText;
                    var url = "asadssa";//$(this).find('.gallery-item-card-container')[0].href;
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