$(function () {

    function psuedoClick() {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "sendTotalsToPopUp" }, doStuffWithDomCallBack);
            });
    };

    psuedoClick();
    
    function doStuffWithDomCallBack(domContent) {
        var theTot = 999;

        // jQuery('.install-count').each(function () {
        //   var currentElement = $(this);
        //   var value = currentElement.val(); 
        //   });

        var display = document.getElementById('daTotal');
        display.innerHTML = domContent;
    }
});