var showPoster = null;
var seasonPoster = null;
var videoTVLibraryCount = 0;
var videoTVLibrary = [];
var videoTVSeason = [];
var videoTVEpisode = [];

var hideVideoExitButton = Ext.create('Ext.util.DelayedTask', function () {
        tempButton = Ext.getCmp('videoExitButton');
        tempButton.setHidden(true);
        hideVideoExitButton.cancel();
});

Ext.define('touchcontrol.controller.tvTitleList', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            navTvShowLibrary: '#navTvShowLibrary',
            videoTV: 'tvVideoContainer',
            tvMediaView: 'tvVideoContainer tvEpisodeList',
            main: 'mainpanel',
            tvShowList: 'tvTitleList',
            tvSeasonList: 'tvSeasonList',
            tvEpisodeList: 'tvEpisodeList',
            playEpisodeButton: '#playTVEpisodeButton',
            addEpisodeToPlaylistButton: '#addTVEpisodeToPlaylistButton'
        },
        control: {
            tvMediaView: {
                itemtap: 'onEpisodeTap',
                disclose: 'onDisclose'
            },
            tvShowList: {
                itemtap: 'onShowTap',
                disclose: 'onShowDisclose'
            },
            tvSeasonList: {
                itemtap: 'onSeasonTap',
                disclose: 'onSeasonDisclose'
            },
            tvEpisodeList: {
                itemtap: 'onEpisodeTap',
                disclose: 'onEpisodeDisclose'
            },
            navTvShowLibrary: {
                pop: 'onTvBackButton'
            },
            'viewport': {
                //capture the orientation change event
                orientationchange: 'onOrientationchange'
            },
            playEpisodeButton: {
                tap: 'onPlayTVEpisode',
                itemtap: 'onPlayTVEpisode'
            },
            addEpisodeToPlaylistButton: {
                tap: 'onAddTVEpisodeToPlaylist',
                itemtap: 'onAddTVEpisodeToPlaylist'
            }

        }
    },
    init: function () {
        this.callParent();
        this.tvEpisodeSelected = Ext.create('touchcontrol.view.tvShow.tvEpisodeSelected');
    },
    onOrientationchange: function (viewport, orientation, width, height) {
        var tempCmp = Ext.getCmp('tvVideoContainer');

        console.log('Viewport orientation just changed');
        if (orientation == "landscape") {
            tempCmp.getLayout().setOrient('horizontal');
        } else {
            tempCmp.getLayout().setOrient('vertical');
        }
    },
    onTvBackButton: function (view, record, target) {
        var temp = Ext.getCmp('navTvShowLibaryInfo');

        if (record.config.title.search("Episodes:") != -1) {
            temp.setActiveItem(1);
            tempCmp = Ext.getCmp('tvShowInfoBio');
            tempCmp.setStyle({ backgroundImage: 'url(' + showPoster + ')' });
        } else if (record.config.title.search("Seasons") != -1) {
            temp.setActiveItem(0);
        } else {
            temp.setActiveItem(0);
        }
    },
    onShowTap: function (list, idx, el, record, e) {
        if (e.getTarget('div.x-list-disclosure')) {
            return null;
        }
        handleShowRowClick(record);
        var temp = this.getNavTvShowLibrary(record);
        var tempString = 'Seasons: ' + record.data.showtitle;
        temp.push({
            layout: 'fit',
            title: tempString,
            items: [
            {
                xtype: 'tvSeasonList',
                scrollable: true,
                itemId: 'navTvSeasonList',
                style: 'background-color: black',
                store: 'tvVideoSeasons'
            }]
        });
        var temp = Ext.getCmp('navTvShowLibaryInfo');
        temp.setActiveItem(1);
        },
    onShowDisclose: function (view, record, target, index, event) {
        Ext.Msg.alert('Disclose', 'More info for ' + record.get('genre'), Ext.emptyFn);
    },
    onSeasonTap: function (list, idx, el, record, e) {
        if (e.getTarget('div.x-list-disclosure')) {
            return null;
        }
        if (e.target.className == "playlistEntry") {
            addSongToPlaylist(record);
            return null;
        }

        if (e.target.className == "playEntry") {
            playSong(record);
            return null;
        }
        handleSeasonRowClick(record);
        var temp = this.getNavTvShowLibrary(record);
        var tempString = 'Episodes: Season ' + record.data.season;
        //temp.setActiveItem(2);
        temp.push({
            layout: 'fit',
            title: tempString,
            items: [
            {
                xtype: 'tvEpisodeList',
                scrollable: true,
                itemId: 'navTvEpisodeList',
                style: 'background-color: black',
                store: 'tvVideoEpisodes' 
            }]
        });
        var temp = Ext.getCmp('navTvShowLibaryInfo');
        temp.setActiveItem(1);
    },
    onSeasonDisclose: function (view, record, target, index, event) {
        //        addGenreToPlaylist(record);
        Ext.Msg.alert('Disclose', 'More info for ' + record.get('genre'), Ext.emptyFn);
    },
    onAddTVEpisodeToPlaylist: function () {
        var temper = Ext.getCmp('tvDescription')._data;
        if (Ext.getCmp('localSelect').getValue() == 'Local') {
            addEpisodeToLocalPlaylist(temper);
        } else {
            addEpisodeToPlaylist(temper);
        }
        var temp = Ext.getCmp('tvEpisodeSelected');
        temp.hide();
    },
    onPlayTVEpisode: function () {
        var temper = Ext.getCmp('tvDescription')._data;
        playEpisode(temper);
        var temp = Ext.getCmp('tvEpisodeSelected');
        temp.hide();
    },
    getEpisodeSelected: function () {
        return this.tvEpisodeSelected;
    },
    onEpisodeTap: function (list, idx, el, record, e) {

        var temp = this.getTvMediaView();
        if (e.getTarget('div.x-list-disclosure')) {
            return null;
        }
        if (e.target.className == "playlistEntry") {
            if (Ext.getCmp('localSelect').getValue() == 'Local') {
                AddMovieToLocalPlaylist(record);
            } else {
                addMovieToPlaylist(record);
            }
            return null;
        }

        if (e.target.className == "playEntry") {
            playVideo(record);
            return null;
        }

        var tvEpisodeSelected = this.getEpisodeSelected();

        tvEpisodeSelected.setData(record);

        if (!tvEpisodeSelected.getParent()) {
            Ext.Viewport.add(tvEpisodeSelected);
        }

        tvEpisodeSelected.show();
    },
    onEpisodeDisclose: function (view, record, target, index, event) {
        addEpisodeToPlaylist(record);
    }

});

function playEpisode(record) {


    if (Ext.getCmp('localSelect').getValue() == 'Local') {
        playVideoOnLocal(record.data.idFile, record.data.fanart);
    } else {
        playEpisodeOnXBMC(record);
    }
}

function playEpisodeOnXBMC(record) {

    if (currentPlayer == undefined || currentPlayer == null) {
        return;
    }

    var obj = {
        "jsonrpc": "2.0",
        "method": "Player.Open",
        "params": {
            "item": {
                "episodeid": record.data.episodeid
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
        success: playVideoSuccess,
        failure: playVideoFailure,
        timeout: interfaceTimeout
    });

}

function playVideoFailure(t) {
    alert('playAlbumFailure failure t:' + t);
}

function playVideoSuccess(t) {
    var responseArr = Ext.decode(t.responseText);
    updatePlaylist("Video");
}


function playVideoLocalSuccess(t) {
    var responseArr = Ext.decode(t.responseText);
    var path = responseArr.result.details.path;

    pnl = new Ext.Panel({
        layout: {
            type: 'hbox'
        },
        items: [
        {
            layout: 'fit',
            fullscreen: true,
            xtype: 'video',
            id: 'VideoPanel',
            muted: false,
            enableControls: true,
            volume: 1.0,
            autoResume: false,
            autoPause: false,

            listeners: {
                tap: {
                    fn: function () {
                        hideVideoExitButton.delay(5000);
                        tempButton = Ext.getCmp('videoExitButton');
                        tempButton.setHidden(false);
                    },
                    element: 'element'
                }
            }

        },
                {
                    xtype: 'button',
                    text: 'Exit',
                    left: 5,
                    top: 10,
                    id: 'videoExitButton',
                    hidden:true,
                    iconMask: true,
                    ui: 'small',
                    height: 32,
                    width: 40
                }
/*
        {
            width: 50,
            style: 'background-color: black',
            xtype: 'panel',
            layout: 'fit',
            items: [
                {
                    xtype: 'button',
                    text: 'Exit',
                    left: 5,
                    top: 10,
                    id: 'videoExitButton',
                    iconMask: true,
                    ui: 'small',
                    height: 32,
                    width: 40
                }
            ]
        }
*/

        ],
        fullscreen: true
    });

    temp = Ext.getCmp('VideoPanel');
    temp.setUrl("http://" + hostAddress + '/' + path);
    temp.setPosterUrl(localFanart);
    Ext.getCmp('MainScreen').getTabBar().hide();
    pnl.show();
}

function playVideoLocalFailure(t) {
    alert('playVideoLocalFailure failure t:' + t);
}

function playVideoOnLocal(file, fanart) {


    var obj = {
        "jsonrpc": "2.0",
        "method": "Files.PrepareDownload",
        "params": {
            "path": file
        },
        "id": "playAlbum"
    };

    localFanart = fanart;

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: playVideoLocalSuccess,
        failure: playVideoLocalFailure,
        timeout: interfaceTimeout
    });

}

function InitializeTVShowLib() {
    var obj = {
        "jsonrpc": "2.0",
        "method": "VideoLibrary.GetTVShows",
        "params": {
            "properties": [
                    "year",
                    "genre",
                    "art"
            ]
        },
        "id": "getTVShows"
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: getTVShowSuccess,
        failure: getTVShowFailure,
        timeout: interfaceTimeout
    });
}

function getTVShowFailure(t) {
    alert('getTVVideoLibFailure t:' + t);
}


function getTVShowSuccess(t) {
    var response = Ext.decode(t.responseText);
    var videoTVLibraryCount = 0;

    if (response.result != null)
        videoTVLibraryCount = response.result.limits.total;

    for (i = 0; i < videoTVLibraryCount; i++) {



        tempImage = response.result.tvshows[i].art.fanart;
        tempString = encodeURIComponent(tempImage);
        imgSrcFan = "http://" + hostAddress + "/image/" + tempString;

        tempImage = response.result.tvshows[i].art.poster;
        tempString = encodeURIComponent(tempImage);
        imgSrcThumb = "http://" + hostAddress + "/image/" + tempString;

        if (response.result.tvshows[i].art.banner != null) {
            tempImage = response.result.tvshows[i].art.banner;
            tempString = encodeURIComponent(tempImage);
            imgSrcBanner = "http://" + hostAddress + "/image/" + tempString;
        } else {
            imgSrcBanner = null;
        }



        videoTVLibrary[i] = new Array(
                response.result.tvshows[i].label,      // showtitle
                response.result.tvshows[i].year,       // season
                response.result.tvshows[i].tvshowid,   // tvshowid
                imgSrcBanner,
                imgSrcThumb,
                imgSrcFan);
    }

    storeTvVideoLibary.add(videoTVLibrary);
}


function handleShowRowClick(record) {

    tvshowid = record.data.tvshowid; //OK, we have our record

    var obj = {
        "jsonrpc": "2.0",
        "method": "VideoLibrary.GetSeasons",
        "params": { "tvshowid": tvshowid, "properties": ["season", "art", "watchedepisodes", "episode"] },
        "id": tvshowid
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: fillstoreSeason,
        failure: getMusicLibFailure,
        timeout: interfaceTimeout
    });


}

function fillstoreSeason(t) {
    var i = 0;

    var response = Ext.decode(t.responseText);

    storeTvVideoSeason.removeAll();
    videoTVSeason = [];

    var videoTVSeasonCount = 0;
    if (response.result != null) {
        for (i = 0; i < response.result.limits.total; i++) {
            videoTVSeason[videoTVSeasonCount] = new Array(
                response.id,        //tvshowid
                response.result.seasons[i].season,
                response.result.seasons[i].label,
                response.result.seasons[i].episode,
                response.result.seasons[i].watchedepisodes,
                response.result.seasons[i].art.poster,
				"tvseason"
                );
            videoTVSeasonCount++;

        }
        storeTvVideoSeason.add(videoTVSeason);
    }

    storeTvVideoEpisode.removeAll();

    var obj = {
        "jsonrpc": "2.0",
        "method": "VideoLibrary.GetTVShowDetails",
        "params": {
            "tvshowid": response.id,
            "properties": [
                "cast",
                "plot",
                "art"
            ]
        },
        "id": response.id
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: fillShowInfo,
        failure: getMusicLibFailure,
        timeout: interfaceTimeout
    });


}


function fillShowInfo(t) {

    var response = Ext.decode(t.responseText);
    var data = response.result.tvshowdetails;


    tempImage = data.art.poster;
    tempString = encodeURIComponent(tempImage);
    imgSrc = "http://" + hostAddress + "/image/" + tempString;

    tempCmp = Ext.getCmp('tvShowInfoBio');
    var bio = "<span style=\"font-size:30px; color:white; background-color: rgba(0, 0, 0, .4);\">" + data.label + "</span>" + '<br>';
    bio += "<span style=\"font-size:20px; color:white; background-color: rgba(0, 0, 0, .4);\">" + data.plot + "</span>";
    tempCmp.setHtml(bio);
    tempCmp.setStyle({ backgroundImage: 'url(' + imgSrc + ')' });
    showPoster = imgSrc;
}

function handleSeasonRowClick(record) {

    tvshowid = record.data.tvshowid; //OK, we have our record
    season = record.data.season; //OK, we have our record

    tempCmp = Ext.getCmp('tvShowInfoBio');
    tempImage = record.data.poster;
    tempString = encodeURIComponent(tempImage);
    imgSrc = "http://" + hostAddress + "/image/" + tempString;
    tempCmp.setStyle({ backgroundImage: 'url(' + imgSrc + ')' });
    seasonPoster = imgSrc;

    var obj = {
        "jsonrpc": "2.0",
        "method": "VideoLibrary.GetEpisodes",
        "params": {
            "tvshowid": tvshowid, "season": season, "properties": ["title", "season", "file", "episode", "playcount", "plot", "writer",
            "firstaired", "director", "cast", "fanart", "thumbnail", "resume", "art"], "sort": { "method": "episode" }
        },
        "id": tvshowid
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: fillstoreEpisodes,
        failure: getMusicLibFailure,
        timeout: interfaceTimeout
    });

}

function fillstoreEpisodes(t) {
    var i = 0;

    var response = Ext.decode(t.responseText);

    storeTvVideoEpisode.removeAll();
    videoTVEpisodes = [];

    for (i = 0; i < response.result.limits.total; i++) {


        videoTVEpisodes[i] = Ext.create('touchcontrol.model.tvVideoEpisode', {
            tvshowid: response.id,        //tvshowid
            title: response.result.episodes[i].title,
            season: response.result.episodes[i].season,
            label: response.result.episodes[i].label,
            episode: response.result.episodes[i].episode,
            episodeid: response.result.episodes[i].episodeid,
            watched: response.result.episodes[i].playcount,
            idFile: response.result.episodes[i].file,
            plot: response.result.episodes[i].plot,
            writer: response.result.episodes[i].writer,
            firstaired: response.result.episodes[i].firstaired,
            director: response.result.episodes[i].director,
            //            cast: response.result.episodes[i].cast,
            fanart: response.result.episodes[i].fanart,
            thumbnail: response.result.episodes[i].thumbnail,
            resume: response.result.episodes[i].resume.position,
            art: response.result.episodes[i].art,
            type: "tvepisode"
        });

        var tempCast = videoTVEpisodes[i].cast();
        for (j = 0; j < response.result.episodes[i].cast.length; j++) {

            if (response.result.episodes[i].cast[j].thumbnail == undefined &&
                response.result.episodes[i].cast[j].role == "") {
                continue;
            }
            tempImage = response.result.episodes[i].cast[j].thumbnail;
            tempString = encodeURIComponent(tempImage);
            tempImgSrc = "http://" + hostAddress + "/image/" + tempString;

            tempCast.add({
                name: response.result.episodes[i].cast[j].name,
                role: response.result.episodes[i].cast[j].role,
                order: response.result.episodes[i].cast[j].order,
                thumbnail: tempImgSrc
            });
        }
        tempCast.sync();

    }
    storeTvVideoEpisode.add(videoTVEpisodes);
}


function handleEpisodeRowClick(record) {

    tvshowid = record.data.tvshowid; //OK, we have our record
    season = record.data.season; //OK, we have our record
    episodeid = record.data.episodeid;

    var obj = {
        "jsonrpc": "2.0",
        "method": "VideoLibrary.GetEpisodeDetails",
        "params": {
            "episodeid": episodeid,
            "properties": [
                "title",
                "cast",
                "firstaired",
                "votes",
                "writer",
                "director",
                "runtime",
                "streamdetails",
                "plot",
                "art",
                "playcount"
            ]
        },
        "id": tvshowid
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: fillEpisodeInfo,
        failure: getMusicLibFailure,
        timeout: interfaceTimeout
    });

}

function fillEpisodeInfo(t) {
    var response = Ext.decode(t.responseText);
    var data = response.result.episodedetails;

    var tempCmp = Ext.getCmp('tvEpisodeInfoImage');
    var tempImage = data.art.thumb;
    tempString = encodeURIComponent(tempImage);
    imgSrc = "http://" + hostAddress + "/image/" + tempString;

    tempCmp.setSrc(imgSrc);

    tempCmp = Ext.getCmp('tvEpisodeInfoBio');
    var bio = data.title + '\r\n';
    bio += 'First Aired: ' + data.firstaired + '\r\n';
    bio += data.plot;
    tempCmp.setValue(bio);

    var temp = Ext.getCmp('navTvShowLibaryInfo');
    temp.setActiveItem(2);

}


function addEpisodeToLocalPlaylist(record) {
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
                                        record.data.idFile,
                                        "",
                                        [],
                                        "",
                                        undefined,
                                        record.data.thumbnail);

    storeLocalVideoPlaylist.add(tempPlaylist);
}
