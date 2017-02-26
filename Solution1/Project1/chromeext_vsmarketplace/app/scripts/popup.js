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
     //   console.log("I received the following DOM content:\n" + domContent);

        console.log("popup.js here4");
        var theTot = 999;

        //grab ALL elements from DOM with selector    .install-count
        jQuery('.install-count').each(function () {
            console.log("popup.js here5");
            var currentElement = $(this);
            var value = currentElement.val(); // if it is an input/select/textarea field
            console.log(value);
        });

        console.log("popup.js here6 heres the tot...");
        console.log(theTot);
        var display = document.getElementById('daTotal');
        display.innerHTML = theTot;

    }
});