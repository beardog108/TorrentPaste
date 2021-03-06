/* Copyright (c) 2016, Kevin Froman (https://ChaosWebs.net) & Andrew Morgan (https://amorgan.xyz). MIT License */

// Detect if webrtc is not supported
if (WebTorrent.WEBRTC_SUPPORT == false)
{
    $('#webrtcError').css('display', 'block');
}

var client = new WebTorrent();
var file;
var password;
var plaintext;
var text;
var newTorrent;

window.pasteDecryptBuffer = '';

function detectEncrypted(pasteData)
{
	if (pasteData.includes('-----begin encrypted paste-----'))
	{
		$('#decryptArea').css('display', 'inline');
		$.bootstrapGrowl("This paste appears encrypted.", {type: 'warning'});
		window.pasteDecryptBuffer = pasteData.replace('-----begin encrypted paste-----', '');
		console.log(window.pasteDecryptBuffer);
	}
    else
    {
        $('#decryptArea').css('display', 'none');
    }
}

$('#decryptButton').click(function(){
	var password = $('#decryptPassword').val();
	var decrypted;
	if (password == '')
	{
		return false;
	}
    if ($('#markdownCheckbox').is(':checked')) {
        decrypted = CryptoJS.AES.decrypt($('#pasteOutput').data().orig.replace('-----begin encrypted paste-----', ''), password);
    }
    else
    {
	   decrypted = CryptoJS.AES.decrypt(window.pasteDecryptBuffer.toString(), password);
    }
	decrypted = decrypted.toString(CryptoJS.enc.Utf8);
	console.log(decrypted);
	if (decrypted == '')
	{
		$.bootstrapGrowl("Invalid password.", {type: 'danger'});
		return false;
	}
	else
	{
		$('#pasteOutput').html(sanitize(decrypted));
        $('#decryptArea').css('display', 'none');
         if ($('#markdownCheckbox').is(':checked')) {
        markdownCheck();
        }
	}

});

$('#encryptBox').change(function() 
{
	if($(this).is(':checked')) 
	{
		// Show unencrypted title disclaimer if the user hasn't seen it
		if (localStorage['titleDisclaimer'] == undefined)
		{
			$.bootstrapGrowl("Warning: Paste titles are not encrypted", {type: 'danger'});
			localStorage['titleDisclaimer'] = true;
		}

		$('#encryptPasswordArea').css('display', 'block');
	}
	else
	{
		$('#encryptPasswordArea').css('display', 'none');
	}
});

$('#createPaste').click(function(){
	if ($('#text').val() == '')
	{
		$.bootstrapGrowl("You need text to paste!", {type: 'danger'});
		return false;
	}
	else
	{
		text = $('#text').val();
	}

	if ($('#encryptBox').is(':checked'))
	{
		if ($('#encryptPassword').val() == '')
		{
			$.bootstrapGrowl("You must specify a password!", {type: 'danger'});
			return false;
		}
		else
		{
			password = $('#encryptPassword').val();
			text = CryptoJS.AES.encrypt(text, password);
			text = '-----begin encrypted paste-----' + text;
			$('#text').val(text);
		}
	}
	var parts = [
	  new Blob([text], {type: 'text/markdown'}),
	];

	// Construct a file
	var fileName = $('#name').val();
    if (!fileName){fileName = "Unnamed";}
	file = new File(parts, fileName, {
	    type: "text/markdown"
	});

	var fr = new FileReader();

	fr.onload = function(evt){
		client.seed(file, function (torrent) {
    		console.log('Client is seeding ' + torrent.magnetURI);
            $('#uriOutput').val(torrent.magnetURI);

            $('#shareLink').val(document.location.href + '#' + torrent.infoHash);

    		$('#ready').modal();

            $('#text').val(`# Title Here
-------------------------------`);
            $('#name').val('');
 		});
	}

	fr.readAsText(file);

	// Refresh downloads container
	downloadsRefresh();

    // Unhide downloadsPanel
    $('#downloadsPanel').css('display', 'block');

	return false;
});

$('#createMagnetCopy').click(function() {
    var clipboard = new Clipboard('#createMagnetCopy');

    $.bootstrapGrowl("Magnet URI copied to clipboard!", {type: 'success'});
});

$('.modal-footer button').click(function() {
    // Uncheck all checkboxes on modal close
    if ($('#highlightCheckbox').is(':checked')) 
        $('#highlightCheckbox').click();  
    if ($('#markdownCheckbox').is(':checked')) 
        $('#markdownCheckbox').click();  
});

$('#createShareCopy').click(function() {
    var clipboard = new Clipboard('#createShareCopy');
    $.bootstrapGrowl("Share link copied to clipboard!", {type: 'success'});
});

$('#refreshButton').click(function(){
	// Spin refresh button
	$('#refreshButton').addClass('fa-spin');

	downloadsRefresh();
});

function downloadsRefresh(){
	// Allow client object time to update torrent list
	setTimeout(function(){
		// Stop spinning refresh
		$('#refreshButton').removeClass('fa-spin');

		// List active torrents
		var count = 0;
		var torrent;
        var html = "";
		while (torrent = client.torrents[count]) {
            var progress = '<b class="torrentProgress" id="' + torrent.magnetURI + '">0%</b>';
            var name = torrent.files[0].name;
            var peers = '<b id="peers">Peers: </b><span id="peers-text">' + torrent.numPeers + '</span>';
            //var ratio = '<b id="ratio">R: </b><span id="ratio-text">' + torrent.ratio.toFixed(2) + '</span>';
            html += `
<li class="list-group-item">
    <div class="row">
        <div class="col-xs-6 truncated-text">` + progress + `   ` + name + 
            `<div id="stats" class="row">
                <div class="col-xs-1">` + peers + `</div>
                <div class="col-xs-1">` + /*ratio + */ `</div>
            </div>
        </div>
        <div class="col-xs-6"><span class="pull-right">
            <div id="` + count  + `" class="btn-group" role="group" aria-label="">
                <button type="button" class="btn btn-sm btn-primary">
                  <i class="fa fa-eye" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-sm btn-default" data-clipboard-action="copy" data-clipboard-text="` + document.location.href + '#' + torrent.infoHash + `">
                  <i class="fa fa-link" aria-hidden="true"></i>
                </button>
                <button id = "magnet" type="button" class="btn btn-sm btn-default" data-clipboard-action="copy" data-clipboard-text="` + torrent.magnetURI + `">
                  <i class="fa fa-magnet" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-sm btn-default">
                  <i class="fa fa-download" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-sm btn-danger">
                  <i class="fa fa-pause-circle" aria-hidden="true"></i>
                </button>
                <button type="button" class="btn btn-sm btn-default">
                  <i class="fa fa-close" aria-hidden="true"></i>
                </button>
            </div>
        </span>
        </div>
    </div>
</li>
            `;
			count++;
		}
        // Can mess with VimFX
        // If they select links and then html refreshs, removing their links
        $('#downloadsPanelList').html(html);

        $('.close').click(function(){
            $(this).attr('id');
        });
        $('.btn-group button').click(function(){
            // Find out which button was pressed
            var classesList = $(this).find('i').attr('class').split(/\s+/);
            var id = $(this).parent().attr('id');
            var torrent = client.torrents[id];
            switch(classesList[1]) {
                case 'fa-eye':
                    showPaste(torrent);
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
                case 'fa-close':
                    // Remove torrent from client
                    torrent.destroy();
                    downloadsRefresh();

                    // Torrent is undefined
                    $(this).parents('.list-group-item').remove();

                    // Hide downloads panel if there are no downloads
                    if (client.torrents.length == 0)
                        $('#downloadsPanel').css('display', 'none');

                    break;
                default:
                    console.log('Unknown button item pressed.');
                    break;
            }
        });
	}, 1000);
}

function sanitize(content)
{
    return String(content).replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function unSanitize(content)
{
    return String(content).replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}


function showPaste(torrent)
{
    file = torrent.files[0];
        
    file.getBuffer(function (err, buffer) {
        if (err) throw err
        buffer = sanitize(buffer.toString('utf8'));
        $('#pasteOutput').html(buffer);
        detectEncrypted(buffer.toString('utf8'));
    });

    $('#showModal').modal();
}

function updateProgress()
{
    $('.torrentProgress').each(function() {
        var magnetURI = $(this).attr('id');
        var torrent = client.get(magnetURI);
        var downloadContainer = $(this).parents('.row');
        if (torrent){
            $(this).text(torrent.progress * 100 + '%');
            downloadContainer.find('#peers-text').text(torrent.numPeers);
            downloadContainer.find('#ratio-text').text(torrent.ratio.toFixed(2));
        }
        else
            console.log(magnetURI + ' not found.');
    });
}

$('#markdownCheckbox').click(function(){
    markdownCheck();
});

$('#highlightCheckbox').click(function(){
    highlightCheck();
})

function markdownCheck()
{
 if ($('#markdownCheckbox').is(':checked')) {
        if ($('#highlightCheckbox').is(':checked')) { $('#highlightCheckbox').click();  }
        var data = unSanitize($('#pasteOutput').html());
        $('#pasteOutput').css('white-space', 'normal');
        $('#pasteOutput').data('orig', data);
        var markdownResult = markdown.toHTML(data);
        $('#pasteOutput').html(markdownResult);
        detectEncrypted(markdownResult);
  } 
  else {
    var orig = sanitize($('#pasteOutput').data().orig);
    $('#pasteOutput').html(orig);
    $('#pasteOutput').css('white-space', 'pre');
    detectEncrypted(orig);
  }
}

function highlightCheck()
{
    /*          $('#pasteOutput').each(function(i, block) {
            hljs.highlightBlock(block);
          });*/
 if ($('#highlightCheckbox').is(':checked')) {
    if ($('#markdownCheckbox').is(':checked')) { $('#markdownCheckbox').click();  }
        var data = $('#pasteOutput').html();
        //$('#pasteOutput').css('white-space', 'normal');
        $('#pasteOutput').data('orig', data);
    $('#pasteOutput').each(function(i, block) {
            hljs.highlightBlock(block);
    });
  } 
  else {
    var orig = $('#pasteOutput').data().orig;
    $('#pasteOutput').html(orig);
    $('#pasteOutput').css('white-space', 'pre');
    detectEncrypted(orig);
  }
}


$('#downloadOpen').click(function(){
    // Make sure download paste button is showing
    $('#download').show();
    $('#downloadURILabel').show();

	$('#downloadModal').modal();
	$('#download').css('display', 'inline');
});

$('#download').click(function(){

    var uri = $('#downloadURI').val();

    if (uri.substring(0, 20) != "magnet:?xt=urn:btih:") {
        $.bootstrapGrowl("That is an invalid magnet link.", {type: 'danger'});
        return false;
    }

    // Unhide downloadsPanel
    $('#downloadsPanel').css('display', 'block');

	// Unhide the download spinner
	$('#downloadSpinner').removeClass('hidden');

	$.bootstrapGrowl("When finished, your paste will be in the output box below", {type: 'success'});

	client.add(uri, function (torrent) {
		// Hide the download spinner
		$('#downloadSpinner').addClass('hidden');


	  // Torrents can contain many files. Let's use the first.
	  file = torrent.files[0];
	  // Render text to markdown, then send to DOM
	  file.getBuffer(function (err, buffer) {
		  if (err) throw err
		  showPaste(torrent);
          $('#downloadModal').modal('hide');
          $('#downloadURI').val('');
	  });

	  downloadsRefresh();
	});
});

$('form').on('submit', function(){
	return false;
});

function showModalSpinner(state)
{
    if (state)
    {
        $('#showModalMain').css('display', 'none');
        $('#showModalSpinner').css('display', 'block');
    }
    else
    {
        $('#showModalMain').css('display', 'block');
        $('#showModalSpinner').css('display', 'none');
    }
}

if(window.location.hash) {
    var windowHash = window.location.hash.replace('#', '');
	$.bootstrapGrowl("Your paste is now downloading.", {type: 'success'});

	var uri = 'magnet:?xt=urn:btih:' + windowHash + '&dn=paste.txt&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io';

    $('#showModal').modal();
    showModalSpinner(true);

	client.add(uri, function (torrent) {
        // Hide download spinner
        $('#downloadSpinner').addClass('hidden');
        downloadsRefresh();

      file = torrent.files[0];
      file.getBuffer(function (err, buffer) {
          if (err) throw err
          showPaste(torrent);
          showModalSpinner(false);
          $('#downloadModal').modal('hide');
          $('#downloadURI').val('');
          $.bootstrapGrowl("Download finished", {type: 'success'});
          // Unhide downloadsPanel
          $('#downloadsPanel').css('display', 'block');
          // Show download spinner
          $('#downloadSpinner').removeClass('hidden');
      });
	});
}

// Update torrent progress every second
setInterval(function(){
    updateProgress();
},1000);