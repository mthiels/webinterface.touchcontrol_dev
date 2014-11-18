Ext.define('touchcontrol.controller.videoSearchList', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'mainpanel',
            navVideoLibary: '#navVideoLibary',
            videoMovie: 'videoContainer',
            startVideoSearchButton: 'videoContainer searchButton',

            videoSearchButton: '#videoSearchButton',
            videoSearchList: 'videoContainer videoMediaList'

        },
        control: {
            videoSearchButton: {
                tap: 'onVideoSearch'
            },
            startVideoSearchButton: {
                tap: 'onStartVideoSearch',
                itemtap: 'onStartVideoSearch'
            },
            videoSearchList: {
                itemtap: 'onVideoSearchTap',
                disclose: 'onSearchDisclose'
            }
        }
    },
    onSearchDisclose: function (view, record, target, index, event) {
    },
    onVideoSearch: function (view, record, target, index) {
        var temp = this.getNavVideoLibary();
        var originalSearchItem = temp.getActiveItem().id;

        temp.push({
            layout: 'hbox',
            title: 'Video Search',
            id: 'videoSearch',
            style: 'background-color: black; color: white',
            items: [
            {
                items: [
                {
                    xtype: 'textfield',
                    label: 'Title',
                    id: 'TitleString',
                    clearIcon: false
                }, {
                    xtype: 'textfield',
                    label: 'Actor',
                    id: 'ActorString',
                    clearIcon: false
                }, {
                    xtype: 'textfield',
                    label: 'Year',
                    id: 'YearString',
                    clearIcon: false
                }, {
                    xtype: 'searchButton',
                    id: 'startVideoSearchButton'
                }
                ]
            }
            ]
        });
    },
    onStartVideoSearch: function () {
        var temp = this.getNavVideoLibary();
        var tempString = 'Search: ';
        temp.push({
            layout: 'fit',
            title: tempString,
            id: 'videoSearchResults',
            items: [
            {
                xtype: 'videoMediaView',
                scrollable: true,
                itemId: 'navSearchList',
                style: 'background-color: black',
                store: 'videoSearches'
            }]
        });

        var tempTitle = Ext.getCmp('TitleString').getValue();
        var tempActor = Ext.getCmp('ActorString').getValue();
        var tempYear = Ext.getCmp('YearString').getValue();
        if (tempTitle != "" || tempActor != "" || tempYear != "") {
            successFunction = searchVideoSuccess;
            methodString = "GetMovies";
            titleSearchString = { "field": "title", "operator": "contains", "value": tempTitle }
            actorSearchString = { "field": "actor", "operator": "contains", "value": tempActor }
            yearSearchString = { "field": "year", "operator": "contains", "value": tempYear }
            searchString = [titleSearchString, actorSearchString, yearSearchString]
            paramsObj = {
                "properties": ["title", "genre", "year", "file", "thumbnail", "fanart", "playcount", "rating", "art", "resume", "plot", "runtime"],
                "filter": { "and": searchString }
            };
        } else return;


        var obj = {
            "jsonrpc": "2.0",
            "method": "VideoLibrary." + methodString,
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
            failure: searchVideoFailure,
            timeout: interfaceTimeout
        });
    },
    onVideoSearchTap: function (list, idx, el, record, e) {
        if (e.getTarget('div.x-list-disclosure')) {
            return null;
        }
/*
        if (e.target.className == "playEntry") {
            playVideo(record);
            return null;
        }
        if (e.target.className == "playlistEntry") {
            addMovieToPlaylist(record);
            return null;
        }
*/
    }
})


function searchVideoFailure(t) {
    alert('searchVideoFailure failure t:' + t);
}

function searchVideoSuccess(t) {
    var response = Ext.decode(t.responseText);

    var storeVideoSearch = Ext.getStore('videoSearches');

    searchVideoLibrary = [];
    storeVideoSearch.removeAll();

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

        searchVideoLibrary[i] = Ext.create('touchcontrol.model.videoMovie', {
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

    }
    storeVideoSearch.add(searchVideoLibrary);

}