Ext.define('touchcontrol.view.music.genreList', {

    extend: 'Ext.List',
    xtype: 'genreList',

    config: {
        title: 'Genre',
        variableHeights: true,
        itemHeight: 50,
        layout: 'fit',
        itemCls: 'listInfo',
        itemTpl: new Ext.XTemplate(
                '<div class="playEntry" style="background-image: url(resources/images/play.png);"></div>',
                '<div class="playlistEntry" style="background-image: url(resources/images/playlist-add.png); "></div>',
                '<div style="color:white; text-align:center; font-size:medium">{genre}</div>'
        )
    }
});
