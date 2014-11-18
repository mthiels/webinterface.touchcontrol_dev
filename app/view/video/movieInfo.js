Ext.define('touchcontrol.view.video.movieInfo', {

    extend: 'Ext.Container',
    xtype: 'movieInfo',

    config: {
        layout: 'fit',
//        styleHtmlContent: true,
        items: [
            {
                layout: 'fit',
                xtype: 'image',
                id: 'movieInfoImage',
                src: '/resources/images/defaultAlbumCover.png',
                height: "100%"
            }, {
                xtype: 'textareafield',
                style: 'background-color: #cdc9c9',
                cls: 'semi-trans',
                id: 'movieInfoBio',
                maxrows: 5,
                name: 'bio',
                top: '50%',
                width: '100%',
                height: 190,
                readOnly: true
            }
        ]
    }
});
