Ext.define('touchcontrol.controller.videoMovieList', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'mainpanel',
            videoMovie: 'videoContainer',
            videoMediaList: 'videoContainer videoMediaList'
        },
        control: {
            videoMediaList: {
                itemtap: 'onMovieTap',
                disclose: 'onDisclose'
            },
            navVideoLibary: {
                pop: 'onMovieBackButton'
            }
        }
    },
    onMovieBackButton: function () {
        var temp = this.getNavVideoLibary();
        temp.setActiveItem(0);
    },
    onMovieTap: function (list, idx, el, record, e) {
        var temp = this.getVideoMediaList();
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
        handleVideoMovieSelected(record);
        var temp = Ext.getCmp('navVideoLibaryInfo');
        temp.setActiveItem(1);

    },
    onDisclose: function (view, record, target, index, event) {
        addMovieToPlaylist(record);
    }
});
