// When the extension is installed or upgraded...
chrome.runtime.onInstalled.addListener(function() {

  // Replace all rules...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {

    // With a new rule...
    chrome.declarativeContent.onPageChanged.addRules([
      {

        // That fires when a page's URL contains certain value
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlContains: 'marketplace.visualstudio' },
          })
        ],

        // And shows the extension's page action (defined in manifest.json as popup.html which invokes popup.js)
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
