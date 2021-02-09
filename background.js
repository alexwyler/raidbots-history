let blockRequests = true;

// Intercept sdk request
chrome.webRequest.onBeforeRequest.addListener(
    function(request) {
      const urlInfo = parseUri(request.url);
      if (urlInfo.host.indexOf('offers.pearcommerce.com') != -1
      && (urlInfo.relative.indexOf('/js/sdk.js') >= 0 || urlInfo.relative.indexOf('/js/woodmans.js') >= 0)
      && !urlInfo.queryKey['from_extension']
      && blockRequests) {
        console.log('Cancelling sdk request', urlInfo, request);
        return {
          cancel: blockRequests,
        };
      }
    },
    {
      urls: ['<all_urls>'], // Change this to a more specific pattern
      types: ['script'],
    },
    ['blocking'],
);

chrome.storage.onChanged.addListener(function(changes, namespace) {
  const sdkOverrideChange = changes['pear_sdk_override'];
  if (sdkOverrideChange) {
    chrome.browserAction.setBadgeText({
      'text': sdkOverrideChange.newValue.text,
    });
    blockRequests = sdkOverrideChange.newValue.text !== 'None';
  } else {
    blockRequests = false;
  }
});
