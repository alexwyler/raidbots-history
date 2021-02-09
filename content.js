const validHostSubstrings = [
  'woodmans',
  'grocerkey',
  'hebtoyou',
  'hy-vee',
  'coborns',
  'pricechopper',
  'kowalskis',
  'cheerios',
  'foodlion',
  'lundsandbyerlys',
  'heb', 'stopandshop', 'unitedsupermarkets', 'meijer', 'hy-vee', 'gianteagle', 'smartandfinal', 'lowes', 'sprouts', 'olddutch-new-site',
];

const host = parseUri(window.location.href).host;

let shouldOverride = false;
validHostSubstrings.forEach((validHostSubstring) => {
  if (host.indexOf(validHostSubstring) != -1) {
    shouldOverride = true;
  }
});

setTimeout(() => {
  if (shouldOverride) {
    chrome.storage.sync.get(['pear_sdk_override'], function(items) {
      const overrideInfo = items['pear_sdk_override'];
      if (overrideInfo && overrideInfo.value) {
        const script2 = document.createElement('script');
        script2.innerHTML = `
function populateData(data) {
	alert(JSON.stringify(data));
}
`;
        document.documentElement.appendChild(script2);


        const script = document.createElement('script');
        // Hardcode to match woodmans' setup
        const filename = 'sdk.js';
        script.setAttribute('src', `http://localhost:8000/js/sdk.js?widget=old-dutch-wtb.js&ver=5.5.3`);
        document.documentElement.appendChild(script);
      }
    });
  }
}, 5000);
