Ext.define('touchcontrol.view.music.card', {

    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.Button',
        'Ext.Img',
        'Ext.List',
        'Ext.navigation.View',
        'touchcontrol.view.music.genreList',
        'touchcontrol.view.music.artistList',
        'touchcontrol.view.music.albumList',
        'touchcontrol.view.music.songList',
        'touchcontrol.view.music.artistInfo',
        'touchcontrol.view.music.albumInfo',
        'touchcontrol.view.music.musicSearchList',
        'touchcontrol.view.music.searchButton',
        'touchcontrol.view.music.localMusicPlaylist'
    ],


    extend: 'Ext.Container',
    xtype: 'musicContainer',
    id: 'musicContainer',
    config: {

        tab: {
            title: 'Music',
            iconCls: 'ico_music'
        },
        autoDestroy: false,

        layout: 'hbox',
        style: 'background-color: black',
        styleHtmlContent: true,
        masked: {
            xtype: 'loadmask',
            message: 'Please Wait ...'
        },
        items: [
            {
                flex: 2,
                layout: 'card',
                id: 'navMusicLibaryInfo',
                style: 'background-color: black',
                items: [
                {
                    html: 'No Info',
                    style: 'background-color: black'
                },
                {
                    xtype: 'artistInfo',
                    itemId: 'artistInfoPanel',
                    style: 'background-color: black'
                },
                {
                    xtype: 'albumInfo',
                    itemId: 'albumInfoPanel',
                    style: 'background-color: black'
                }
                ]
            }, {
                width: 10
            }, {
                flex: 2,
                xtype: 'navigationview',
                id: 'navMusicLibary',
                defaultBackButtonText: '',
                navigationBar: {
                    ui: 'charcoal',
                    backButton: {
                        iconCls: 'ico_arrow_left',
                        ui: 'plain'
                    },
                    items: [
                        {
                            xtype: 'button',
                            id: 'musicSearchButton',
                            text: 'Search',
                            align: 'right',
                            ui: 'plain'
                        }
                    ]
                },
                items: [
                {
                    layout: 'fit',
                    title: 'Genre',
                    items: [
                    {
                        xtype: 'genreList',
                        scrollable: true,
                        itemId: 'navGenreList',
                        style: 'background-color: black',
                        store: 'musicGenres'
                    }]
                }]
            }
        ]
    }
});
