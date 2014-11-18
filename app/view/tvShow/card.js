Ext.define('touchcontrol.view.tvShow.card', {

    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.Button',
        'Ext.Img',
        'Ext.List',
        'touchcontrol.view.tvShow.tvEpisodeInfo',
        'touchcontrol.view.tvShow.tvEpisodeList',
        'touchcontrol.view.tvShow.tvSeasonList',
        'touchcontrol.view.tvShow.tvShowInfo',
        'touchcontrol.view.tvShow.tvEpisodeSelected',
        'touchcontrol.view.tvShow.tvTitleList'
    ],



    extend: 'Ext.Container',
    xtype: 'tvVideoContainer',
    id: 'tvVideoContainer',
    config: {

        tab: {
            title: 'TV',
            iconCls: 'ico_tv'
        },
        autoDestroy: false,

        layout: 'hbox',
        style: 'background-color: black',
        items: [
            {
                flex: 2,
                layout: 'card',
                id: 'navTvShowLibaryInfo',
                style: 'background-color: black',
                items: [
                {
                    html: 'No Info',
                    style: 'background-color: black'
                },
                {
                    xtype: 'tvShowInfo',
                    itemId: 'tvShowInfoPanel',
                    style: 'background-color: black'
                },
                {
                    xtype: 'tvEpisodeInfo',
                    itemId: 'tvShowInfoPanel',
                    style: 'background-color: black'
                }
                ]
            }, {
                width: 10
            },
            {
                flex: 2,
                xtype: 'navigationview',
                id: 'navTvShowLibrary',
                defaultBackButtonText: '',
                navigationBar: {
                    ui: 'charcoal',
                    backButton: {
                        iconCls: 'ico_arrow_left',
                        ui: 'plain'
                    }
                },
                items: [
                {
                    layout: 'fit',
                    title: 'Shows',
                    ui: 'charcoal',
                    items: [
                    {
                        xtype: 'tvTitleList',
                        scrollable: true,
                        itemId: 'navTvShowList',
                        style: 'background-color: black',
                        indexBar: true,
                        store: 'tvVideoShows'
                    }]
                }]
            } 
        ]
    }
});
