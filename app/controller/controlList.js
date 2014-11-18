var interfaceTimeout = 30000;
var hostAddress = top.location.host;
var retrospect;
var isMuted = false;
var screenWidth = 0;
var screenHeight = 0;
var socketXBMC = null;
var pnl = null;
var localFanart = null;
var localIndex = 0;
var menuLayout = 0;
var currentPlayer = 0;
var connectStatus = 'Connected';
var playlistCurrentIndex = -1;
var playlistSavedIndex = -1;

Ext.define('touchcontrol.controller.controlList', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            volumeSlider: '#volumeSlider',
            positionSlider: '#positionSlider',
            buttonUp: '#upButton',
            buttonLeft: '#leftButton',
            buttonRight: '#rightButton',
            buttonDown: '#downButton',
            buttonSelect: '#selectButton',
            buttonStart: '#firstButton',
            buttonBackward: '#backwardButton',
            buttonStop: '#stopButton',
            buttonPlay: '#playButton',
            buttonForward: '#forwardButton',
            buttonEnd: '#endButton',
            buttonMute: '#muteButton',
            buttonHome: '#homeButton',
            buttonBack: '#backButton',
            buttonVideoExit: '#videoExitButton',
            buttonMusicExit: '#musicExitButton',
            AudioPanel: '#AudioPanel',
            localForwardButton: '#localForwardButton',
            localBackwardButton: '#localBackwardButton'
        },
        control: {
            volumeSlider: {
                dragend: 'volumeSet'
            },
            positionSlider: {
                dragend: 'positionSet'
            },
            buttonUp: {
                tap: 'onButtonUp'
            },
            buttonLeft: {
                tap: 'onButtonLeft'
            },
            buttonRight: {
                tap: 'onButtonRight'
            },
            buttonDown: {
                tap: 'onButtonDown'
            },
            buttonSelect: {
                tap: 'onButtonSelect'
            },
            buttonStart: {
                tap: 'onButtonStart',
                itemTap: 'onButtonStart'
            },
            buttonBackward: {
                tap: 'onButtonBackward'
            },
            buttonStop: {
                tap: 'onButtonStop'
            },
            buttonPlay: {
                tap: 'onButtonPlay'
            },
            buttonForward: {
                tap: 'onButtonForward'
            },
            buttonEnd: {
                tap: 'onButtonEnd'
            },
            buttonMute: {
                tap: 'onButtonMute'
            },
            buttonBack: {
                tap: 'onButtonBack'
            },
            buttonHome: {
                tap: 'onButtonHome'
            },
            buttonVideoExit: {
                tap: 'onButtonVideoExit'
            },
            buttonMusicExit: {
                tap: 'onButtonMusicExit'
            },
            AudioPanel: {
                ended: 'onAudioEnd'
            },
            localBackwardButton: {
                tap: 'onLocalButtonBackward'
            },
            localForwardButton: {
                tap: 'onLocalButtonForward'
            }
        }
    },

    volumeSet: function (temp, slider, thumb, value) {
        buttonSetVolume(value[0]);
    },
    positionSet: function (temp, slider, thumb, value) {
        setSongPosition(value[0]);
    },
    onButtonUp: function () {
        remoteCmds('Up', xbmcRemoteSuccess, remoteFailure);
    },
    onButtonLeft: function () {
        remoteCmds('Left', xbmcRemoteSuccess, remoteFailure);
        //        Ext.Msg.alert("Button Left", " ");
    },
    onButtonRight: function () {
        remoteCmds('Right', xbmcRemoteSuccess, remoteFailure);
        //        Ext.Msg.alert("Button Right", " ");
    },
    onButtonDown: function () {
        remoteCmds('Down', xbmcRemoteSuccess, remoteFailure);
        //        Ext.Msg.alert("Button Down", " ");
    },
    onButtonSelect: function () {
        remoteCmds('Select', xbmcRemoteSuccess, remoteFailure);
        //        Ext.Msg.alert("Button Select", " ");
    },
    onButtonStart: function () {
        setBackwardPosition();
        //        Ext.Msg.alert("Button Start", " ");
    },
    onButtonBackward: function () {
        buttonPrevNext('previous');
    },
    onButtonStop: function () {
        xbmcCmds('Stop', xbmcCmdSuccess, buttonFailure);
    },
    onButtonPlay: function () {
        xbmcCmds('PlayPause', xbmcCmdSuccess, buttonFailure);
    },
    onButtonForward: function () {
        buttonPrevNext('next');
    },
    onButtonEnd: function () {
        setForwardPosition();
        //        Ext.Msg.alert("Button End", " ");
    },
    onButtonBack: function () {
        remoteCmds('Back', xbmcRemoteSuccess, remoteFailure);
        //        Ext.Msg.alert("Button Down", " ");
    },
    onButtonHome: function () {
        remoteCmds('Home', xbmcRemoteSuccess, remoteFailure);
        //        Ext.Msg.alert("Button Select", " ");
    },
    onButtonMute: function () {
        if (isMuted)
            buttonSetMute(false);
        else
            buttonSetMute(true);
    },
    onButtonVideoExit: function () {
        temp = Ext.getCmp('VideoPanel');
        temp.stop();

        pnl.hide();
        Ext.getCmp('MainScreen').getTabBar().show();
    },
    onButtonMusicExit: function () {
        temp = Ext.getCmp('AudioPanel');
        temp.stop();

        pnl.hide();

        Ext.getCmp('MainScreen').getTabBar().show();
    },
    onAudioEnd: function () {
        tempPanel = Ext.getCmp('AudioPanel');
        if (localIndex == storeLocalMusicPlaylist.data.length) {
            return;
        }
        localIndex++;

        tempRecord = storeLocalMusicPlaylist.getAt(localIndex);
        if (tempRecord == null) {
            return;
        }
        playMusicOnLocal(tempRecord.data.location, tempRecord.data.thumbnail, localIndex);
    },
    onLocalButtonForward: function () {
        tempPanel = Ext.getCmp('AudioPanel');
        if (localIndex == storeLocalMusicPlaylist.data.length) {
            return;
        }
        localIndex++;

        tempRecord = storeLocalMusicPlaylist.getAt(localIndex);
        if (tempRecord == null) {
            return;
        }
        playMusicOnLocal(tempRecord.data.location, tempRecord.data.thumbnail, localIndex);

    },
    onLocalButtonBackward: function () {
        tempPanel = Ext.getCmp('AudioPanel');
        if (localIndex == 0) {
            return;
        }
        localIndex--;

        tempRecord = storeLocalMusicPlaylist.getAt(localIndex);
        if (tempRecord == null) {
            return;
        }
        playMusicOnLocal(tempRecord.data.location, tempRecord.data.thumbnail, localIndex);
    }
});


/************************** SetSongPosition ************************/

function setSongPosition(input) {

    if (currentPlayer == undefined || currentPlayer == null) {
        return;
    }
    var obj = {
        "jsonrpc": "2.0",
        "method": "Player.Seek",
        "params": { "playerid": currentPlayer, "value": input },
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: setSongPositionSuccess,
        failure: setSongPositionFailure,
        timeout: interfaceTimeout
    });

}

function setSongPositionFailure(t) {
    alert('buttonClearPlayListFailure failure t:' + t);
}

function setSongPositionSuccess(t) {
    var responseArr = Ext.decode(t.responseText);
}

/************************** setForwardPosition ************************/

function setForwardPosition() {

    if (currentPlayer == undefined || currentPlayer == null) {
        return;
    }
    var obj = {
        "jsonrpc": "2.0",
        "method": "Player.Seek",
        "params": { "playerid": currentPlayer, "value": "smallforward" },
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: setSongPositionSuccess,
        failure: setSongPositionFailure,
        timeout: interfaceTimeout
    });

}
/************************** setBackwardPosition ************************/

function setBackwardPosition() {

    if (currentPlayer == undefined || currentPlayer == null) {
        return;
    }
    var obj = {
        "jsonrpc": "2.0",
        "method": "Player.Seek",
        "params": { "playerid": currentPlayer, "value": "smallbackward" },
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: setSongPositionSuccess,
        failure: setSongPositionFailure,
        timeout: interfaceTimeout
    });

}

/********************* Generic JSON function call *****************/
function xbmcComm(method, successComm, failureComm) {

    var obj = {
        "jsonrpc": "2.0",
        "method": method,
        "id": 1
    };

    var tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: successComm,
        failure: failureComm,
        timeout: interfaceTimeout
    });
}

/********************* JSONRPC.Introspect **********************/
function GetIntroRetroSpec() {
    xbmcComm("JSONRPC.Introspect", successIntroSpec, failureIntroSpec);
}

function successIntroSpec(t) {
    retrospect = Ext.decode(t.responseText);
}

function failureIntroSpec(t) {
    var response = Ext.decode(t.responseText);
}

/********************* JSONRPC.Ping **********************/
function GetPing() {
    xbmcComm("JSONRPC.Ping", successPing, failurePing);
}

function successPing(t) {
    var temp = Ext.decode(t.responseText);
}

function failurePing(t) {
    var response = Ext.decode(t.responseText);
}

/********************* Misc commands ***********************/

function xbmcCmdsFailure(t) {
    alert('xbmcCmds failure t:' + t);
}

function xbmcCmdSuccess(t) {
    var responseArr = Ext.decode(t.responseText);
}

function xbmcCmds(command, callbackFunctionSuccess, callbackFunctionFailure) {
    if (connectStatus != 'Connected')
        return;

    var obj = {
        "jsonrpc": "2.0",
        "method": "Player." + command,
        "params": { "playerid": currentPlayer },
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: callbackFunctionSuccess,
        failure: callbackFunctionFailure,
        timeout: interfaceTimeout
    });
}

function buttonFailure(t) {
    alert('buttonPlayFailure failure t:' + t);
}

function remoteFailure(t) {
    alert('remoteFailure failure t:' + t);
}

function xbmcRemoteSuccess(t) {
    var responseArr = Ext.decode(t.responseText);
}

function remoteCmds(command, callbackFunctionSuccess, callbackFunctionFailure) {
    if (connectStatus != 'Connected')
        return;

    var obj = {
        "jsonrpc": "2.0",
        "method": "Input." + command,
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: callbackFunctionSuccess,
        failure: callbackFunctionFailure,
        timeout: interfaceTimeout
    });
}

function buttonPrevNext(action) {
    if (connectStatus != 'Connected')
        return;

    var obj = {
        "jsonrpc": "2.0",
        "method": "Player.GoTo",
        "params": { "playerid": currentPlayer, "to": action },
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: remoteprevNextSuccess,
        failure: remoteprevNextFailure,
        timeout: interfaceTimeout
    });
}

function remoteprevNextFailure(t) {
    alert('prevNextFailure failure t:' + t);
}

function remoteprevNextSuccess(t) {
    var responseArr = Ext.decode(t.responseText);
    updatePlaylistIndex(currentPlaylist);
}

/****************** buttonSetVolume **************************/
function buttonSetVolume(volumeLevel) {

    var obj = {
        "jsonrpc": "2.0",
        "method": "Application.SetVolume",
        "params": {
            "volume": volumeLevel
        },
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: buttonSetVolumeSuccess,
        failure: buttonSetVolumeFailure,
        timeout: interfaceTimeout
    });
}

function buttonSetVolumeSuccess(t) {
    getVolume();
}

function buttonSetVolumeFailure(t) {
    alert('buttonSetVolumeFailure failure t:' + t);
}

/****************** buttonSetMute **************************/
function buttonSetMute(muteSetting) {

    var obj = {
        "jsonrpc": "2.0",
        "method": "Application.SetMute",
        "params": {
            "mute": muteSetting
        },
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: buttonSetMuteSuccess,
        failure: buttonSetMuteFailure,
        timeout: interfaceTimeout
    });
}

function buttonSetMuteFailure(t) {
    alert('buttonSetMuteFailure failure t:' + t);
}

function buttonSetMuteSuccess(t) {
    getVolume();
}


/********************* getVolume ***********************/

function getVolume() {

    var obj = {
        "jsonrpc": "2.0",
        "method": "Application.GetProperties",
        "params": {
            "properties": ["volume", "muted"]
        },
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: getVolumeSuccess,
        failure: getVolumeFailure,
        timeout: interfaceTimeout
    });
}

function getVolumeSuccess(t) {
    var responseArr = Ext.decode(t.responseText);
    currentVolume = responseArr.result.volume;
    isMuted = responseArr.result.muted;
    Ext.getCmp('volumeSlider').setValue(currentVolume, false);

    if (isMuted) {
        Ext.getCmp('muteButton').setIconCls('ico_volume_mute_2');
    }
    else {
        var tempString = 'ico_volume_med'
        if (currentVolume == 0) {
            tempString = 'ico_volume_mute';
        } else if (currentVolume < 40) {
            tempString = 'ico_volume_low';
        } else if (currentVolume > 70) {
            tempString = 'ico_volume_high';
        }
        Ext.getCmp('muteButton').setIconCls(tempString);
    }
}

function getVolumeFailure(t) {
    alert('getVolumeFailure t:' + t);
}



/**********************************************/
/****************** buttonFullScreen **************************/

function toggleFullScreen() {
    var obj = {
        "jsonrpc": "2.0",
        "method": "GUI.SetFullscreen",
        "params": {
            "fullscreen": "toggle"
        },
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: buttonFullscreenSuccess,
        failure: buttonFullscreenFailure,
        timeout: interfaceTimeout
    });
}

function buttonFullscreenFailure(t) {
    alert('buttonClearPlayListFailure failure t:' + t);
}

function buttonFullscreenSuccess(t) {
    var response = Ext.decode(t.responseText);
}

function playMusicLocalSuccess(t) {
    var responseArr = Ext.decode(t.responseText);
    var path = responseArr.result.details.path;
    var myFanArt = null;

    if (pnl == null) {
        pnl = new Ext.Panel({
            fullscreen: true,
            id: 'localFanArtBackground',
            layout: 'hbox',
            style: 'background-image: url(/resources/images/agsandrew-d6cl17u.jpg); background-color: transparent; background-size: 100% 100%;',
            items: [
            {
                flex: 2,
                layout: 'fit',
                items: [
                {
                    layout: 'fit',
                    xtype: 'panel',
                    id: 'localCurrentlyPlayingText',
                    html: ' ',
                    style: 'background-color: rgba(0, 0, 0, .4);'
                },
                {
                    width: '90%',
                    left: '5%',
                    top: '80%',
                    xtype: 'audio',
                    id: 'AudioPanel',
                    muted: false,
                    volume: 1.0,
                    cls: 'myAudio',
                    enableControls: true
                },
                {
                    xtype: 'button',
                    iconCls: 'ico_backward_2',
                    align: 'right',
                    left: 85,
                    top: '65%',
                    id: 'localBackwardButton',
                    //                                        iconMask: true,
                    ui: 'buttonCharcoal',
                    height: 48,
                    width: 64
                }, {
                    xtype: 'button',
                    iconCls: 'ico_forward_3',
                    align: 'right',
                    left: 200,
                    top: '65%',
                    id: 'localForwardButton',
                    //                                        iconMask: true,
                    ui: 'buttonCharcoal',
                    height: 48,
                    width: 64
                },
                {
                    xtype: 'button',
                    iconCls: 'ico_close',
                    align: 'right',
                    left: 270,
                    top: '65%',
                    id: 'musicExitButton',
                    //                                        iconMask: true,
                    ui: 'buttonCharcoal',
                    height: 48,
                    width: 64
                }
                ]
            },
            {
                flex: 2,
                layout: 'fit',
                xtype: 'localMusicPlaylist',
                scrollable: true,
                id: 'localMusicPlaylist',
                scrollToTopOnRefresh: false,
                store: 'localMusicPlaylists',
                useComponents: true

            }

            ]

        });
    }

    temp = Ext.getCmp('AudioPanel');
    temp.setUrl("http://" + hostAddress + '/' + path);
    temp.play();
    temp = Ext.getCmp('localCurrentlyPlayingText');
    tempRecord = storeLocalMusicPlaylist.getAt(localIndex);
    tempString = "<span style=\"font-size:48px; color:white;\"><b>" + tempRecord.data.name + "</b></span><br>";
    tempString += "<span style=\"font-size:30px; color:white;\">" + tempRecord.data.album + "</span>";
    temp.setHtml(tempString);
    myFanArt = Ext.getCmp('localFanArtBackground');
    if (tempRecord.data.fanart == "") {
//        myFanArt.src = '/resources/images/agsandrew-d6cl17u.jpg';
//        tempString = encodeURIComponent('/resources/images/agsandrew-d6cl17u.jpg');
        myFanArt.setStyle({ backgroundImage: 'url(' + '/resources/images/agsandrew-d6cl17u.jpg' + ')' });
    } else
    {
        tempString = encodeURIComponent(tempRecord.data.fanart);
        imgFanArtSrc = "http://" + hostAddress + "/image/" + tempString;
        myFanArt.setStyle({ backgroundImage: 'url(' + imgFanArtSrc + ')' });
    }


    Ext.getCmp('MainScreen').getTabBar().hide();
    pnl.show();
}

function playMusicLocalFailure(t) {
    alert('playMusicLocalFailure failure t:' + t);
}

function  playMusicOnLocal(file, fanart, index) {


    var obj = {
        "jsonrpc": "2.0",
        "method": "Files.PrepareDownload",
        "params": {
            "path": file
        },
        "id": "playAlbum"
    };

    localFanart = fanart;
    localIndex = index;

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: playMusicLocalSuccess,
        failure: playMusicLocalFailure,
        timeout: interfaceTimeout
    });

}



function GetCurrentlyPlaying() {

    var obj = {
        "jsonrpc": "2.0",
        "method": "Player.GetActivePlayers",
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: GetCurrentlyPlaying_1,

        failure: getCurrentlyPlayingFailure,
        timeout: interfaceTimeout
    });
}

function GetCurrentlyPlaying_1(t) {
    var responseArr = Ext.decode(t.responseText);
    var obj = null;

    var myAlbumArt = Ext.getCmp('albumArt');
    var myFanArt = Ext.getCmp('fanArtBackground');
    var myPlayingText = Ext.getCmp('currentlyPlayingText');

    if (responseArr.result == undefined) {
        return;
    }
    if (responseArr.result[0] == undefined) {
        myPlayingText.setHtml("");
        myFanArt.setStyle({ backgroundImage: 'url(' + "/resources/images/agsandrew-d6cl17u.jpg" + ')' });
        myAlbumArt.setStyle({ backgroundImage: 'url(' + "resources/images/defaultAlbumCover.png" + ')' });
        playlistCurrentIndex = -1;

        if ((playlistCurrentIndex != playlistSavedIndex) && (playlistCurrentIndex != undefined)) {
            var playListType = "Music";

            if (responseArr.id == "getCurrentPlayingVideo") {
                playListType = "Video";
            }
            updatePlaylist(playListType);
            playlistSavedIndex = playlistCurrentIndex;
            playlistSavedType = currentPlaylist;
        }

        return;
    }

    var temp = responseArr.result[0].playerid;

    currentPlayer = temp;
    obj = {
        "jsonrpc": "2.0",
        "method": "Player.GetItem",
        "params": { "playerid": currentPlayer, "properties": ["title", "artist", "genre", "album", "duration", "file", "thumbnail", "fanart", "art"] },
        "id": "getCurrentPlayingMusic"

    }
    if (temp == 1) {
        obj = {
            "jsonrpc": "2.0",
            "method": "Player.GetItem",
            "params": { "playerid": currentPlayer, "properties": ["title", "year", "thumbnail", "runtime", "duration", "season", "episode", "showtitle", "premiered", "art"] },
            "id": "getCurrentPlayingVideo"
        };
    }

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: getCurrentlyPlayingSuccess,
        failure: getCurrentlyPlayingFailure,
        timeout: interfaceTimeout
    });

}

function getCurrentlyPlayingSuccess(t) {
    var responseArr = Ext.decode(t.responseText);
    var imgPosterSrc;
    var imgFanArtSrc;
    var thumbnail = undefined;
    var fanArt = undefined;

    var myAlbumArt = Ext.getCmp('albumArt');
    var myFanArt = Ext.getCmp('fanArtBackground');
    var myPlayingText = document.getElementById('currentlyPlayingText');
    var defaultCover = undefined;

    if (currentPlayer == 0)
        defaultCover = "/resources/images/defaultAlbumCover.png";
    else
        defaultCover = "/resources/images/defaultMovieCover.jpg";

    if (responseArr.result.item == undefined || responseArr.error != null) {
        myPlayingText.innerHTML = "Nothing Playing";
        myAlbumArt.src = defaultCover;
        myFanArt.src = "/resources/images/agsandrew-d6cl17u.jpg";
        return;
    }

    if (currentPlayer == 0) {
        thumbnail = responseArr.result.item.thumbnail;
        fanArt = responseArr.result.item.fanart;
    } else {
        thumbnail = responseArr.result.item.art.poster;
        fanArt = responseArr.result.item.art.fanart;
    }
    if (responseArr.result.item.title == "")
        currentlyPlayingString = "<span style=\"font-size:48px; color:white;\"><b>" + responseArr.result.item.label + "</b></span><br>";
    else
        currentlyPlayingString = "<span style=\"font-size:48px; color:white;\"><b>" + responseArr.result.item.title + "</b></span><br>";

    if (responseArr.result.item.type == 'song' || responseArr.result.item.type == 'unknown') {
        currentlyPlayingString += (responseArr.result.item.artist) ? "<span style=\"font-size:30px; color:white;\">" + responseArr.result.item.album + "<br>" + responseArr.result.item.artist + "</span>" : '';
    }

    if (thumbnail == "" || thumbnail == undefined || thumbnail == "image://DefaultAlbumCover.png/") {
        imgPosterSrc = defaultCover;
    } else {
        var tempString = encodeURIComponent(thumbnail);
        imgPosterSrc = "http://" + hostAddress + "/image/" + tempString;
    }

    if (fanArt == "" || fanArt == undefined) {
        imgFanArtSrc = "/resources/images/agsandrew-d6cl17u.jpg";
    } else {
        tempString = encodeURIComponent(fanArt);
        imgFanArtSrc = "http://" + hostAddress + "/image/" + tempString;
    }

    myAlbumArt.setStyle({ backgroundImage: 'url(' + imgPosterSrc + ')' });
    myFanArt.setStyle({ backgroundImage: 'url(' + imgFanArtSrc + ')' });

    if ((playlistCurrentIndex != playlistSavedIndex) && (playlistCurrentIndex != undefined)) {
        var playListType = "Music";

        if (responseArr.id == "getCurrentPlayingVideo") {
            playListType = "Video";
        }
        updatePlaylistIndex(playListType);
        playlistSavedIndex = playlistCurrentIndex;
        playlistSavedType = currentPlaylist;
    }

    getCurrentlyPlayingTime();
}

function getCurrentlyPlayingTimeFailure(t) {
}

function getCurrentlyPlayingTime() {

    var obj = {
        "jsonrpc": "2.0",
        "method": "Player.GetProperties",
        "params": { "playerid": currentPlayer, "properties": ["time", "totaltime", "position", "shuffled", "repeat", "percentage"] },
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: getCurrentlyPlayingTimeSuccess,
        failure: getCurrentlyPlayingFailure,
        timeout: interfaceTimeout
    });
}

function secondsToHms(timeInSeconds) {
    var time = "";
    var sec_num = parseInt(timeInSeconds, 10); // don't forget the second parm     
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    if (hours == "00") {
        time = minutes + ':' + seconds;
    } else {
        time = hours + ':' + minutes + ':' + seconds;
    }
    return time;
}
function hms(secs) {
    time = [0, 0, secs];
    for (var i = 2; i > 0; i--) {
        time[i - 1] = Math.floor(time[i] / 60);
        time[i] = time[i] % 60;
        if (time[i] < 10)
            time[i] = '0' + time[i];
    };
    return time.join(':')
}

function getCurrentlyPlayingTimeSuccess(t) {
    var responseArr = Ext.decode(t.responseText);
    var myPlayingText = Ext.getCmp('currentlyPlayingText');

    connectStatus = 'Connected';

    if (responseArr.error == undefined) {
        var currentTime = parseInt(responseArr.result.time.seconds) + (parseInt(responseArr.result.time.minutes * 60)) + (parseInt(responseArr.result.time.hours) * 3600);
        var totalTime = parseInt(responseArr.result.totaltime.seconds) + (parseInt(responseArr.result.totaltime.minutes * 60)) + (parseInt(responseArr.result.totaltime.hours) * 3600);

        var percentage = (parseInt(responseArr.result.percentage));

        var tempCmp = Ext.getCmp('positionSlider');
        tempCmp.setValue(percentage);

        myPlayingText.setHtml(currentlyPlayingString + "<span style=\"font-size:24px; color:white;\"><br>" + secondsToHms(currentTime) + ' / ' + secondsToHms(totalTime) + "</span>");

        playlistCurrentIndex = responseArr.result.position;
    }

    var obj = {
        "jsonrpc": "2.0",
        "method": "GUI.GetProperties",
        "params": { "properties": ["currentwindow"] },
        "id": 1
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: getGUIPropertiesSuccess,
        failure: getGUIPropertiesFailure,
        timeout: interfaceTimeout
    });

}

function getCurrentlyPlayingFailure(t) {
    connectStatus = 'Not Connected';
}

function getGUIPropertiesFailure(t) {
    var responseArr = Ext.decode(t.responseText);
}

function getGUIPropertiesSuccess(t) {
    var responseArr = Ext.decode(t.responseText);
}
