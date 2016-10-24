class TorrentPaste extends ZeroFrame
    init: =>
        #@storeOffline "hey", "there", "bro"
        # Retrieve all torrents stored in the db
        @retrieveAllOffline "a"

    # Wrapper websocket connection ready
    onOpenWebsocket: (e) =>
        @cmd "serverInfo", {}, (server_info) =>
            #@log "serverInfo response: <pre>" + JSON.stringify(server_info,null,2) + "</pre>"
        @cmd "siteInfo", {}, (site_info) =>
            #@log "siteInfo response: <pre>" + JSON.stringify(site_info,null,2) + "</pre>"

    # Retrieves all the torrents in the db
    retrieveAllOffline: (a) =>
        @log "Retrieving data"
        @cmd "fileQuery", ["data.json", ""], (torrents) =>
            torrents.sort (a, b) => # Sort by date
                return a.added - b.added
            for torrent in torrents
                @log torrent.infoHash, torrent.infoHash.title, torrent.infoHash.content
                @insertIntoWebTorrent torrent

    # Inserts a given torrent json into webtorrent
    insertIntoWebTorrent: (t) =>
        @log "Inserting ", t

    # Stores a specific torrent in the db
    storeOffline: (infoHash, title, content, cb=null) =>
        # Encode to json, encode utf8
        torrentInfo =
            infoHash:
                "title"    : title
                "content"  : content
        json_raw = unescape(encodeURIComponent(JSON.stringify(torrentInfo), undefined, '\t'))

        # Convert to to base64 and send
        @cmd "fileWrite", ["data.json", btoa(json_raw)], (res) =>
            if res == "ok"
                @cmd "wrapperNotification", ["done", "Torrent stored offline successfully!"]
                if cb then cb(true)
            else
                @cmd "wrapperNotification", ["error", "File write error: #{res}"]
                if cb then cb(false)

window.Page = new TorrentPaste()
