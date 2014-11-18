Ext.define('touchcontrol.view.tvShow.tvShowInfo', {

    extend: 'Ext.Container',
    xtype: 'tvShowInfo',

    config: {
//        layout: 'fit',
//        styleHtmlContent: true,
        scrollable: {
            direction: 'vertical'
        },
        items: [
            {
                xtype: 'label',
                html: ' ',
                style: 'color:white; background-image: url(/resources/images/defaultAlbumCover.png); background-repeat: no-repeat; background-size: auto 100%; background-position: center top',
                id: 'tvShowInfoBio',
                top: '0%',
                width: '100%',
                readOnly: true,
                height: '100%'
            }
        ]
    }
});
