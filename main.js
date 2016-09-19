/* Copyright (c) 2016, Kevin Froman (https://ChaosWebs.net) & Andrew Morgan (https://amorgan.xyz). MIT License */
var client = new WebTorrent();
var file;

$('#createPaste').click(function(){
	if ($('#text').val() == '')
	{
		$.bootstrapGrowl("You need text to paste!", {type: 'danger'});
		return false;
	}
		var parts = [
	  new Blob([$('#text').val()], {type: 'text/markdown'}),
	];

	// Construct a file
	var fileName = $('#name').val();
    if (!fileName){fileName = "Unnamed";}
	file = new File(parts, fileName, {
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

	// Refresh downloads container
	downloadsRefresh();
	return false;
});

$('#refreshButton').click(function(){
	// Spin refresh button
	$('#refreshButton').addClass('fa-spin');

	downloadsRefresh();
});

function downloadsRefresh(){
	$('#downloadsPanelList').html('');

	// Allow client object time to update torrent list
	setTimeout(function(){
		// Stop spinning refresh
		$('#refreshButton').removeClass('fa-spin');

		// List active torrents
		var count = 0;
		var torrent;
		while (torrent = client.torrents[count]) {
            var progress = '<b id="' + torrent.magnetURI + '">0%</b>';
			var html = '<li class="list-group-item">' + torrent.files[0].name + '  ' + progress + '<div id="' + count  + '" class="btn-group pull-right" role="group" aria-label=""><button type="button" class="btn btn-sm btn-default"><i class="fa fa-eye" aria-hidden="true"></i></button><button type="button" class="btn btn-sm btn-default" data-clipboard-action="copy" data-clipboard-text="' + document.location.href + '#' + torrent.infoHash + '"><i class="fa fa-link" aria-hidden="true"></i></button><button type="button" class="btn btn-sm btn-default" data-clipboard-action="copy" data-clipboard-text="' + torrent.magnetURI + '"><i class="fa fa-magnet" aria-hidden="true"></i></button><button type="button" class="btn btn-sm btn-default"><i class="fa fa-download" aria-hidden="true"></i></button><button type="button" class="btn btn-sm btn-danger"><i class="fa fa-pause-circle" aria-hidden="true"></i></button></div></td></tr></table></li>';
			$('#downloadsPanelList').append(html);
			count++;
		}
        $('.btn-group button').click(function(){
            // Find out which button was pressed
            var classesList = $(this).find('i').attr('class').split(/\s+/);
            var id = $(this).parent().attr('id');
            var torrent = client.torrents[id];
            switch(classesList[1]) {
                case 'fa-eye':
                    $('#uriOutput').val(torrent.magnetURI);
                    $('#shareLink').val(document.location.href + '#' + torrent.infoHash);
                    $('#ready').modal();
                    break;
                case 'fa-link':
                    var clipboard = new Clipboard('.btn-group button');
                    $.bootstrapGrowl("Share link copied to clipboard!", {type: 'success'});
                    break;
                case 'fa-magnet':
                    var clipboard = new Clipboard('.btn-group button');
                    $.bootstrapGrowl("Magnet URI copied to clipboard!", {type: 'success'});
                    break;
                case 'fa-download':
                    // Create an invisible link for the torrent download
                    var downloadLink = document.createElement("a");
                    downloadLink.href = torrent.torrentFileBlobURL;
                    downloadLink.download = torrent.files[0].name + '.torrent';

                    // Click the link we just made
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    break;
                case 'fa-pause-circle':
                    // Pause torrent seeding
                    torrent.pause();

                    // Switch to play icon
                    $(this).find('i').removeClass('fa-pause-circle').addClass('fa-play-circle');
                    $(this).removeClass('btn-danger').addClass('btn-success');

                    break;
                case 'fa-play-circle':
                    // Start torrent seeding
                    torrent.resume();

                    // Switch to pause icon
                    $(this).find('i').removeClass('fa-play-circle').addClass('fa-pause-circle');
                    $(this).removeClass('btn-play').addClass('btn-danger');

                    break;
                default:
                    console.log('Unknown button item pressed.');
                    break;
            }
        });

	}, 1000);
}

function updateProgress()
{
    $('li b').each(function(index, element){
        var magnetURI = $(this).attr('id');
        var torrent = client.get(magnetURI);
        if (torrent)
            $(this).text(torrent.progress * 100 + '%');
        else
            console.log('No torrent found.');
    });
}

$('#markdownCheckbox').click(function(){
	console.log("Checkbox val is " + $(this).is(':checked') );
	if ($(this).is(':checked')) {
		file.getBuffer(function (err, buffer) {
  		  if (err) throw err
  		  $('#downloadOutput').html(markdown.toHTML(buffer.toString('utf8')));
  	  });
  } else {
	  $('#downloadOutput').html("");
	  file.appendTo('#downloadOutput');
  }
});

$('#downloadOpen').click(function(){
	$('#downloadModal').modal();
});

$('#download').click(function(){
	var uri = $('#downloadURI').val();

	// Unhide the download spinner
	$('#downloadSpinner').removeClass('hidden');

	$.bootstrapGrowl("When finished, your paste will be in the output box below", {type: 'success'});
	client.add(uri, function (torrent) {
		// Hide the download spinner
		$('#downloadSpinner').addClass('hidden');

		// Unhide the 'parse markdown' toggle
		$('#markdownToggleContainer').removeAttr('hidden');

	  // Torrents can contain many files. Let's use the first.
	  file = torrent.files[0];
	  // Render text to markdown, then send to DOM
	  file.getBuffer(function (err, buffer) {
		  if (err) throw err
		  $('#downloadOutput').html(markdown.toHTML(buffer.toString('utf8')));
	  });

	  downloadsRefresh();
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
	  file = torrent.files[0];

	  // Display the file by adding it to the DOM.
	  // Supports video, audio, image files, and more!
	  file.getBuffer(function (err, buffer) {
		  if (err) throw err
		  $('#downloadOutput').html(markdown.toHTML(buffer.toString('utf8')));
	  });
	});
}

// Update torrent progress every second
setInterval(function(){
    updateProgress();
},1000);

