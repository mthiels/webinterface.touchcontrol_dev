Ext.define('touchcontrol.view.playlists.card', {

    extend: 'Ext.Container',
    xtype: 'playlistsContainer',
    id: 'playlistsContainer',

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
            title: 'Playlists',
            iconCls: 'ico_list',
            id: 'playlistTabButton',
            badgeText: '0'
        },
        autoDestroy: false,
        style: 'background-color: black',
        layout: 'fit',
                items: [
                {
                    xtype: 'carousel',
                    id: 'playlistCarousel',
                    directionLock: true,
                    direction: 'horizontal',
                    items: [
                        {
                            layout: 'fit',
                            id: 'musicCarouselEntry',
                            items: [
                            {
                                xtype: 'titlebar',
                                docked: 'top',
                                title: 'Music Playlist',
                                ui: 'charcoal',
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'refresh',
                                        align: 'left',
                                        id: 'musicRefreshButton',
                                        ui: 'plain'
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'trash',
                                        align: 'right',
                                        id: 'musicClearPlaylistButton',
                                        ui: 'plain'
                                    }
                                ]
                            },
                            {
                           
                                xtype: 'musicPlaylistView',
                                scrollable: true,
                                id: 'musicPlaylistList',
                                scrollToTopOnRefresh: false,
                                store: 'musicPlaylists',
                                useComponents: true
                            }]
                        },
                        {
                            layout: 'fit',
                            id: 'videoCarouselEntry',
                            items: [
                            {
                                xtype: 'titlebar',
                                docked: 'top',
                                title: 'Video Playlist',
                                ui: 'charcoal',
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'refresh',
                                        align: 'left',
                                        id: 'videoRefreshButton',
                                        ui: 'plain'
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'trash',
                                        align: 'right',
                                        ui: 'plain',
                                        id: 'videoClearPlaylistButton'
                                    }
                                ]
                            },
                            {

                                xtype: 'videoPlaylistView',
                                id: 'videoPlaylistList',
                                scrollable: true,
                                scrollToTopOnRefresh: false,
                                store: 'videoPlaylists',
                                useComponents: true
                            }]
                        }, {
                            layout: 'fit',
                            id: 'localMusicCarouselEntry',
                            items: [
                            {
                                xtype: 'titlebar',
                                docked: 'top',
                                title: 'Local Music Playlist',
                                ui: 'charcoal',
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'trash',
                                        align: 'right',
                                        id: 'localMusicClearPlaylistButton',
                                        ui: 'plain'
                                    }
                                ]
                            },
                            {

                                xtype: 'localMusicPlaylistView',
                                scrollable: true,
                                id: 'localMusicPlaylistList',
                                scrollToTopOnRefresh: false,
                                store: 'localMusicPlaylists',
                                useComponents: true
                            }]
                        }, {
                            layout: 'fit',
                            id: 'localVideoCarouselEntry',
                            items: [
                            {
                                xtype: 'titlebar',
                                docked: 'top',
                                title: 'Local Video Playlist',
                                ui: 'charcoal',
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'trash',
                                        align: 'right',
                                        id: 'localVideoClearPlaylistButton',
                                        ui: 'plain'
                                    }
                                ]
                            },
                            {

                                xtype: 'localVideoPlaylistView',
                                scrollable: true,
                                id: 'localVideoPlaylistList',
                                scrollToTopOnRefresh: false,
                                store: 'localVideoPlaylists',
                                useComponents: true
                            }]
                        }
                    ],
                    listeners: {
                        activeitemchange: function (me, newCard) {
                            if (newCard.id == 'musicCarouselEntry') {
                                Ext.getCmp('playlistTabButton').setBadgeText('Music-'+Ext.getStore('musicPlaylists').getCount());
                            } else if (newCard.id == 'videoCarouselEntry') {
                                Ext.getCmp('playlistTabButton').setBadgeText('Video-'+Ext.getStore('videoPlaylists').getCount());
                            } else if (newCard.id == 'localMusicCarouselEntry') {
                                Ext.getCmp('playlistTabButton').setBadgeText('Music-' + Ext.getStore('localMusicPlaylists').getCount());
                            } else {
                                Ext.getCmp('playlistTabButton').setBadgeText('Video-' + Ext.getStore('localVideoPlaylists').getCount());
                            }
                        }
                    }
                }
            ]
    }
});
