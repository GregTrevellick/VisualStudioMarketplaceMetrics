$(function () {

    //GET
    chrome.storage.sync.get('permNbr', function (items) {
        $('#permNbr').val(items.permNbr);
    });
    chrome.storage.sync.get('pinNbr', function (items) {
        $('#pinNbr').val(items.pinNbr);
    });

    //SET
    $('#save').click(function () {
        var permNbr = $('#permNbr').val();
        var pinNbr = $('#pinNbr').val();
        if (permNbr) {
            chrome.storage.sync.set({ 'permNbr': permNbr }, function () {
                close();
            });
        }
        if (pinNbr) {
            chrome.storage.sync.set({ 'pinNbr': pinNbr }, function () {
                close();
            });
        }
    });

    //////// $('#reset').click(function () {
    /////////     chrome.storage.sync.set({ 'total': 0 }, function () {
    /////////         var opt = {
    /////////             type: "basic",
    /////////             title: "Total reset!",
    /////////             message: "Total has been reset back to 0.",
    /////////             iconUrl: "icon.png"
    /////////         }
    /////////         chrome.notifications.create('reset', opt, function () { });
    /////////     });
    ///////// });
});