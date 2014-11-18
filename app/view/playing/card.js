Ext.define('touchcontrol.view.playing.card', {

    extend: 'Ext.Panel',
    xtype: 'playingContainer',
    id: 'playingContainer',

    requires: [
        'Ext.TitleBar',
        'Ext.carousel.Carousel',
        'Ext.Img',
        'Ext.field.Slider',
        'Ext.Button',
        'Ext.layout.Box'
    ],

    config: {

        tab: {
            title: 'Now Playing',
            iconCls: 'ico_equalizer'
        },
        autoDestroy: false,
        id: 'playingBackground',
        width: '100%',
        height: '100%',
        layout: 'hbox',
        items: [
        {
            flex: 1,
            layout: 'fit',
            items: [
                {
                    xtype: 'panel',
                    id: 'albumArt',
                    layout: 'fit',
                    style: 'background: url(resources/images/defaultAlbumCover.png) top center no-repeat; background-color: #333333; background-size: contain',
                    items: [{
                        xtype: 'sliderfield',
                        id: 'positionSlider',
                        minValue: 0,
                        maxValue: 100,
                        width: '90%',
                        left: '5%',
                        top: '85%',
                        style: 'background-color: transparent',
                        height: 10
                    }]
                }]
        },
        {
            flex: 2,
            layout: 'fit',
            items: [{
                xtype: 'titlebar',
                docked: 'top',
                ui: 'charcoal',
                items: [{
                    xtype: 'button',
                    iconCls: 'ico_redo_2',
                    align: 'left',
                    id: 'libraryRefreshButton',
                    ui: 'plain',
                    text: 'Refresh'
                },
                {
                    xtype: 'selectfield',
                    name: 'localSelect',
                    id: 'localSelect',
                    label: null,
                    options: [
                        { text: 'Kodi', value: 'System' },
                        { text: 'Local', value: 'Local' }
                    ]
                },
                {
                    xtype: 'button',
                    iconCls: 'ico_image',
                    align: 'right',
                    id: 'screenSelectionButton',
                    ui: 'plain',
                    text: 'System'
                }]
            },
            {
                xtype: 'panel',
                id: 'fanArtBackground',
                layout: 'fit',
                style: 'background-image: url(/resources/images/agsandrew-d6cl17u.jpg); background-color: transparent; background-size: 100% 100%;',
                items: [
                    {
                        xtype: 'panel',
                        id: 'currentlyPlayingText',
                        html: ' ',
                        style: 'background-color: rgba(0, 0, 0, .4);'
                    },
                    {
                        xtype: 'sliderfield',
                        id: 'volumeSlider',
                        minValue: 0,
                        maxValue: 100,
                        width: '45%',
                        left: '5%',
                        top: '80%',
                        style: 'background-color: transparent',
                        height: 25
                    }, {
                        xtype: 'button',
                        iconCls: 'ico_volume_med',
                        align: 'right',
                        left: '52%',
                        top: '80%',
                        id: 'muteButton',
                        ui: 'buttonCharcoal',
                        height: 64,
                        width: 64
                    },
                    {
                        xtype: 'button',
                        iconCls: 'ico_undo_2',
                        align: 'right',
                        left: 20,
                        top: '65%',
                        id: 'firstButton',
                        ui: 'buttonCharcoal',
                        height: 40,
                        width: 64
                    },
                    {
                        xtype: 'button',
                        iconCls: 'ico_backward_2',
                        align: 'right',
                        left: 85,
                        top: '65%',
                        id: 'backwardButton',
                        //                                        iconMask: true,
                        ui: 'buttonCharcoal',
                        height: 40,
                        width: 64
                    }, {
                        xtype: 'button',
                        iconCls: 'ico_stop_2',
                        align: 'right',
                        left: 150,
                        top: '65%',
                        id: 'stopButton',
                        //                                        iconMask: true,
                        ui: 'buttonCharcoal',
                        height: 40,
                        width: 64
                    }, {
                        xtype: 'button',
                        iconCls: 'ico_play_3',
                        align: 'right',
                        left: 215,
                        top: '65%',
                        id: 'playButton',
                        //                                        iconMask: true,
                        ui: 'buttonCharcoal',
                        height: 40,
                        width: 64
                    }, {
                        xtype: 'button',
                        iconCls: 'ico_forward_3',
                        align: 'right',
                        left: 280,
                        top: '65%',
                        id: 'forwardButton',
                        //                                        iconMask: true,
                        ui: 'buttonCharcoal',
                        height: 40,
                        width: 64
                    }, {
                        xtype: 'button',
                        iconCls: 'ico_redo_2',
                        align: 'right',
                        left: 345,
                        top: '65%',
                        id: 'endButton',
                        iconMask: true,
                        ui: 'buttonCharcoal',
                        height: 40,
                        width: 64
                    }
                ]
            }
            ]
        }]
    }
});

