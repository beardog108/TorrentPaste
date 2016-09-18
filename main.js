var client = new WebTorrent();

$('#go').click(function(){
	if ($('#text').val() == '')
	{
		$.bootstrapGrowl("You need text to paste!", {type: 'danger'});
		return false;
	}
		var parts = [
	  new Blob([$('#text').val()], {type: 'text/plain'}),
	  new Uint16Array([33])
	];

	// Construct a file
	var file = new File(parts, 'paste.md', {
	    type: "text/markdown"
	});

	var fr = new FileReader();

	fr.onload = function(evt){
		//client.seed(URL.createObjectURL(file), [opts], [function onseed (torrent) {}])
		  client.seed(file, function (torrent) {
    		console.log('Client is seeding ' + torrent.magnetURI);
    		$('#uriOutput').val(torrent.magnetURI);
    		$('#shareLink').val(document.location.href + '#' + torrent.infoHash);
    		$('#ready').modal();
 		 })
	}

	fr.readAsText(file);
	return false;
});

$('#downloadOpen').click(function(){
	$('#downloadModal').modal();
});

$('#download').click(function(){
	var uri = $('#downloadURI').val();

	$.bootstrapGrowl("When finished, your paste will be in the output box below", {type: 'success'});
	client.add(uri, function (torrent) {
	  // Torrents can contain many files. Let's use the first.
	  var file = torrent.files[0];
	  // Render text to markdown, then send to DOM
	  file.getBuffer(function (err, buffer) {
		  if (err) throw err
		  $('#downloadOutput').html(markdown.toHTML(buffer.toString('utf8')));
	  });
	});
});

$('#downloadOutput').bind("DOMSubtreeModified",function(){
	var txt = $('#downloadOutput').val();
	txt = txt.replace(/[\uFFFD]/g, '');
	$('#downloadOutput').val(txt);
});


$('form').on('submit', function(){
	return false;
});

if(window.location.hash) {
	$.bootstrapGrowl("When finished, your paste will be in the output box below", {type: 'success'});

	$('#downloadModal').modal();
	var uri = 'magnet:?xt=urn:btih:' + window.location.hash + '&dn=paste.txt&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io';

	client.add(uri, function (torrent) {
	  // Torrents can contain many files. Let's use the first.
	  var file = torrent.files[0];

	  // Display the file by adding it to the DOM.
	  // Supports video, audio, image files, and more!
	  file.appendTo('#downloadOutput');
	});
}
