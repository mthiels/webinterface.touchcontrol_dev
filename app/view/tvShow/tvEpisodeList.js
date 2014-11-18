Ext.define('touchcontrol.view.tvShow.tvEpisodeList', {

    extend: 'Ext.List',
    xtype: 'tvEpisodeList',

    config: {
        title: 'Season',
        variableHeights: true,
        layout: 'fit',
        itemCls: 'listInfo',
        itemTpl: new Ext.XTemplate(
        '<tpl if="watched &gt; 0">',
//            '<div class="playEntry" style="background-image: url(resources/images/play.png);"></div>',
//            '<div class="playlistEntry" style="background-image: url(resources/images/playlist-add.png); "></div>',
            '<div class="watchedEntry" style="background-image: url(resources/images/EyeIcon.png);"></div>',
            '<div style="color:white">{label}</div>',
//            '<img src="resources/images/EyeIcon.png" style="float:right; background-size:contain">',
        '<tpl else>',
            '<div style="color:white">{label}</div>',
        '</tpl>'
        )
    }
});


