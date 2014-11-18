Ext.define('touchcontrol.controller.musicArtistList', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            musicArtist: 'musicContainer',
            musicArtistList: 'musicContainer artistList',
            navMusicLibary: '#navMusicLibary',
            navMusicLibaryInfo: '#navMusicLibaryInfo',
            navArtistInfoImage: '#artistInfoImage',
            navArtistInfoBio: '#artistInfoBio'
        },
        control: {
            musicArtistList: {
                itemtap: 'onArtistTap',
                disclose: 'onArtistDisclose'
            },
            navMusicLibary: {
                pop: 'onArtistBackButton'
            }
        }
    },
    onArtistBackButton: function (view, record, target) {
        var temp = Ext.getCmp('navMusicLibaryInfo');

        if (record.config.title.search('Songs:') != -1) {
            temp.setActiveItem(2);
        } else if (record.config.title.search('Albums:') != -1) {
            temp.setActiveItem(1);
        } else if (record.config.title.search('Artists:') != -1) {
            temp.setActiveItem(0);
        } else {
            temp.setActiveItem(0);
        }
    },
    onArtistTap: function (list, idx, el, record, e) {
        var temp = this.getMusicArtistList();
        if (e.getTarget('div.x-list-disclosure')) {
            return null;
        }
        if (e.target.className == "playlistEntry") {
            if (Ext.getCmp('localSelect').getValue() == 'Local') {
                addArtistToLocalPlaylist(record, "NoPlay");
            } else {
                addArtistToPlaylist(record);
            }
            return null;
        }

        if (e.target.className == "playEntry") {
            if (Ext.getCmp('localSelect').getValue() == 'Local') {
                addArtistToLocalPlaylist(record, "Play");
            } else {
                playArtist(record);
            }
            return null;
        }
        handleArtistRowClick(record);
        var temp = this.getNavMusicLibary();
        var tempString = 'Albums: ' + record.data.artist;
        temp.push({
            layout: 'fit',
            title: tempString,
            items: [
            {
                xtype: 'albumList',
                scrollable: true,
                itemId: 'navAlbumList',
                style: 'background-color: black',
                store: 'musicAlbums'
            }]
        });
        var temp = Ext.getCmp('navMusicLibaryInfo');
        temp.setActiveItem(1);
    },
    onArtistDisclose: function (view, record, target, index, event) {
        addArtistToPlaylist(record);
    }
});


function playArtist(record) {

    if (currentPlayer == undefined || currentPlayer == null) {
        return;
    }

    var obj = {
        "jsonrpc": "2.0",
        "method": "Player.Open",
        "params": {
            "item": {
                "artistid": record.data.id
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


function fillstoreAlbum(t) {
    var i = 0;
    var tempStart = 0;
    var tempSongCount = 0;
    var tempString;
    var imgSrc;

    musicAlbum = [];
    musicLibrary = [];

    var response = Ext.decode(t.responseText);

    var previousAlbumEntry = "XXXXXXXX";
    var musicAlbumCount = 0;

    storeMusicAlbum.removeAll();

    for (i = 0; i < response.result.limits.total; i++) {

        if (response.result.albums[i].label != previousAlbumEntry) {

            if (response.result.albums[i].thumbnail == "" || response.result.albums[i].thumbnail == "http://localhost:8080/image/") {
                tempString = encodeURIComponent("/resources/images/defaultAlbumCover.png");
                imgSrc = "/resources/images/defaultAlbumCover.png";
            } else {
                tempString = encodeURIComponent(response.result.albums[i].thumbnail);
                imgSrc = "http://" + hostAddress + "/image/" + tempString;
            }

            musicAlbum[musicAlbumCount] = Ext.create('touchcontrol.model.musicAlbum', {
                id: response.result.albums[i].albumid,
                album: response.result.albums[i].label,
                playcount: response.result.albums[i].playcount,
                thumbnail: imgSrc,
                year: response.result.albums[i].year
            });

            musicAlbumCount++;
        }
        previousAlbumEntry = response.result.albums[i].label;

    }

    storeMusicAlbum.add(musicAlbum);

    var paramsObj = {};

    if (genreIDSelected == -1)
        if (artistIDSelected == -1)
            paramsObj = { "properties": ["genre", "artist", "album", "file", "title", "duration", "thumbnail", "fanart"] };
        else
            paramsObj = { "filter": { "artistid": artistIDSelected }, "properties": ["genre", "artist", "album", "file", "title", "duration", "thumbnail", "fanart"] };
    else
        paramsObj = { "filter": { "artistid": artistIDSelected }, "properties": ["genre", "artist", "album", "file", "title", "duration", "thumbnail", "fanart"] };

    var obj = {
        "jsonrpc": "2.0",
        "method": "AudioLibrary.GetSongs",
        "params": paramsObj,
        "id": "getSongs"
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: gatherSongs,
        failure: getMusicLibFailure,
        timeout: interfaceTimeout
    });

}

function handleArtistRowClick(record) {

    artistSelected = record.data.artist; //OK, we have our record
    artistIDSelected = record.data.id;

    var obj = {
        "jsonrpc": "2.0",
        "method": "AudioLibrary.GetArtistDetails",
        "params": {
            "artistid": artistIDSelected,
            "properties": [
                "instrument",
                "style",
                "mood",
                "born",
                "formed",
                "description",
                "genre",
                "died",
                "disbanded",
                "yearsactive",
                "musicbrainzartistid",
                "fanart",
                "thumbnail"
            ]
        },
        "id": "getArtistDetails"
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: fillArtistInfo,
        failure: getMusicLibFailure,
        timeout: interfaceTimeout
    });
}

function fillArtistInfo(t) {
    var response = Ext.decode(t.responseText);

    var record = storeMusicArtist.findRecord('id', response.result.artistdetails.artistid);
    if (record != null) {

        record.data.instrument = response.result.artistdetails.instrument;
        record.data.style = response.result.artistdetails.style;
        record.data.mood = response.result.artistdetails.mood;
        record.data.born = response.result.artistdetails.born;
        record.data.formed = response.result.artistdetails.formed;
        record.data.description = response.result.artistdetails.description;
        record.data.genre = response.result.artistdetails.genre;
        record.data.died = response.result.artistdetails.died;
        record.data.disbanded = response.result.artistdetails.disbanded;
        record.data.yearsactive = response.result.artistdetails.yearsactive;
        record.data.musicbrainzartistid = response.result.artistdetails.musicbrainzartistid;


        var tempCmp = Ext.getCmp('artistInfoImage');
        var tempImage = record.data.fanart
        if (tempImage == "" || tempImage == "http://localhost:8080/image/") {
            tempImage = record.data.thumbnail;
        }
        if (tempImage == "" || tempImage == "http://localhost:8080/image/") {
            tempImage = 'resources/images/defaultAlbumCover.png';
        }
        tempCmp.setSrc(tempImage);

        tempCmp = Ext.getCmp('artistInfoBio');
        var bio = 'Formed: ' + record.data.formed + '\r\n';
        bio += 'Genre: ' + record.data.genre + '\r\n\n';
        bio += record.data.description;
        tempCmp.setValue(bio);

        //        tempCmp = Ext.getCmp('artistInfoName');
        //        tempCmp.setValue(record.data.artist);
    }

    getAlbumsOfArtist();
}

function getAlbumsOfArtist() {

    var paramsObj = {};

    if (genreIDSelected == -1)
        if (artistIDSelected == -1)
            paramsObj = {};
        else
            paramsObj = { "filter": { "artistid": artistIDSelected }, "properties": ["thumbnail", "playcount", "year"] };
    else
        if (artistIDSelected == -1)
            paramsObj = { "filter": { "genreid": genreIDSelected }, "properties": ["thumbnail", "playcount", "year"] };
        else
            paramsObj = { "filter": { "artistid": artistIDSelected }, "properties": ["thumbnail", "playcount", "year"] };

    var obj = {
        "jsonrpc": "2.0",
        "method": "AudioLibrary.GetAlbums",
        "params": paramsObj,
        "id": "getAlbums"
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: fillstoreAlbum,
        failure: getMusicLibFailure,
        timeout: interfaceTimeout
    });
}

function gatherSongs(t) {
    var i = 0;
    var tempMusicLibrary = [];
    var temp = [];
    var index = 0;

    var response = Ext.decode(t.responseText);

    musicLibrary = [];

    for (i = 0; i < response.result.limits.total; i++) {
        musicLibrary[i] = new Array(response.result.songs[i].songid,
                                    response.result.songs[i].artist,
                                    response.result.songs[i].album,
                                    response.result.songs[i].title,
                                    response.result.songs[i].thumbnail,
                                    response.result.songs[i].fanart,
                                    response.result.songs[i].file
        );
    }
    if (genreIDSelected != -1 && artistIDSelected == -1) {
        storeMusicSongs.add(musicLibrary);
    }
}
