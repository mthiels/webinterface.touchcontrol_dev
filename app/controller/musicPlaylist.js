var currentPlaylist = "Music";
var storeMusicPlaylist = null;
var storeLocalMusicPlaylist = null;



Ext.define('touchcontrol.controller.musicPlaylist', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            playlistCarousel: 'playlistCarousel',
            playingContainer: 'playingContainer',
            playlists: 'musicPlaylistView',
            playlistsLocal: 'localMusicPlaylistView',
            localMusicPlaylist: 'localMusicPlaylist',
            musicRefreshButton: '#musicRefreshButton',
            musicClearPlaylistButton: '#musicClearPlaylistButton',
            localmusicClearPlaylistButton: '#localMusicClearPlaylistButton',
            libraryRefresh: '#libraryRefreshButton',
            toggleScreen: '#screenSelectionButton'
        },
        control: {
            playlistCarousel: {
                cardswitch: 'onItemChange'
            },
            playlists: {
                itemtap: 'onPlaylistTap',
                disclose: 'onDisclose'
            },
            playlistsLocal: {
                itemtap: 'onPlaylistTap',
                disclose: 'onDisclose'
            },
            musicRefreshButton: {
                tap: 'onMusicRefreshButton'
            },
            musicClearPlaylistButton: {
                tap: 'onMusicClearPlaylistButton'
            },
            localmusicClearPlaylistButton: {
                tap: 'onLocalMusicClearPlaylistButton'
            },
            'viewport': {
                //capture the orientation change event
                orientationchange: 'onOrientationchange'
            },
            libraryRefresh: {
                tap: 'onLibraryRefresh'
            },
            toggleScreen: {
                tap: 'onToggleScreen'
            },
            localMusicPlaylist: {
                itemtap: 'onPlaylistTap',
                disclose: 'onDisclose'
            }
        }
    },
    onOrientationchange: function (viewport, orientation, width, height) {
        var tempCmp = Ext.getCmp('playingBackground');
        console.log('Viewport orientation just changed');

        if (orientation == "landscape") {
//            logo.setLeft(5);
//            logo.setTop(5);
//            tempHeight = tempCurrentData.getHeight();
//            tempWidth = tempCurrentData.getWidth();
//            logo.setHeight(width / 3);
//            logo.setWidth(width / 3);
//            currentPlayingText.setLeft(5);
//            currentPlayingText.setTop((width/3));
            tempCmp.getLayout().setOrient('horizontal');
        } else {
//            logo.setLeft(5);
//            logo.setTop(5);
//            logo.setHeight(width/3);
//            logo.setWidth(width/3);
//            currentPlayingText.setLeft((width / 3)+5);
//            currentPlayingText.setTop(5);
            tempCmp.getLayout().setOrient('vertical');

        }

//        Ext.Msg.alert("Orientation",orientation);
    },
    onPlaylistTap: function (list, idx, el, record, e) {
        if (e.target.className == "playRemove") {
            if (Ext.getCmp('localSelect').getValue() == 'Local') {
                removeFromLocalPlaylist(idx, "Music");
            } else {
                removeFromPlayList(idx, "Music");
            }
            return null;
        }

        if (Ext.getCmp('localSelect').getValue() == 'Local') {
            playMusicOnLocal(record.data.location, record.data.thumbnail, idx);
        } else {
            playSelectedItem(idx, "Music");
        }
    },

    onDisclose: function (view, record, target, index, event) {
        removeFromPlayList(index, "Music");
    },
    onMusicRefreshButton: function (view, record, target, index, event) {
        updatePlaylist("Music");
    },
    onMusicClearPlaylistButton: function (view, record, target, index, event) {
        clearPlayList("Music");
    },
    onLocalMusicClearPlaylistButton: function (view, record, target, index, event) {
        clearLocalPlayList("Music");
    },
    onLibraryRefresh: function () {
        var button = Ext.getCmp('libraryRefreshButton');

        Ext.ux.menu.Menu.open(
            button, // the anchor
            [
                { text: 'Both', value: 'Both' },
                { text: 'Music', value: 'Music' },
                { text: 'Video', value: 'Video' }
            ],
            function (value) {
                // callback (called after the menu is closed)
                if (value == null)
                    return;
                if (value == 'Music')
                    refreshXBMCMusicLibraries();
                if (value == 'Video')
                    refreshXBMCVideoLibraries();
                if (value == 'Both') {
                    refreshXBMCMusicLibraries();
                    refreshXBMCVideoLibraries();
                }

            }
        );  
    },
    onToggleScreen: function () {
        var button = Ext.getCmp('screenSelectionButton');

        Ext.ux.menu.Menu.open(
            button, // the anchor
            [
                { text: 'Show OSD', value: 'ShowOSD' },
                { text: 'Shutdown', value: 'Shutdown' },
                { text: 'Exit XBMC', value: 'ExitXBMC' }
            ],
            function (value) {
                // callback (called after the menu is closed)
                if (value == null)
                    return;
                if (value == 'ShowOSD')
                    remoteCmds('ShowOSD', xbmcCmdSuccess, buttonFailure);
                if (value == 'Shutdown')
                    systemShutdown();
                if (value == 'ExitXBMC') {
                    applicationExit();
                }

            }
        );

    },
    onItemChange: function (list, idx, el, record, e) {
        temp = e;
    }
});


/**
 * License: The MIT License
 * Copyright (c) 2013 ClearCode Inc.
 *
 * Description:
 *   Simple dropdown menu component for Sencha Touch 2.
 *   This works like:
 *     [Anchor button]
 *     __/\____
 *     |Item 1|
 *     |Item 2|
 *     |Item 3|
 *     ~~~~~~~~
 *
 * Usage:
 *   var button = Ext.getCmp('ext-something-1');
 *   Ext.ux.menu.Menu.open(
 *     button, // the anchor
 *     [
 *       { text: 'Item 1', value: 'value1' },
 *       { text: 'Item 2', value: 'value2' },
 *       { text: 'Item 3', value: 'value3' }
 *     ],
 *     function(value) { // callback (called after the menu is closed)
 *       // The value will be 'value1', 'value2', or 'value3'.
 *       // If you close the menu by tapping on the mask, it becomes null.
 *     }
 *   );
 *
 * Recommended styles:
 *   .x-popup-menu {
 *     box-shadow: 0 0 0.5em;
 *     border-radius: 0.3em;
 *     color: $list-color;
 *     background: $list-bg-color;
 *   }
 *   .x-popup-menu .x-anchor.x-anchor-left,
 *   .x-popup-menu .x-anchor.x-anchor-right,
 *   .x-popup-menu .x-anchor.x-anchor-top,
 *   .x-popup-menu .x-anchor.x-anchor-bottom {
 *     background: $list-bg-color;
 *   }
 *   .x-popup-menu .x-button-label {
 *     text-align: left;
 *   }
 */
Ext.define('Ext.ux.menu.Menu', {
    extend: 'Ext.ActionSheet',
    xtype: 'menu',
    requires: [
      'Ext.ActionSheet'
    ],

    statics: {
        open: function (owner, items, callback) {
            var menu = Ext.Viewport.add({
                xtype: 'menu',
                defaults: {
                    xtype: 'button',
                    ui: 'plain',
                    handler: function (button) {
                        menu.hide();
                        callback(button.config.value);
                    }
                },
                items: items,
                listeners: {
                    hide: function () {
                        Ext.Viewport.remove(menu);
                    }
                }
            });
            menu.prepare();
            menu.showBy(owner);
        }
    },

    config: {
        cls: Ext.baseCSSPrefix + 'popup-menu',
        hideOnMaskTap: true,
        showAnimation: {
            type: 'fadeIn',
            duration: 200,
            easing: 'ease-out'
        },
        hideAnimation: {
            type: 'fadeOut',
            duration: 200,
            easing: 'ease-out'
        },
        extraSidePadding: 50
    },

    prepare: function () {
        var me = this;
        var buttons = this.query('button');
        var sidePadding = this.element.getWidth() - buttons[0].element.getWidth();
        var maxWidth = 0;
        buttons.forEach(function (button) {
            var width = me.getTextWidth(button.textElement);
            if (width > maxWidth)
                maxWidth = width;
        });
        this.setWidth(maxWidth + sidePadding + this.config.extraSidePadding);

        // The height of the panel is enough to show all contents by defaylt.
        // Before it is expanded automatically, I save the calculated height.
        this.setHeight(this.element.getHeight());
    },

    // Text labels in buttons are defined as <span style="display:block">text</span>
    // so I have to calculate actual width of the text with inserted elements.
    getTextWidth: function (span) {
        var leftAnchor = Ext.dom.Element.create({
            tag: 'span',
            style: 'display: inline !important;',
            html: '!'
        });
        span.insertFirst(leftAnchor);
        var rightAnchor = Ext.dom.Element.create({
            tag: 'span',
            style: 'display: inline !important;',
            html: '!'
        });
        span.append(rightAnchor);
        var left = leftAnchor.getX();
        var right = rightAnchor.getX();
        span.removeChild(leftAnchor);
        span.removeChild(rightAnchor);
        return Math.abs(right - left);
    }
});


function refreshXBMCMusicLibraries() {
    var obj = {
        "jsonrpc": "2.0",
        "method": "AudioLibrary.Scan",
        "id": 1
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: refreshMusicLibrarySuccess,
        failure: refreshMusicLibraryFailure,
        timeout: interfaceTimeout
    });
}


function refreshMusicLibraryFailure(t) {
    alert('refreshLibraryFailure t:' + t);
}

function refreshMusicLibrarySuccess(t) {
}

function refreshXBMCVideoLibraries() {
    var obj = {
        "jsonrpc": "2.0",
        "method": "VideoLibrary.Scan",
        "id": 1
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        params: tempStr,
        headers: { 'Content-Type': 'application/json' },
        success: refreshVideoLibrarySuccess,
        failure: refreshVideoLibraryFailure,
        timeout: interfaceTimeout
    });
}

function refreshVideoLibraryFailure(t) {
    alert('refreshLibraryFailure t:' + t);
}

function refreshVideoLibrarySuccess(t) {
}

/****************** systemShutdown **************************/


function systemShutdown() {
    var obj = {
        "jsonrpc": "2.0",
        "method": "System.Shutdown",
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: buttonSystemShutdownSuccess,
        failure: buttonSystemShutdownFailure,
        timeout: interfaceTimeout
    });
}

function buttonSystemShutdownFailure(t) {
    alert('buttonSystemShutdownFailure failure t:' + t);
}

function buttonSystemShutdownSuccess(t) {
    var response = Ext.decode(t.responseText);
}

/**********************************************/
/****************** applicationExit **************************/


function applicationExit() {
    var obj = {
        "jsonrpc": "2.0",
        "method": "Application.Quit",
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: buttonApplicationExitSuccess,
        failure: buttonApplicationExitFailure,
        timeout: interfaceTimeout
    });
}

function buttonApplicationExitFailure(t) {
    alert('buttonSystemShutdownFailure failure t:' + t);
}

function buttonApplicationExitSuccess(t) {
    var response = Ext.decode(t.responseText);
}


function updatePlaylist(selectedList) {

    var successFunction = null;

    if (selectedList == "Music") {
        var obj = {
            "jsonrpc": "2.0",
            "method": "Playlist.GetItems",
            "params": { "playlistid": 0, "properties": ["title", "artist", "genre", "album", "file", "duration", "thumbnail"] },
            "id": 1
        };
        successFunction = updateMusicPlaylistSuccess;
    } else {
        var obj = {
            "jsonrpc": "2.0",
            "method": "Playlist.GetItems",
            "params": { "playlistid": 1, "properties": ["title", "artist", "genre", "album", "file", "runtime", "thumbnail"] },
            "id": 2
        };
        successFunction = updateMusicPlaylistSuccess;
    }

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: successFunction,
        failure: updatePlaylistFailure,
        timeout: interfaceTimeout
    });

}

function updateMusicPlaylistSuccess(t) {

    var newNode = null;
    var tempIndex = 0;
    var currentIndex = 0;
    var tempPlaylist = [];
    var musicPlaylist = [];
    var tempPlaying = "";
    var tempCount = 0;
    var Artiststr = "";

    var responseArr = Ext.decode(t.responseText);
    var playlistId = responseArr.id;

    tempCount = responseArr.result.limits.total;
    responsePlaylist = responseArr.result.items;

    for (var i = 0; i < tempCount; i++) {
        tempPlaying = "";
        var tempName = responsePlaylist[i].title;
        if (tempName == "") {
            if (responsePlaylist[i].title != undefined)
                tempName = responsePlaylist[i].label;
        }
        if (tempName == "") {
            tempName = responsePlaylist[i].file.split('\\').pop().split('/').pop();
        }
        if (responsePlaylist[i].artist != "" && responsePlaylist[i].artist != "[]")
            Artiststr = (responsePlaylist[i].artist) ? responsePlaylist[i].artist + ' - ' : '';
        tempName = Artiststr + tempName;
        if (playlistCurrentIndex == i) {
            if ((currentPlaylist == "Music" && currentPlayer == 0) || (currentPlaylist != "Music" && currentPlayer == 1))
                tempPlaying = "test";
        }

        tempPlaylist[tempIndex] = new Array(tempIndex,
                                            tempName,
                                            responsePlaylist[i].file,
                                            tempPlaying,
                                            responsePlaylist[i].artist,
                                            responsePlaylist[i].album,
                                            responsePlaylist[i].duration,
                                            responsePlaylist[i].thumbnail,
                                            responsePlaylist[i].fanart);
        tempIndex++;

    }

    if (playlistId == 1) {
        storeMusicPlaylist.removeAll();
        storeMusicPlaylist.add(tempPlaylist);
    }
    if (playlistId == 2) {
        storeVideoPlaylist.removeAll();
        storeVideoPlaylist.add(tempPlaylist);
    }

    var numberOfEntries = "";
    var tempCarousel = Ext.getCmp('playlistCarousel').getActiveItem();
    if (tempCarousel.id == 'musicCarouselEntry') {
        numberOfEntries = 'Music-' + storeMusicPlaylist.getCount();
    } else {
        numberOfEntries = 'Video-' + storeVideoPlaylist.getCount();
    }
    Ext.getCmp('playlistTabButton').setBadgeText(numberOfEntries);
}

function updatePlaylistFailure(t) {
    alert('updatePlaylistTreeFailure t:' + t);
}

function updatePlaylistIndex(selectedList) {
    if (selectedList == "Music") {
        temp = storeMusicPlaylist.getAt(playlistCurrentIndex);
        if (temp != undefined) {
            temp.data.currentlyPlaying = "playing";
        }
        if (playlistSavedIndex != -1) {
            temp = storeMusicPlaylist.getAt(playlistSavedIndex);
            temp.data.currentlyPlaying = "";
        }
        tempList = Ext.getCmp('musicPlaylistList');
        tempList.refresh();

    } else {
        if (playlistSavedIndex != -1) {
            temp = storeVideoPlaylist.getAt(playlistCurrentIndex);
            if (temp != undefined) {
                temp.data.currentlyPlaying = "playing";
            }
            temp = storeVideoPlaylist.getAt(playlistSavedIndex);
            if (temp != undefined) {
                temp.data.currentlyPlaying = "";
            }
        }
        tempList = Ext.getCmp('videoPlaylistList');
        tempList.refresh();
    }
}

function removeFromLocalPlaylist(selectIndex, currentPlaylist) {
    if (selectIndex == 0xFFFF)
        return;

    tempLocalPlaylist = storeLocalMusicPlaylist;
    if (currentPlaylist != "Music") {
        return;
    }

    storeLocalMusicPlaylist.removeAt(selectIndex);
    tempList = Ext.getCmp('localMusicPlaylist');
    tempList.refresh();

    return;
}
function removeFromPlayList(selectIndex, currentPlaylist) {

    if (selectIndex == 0xFFFF)
        return;

    var temp = 0;
    if (currentPlaylist != "Music")
        temp = 1;

    var obj = {
        "jsonrpc": "2.0",
        "method": "Playlist.Remove",
        "params": {
            "playlistid": temp,
            "position": selectIndex
        },
        "id": 1 + temp
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: xbmcRemoveFromDBCmdSuccess,
        failure: xbmcRemoveFromDBCmdFailure,
        timeout: interfaceTimeout
    });

    selectIndex = 0xFFFF;
}

function xbmcRemoveFromDBCmdSuccess(t) {
    var response = Ext.decode(t.responseText);

    if (response.id == 1) {
        updatePlaylist("Music");
    } else {
        updatePlaylist("Video");
    }
}

function xbmcRemoveFromDBCmdFailure(t) {
    alert('xbmcRemoveFromDBCmdFailure t:' + t);
}



function playSelectedItem(currentSongIndex, currentPlaylist) {

    if (currentSongIndex == undefined)
        return;

    var temp = 0;
    if (currentPlaylist == "Video" || currentPlaylist == "TV Shows")
        temp = 1;

    var obj = {
        "jsonrpc": "2.0",
        "method": "Player.Open",
        "params": {
            "item": {
                "playlistid": temp,
                "position": currentSongIndex
            }
        },
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: playSelectedItemSuccess,
        failure: playSelectedItemFailure,
        timeout: interfaceTimeout
    });
}

function playSelectedItemFailure(t) {
    var responseArr = Ext.decode(t.responseText);
    alert('playSelectedSongFailure failure t:' + t);
}

function playSelectedItemSuccess(t) {
    var responseArr = Ext.decode(t.responseText);
    remoteCmds('Back', xbmcRemoteSuccess, remoteFailure);
}


function clearLocalPlayList(currentPlaylist) {
    if (currentPlaylist == "Music") {
        storeLocalMusicPlaylist.removeAll();
    } else {
    }
}

function clearPlayList(currentPlaylist) {
    var tempPlaylist = 0;

    if (currentPlaylist != 'Music')
        tempPlaylist = 1;

    var obj = {
        "jsonrpc": "2.0",
        "method": "Playlist.Clear",
        "params": {
            "playlistid": tempPlaylist
        },
        "id": 1 + tempPlaylist
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: clearPlayListSuccess,
        failure: clearPlayListFailure,
        timeout: interfaceTimeout
    });
}

function clearPlayListFailure(t) {
    alert('clearPlayListFailure failure t:' + t);
}

function clearPlayListSuccess(t) {
    var responseArr = Ext.decode(t.responseText);

    if (responseArr.id == 1) {
        storeMusicPlaylist.removeAll();
        updatePlaylist("Music");
    } else {
        updatePlaylist("Video");
    }
    xbmcCmds('Stop', xbmcCmdSuccess, clearPlayListFailure);
}


function addToPlayListFailure(t) {
    musicShareAction = false;
    var response = Ext.decode(t.responseText);
}

function xbmcAddFromDBCmdSuccess(t) {
    musicShareAction = false;
    var response = Ext.decode(t.responseText);
    var playListType = "Music";

    if (response.id == "addToVideoPlaylist" || response.id == "addEpisodeToPlaylist") {
        playListType = "Video";
    }
    updatePlaylist(playListType);
}

function addSongsToLocalPlaylist(t) {
    var response = Ext.decode(t.responseText);
    var playState = response.id;

    var tempPlaylist = [];
    var tempIndex = 0;
    var entry = null;
    var tempCount = 0;
    var tempName = "";

    for (i = 0; i < storeLocalMusicPlaylist.getCount() ; i++) {
        entry = storeLocalMusicPlaylist.getAt(i);
        tempPlaylist[tempIndex] = new Array(tempIndex,
                                        entry.data.name,
                                        entry.data.location,
                                        "",
                                        entry.data.artist,
                                        entry.data.artistid,
                                        entry.data.album,
                                        entry.data.duration,
                                        entry.data.thumbnail,
                                        entry.data.fanart);

        tempIndex++;
    }

    storeLocalMusicPlaylist.removeAll();

    tempCount = response.result.limits.total;
    responsePlaylist = response.result.songs;

    for (var i = 0; i < tempCount; i++) {

        tempName = responsePlaylist[i].title;
        if (tempName == "") {
            if (responsePlaylist[i].title != undefined)
                tempName = responsePlaylist[i].label;
        }
        if (tempName == "") {
            tempName = responsePlaylist[i].file.split('\\').pop().split('/').pop();
        }
        if (responsePlaylist[i].artist != "" && responsePlaylist[i].artist != "[]")
            Artiststr = (responsePlaylist[i].artist) ? responsePlaylist[i].artist + ' - ' : '';
        tempName = Artiststr + tempName;


        tempPlaylist[tempIndex] = new Array(tempIndex,
                                            tempName,
                                            responsePlaylist[i].file,
                                            "",
                                            responsePlaylist[i].artist,
                                            responsePlaylist[i].artistid,
                                            responsePlaylist[i].album,
                                            responsePlaylist[i].duration,
                                            responsePlaylist[i].thumbnail,
                                            responsePlaylist[i].fanart);

        tempIndex++;
    }

    storeLocalMusicPlaylist.add(tempPlaylist);

    if (playState == "Play") {
        tempRecord = storeLocalMusicPlaylist.getAt(0);
        playMusicOnLocal(tempRecord.data.location, tempRecord.data.thumbnail, 0);
    }

}

function addGenreToPlaylist(record) {

    obj = {
        "jsonrpc": "2.0",
        "method": "Playlist.Add",
        "params": {
            "playlistid": 0,
            "item": {
                "genreid": record.data.id
            }
        },
        "id": "addToMusicPlaylist"
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

function addArtistToPlaylist(record) {

    obj = {
        "jsonrpc": "2.0",
        "method": "Playlist.Add",
        "params": {
            "playlistid": 0,
            "item": {
                "artistid": record.data.id
            }
        },
        "id": "addToMusicPlaylist"
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

function addArtistToLocalPlaylist(record, playState) {

    var paramsObj = { "filter": { "artistid": record.data.id }, "properties": ["genre", "artist", "artistid", "album", "file", "title", "duration", "fanart", "thumbnail"] };

    var obj = {
        "jsonrpc": "2.0",
        "method": "AudioLibrary.GetSongs",
        "params": paramsObj,
        "id": playState
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: addSongsToLocalPlaylist,
        failure: getMusicLibFailure,
        timeout: interfaceTimeout
    });

}

function addAlbumToPlaylist(record) {

    obj = {
        "jsonrpc": "2.0",
        "method": "Playlist.Add",
        "params": {
            "playlistid": 0,
            "item": {
                "albumid": record.data.id
            }
        },
        "id": "addToMusicPlaylist"
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

function addAlbumToLocalPlaylist(record, playState) {

    var paramsObj = { "filter": { "albumid": record.data.id }, "properties": ["genre", "artist", "artistid", "album", "file", "title", "duration", "fanart", "thumbnail"] };

    var obj = {
        "jsonrpc": "2.0",
        "method": "AudioLibrary.GetSongs",
        "params": paramsObj,
        "id": playState
    };

    tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: addSongsToLocalPlaylist,
        failure: getMusicLibFailure,
        timeout: interfaceTimeout
    });

}

function addSongToPlaylist(record) {

    obj = {
        "jsonrpc": "2.0",
        "method": "Playlist.Add",
        "params": {
            "playlistid": 0,
            "item": {
                "songid": record.data.id
            }
        },
        "id": "addToMusicPlaylist"
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

function addSongToLocalPlaylist(record, playState) {

    var playlistCount = 0;
    var tempPlaylist = [];

    playlistCount = storeLocalMusicPlaylist.getCount();

    tempPlaylist[0] = new Array(playlistCount + 1,
                                        record.data.title,
                                        record.data.location,
                                        "",
                                        record.data.artist,
                                        "",
                                        record.data.album,
                                        "",
                                        record.data.thumbnail,
                                        record.data.fanart);

    storeLocalMusicPlaylist.add(tempPlaylist);

    if (playState == "Play") {
        tempRecord = storeLocalMusicPlaylist.getAt(0);
        playMusicOnLocal(tempRecord.data.location, tempRecord.data.thumbnail, 0);
    }

}

function addMusicShareToPlaylist(filetype, path) {
    if (filetype == 'directory') {
        var obj = {
            "jsonrpc": "2.0",
            "method": "Playlist.Add",
            "params": {
                "playlistid": 0,
                "item": {
                    "directory": path
                }
            },
            "id": "addToMusicPlaylist"
        };
    } else {
        var obj = {
            "jsonrpc": "2.0",
            "method": "Playlist.Add",
            "params": {
                "playlistid": 0,
                "item": {
                    "file": path
                }
            },
            "id": "addToMusicPlaylist"
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




