new Promise(function(resolve) {
  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      resolve(document);
    }, false);
  } else {
    // document is already ready
    resolve(document);
  }
}).then(function() {
  const overrideSelect = document.getElementById('overrideSelect');

  // Read it using the storage API
  chrome.storage.sync.get(['pear_sdk_override'], function(items) {
    const savedValue = (items['pear_sdk_override'] || {}).value || '';
    overrideSelect.value = savedValue;
  });

  overrideSelect.onchange = function() {
    const selectedOption = this[this.selectedIndex];


    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({
      'pear_sdk_override': {
        'value': selectedOption.value,
        'text': selectedOption.text,
      },
    }, function() {
      console.log('Settings saved');
    });
  };
});
