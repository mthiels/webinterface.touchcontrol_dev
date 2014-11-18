Ext.define('touchcontrol.view.music.musicSearchList', {

    extend: 'Ext.List',
    xtype: 'musicSearchList',
 
    config: {
        title: 'Artist',
        variableHeights: true,
        itemHeight: 110,
        itemCls: 'listInfo',
        itemTpl: new Ext.XTemplate(
                '<tpl if="this.isArtist(type)">',
                    '<div class="artistInfo" style="background-image: url({thumbnail}); background-size:contain"></div>',
                    '<h3>{artist}</h3>',
                    '<div class="playEntry" style="background-image: url(resources/images/play.png); background-size:contain"></div>',
                    '<div class="playlistEntry" style="background-image: url(resources/images/playlist-add.png); background-size:contain"></div>',
                '<tpl elseif="this.isAlbum(type)">',
                    '<div class="albumInfo" style="background-image: url({thumbnail}); background-size:contain"></div>',
                    '<div class="playEntry" style="background-image: url(resources/images/play.png); background-size:contain"></div>',
                    '<div class="playlistEntry" style="background-image: url(resources/images/playlist-add.png); background-size:contain; "></div>',
                    '<h3>{album}</h3>',
                '<tpl else>',
                    '<div class="playEntry" style="background-image: url(resources/images/play.png);"></div>',
                    '<div class="playlistEntry" style="background-image: url(resources/images/playlist-add.png); "></div>',
                    '<div style="color:white; font-size:medium">{artist}-{album}</div>',
                    '<div style="color:white; font-size:medium">{title}</div>',
                '</tpl>',
            {
                isArtist: function (type) {
                    return type == "Artist";
                },
                isAlbum: function (type) {
                    return type == "Album";
                }
            }
        )
    }
});

