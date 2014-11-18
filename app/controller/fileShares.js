var musicShareAction = false;
var nodeId = 1;
var currentNode = null;
var sharesMaxAmmount = 25;

Ext.define('touchcontrol.controller.fileShares', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            sharesMusic: 'musicSharesView',
            sharesVideo: 'videoSharesView'
        },
        control: {
            sharesMusic: {
                list_itemtap: 'onListItemTap',
                play_itemtap: 'onPlayItemTap',
                itemtap: 'onMusicShareTap'
            },
            sharesVideo: {
                itemtap: 'onVideoShareTap',
                list_itemtap: 'onVideoListItemTap',
                play_itemtap: 'onVideoPlayItemTap'
            }

        }
    },
    onPlayItemTap: function (list, index, target, e, record) {
        if (Ext.getCmp('localSelect').getValue() == 'Local') {
            addMusicShareToLocalPlaylist(record.data.filetype, record.data.path, "Play")
            //            addArtistToLocalPlaylist(record, "Play");
        } else {
            playMusicShare(record.data.filetype, record.data.path);
        }
    },
    onListItemTap: function (list, index, target, e, record) {
        if (Ext.getCmp('localSelect').getValue() == 'Local') {
            addMusicShareToLocalPlaylist(record.data.filetype, record.data.path, "NoPlay")
            //            addArtistToLocalPlaylist(record, "Play");
        } else {
            addMusicShareToPlaylist(record.data.filetype, record.data.path)
        }
    },
    onMusicShareTap: function (view, list, index, target, record, event) {
        var temp = record;
        if (temp.data.leaf == true) {
            return;
        }
        if (temp.data.loaded == true) {
            return;
        }
        getSharesDirectory(record)
    },
    onVideoPlayItemTap: function (list, index, target, e, record) {      
        playVideoShare(record.data.filetype, record.data.path);
    },
    onVideoListItemTap: function (list, index, target, e, record) {
        addVideoShareToPlaylist(record.data.filetype, record.data.path)
    },
    onVideoShareTap: function (view, list, index, target, record, event) {
        var temp = record;
        if (temp.data.leaf == true) {
            return;
        }
        getSharesDirectory(record)
    }

});


function playMusicShare(filetype, path) {
    if (filetype == 'directory') {
        var obj = {
            "jsonrpc": "2.0",
            "method": "Player.Open",
            "params": {
                "item": {
                    "directory": path
                }
            },
            "id": "addToMusicPlaylist"
        };

    } else {
        var obj = {
            "jsonrpc": "2.0",
            "method": "Player.Open",
            "params": {
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
        success: playMusicSuccess,
        failure: playMusicFailure,
        timeout: interfaceTimeout
    });
}


function playMusicFailure(t) {
    musicShareAction = false;
    alert('playAlbumFailure failure t:' + t);
}

function playMusicSuccess(t) {
    musicShareAction = false;
    var responseArr = Ext.decode(t.responseText);
    updatePlaylist("Music");
}


function playVideoShare(filetype, path) {

    if (filetype == 'directory') {
        var obj = {
            "jsonrpc": "2.0",
            "method": "Player.Open",
            "params": {
                "item": {
                    "directory": path
                }
            },
            "id": "addToVideoPlaylist"
        };

    } else {
        var obj = {
            "jsonrpc": "2.0",
            "method": "Player.Open",
            "params": {
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
        success: playVideoSuccess,
        failure: playVideoFailure,
        timeout: interfaceTimeout
    });
}


var nodeId = 1;
var currentNode = null;


function getShares(type) {

    var obj = {
        "jsonrpc": "2.0",
        "method": "Files.GetSources",
        "params": {
            "media": type
        },
        "id": 1
    };

    if (type == 'music') {
        successFunction = getMusicSharesSuccess;
        obj.params.media = "music";
    }
    else {
        successFunction = getVideoSharesSuccess;
        obj.params.media = "video";
    }

    var tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: successFunction,
        failure: getSharesFailure,
        timeout: interfaceTimeout
    });
}

function getMusicSharesSuccess(t) {

    var responseArr = Ext.decode(t.responseText);

    //    return;

    for (var i = 0; i < responseArr.result.limits.total; i++) {

        var newNode = Ext.create('touchcontrol.model.fileShare', {
            text: responseArr.result.sources[i].label,
            path: responseArr.result.sources[i].file,
            filetype: 'shareRoot',
            img: 'resources/images/folder.png',
            expandable: true,
            leaf: false,
            id: nodeId
        });

        var rootNode = storeMusicFileShare.getRoot();

        rootNode.appendChild(newNode);
        nodeId++;
    }

    storeMusicFileShare.getRoot().expand();
    storeMusicFileShare.sync();
}

function getVideoSharesSuccess(t) {


    var responseArr = Ext.decode(t.responseText);

    //    return;

    for (var i = 0; i < responseArr.result.limits.total; i++) {

        var newNode = Ext.create('touchcontrol.model.fileShare', {
            text: responseArr.result.sources[i].label,
            path: responseArr.result.sources[i].file,
            filetype: 'shareRoot',
            img: 'resources/images/folder.png',
            expandable: true,
            leaf: false,
            id: nodeId
        });

        var rootNode = storeVideoFileShare.getRoot();

        rootNode.appendChild(newNode);
        nodeId++;
    }
    storeVideoFileShare.getRoot().expand();
    storeVideoFileShare.sync();
    Ext.getCmp('sharesContainer').setMasked(false);

}



function getSharesFailure(t) {
    alert('getSharesFailure failure t:' + t);
}


function getSharesDirectory(node) {

    currentNode = node;
    Ext.getCmp('sharesContainer').setMasked(true);


    newNode = Ext.create('touchcontrol.model.fileShare', {
        text: "empty",
        path: "",
        filetype: "",
        expandable: false,
        leaf: false
        //                id: nodeId
    });
    currentNode.appendChild(newNode);

    var obj = {
        "jsonrpc": "2.0",
        "method": "Files.GetDirectory",
        "params": {
            "limits": { "end": sharesMaxAmmount, "start": 0 },
            "directory": node.data.path
        },
        "id": node.data.path
    };

    var tempStr = Ext.encode(obj);
    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: getMusicSharesDirectorySuccess,
        failure: getSharesDirectoryFailure,
        timeout: interfaceTimeout
    });
}

function getMusicSharesDirectorySuccess(t) {

    var response = Ext.decode(t.responseText);
    var temp = currentNode;
    var tempFileShares = [];
    var fileSharesCount = 0;
    var nodeName = "";

    if (response.result != null) {
        responseCount = response.result.limits.total;
    } else {
        return;
    }

    fileSharesCount = response.result.limits.end - response.result.limits.start;

    if (responseCount == temp.childNodes.length) {
        return;
    }

    if (temp.childNodes.length == 1) {
        temp.removeChild(temp.firstChild, true);
    }
    nodeName = response.id;
    
    responseFiles = response.result.files;

    for (i = 0; i < fileSharesCount; i++) {

        if (responseFiles[i].filetype == 'directory') {
            newNode = Ext.create('touchcontrol.model.fileShare', {
                text: responseFiles[i].label,
                path: responseFiles[i].file,
                filetype: responseFiles[i].filetype,
                expandable: true,
                img: 'resources/images/folder.png',
                leaf: false,
                childNodes: [{ "text": "empty" }],
                id: nodeId
            });
        } else {
            newNode = Ext.create('touchcontrol.model.fileShare', {
                text: responseFiles[i].label,
                path: responseFiles[i].file,
                filetype: responseFiles[i].filetype,
                expandable: false,
                leaf: true,
                img: 'resources/images/file.png',
                id: nodeId
            });

        }

        //        nodeRef = storeMusicFileShare.getById(temp.id);
        //        temp.appendChild(newNode);

        tempFileShares[i] = newNode;
        nodeId++;
    }

    var rootNode = storeMusicFileShare.getRoot();
    rootNode.suspendEvents();
    //    temp.suspendEvents();
    temp.appendChild(tempFileShares);
    //    temp.resumeEvents();
    rootNode.resumeEvents();


    if (response.result.limits.end >= response.result.limits.total) {

        Ext.getCmp('sharesContainer').setMasked(false);
        temp.expand();
        storeMusicFileShare.sync();

    } else {
        var tempNum = (response.result.limits.end / response.result.limits.total);

        var tempString = "Loading..." + (tempNum * 100).toFixed(0) + "%";
        Ext.getCmp('sharesContainer').getMasked().setMessage(tempString);
        tempNum = response.result.limits.total - response.result.limits.end;
        if (tempNum > sharesMaxAmmount)
            tempNum = sharesMaxAmmount;
        var tempStart = response.result.limits.end;
        var tempEnd = response.result.limits.end + tempNum;

        var obj = {
            "jsonrpc": "2.0",
            "method": "Files.GetDirectory",
            "params": {
                "limits": { "end": tempEnd, "start": tempStart },
                "directory": nodeName
            },
            "id": nodeName
        };

        var tempStr = Ext.encode(obj);
        Ext.Ajax.request({
            url: '/jsonrpc',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params: tempStr,
            success: getMusicSharesDirectorySuccess,
            failure: getSharesDirectoryFailure,
            timeout: interfaceTimeout
        });
    }

}

function getVideoSharesDirectorySuccess(t) {

    var responseArr = Ext.decode(t.responseText);

}

function getSharesDirectoryFailure(t) {
    alert('getSharesDirectoryFailure failure t:' + t);
}


function addMusicShareToLocalPlaylist(filetype, path, playState) {

    var tempPlaylist = [];

    if (filetype != 'directory') {
        var tempIndex = storeLocalMusicPlaylist.getCount();
        var tempName = path.split('\\').pop().split('/').pop();

        tempPlaylist[0] = new Array(tempIndex,
                                            tempName,
                                            path,
                                            "",
                                            "",
                                            "",
                                            "",
                                            "",
                                            "",
                                            "");

        storeLocalMusicPlaylist.add(tempPlaylist);
        if (playState == "Play") {
            playMusicOnLocal(path, "", tempIndex);
        }
    } else {
        var obj = {
            "jsonrpc": "2.0",
            "method": "Files.GetDirectory",
            "params": {
                "directory": path
            },
            "id": playState
        };
        tempStr = Ext.encode(obj);
        Ext.Ajax.request({
            url: '/jsonrpc',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params: tempStr,
            success: addMusicDirectoryToLocalPlaylistSuccess,
            failure: addToPlayListFailure,
            timeout: interfaceTimeout
        });
    }

}


function addMusicDirectoryToLocalPlaylistSuccess(t) {
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
    responsePlaylist = response.result.files;

    for (var i = 0; i < tempCount; i++) {

        tempName = responsePlaylist[i].label;
        if (tempName == "") {
            tempName = responsePlaylist[i].file.split('\\').pop().split('/').pop();
        }
        tempPlaylist[tempIndex] = new Array(tempIndex,
                                            tempName,
                                             responsePlaylist[i].file,
                                            "",
                                            "",
                                            "",
                                            "",
                                            "",
                                            "",
                                            "");
        tempIndex++;
    }

    storeLocalMusicPlaylist.add(tempPlaylist);

    if (playState == "Play") {
        tempRecord = storeLocalMusicPlaylist.getAt(0);
        playMusicOnLocal(tempRecord.data.location, tempRecord.data.thumbnail, 0);
    }

}
