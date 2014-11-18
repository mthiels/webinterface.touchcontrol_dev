var storeMusicGenre = null;
var storeMusicArtist = null;
var storeMusicAlbum = null;
var storeMusicSongs = null;

var entryMaxAmmount = 100;
var genreIDSelected = 0;
var artistIDSelected = 0;
var albumIDSelected = 0;
var musicLibrary = [];

var myMask = null;



Ext.define('touchcontrol.controller.musicGenreList', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            musicContainer: 'musicContainer',
            navMusicLibary: '#navMusicLibary',
            main: 'mainpanel',
            musicGenre: 'musicContainer',
            musicGenreList: 'musicContainer genreList'
        },
        control: {
            musicGenreList: {
                itemtap: 'onMusicGenreTap',
                disclose: 'onDisclose'
            },
            'viewport': {
                //capture the orientation change event
                orientationchange: 'onOrientationchange'
            }
        }
    },

    onOrientationchange: function (viewport, orientation, width, height) {
        var tempCmp = Ext.getCmp('musicContainer');

        console.log('Viewport orientation just changed');
        if (orientation == "landscape") {
            tempCmp.getLayout().setOrient('horizontal');
        } else {
            tempCmp.getLayout().setOrient('vertical');
        }

        //        Ext.Msg.alert("Orientation",orientation);
    },
    onDisclose: function (view, record, target, index, event) {
        addGenreToPlaylist(record);
        //        Ext.Msg.alert('Disclose', 'More info for ' + record.get('name'), Ext.emptyFn);
    },
    onMusicGenreTap: function (list, idx, el, record, e) {
        if (e.getTarget('div.x-list-disclosure')) {
            return null;
        }
        //        Ext.Msg.alert('Tap', 'More info for ' + record.get('name'), Ext.emptyFn);
        handleGenreRowClick(record);
        var temp = this.getNavMusicLibary();
        //        temp.setActiveItem(1);
        var tempString = 'Artists: ' + record.data.genre;
        temp.push({
            layout: 'fit',
            title: tempString,
            //            ui: 'plain',
            //            iconMask: true,
            id: 'musicArtists',
            items: [
            {
                xtype: 'artistList',
                scrollable: true,
                itemId: 'navArtistList',
                style: 'background-color: black',
                store: 'musicArtists',
                //                grouped: true ,
                indexBar: true /*,
                onItemDisclosure: true */
            }]
        });
        var temp = Ext.getCmp('navMusicLibaryInfo');
        temp.setActiveItem(0);
    }
});


function handleGenreRowClick(record) {

    genreSelected = record.data.genre; //OK, we have our record
    genreIDSelected = record.data.id;


    if (genreSelected == 'All') {
        var obj = {
            "jsonrpc": "2.0",
            "method": "AudioLibrary.GetArtists",
            "params": { "limits": { "end": entryMaxAmmount, "start": 0 }, "properties": ["thumbnail", "fanart", "description"] },
            "id": "libArtistsAll"
        };
    } else {
        var obj = {
            "jsonrpc": "2.0",
            "method": "AudioLibrary.GetArtists",
            "params": { "filter": { "genreid": genreIDSelected }, "limits": { "end": entryMaxAmmount, "start": 0 }, "properties": ["thumbnail", "fanart", "description"] },
            "id": "libArtists"
        };

    }

    Ext.getCmp('musicContainer').setMasked(true);
    storeMusicArtist.removeAll();

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: fillstoreArtist,
        failure: getMusicLibFailure,
        timeout: interfaceTimeout
    });

}

function getMusicLibFailure(t) {
    var response = Ext.decode(t.responseText);
    alert('getMusicLibFailure t:' + response);
}

function fillstoreArtist(t) {
    var i = 0;
    var musicArtistTemp = [];
    var tempString;
    var imgSrc;
    var imgFanartSrc;

    var response = Ext.decode(t.responseText);

    var musicArtistCount = response.result.limits.end - response.result.limits.start;

    if (response.result != null) {

        for (i = 0; i < musicArtistCount; i++) {

            if (response.result.artists[i].thumbnail == "" || response.result.artists[i].thumbnail == "http://localhost:8080/image/") {
                tempString = encodeURIComponent("/resources/images/defaultAlbumCover.png");
                imgSrc = "/resources/images/defaultAlbumCover.png";
            } else {
                tempString = encodeURIComponent(response.result.artists[i].thumbnail);
                imgSrc = "http://" + hostAddress + "/image/" + tempString;
            }

            tempString = encodeURIComponent(response.result.artists[i].fanart);
            imgFanartSrc = "http://" + hostAddress + "/image/" + tempString;


            musicArtistTemp[i] = Ext.create('touchcontrol.model.musicArtist', {
                id: response.result.artists[i].artistid,
                artist: response.result.artists[i].label,
                description: response.result.artists[i].description,
                thumbnail: imgSrc,
                fanart: imgFanartSrc
            });
        }


        storeMusicArtist.add(musicArtistTemp);
    }

    if (response.result.limits.end >= response.result.limits.total) {

        storeMusicAlbum.removeAll();
        storeMusicSongs.removeAll();
        Ext.getCmp('musicContainer').setMasked(false);

    } else {
        var tempNum = (response.result.limits.end / response.result.limits.total);

        var tempString = "Loading..." + (tempNum * 100).toFixed(0) + "%";
        Ext.getCmp('musicContainer').getMasked().setMessage(tempString);
        tempNum = response.result.limits.total - response.result.limits.end;
        if (tempNum > entryMaxAmmount)
            tempNum = entryMaxAmmount;
        var tempStart = response.result.limits.end;
        var tempEnd = response.result.limits.end + tempNum;

        if (genreIDSelected == -1) {
            var obj = {
                "jsonrpc": "2.0",
                "method": "AudioLibrary.GetArtists",
                "params": { "limits": { "end": tempEnd, "start": tempStart }, "properties": ["thumbnail", "fanart", "description"] },
                "id": "getArtistsAll"
            };
        } else {
            var obj = {
                "jsonrpc": "2.0",
                "method": "AudioLibrary.GetArtists",
                "params": { "filter": { "genreid": genreIDSelected }, "limits": { "end": tempEnd, "start": tempStart }, "properties": ["thumbnail", "fanart", "description"] },
                "id": "getArtists"
            };

        }

        tempStr = Ext.encode(obj);
        Ext.Ajax.request({
            url: '/jsonrpc',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params: tempStr,
            success: fillstoreArtist,
            failure: getMusicLibFailure,
            timeout: interfaceTimeout
        });
    }
}


function InitializeMusicLib() {

    var obj = {
        "jsonrpc": "2.0",
        "method": "AudioLibrary.GetGenres",
        "id": 1
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: getMusicLibGenreSuccess,
        failure: getMusicLibGenreFailure,
        timeout: interfaceTimeout
    });


}

function getMusicLibGenreFailure(t) {
    alert('getMusicLibGenreFailure t:' + t);
}

function getMusicLibGenreSuccess(t) {
    var musicGenreTemp = [];
    var musicGenreCount = 0;

    var response = Ext.decode(t.responseText);
    var responseCount = 0;

    if (response.result != null)
        responseCount = response.result.limits.total;

    responseGenres = response.result.genres;

    musicGenreCount = 0;

    storeMusicGenre.removeAll();

    for (i = 0; i < responseCount; i++) {

        musicGenreTemp[musicGenreCount] = new Array(responseGenres[i].genreid, responseGenres[i].label);
        musicGenreCount++;
    }

    musicLibraryGenreTotalCount = musicGenreCount;

    storeMusicGenre.add(musicGenreTemp);
    Ext.getCmp('musicContainer').setMasked(false);

}
