Ext.define('touchcontrol.controller.musicSearchList', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            musicContainer: 'musicContainer',
            navMusicLibary: '#navMusicLibary',
            main: 'mainpanel',
            musicSearchButton: '#musicSearchButton',
            startSearchButton: 'musicContainer searchButton',
            musicSearchList: 'musicContainer musicSearchList'

        },
        control: {
            musicSearchList: {
                itemtap: 'onMusicSearchTap',
                disclose: 'onSearchDisclose'
            },
            musicSearchButton: {
                tap: 'onMusicSearch'
            },
            startSearchButton: {
                tap: 'onStartMusicSearch',
                itemtap: 'onStartMusicSearch'
            }

        }
    },
    onSearchDisclose: function (view, record, target, index, event) {
    },
    onMusicSearchTap: function (list, idx, el, record, e) {
        if (e.getTarget('div.x-list-disclosure')) {
            return null;
        }
        if (e.target.className == "playEntry") {
            if (Ext.getCmp('localSelect').getValue() == 'Local') {
                if (record.data.type == "Artist") {
                    addArtistToLocalPlaylist(record, "Play");
                } else if (record.data.type == "Album") {
                    addAlbumToLocalPlaylist(record, "Play");
                } else {
                    addSongToLocalPlaylist(record, "Play");
                }
            } else {
                if (record.data.type == "Artist") {
                    playArtist(record);
                } else if (record.data.type == "Album") {
                    playAlbum(record);
                } else {
                    playSong(record);
                }

            }
            return null;
        }
        if (e.target.className == "playlistEntry") {
            if (Ext.getCmp('localSelect').getValue() == 'Local') {
                if (record.data.type == "Artist") {
                    addArtistToLocalPlaylist(record, "NoPlay");
                } else if (record.data.type == "Album") {
                    addAlbumToLocalPlaylist(record, "NoPlay");
                } else {
                    addSongToLocalPlaylist(record, "NoPlay");
                }
            } else {
                if (record.data.type == "Artist") {
                    addArtistToPlaylist(record);
                } else if (record.data.type == "Album") {
                    addAlbumToPlaylist(record);
                } else {
                    addSongToPlaylist(record);
                }
            }
            return null;
        }

    },
    onMusicSearch: function (view, record, target, index) {
        var temp = this.getNavMusicLibary();
        var originalSearchItem = temp.getActiveItem().id;

        temp.push({
            layout: 'hbox',
            title: 'Music Search',
            id: 'musicSearch',
            style: 'background-color: black; color: white',
            items: [
            {
                items: [
                {
                    xtype: 'textfield',
                    label: 'Song',
                    id: 'SongString',
                    clearIcon: false
                }, {
                    xtype: 'textfield',
                    id: 'ArtistString',
                    label: 'Artist',
                    clearIcon: false
                }, {
                    xtype: 'textfield',
                    label: 'Album',
                    id: 'AlbumString',
                    clearIcon: false
                }, {
                    xtype: 'searchButton',
                    id: 'startMusicSearchButton'
                }
                ]
            }
            ]
        });
    },
    onStartMusicSearch: function () {
        var temp = this.getNavMusicLibary();

        var tempString = 'Search: ';
        temp.push({
            layout: 'fit',
            title: tempString,
            id: 'searchResults',
            items: [
            {
                xtype: 'musicSearchList',
                scrollable: true,
                itemId: 'navSearchList',
                style: 'background-color: black',
                store: 'musicSearches'
            }]
        });
        temp = Ext.getCmp('navMusicLibaryInfo');
        temp.setActiveItem(2);

        var tempArtist = Ext.getCmp('ArtistString').getValue();
        var tempSong = Ext.getCmp('SongString').getValue();
        var tempAlbum = Ext.getCmp('AlbumString').getValue();
        if (tempSong != "") {
            successFunction = searchSongSuccess;
            methodString = "GetSongs";
            paramsObj = { "properties": ["artist", "album", "title", "file"], "filter": { "and": [{ "field": "artist", "operator": "contains", "value": tempArtist }, { "field": "album", "operator": "contains", "value": tempAlbum }, { "field": "title", "operator": "contains", "value": tempSong }] } };
        } else if (tempAlbum != "") {
            successFunction = searchAlbumSuccess;
            methodString = "GetAlbums";
            paramsObj = { "properties": ["artist", "thumbnail"], "filter": { "and": [{ "field": "artist", "operator": "contains", "value": tempArtist }, { "field": "album", "operator": "contains", "value": tempAlbum }] } };
        } else if (tempArtist != "") {
            methodString = "GetArtists";
            successFunction = searchArtistSuccess;
            paramsObj = { "properties": ["thumbnail"], "filter": { "field": "artist", "operator": "contains", "value": tempArtist } };
        } else return;

        var obj = {
            "jsonrpc": "2.0",
            "method": "AudioLibrary." + methodString,
            "params": paramsObj,
            "id": 1
        };

        tempStr = Ext.encode(obj);
        Ext.Ajax.request({
            url: '/jsonrpc',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params: tempStr,
            success: successFunction,
            failure: searchMusicFailure,
            timeout: interfaceTimeout
        });
    }
});


function searchMusicFailure(t) {
    alert('buttonClearPlayListFailure failure t:' + t);
}

function searchSongSuccess(t) {
    var response = Ext.decode(t.responseText);

    var storeMusicSearch = Ext.getStore('musicSearches');

    searchLibrary = [];
    storeMusicSearch.removeAll();

    for (i = 0; i < response.result.limits.total; i++) {

        searchLibrary[i] = Ext.create('touchcontrol.model.musicSearch', {
            type: "Song",
            id: response.result.songs[i].songid,
            artist: response.result.songs[i].artist,
            album: response.result.songs[i].album,
            title: response.result.songs[i].label,
            thumbnail: "",
            location: response.result.songs[i].file
        });
    }

    storeMusicSearch.add(searchLibrary);

}

function searchAlbumSuccess(t) {
    var response = Ext.decode(t.responseText);

    var storeMusicSearch = Ext.getStore('musicSearches');

    searchLibrary = [];
    storeMusicSearch.removeAll();

    for (i = 0; i < response.result.limits.total; i++) {

        if (response.result.albums[i].thumbnail == "" || response.result.albums[i].thumbnail == "http://localhost:8080/image/") {
            tempString = encodeURIComponent("/resources/images/defaultAlbumCover.png");
            imgSrc = "/resources/images/defaultAlbumCover.png";
        } else {
            tempString = encodeURIComponent(response.result.albums[i].thumbnail);
            imgSrc = "http://" + hostAddress + "/image/" + tempString;
        }

        searchLibrary[i] = Ext.create('touchcontrol.model.musicSearch', {
            type: "Album",
            id: response.result.albums[i].albumid,
            artist: response.result.albums[i].artist,
            album: response.result.albums[i].label,
            title: "",
            thumbnail: imgSrc
        });

    }

    storeMusicSearch.add(searchLibrary);

}

function searchArtistSuccess(t) {
    var response = Ext.decode(t.responseText);

    var storeMusicSearch = Ext.getStore('musicSearches');

    searchLibrary = [];
    storeMusicSearch.removeAll();

    for (i = 0; i < response.result.limits.total; i++) {

        if (response.result.artists[i].thumbnail == "" || response.result.artists[i].thumbnail == "http://localhost:8080/image/") {
            tempString = encodeURIComponent("/resources/images/defaultAlbumCover.png");
            imgSrc = "/resources/images/defaultAlbumCover.png";
        } else {
            tempString = encodeURIComponent(response.result.artists[i].thumbnail);
            imgSrc = "http://" + hostAddress + "/image/" + tempString;
        }

        searchLibrary[i] = Ext.create('touchcontrol.model.musicSearch', {
            type:       "Artist",
            id:         response.result.artists[i].artistid,
            artist:     response.result.artists[i].label,
            album:      "",
            title:      "",
            thumbnail:  imgSrc
        });

    }

    storeMusicSearch.add(searchLibrary);

}
