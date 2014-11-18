Ext.define('touchcontrol.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainContainer',
    id: 'mainContainer',
    requires: [
        'Ext.data.Store',
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.Button',
        'Ext.form.Panel',
        'Ext.field.Toggle',
        'touchcontrol.view.music.card',
        'touchcontrol.view.video.card',
        'touchcontrol.view.tvShow.card',
        'touchcontrol.view.shares.card'
    ],
    config: {
        id: 'MainScreen',
        autoMaximize: true,
        fullscreen: true,
        tabBarPosition: 'bottom',
        ui: 'tabcolour',
        items: [
            { xclass: 'touchcontrol.view.playing.card' },
            { xclass: 'touchcontrol.view.playlists.card' },
            { xclass: 'touchcontrol.view.shares.card' },
            { xclass: 'touchcontrol.view.music.card' },
            { xclass: 'touchcontrol.view.video.card' },
            { xclass: 'touchcontrol.view.tvShow.card' }
        ],
        listeners: {
            activeitemchange: function (me, newCard) {
                if (newCard.id == 'videoContainer') {
                    tempCount = storeVideoLibrary.getCount();
                    if (tempCount == 0) {
                        getAllMovies();
                    }
                }
            }
        }

    }
});

