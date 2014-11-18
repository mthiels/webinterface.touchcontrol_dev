var storeVideoPlaylist = null;
var storeLocalVideoPlaylist = null;


Ext.define('touchcontrol.controller.videoPlaylist', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            playingContainer: 'playlistsContainer',
            playlists: 'playlistsContainer videoPlaylistView',
            playlistsLocal: 'playlistsContainer localVideoPlaylistView',
            videoRefreshButton: '#videoRefreshButton',
            videoClearPlaylistButton: '#videoClearPlaylistButton'
        },
        control: {
            playlists: {
                itemtap: 'onPlaylistTap',
                disclose: 'onDisclose'
            },
            playlistsLocal: {
                itemtap: 'onPlaylistTap',
                disclose: 'onDisclose'
            },
            videoRefreshButton: {
                tap: 'onVideoRefreshButton'
            },
            videoClearPlaylistButton: {
                tap: 'onVideoClearPlaylistButton'
            }
        }
    },

    onPlaylistTap: function (list, idx, el, record, e) {
        if (e.target.className == "playRemove") {
            if (Ext.getCmp('localSelect').getValue() == 'Local') {
                removeMovieFromLocalPlaylist(idx);
            } else {
                removeFromPlayList(idx, "Video");
            }
            return null;
        }

        if (Ext.getCmp('localSelect').getValue() == 'Local') {
            playVideoOnLocal(record.data.location, record.data.thumbnail);
        } else {
            playSelectedItem(idx, "Video");
        }
    },

    onDisclose: function (view, record, target, index, event) {
        removeFromPlayList(index, "Video");
    },
    onVideoRefreshButton: function (view, record, target, index, event) {
        updatePlaylist("Video");
    },
    onVideoClearPlaylistButton: function (view, record, target, index, event) {
        clearPlayList("Video");
    }
});


function addMovieToPlaylist(record) {

    if (Ext.getCmp('localSelect').getValue() == 'Local') {
        AddMovieToLocalPlaylist(record);
        return;
    }
    obj = {
        "jsonrpc": "2.0",
        "method": "Playlist.Add",
        "params": {
            "playlistid": 1,
            "item": {
                "movieid": record.data.id
            }
        },
        "id": "addToVideoPlaylist"
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: xbmcAddFromDBCmdSuccess,
        failure: addToPlayListFailure,
        timeout: interfaceTimeout
    });

}

function addEpisodeToPlaylist(record) {

    var obj = {
        "jsonrpc": "2.0",
        "method": "Playlist.Add",
        "params": {
            "playlistid": 1,
            "item": {
                "episodeid": record.data.episodeid
            }
        },
        "id": "addEpisodeToPlaylist"
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: xbmcAddFromDBCmdSuccess,
        failure: addToPlayListFailure,
        timeout: interfaceTimeout
    });

}

function AddMovieToLocalPlaylist(record) {
    var tempPlaylist = [];
    var tempIndex = 0;
    var entry = null;
    for (i = 0; i < storeLocalVideoPlaylist.getCount() ; i++) {
        entry = storeLocalVideoPlaylist.getAt(i);
        tempPlaylist[tempIndex] = new Array(tempIndex,
                                        entry.data.name,
                                        entry.data.location,
                                        "",
                                        [],
                                        "",
                                        undefined,
                                        entry.data.thumbnail);
        tempIndex++;
    }

    storeLocalVideoPlaylist.removeAll();

    tempPlaylist[tempIndex] = new Array(tempIndex,
                                        record.data.title,
                                        record.data.file,
                                        "",
                                        [],
                                        "",
                                        undefined,
                                        record.data.thumbnail);

    storeLocalVideoPlaylist.add(tempPlaylist);
}

function removeMovieFromLocalPlaylist(index) {
    storeLocalVideoPlaylist.removeAt(index);
}



function addVideoShareToPlaylist(filetype, path) {
    if (filetype == 'directory') {
        var obj = {
            "jsonrpc": "2.0",
            "method": "Playlist.Add",
            "params": {
                "playlistid": 1,
                "item": {
                    "directory": path
                }
            },
            "id": "addToVideoPlaylist"
        };
    } else {
        var obj = {
            "jsonrpc": "2.0",
            "method": "Playlist.Add",
            "params": {
                "playlistid": 1,
                "item": {
                    "file": path
                }
            },
            "id": "addToVideoPlaylist"
        };
    }

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: xbmcAddFromDBCmdSuccess,
        failure: addToPlayListFailure,
        timeout: interfaceTimeout
    });
}

