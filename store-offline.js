function storeOffline(infoHash, title, content)
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

  var data = localStorage['data'];
  if (data == undefined)
  {
    data = {};
  }
  else
  {
    data = JSON.parse(localStorage['data']);
  }

  var paste = {title, content}
  data[infoHash] = paste;
  localStorage['data'] = JSON.stringify(data);
  console.log(data);
}

function loadData() {

  var x;

  if (window.localStorage == undefined) {
    $.bootstrapGrowl("Your browser does not support permanently saving torrents", {type: 'danger'});
    return;
  }

  var data = localStorage['data'];
  if (data == undefined || data == '')
  {
    console.log('data is empty or undef');
    return;
  }
  else
  {
    data = JSON.parse(localStorage['data']);
  }

  for (x in data){
    console.log('torrent' + x);
  }

}
