Ext.define('touchcontrol.view.video.videoGenresList', {

    extend: 'Ext.List',
    xtype: 'videoGenresList',

    config: {
        title: 'Genre',
        variableHeights: true,
        itemHeight: 50,
        layout: 'fit',
        itemCls: 'listInfo',
        itemTpl: new Ext.XTemplate(
                '<div style="color:white; text-align:center; font-size:medium">{genre}</div>'
        )
    }
});
