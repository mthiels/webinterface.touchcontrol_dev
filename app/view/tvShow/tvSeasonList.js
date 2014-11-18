Ext.define('touchcontrol.view.tvShow.tvSeasonList', {

    extend: 'Ext.List',
    xtype: 'tvSeasonList',

    config: {
        title: 'Season',
        variableHeights: true,
        layout: 'fit',
        itemCls: 'listInfo',
        itemTpl: new Ext.XTemplate(
            '<div style="color:white">',
                    '<p style="float: left; width: 32&#37;; text-align: left;">{label}</p>',
                    '<p style="float: right; width: 32%; text-align: right; font-size: small">({episodes} Episodes, {episodeswatched} watched)</p>'
        )
    }
});
