
var videoGenre = [];
var videoGenreCount = 0;
var videoLibraryCount = 0;
var videoLibrary = [];
var videoEntryMaxAmount = 80;


Ext.define('touchcontrol.controller.videoGenreList', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'mainpanel',
            videoGenreList: 'videoContainer videoGenresList',
            videoSearch: '#videoSearch'

        },
        control: {
            videoGenreList: {
                itemtap: 'onGenreTap',
                disclose: 'onDisclose'
            },
            'viewport': {
                //capture the orientation change event
                orientationchange: 'onOrientationchange'
            },
            videoSearch: {
                tap: 'onVideoSearch'
            }
        }
    },
    onOrientationchange: function (viewport, orientation, width, height) {
        var tempCmp = Ext.getCmp('videoContainer');

        console.log('Viewport orientation just changed');
        if (orientation == "landscape") {
            tempCmp.getLayout().setOrient('horizontal');
        } else {
            tempCmp.getLayout().setOrient('vertical');
        }
    },
    onGenreTap: function (list, idx, el, record, e) {
        if (e.getTarget('div.x-list-disclosure')) {
            return null;
        }
        handleVideoGenreRowClick(record);
        var temp = Ext.getCmp('navVideoLibary');
        var tempString = 'Movie: ' + record.get('genre');
        temp.push({
            layout: 'fit',
            title: tempString,
            items: [
            {
                xtype: 'videoMediaView',
                scrollable: true,
                itemId: 'navMediaList',
                style: 'background-color: black',
                store: 'videoMovies',
                indexBar: true 
            }]
        });
    },

    onDisclose: function (view, record, target, index, event) {
        Ext.Msg.alert('Disclose', 'More info for ' + record.get('genre'), Ext.emptyFn);
    },
    onVideoSearch: function () {
        Ext.Msg.alert('Video Search');
    }
});


function InitializeMovieLib() {
    var obj = {
        "jsonrpc": "2.0",
        "method": "VideoLibrary.GetGenres",
        "params": {
            "type": "movie"
        },
        "id": 1
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: getVideoLibGenreSuccess,
        failure: getVideoLibFailure,
        timeout: interfaceTimeout
    });
}

function getVideoLibGenreSuccess(t) {
    var response = Ext.decode(t.responseText);
    var responseCount = 0;

    if (response.result != null)
        responseCount = response.result.limits.total;

    videoGenreCount = 0;
    videoGenre[videoGenreCount] = new Array(-1, 'All');
    videoGenreCount++;

    for (i = 1; i <= responseCount; i++) {

        videoGenre[videoGenreCount] = new Array(response.result.genres[i - 1].genreid, response.result.genres[i - 1].label);
        videoGenreCount++;
    }
    storeVideoGenre.add(videoGenre);
}

function getAllMovies_old() {

    var obj = {
        "jsonrpc": "2.0",
        "method": "VideoLibrary.GetMovies",
        "params": {
            "properties": [
                    "title",
                    "genre",
                    "year",
                    "file",
                    "thumbnail",
                    "fanart",
                    "playcount",
                    "rating",
                    "art",
                    "resume",
                    "plot",
                    "runtime",
                    "cast"
            ]
        },
        "id": 1
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: GetMovieLibSuccess,
        failure: getVideoLibFailure,
        timeout: interfaceTimeout
    });

}


function getVideoLibFailure_old(t) {
    alert('getVideoLibFailure t:' + t);
}


function GetMovieLibSuccess_old(t) {
    var response = Ext.decode(t.responseText);
    var videoLibraryCount = 0;
    var tempRating = 0;

    if (response.result != null)
        videoLibraryCount = response.result.limits.total;

    for (i = 0; i < videoLibraryCount; i++) {

        thumbnail = response.result.movies[i].art.poster;
        if (thumbnail == undefined || thumbnail == "") {
            thumbnail = response.result.movies[i].art.thumbnail;
            if (thumbnail == undefined || thumbnail == "") {
                thumbnail = response.result.movies[i].thumbnail;
            }
        }
        if (thumbnail == "" || thumbnail == "http://localhost:8080/image/") {
            tempString = encodeURIComponent("/resources/images/defaultAlbumCover.png");
            imgSrc = "/resources/images/defaultAlbumCover.png";
        } else {
            tempString = encodeURIComponent(thumbnail);
            imgSrc = "http://" + hostAddress + "/image/" + tempString;
        }

        tempString = encodeURIComponent(response.result.movies[i].art.fanart);
        imgFanartSrc = "http://" + hostAddress + "/image/" + tempString;

        tempRating = response.result.movies[i].rating.toFixed(1);
        tempRunTime = secondsToHms(response.result.movies[i].runtime);

        videoLibrary[i] = Ext.create('touchcontrol.model.videoMovie', {
            id: response.result.movies[i].movieid,
            title: response.result.movies[i].title,
            year: response.result.movies[i].year,
            genre: response.result.movies[i].genre,
            file: response.result.movies[i].file,
            thumbnail: imgSrc,
            fanart: imgFanartSrc,
            playcount: response.result.movies[i].playcount,
            rating: tempRating,
            resume: response.result.movies[i].resume.position,
            plot: response.result.movies[i].plot,
            runtime: tempRunTime
        });

        var tempCast = videoLibrary[i].cast();
        for (j = 0; j < response.result.movies[i].cast.length; j++) {

            if (response.result.movies[i].cast[j].thumbnail == undefined &&
                response.result.movies[i].cast[j].role == "") {
                continue;
            }
            tempImage = response.result.movies[i].cast[j].thumbnail;
            if (tempImage == "" || tempImage == undefined) {
                tempImgSrc = '/resources/images/unknown.jpg'
            } else {
                tempString = encodeURIComponent(tempImage);
                tempImgSrc = "http://" + hostAddress + "/image/" + tempString;
            }

            tempCast.add({
                name: response.result.movies[i].cast[j].name,
                role: response.result.movies[i].cast[j].role,
                order: response.result.movies[i].cast[j].order,
                thumbnail: tempImgSrc
            });
        }
        tempCast.sync();
    }

    storeVideoLibrary.add(videoLibrary);
}


function handleVideoGenreRowClick(record) {

    genreSelected = record.get('genre'); //OK, we have our record
}

function handleVideoMovieSelected(record) {

    moveIDSelected = record.get('id');

    var obj = {
        "jsonrpc": "2.0",
        "method": "VideoLibrary.GetMovieDetails",
        "params": {
            "movieid": moveIDSelected,
            "properties": [
                "genre",
                "imdbnumber",
                "cast",
                "country",
                "mpaa",
                "plotoutline",
                "rating",
                "set",
                "setid",
                "studio",
                "tag",
                "tagline",
                "votes",
                "writer",
                "year",
                "director",
                "runtime",
                "resume",
                "streamdetails",
                "file",
                "lastplayed",
                "dateadded",
                "plot",
                "title",
                "art",
                "playcount",
                "fanart",
                "thumbnail"
            ]
        },
        "id": "getMovieDetails"
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: fillMovieInfo,
        failure: getVideoLibFailure,
        timeout: interfaceTimeout
    });
}

function fillMovieInfo(t) {
    var response = Ext.decode(t.responseText);
    var data = response.result.moviedetails;

    var tempCmp = Ext.getCmp('movieInfoImage');
    var tempImage = data.thumbnail;

    if (tempImage == "" || tempImage == "http://localhost:8080/image/") {
        tempImage = 'resources/images/defaultAlbumCover.png';
    } else {
        tempString = encodeURIComponent(data.thumbnail);
        tempImage = "http://" + hostAddress + "/image/" + tempString;
    }

    tempCmp.setSrc(tempImage);

    tempCmp = Ext.getCmp('movieInfoBio');
    var bio = data.title + '\r\n';
    bio += 'Released: ' + data.year + '\r\n';
    bio += 'Genre: ' + data.genre + '\r\n\n';
    bio += data.plot;
    tempCmp.setValue(bio);

}

function getVideoLibFailure(t) {
    if (t.responseText == "")
        return;
    var response = Ext.decode(t.responseText);
};



function getAllMovies() {

    Ext.getCmp('videoContainer').setMasked(true);

    var obj = {
        "jsonrpc": "2.0",
        "method": "VideoLibrary.GetMovies",
        "params": {
            "limits": { "end": videoEntryMaxAmount, "start": 0 },
            "properties": [
                    "title",
                    "genre",
                    "year",
                    "file",
                    "thumbnail",
                    "fanart",
                    "playcount",
                    "rating",
                    "art",
                    "resume",
                    "plot",
                    "runtime",
                    "cast"
            ]
        },
        "id": 1
    };


    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: GetMovieLibSuccess,
        failure: getVideoLibFailure,
        timeout: interfaceTimeout
    });

}


function getVideoLibFailure(t) {
    alert('getVideoLibFailure t:' + t);
}


function GetMovieLibSuccess(t) {
    var response = Ext.decode(t.responseText);
    var videoLibraryCount = 0;
    var tempRating = 0;

    if (response.result != null)
        videoLibraryCount = response.result.limits.end - response.result.limits.start;

    videoLibrary = [];

    for (i = 0; i < videoLibraryCount; i++) {

        thumbnail = response.result.movies[i].art.poster;
        if (thumbnail == undefined || thumbnail == "") {
            thumbnail = response.result.movies[i].art.thumbnail;
            if (thumbnail == undefined || thumbnail == "") {
                thumbnail = response.result.movies[i].thumbnail;
            }
        }
        if (thumbnail == "" || thumbnail == "http://localhost:8080/image/") {
            tempString = encodeURIComponent("/resources/images/defaultAlbumCover.png");
            imgSrc = "/resources/images/defaultAlbumCover.png";
        } else {
            tempString = encodeURIComponent(thumbnail);
            imgSrc = "http://" + hostAddress + "/image/" + tempString;
        }

        tempString = encodeURIComponent(response.result.movies[i].art.fanart);
        imgFanartSrc = "http://" + hostAddress + "/image/" + tempString;

        tempRating = response.result.movies[i].rating.toFixed(1);
        tempRunTime = secondsToHms(response.result.movies[i].runtime);

        videoLibrary[i] = Ext.create('touchcontrol.model.videoMovie', {
            id: response.result.movies[i].movieid,
            title: response.result.movies[i].title,
            year: response.result.movies[i].year,
            genre: response.result.movies[i].genre,
            file: response.result.movies[i].file,
            thumbnail: imgSrc,
            fanart: imgFanartSrc,
            playcount: response.result.movies[i].playcount,
            rating: tempRating,
            resume: response.result.movies[i].resume.position,
            plot: response.result.movies[i].plot,
            runtime: tempRunTime
        });

        var tempCast = videoLibrary[i].cast();
        for (j = 0; j < response.result.movies[i].cast.length; j++) {

            if (response.result.movies[i].cast[j].thumbnail == undefined &&
                response.result.movies[i].cast[j].role == "") {
                continue;
            }
            tempImage = response.result.movies[i].cast[j].thumbnail;
            if (tempImage == "" || tempImage == undefined) {
                tempImgSrc = '/resources/images/unknown.jpg'
            } else {
                tempString = encodeURIComponent(tempImage);
                tempImgSrc = "http://" + hostAddress + "/image/" + tempString;
            }

            tempCast.add({
                name: response.result.movies[i].cast[j].name,
                role: response.result.movies[i].cast[j].role,
                order: response.result.movies[i].cast[j].order,
                thumbnail: tempImgSrc
            });
        }
        tempCast.sync();
    }
    storeVideoLibrary.add(videoLibrary);

    if (response.result.limits.end >= response.result.limits.total) {

        Ext.getCmp('videoContainer').setMasked(false);

    } else {
        var tempNum = (response.result.limits.end / response.result.limits.total);
        var tempString = "Loading..." + (tempNum * 100).toFixed(0) + "%";
        Ext.getCmp('videoContainer').getMasked().setMessage(tempString);
        tempNum = response.result.limits.total - response.result.limits.end;
        if (tempNum > videoEntryMaxAmount)
            tempNum = videoEntryMaxAmount;
        var tempStart = response.result.limits.end;
        var tempEnd = response.result.limits.end + tempNum;

        var obj = {
            "jsonrpc": "2.0",
            "method": "VideoLibrary.GetMovies",
            "params": {
                "limits": { "end": tempEnd, "start": tempStart },
                "properties": [
                        "title",
                        "genre",
                        "year",
                        "file",
                        "thumbnail",
                        "fanart",
                        "playcount",
                        "rating",
                        "art",
                        "resume",
                        "plot",
                        "runtime",
                        "cast"
                ]
            },
            "id": 1
        };


        tempStr = Ext.encode(obj);
        Ext.Ajax.request({
            url: '/jsonrpc',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params: tempStr,
            success: GetMovieLibSuccess,
            failure: getVideoLibFailure,
            timeout: interfaceTimeout
        });
    }
}
