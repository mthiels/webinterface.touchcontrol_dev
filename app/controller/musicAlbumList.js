Ext.define('touchcontrol.controller.musicAlbumList', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            musicAlbum: 'musicContainer',
            musicAlbumList: 'musicContainer albumList',
            navMusicLibary: '#navMusicLibary',
            navMusicLibaryInfo: '#navMusicLibaryInfo',
            navAlbumInfoImage: '#albumInfoImage',
            navAlbumInfoBio: '#albumInfoBio'
        },
        control: {
            musicAlbumList: {
                itemtap: 'onAlbumTap',
                disclose: 'onAlbumDisclose'
            },            
            musicAlbumBack: {
                tap: 'onAlbumBackButton'
            }
        }
    },
    onAlbumBackButton: function () {
        var temp = Ext.getCmp('navMusicLibaryInfo');
        temp.setActiveItem(1);
    },
    onAlbumTap: function (list, idx, el, record, e) {
        if (e.getTarget('div.x-list-disclosure')) {
            return null;
        }
        if (e.target.className == "playlistEntry") {
            if (Ext.getCmp('localSelect').getValue() == 'Local') {
                addAlbumToLocalPlaylist(record, "NoPlay");
            } else {
            addAlbumToPlaylist(record);
            }
            return null;
        }

        if (e.target.className == "playEntry") {
            if (Ext.getCmp('localSelect').getValue() == 'Local') {
                addAlbumToLocalPlaylist(record, "Play");
            } else {
            playAlbum(record);
            }
            return null;
        }
        handleAlbumRowClick(record);
        var temp = this.getNavMusicLibary();
        var tempString = 'Songs: ' + record.data.album;
        temp.push({
            layout: 'fit',
            title: tempString,
            items: [
            {
                xtype: 'songList',
                scrollable: true,
                itemId: 'navSongList',
                style: 'background-color: black',
                store: 'musicSongs',
                listeners: {
                    pop: function (view, eOpts) {
                        var temp = view;
                    }
                }
            }]
        });
        var temp = Ext.getCmp('navMusicLibaryInfo');
        temp.setActiveItem(2);

    },

    onAlbumDisclose: function (view, record, target, index, event) {
        addAlbumToPlaylist(record);
    }
});


function playAlbum(record) {

    if (currentPlayer == undefined || currentPlayer == null) {
        return;
    }

    var obj = {
        "jsonrpc": "2.0",
        "method": "Player.Open",
        "params": {
            "item": {
                "albumid": record.data.id
            }
        },
        "id": "playAlbum"
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: playMusicSuccess,
        failure: playMusicFailure,
        timeout: interfaceTimeout
    });

}

function fillstoreSongs(songSelection) {

    var tempMusicLibrary = [];
    var musicSongCount = 0;

    storeMusicSongs.removeAll();

    for (var i = 0; i < musicLibrary.length; i++) {
        if (musicLibrary[i][2] == songSelection || songSelection == "All") {
            tempMusicLibrary[musicSongCount] = musicLibrary[i];
            musicSongCount++;
        }
    }
    storeMusicSongs.add(tempMusicLibrary);

}

function handleAlbumRowClick(record) {

    albumSelected = record.data.album; //OK, we have our record
    albumIDSelected = record.data.id;

    fillstoreSongs(albumSelected);

    var obj = {
        "jsonrpc": "2.0",
        "method": "AudioLibrary.GetAlbumDetails",
        "params": {
            "albumid": albumIDSelected,
            "properties": [
                "albumlabel",
                "description",
                "mood",
                "playcount",
                "style",
                "theme",
                "type",
                "artist",
                "artistid",
                "displayartist",
                "genreid",
                "musicbrainzalbumartistid",
                "musicbrainzalbumid",
                "rating",
                "title",
                "year",
                "genre",
                "fanart",
                "thumbnail"
            ]
        },
        "id": "getAlbumDetails"
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: fillAlbumInfo,
        failure: getMusicLibFailure,
        timeout: interfaceTimeout
    });
}

function fillAlbumInfo(t) {
    var response = Ext.decode(t.responseText);

    var data = response.result.albumdetails;

    var tempImage = data.thumbnail

    if (tempImage == "" || tempImage == "http://localhost:8080/image/") {
        tempImage = data.fanart;
    }
    if (tempImage == "" || tempImage == "http://localhost:8080/image/") {
        imgSrc = 'resources/images/defaultAlbumCover.png';
    }

    if (tempImage != "/resources/images/defaultAlbumCover.png") {
        tempString = encodeURIComponent(tempImage);
        imgSrc = "http://" + hostAddress + "/image/" + tempString;
    }

    var tempCmp = Ext.getCmp('albumInfoImage');
    tempCmp.setSrc(imgSrc);

    tempCmp = Ext.getCmp('albumInfoBio');
    var bio = 'Title: ' + data.title + '\r\n';
    if (data.year == 0) {
        bio += 'Artist: ' + data.displayartist + '\r\n';
    } else {
        bio += 'Artist: ' + data.displayartist + '\t' + "Year: " + data.year + '\r\n';
    }
    if (data.albumlabel != "") {
        bio += 'Label: ' + data.albumlabel + '\t';
    }
    bio += 'Genre: ' + data.genre + '\r\n';
    bio += data.description;
    tempCmp.setValue(bio);

}

