Ext.define('touchcontrol.view.video.card', {

    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.Button',
        'Ext.Img',
        'Ext.List',
        'Ext.navigation.View',
        'touchcontrol.view.video.movieInfo',
        'touchcontrol.view.video.videoGenresList',
        'touchcontrol.view.video.videoMediaList',
        'touchcontrol.view.video.videoMediaView',
        'touchcontrol.view.video.movieSelected'
],


    extend: 'Ext.Container',
    xtype: 'videoContainer',
    id: 'videoContainer',
    config: {

        tab: {
            title: 'Video',
            id: 'videotabbutton',
            iconCls: 'ico_film'
        },
        autoDestroy: false,
        layout: 'hbox',
        style: 'background-color: black',
        masked: {
            xtype: 'loadmask',
            message: 'Please Wait ...'
        },
        items: [
            {
                flex: 3,
                xtype: 'navigationview',
                id: 'navVideoLibary',
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
                            id: 'videoSearchButton',
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
                        xtype: 'videoGenresList',
                        scrollable: true,
                        itemId: 'navVideoGenresList',
                        style: 'background-color: black',
                        store: 'videoGenres'
                    }]
                }]
            }
        ]
    }
});
