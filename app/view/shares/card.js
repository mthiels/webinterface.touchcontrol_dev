Ext.define('touchcontrol.view.shares.card', {

    extend: 'Ext.Container',
    xtype: 'sharesContainer',
    id: 'sharesContainer',
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
            title: 'Shares',
            iconCls: 'ico_list',
            id: 'sharesTabButton',
            badgeText: 'Music'
        },
        autoDestroy: false,
        layout: 'fit',
        style: 'background-color: black',
        masked: {
            xtype: 'loadmask',
            message: 'Please Wait ...'
        },
        /*
        items: [
        {
                    xtype: 'musicSharesView',
                    height: '90%'
        }
        ]
*/
///*
        items: [
                {
                    xtype: 'carousel',
                    id: 'shareslistCarousel',
                    directionLock: true,
                    direction: 'horizontal',
                    style: 'background-color: black !important;',
                    items: [
                        {
                            layout: 'fit',
                            id: 'musicSharesCarouselEntry',
                            style: 'background-color: black !important;',
                            items: [
                            {
                                xtype: 'musicSharesView',
                                style: 'background-color: black !important;',
                                height: '90%'
                            }
                            ]
                        },
                        {
                            layout: 'fit',
                            id: 'videoSharesCarouselEntry',
                            items: [
                            {
                                xtype: 'videoSharesView',
                                style: 'background-color: black !important;',
                                height: '90%'
                            }
                            ]
                        }
                    ],
                    listeners: {
                        activeitemchange: function (me, newCard) {
                            if (newCard.id == 'musicSharesCarouselEntry') {
                                Ext.getCmp('sharesTabButton').setBadgeText('Music');
                            } else if (newCard.id == 'videoSharesCarouselEntry') {
                                Ext.getCmp('sharesTabButton').setBadgeText('Video');
                            } else {
                                Ext.getCmp('sharesTabButton').setBadgeText('Unknown');
                            }
                        }
                    }
                }
            ]
//*/
    }
});
