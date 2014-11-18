Ext.define('touchcontrol.view.music.artistInfo', {

    extend: 'Ext.Container',
    xtype: 'artistInfo',

    config: {
        style: 'background-color: #cdc9c9',
        layout: 'fit',
//        styleHtmlContent: true,
        items: [
            {
                xtype: 'image',
                layout: 'fit',
                id: 'artistInfoImage',
                src: '/resources/images/defaultAlbumCover.png'
            }, {
                layout: 'fit',
                xtype: 'textareafield',
                style: 'background-color: #cdc9c9',
                cls: 'semi-trans',
                id: 'artistInfoBio',
                name: 'bio',
                top: '50%',
                width: '100%',
                height: 190,
                readOnly: true
            }
        ]
    }
});
