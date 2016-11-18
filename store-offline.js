function storeOffline(infoHash, title, content)
{
  var uri = 'magnet:?xt=urn:btih:' + infoHash + '&dn=paste.md&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com';
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
  localStorage[uri] = text;
}

function loadLocal(hash) {

  var text = localStorage[hash];

  // Load paste from localStorage cache
  console.log('Loading from cached copy.');

  var data = new Blob([text], {type: 'text/markdown'});

  var parts = [
    new Blob([text], {type: 'text/markdown'}),
  ];

  // Construct a file
  var fileName = 'paste.md';
  var tName;

  file = new File(parts, fileName, {
      type: "text/markdown"
  });

  client.seed(file, function (torrent) {
    tName = torrent.files[0].name;
    console.log('client is seeding ' + torrent.magnetURI);
  });

}
