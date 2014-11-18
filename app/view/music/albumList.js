Ext.define('touchcontrol.view.music.albumList', {

    extend: 'Ext.List',
    xtype: 'albumList',

    config: {
        title: 'Album',
        variableHeights: false,
        itemHeight: 110,
        layout: 'fit',
        itemCls: 'listInfo',
        itemTpl: new Ext.XTemplate(
			'<div class="albumInfo" style="background-image: url({thumbnail}); background-size:contain"></div>',
            '<div class="playEntry" style="background-image: url(resources/images/play.png); background-size:contain"></div>',
            '<div class="playlistEntry" style="background-image: url(resources/images/playlist-add.png); background-size:contain; "></div>',
			'<h3>{album}</h3>',
			'<h4>',
                '<p class ="alignleft">Year:{year}</p>',
            '</h4>'
    )
    }
});


