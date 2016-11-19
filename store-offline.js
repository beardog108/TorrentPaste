function storeOffline(mag, title, content)
{
  // Check if localStorage is full
  if (window.localStorage == undefined) {
    return;
  }

  try {
    localStorage.setItem('fullTest', '9999999');
  } catch(e) {
    if (e.code == 22) {
      $.bootstrapGrowl("Storage capacity for saving torrents is full.", {type: 'danger'});
      return;
    }
  }
  localStorage.removeItem('fullTest');
  localStorage[mag] = text;
}

function loadLocal(hash) {

  var fileName = hash.split("&dn=")[1].split("&")[0]; /* Thanks @Arinerron */

  var text = localStorage[hash];

  // Load paste from localStorage cache
  console.log('Loading from cached copy.');

  var data = new Blob([text], {type: 'text/markdown'});

  var parts = [
    new Blob([text], {type: 'text/markdown'}),
  ];

  // Construct a file

  file = new File(parts, fileName, {
      type: "text/markdown"
  });

  client.seed(file, function (torrent) {
    console.log('client is seeding ' + torrent.magnetURI);
  });

}
