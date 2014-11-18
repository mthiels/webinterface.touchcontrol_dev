Ext.define('touchcontrol.view.music.artistList', {

    extend: 'Ext.List',
    xtype: 'artistList',

    config: {
        title: 'Artist',
        variableHeights: false,
        itemHeight: 110,
        layout: 'fit',
        itemCls: 'listInfo',
        itemTpl: new Ext.XTemplate(
            '<tpl>',
			    '<div class="artistInfo" style="background-image: url({thumbnail}); background-size:contain"></div>',
			    '<h3>{artist}</h3>',
                '<div class="playEntry" style="background-image: url(resources/images/play.png); background-size:contain"></div>',
                '<div class="playlistEntry" style="background-image: url(resources/images/playlist-add.png); background-size:contain"></div>',
            '</tpl>'
        )

    }
});

