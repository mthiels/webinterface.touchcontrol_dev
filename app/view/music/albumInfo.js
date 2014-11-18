Ext.define('touchcontrol.view.music.albumInfo', {

    extend: 'Ext.Container',
    xtype: 'albumInfo',

    config: {
        style: 'background-color: #cdc9c9',
        layout: 'fit',
//        styleHtmlContent: true,
        items: [
            {
                xtype: 'image',
                layout: 'fit',
                id: 'albumInfoImage',
                src: '/resources/images/defaultAlbumCover.png'
            }, {
                layout: 'fit',
                xtype: 'textareafield',
                style: 'background-color: #cdc9c9',
                cls: 'semi-trans',
                id: 'albumInfoBio',
                maxrows: 7,
                name: 'bio',
                top: '50%',
                width: '100%',
                height: 190,
                readOnly: true
            }
        ]
    }
});
