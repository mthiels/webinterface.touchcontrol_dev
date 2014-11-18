Ext.define('touchcontrol.view.music.songList', {

    extend: 'Ext.List',
    xtype: 'songList',

    config: {
        title: 'Song',
        variableHeights: true,
        layout: 'fit',
        itemCls: 'listInfo',
        itemTpl: new Ext.XTemplate(
                '<div class="playEntry" style="background-image: url(resources/images/play.png);"></div>',
                '<div class="playlistEntry" style="background-image: url(resources/images/playlist-add.png); "></div>',
                '<div style="color:white">{title}</div>'
        )
    }
});
