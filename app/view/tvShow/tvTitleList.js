Ext.define('touchcontrol.view.tvShow.tvTitleList', {

    extend: 'Ext.List',
    xtype: 'tvTitleList',

    config: {
        title: 'TV Show',
        variableHeights: false,
        itemHeight: 120,
        layout: 'fit',
//        styleHtmlContent: true,
        cls: 'showInfo',
        itemTpl: new Ext.XTemplate(
            '<tpl if="this.isGoodBanner(banner)">',
				'<div class="avatar" style="background-image: url({banner}); background-size: contain"></div>',
            '<tpl else>',
                '<div style="color:white">{showtitle}</div>',
            '</tpl>',
        {
            isGoodBanner: function (banner) {
                return banner != null;
            }
        }
        )
    }
});
