Ext.define('touchcontrol.controller.videoMovieView', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'mainpanel',
            videoMovie: 'videoContainer',
            videoMediaView: 'videoContainer videoMediaView',
            productView: {
                autoCreate: true,
                xtype: 'movieSelected',
                selector: 'movieSelected'
            },
            playMovieButton: '#playMovieButton',
            addMovieToPlaylistButton: '#addMovieToPlaylistButton'
        },
        control: {
            videoMediaView: {
                itemtap: 'onMovieTap',
                disclose: 'onDisclose'
            },
            navVideoLibary: {
                pop: 'onMovieBackButton'
            },
            playMovieButton: {
                tap: 'onPlayMovie',
                itemtap: 'onPlayMovie'
            },
            addMovieToPlaylistButton: {
                tap: 'onAddMovieToPlaylist',
                itemtap: 'onAddMovieToPlaylist'
            }
        }
    },
    init: function () {
        this.callParent();
        this.movieSelected = Ext.create('touchcontrol.view.video.movieSelected');
    },
    onOrientationchange: function (viewport, orientation, width, height) {
        var tempCmp = Ext.getCmp('videoMediaView');

        console.log('Viewport orientation just changed');
        if (orientation == "landscape") {
            tempCmp.getLayout().setOrient('horizontal');
        } else {
            tempCmp.getLayout().setOrient('vertical');
        }
    },
    onMovieBackButton: function () {
        var temp = this.getNavVideoLibary();
        temp.setActiveItem(0);
    },
    onAddMovieToPlaylist: function() {
        var temper = Ext.getCmp('description')._data;
        addMovieToPlaylist(temper);
        var temp = Ext.getCmp('movieSelected');
        temp.hide();
    },
    onPlayMovie: function () {
        var temper = Ext.getCmp('description')._data;
        playVideo(temper);
        var temp = Ext.getCmp('movieSelected');
        temp.hide();
    },
    getMovieSelected: function () {
        return this.movieSelected;
    },
    onMovieTap: function (list, idx, el, record, e) {
        var temp = this.getVideoMediaView();
        if (e.getTarget('div.x-list-disclosure')) {
            return null;
        }
        if (e.target.className == "playlistEntry") {
            addMovieToPlaylist(record);
            return null;
        }

        if (e.target.className == "playEntry") {
            playVideo(record);
            return null;
        }

        var movieSelected = this.getMovieSelected();

        movieSelected.setData(record);

        if (!movieSelected.getParent()) {
            Ext.Viewport.add(movieSelected);
        }

        movieSelected.show();
    },
    onDisclose: function (view, record, target, index, event) {
        addMovieToPlaylist(record);
    }
});


function playVideo(record) {


    if (Ext.getCmp('localSelect').getValue() == 'Local') {
        playVideoOnLocal(record.data.file, record.data.fanart);
    } else {
        playVideoOnXBMC(record);
    }
}

function playVideoOnXBMC(record) {
    if (currentPlayer == undefined || currentPlayer == null) {
        return;
    }

    if (record.data.resume == "0") {
        playVideoFromPosition(record, 0);
        return;
    }

    resumeMessageBox(record);
}


function resumeMessageBox(record) {
    var resumeSeconds = parseInt(record.data.resume);
    var hours = Math.floor(resumeSeconds / 3600);
    var minutes = Math.floor((resumeSeconds % 3600) / 60);
    var seconds = (resumeSeconds % 3600) % 60;
    //    var tempString = 'Resume \"' + record.data.title + '\" at ' + hours + ':' + minutes + ':' + seconds;
    var tempString = 'Resume \"' + record.data.title + '\" at ' + hms(resumeSeconds);

    Ext.Msg.confirm(
        "Resume Movie",
        tempString,
        function (buttonId) {
            if (buttonId == 'yes') {
                playVideoFromPosition(record, resumeSeconds);
            } else {
                playVideoFromPosition(record, 0);
            }
        },
        this
    );
}

function playVideoFromPosition(record, startPosistion) {
    var resumeOption = false;
    if (startPosistion > 0) {
        resumeOption = true;
    }
    var obj = {
        "jsonrpc": "2.0",
        "method": "Player.Open",
        "params": {
            "item": {
                "movieid": record.data.id
            },
            "options": { "resume": resumeOption }
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
