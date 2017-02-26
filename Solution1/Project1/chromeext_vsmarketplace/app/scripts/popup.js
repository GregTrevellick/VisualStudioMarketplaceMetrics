$(function () {

    console.log('here');
    var theTot = 999;

    //grab ALL elements from DOM with selector    .install-count
    jQuery('.install-count').each(function () {
        var currentElement = $(this);
        var value = currentElement.val(); // if it is an input/select/textarea field
        console.log(value);
    });
 

    //theTot = dlcounts.innerHTML;
    

    console.log(theTot);
    var display = document.getElementById('daTotal');
    display.innerHTML = theTot;




    // When button clicked do something
    //$('#GetTotalBtn').click(function () {
    //    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //        chrome.tabs.sendMessage(tabs[0].id, { action: "GetTotalBtn" });
    //    });
    //});
  
});