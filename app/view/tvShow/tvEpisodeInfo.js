Ext.define('touchcontrol.view.tvShow.tvEpisodeInfo', {

    extend: 'Ext.Container',
    xtype: 'tvEpisodeInfo',

    config: {
        layout: 'fit',
//        styleHtmlContent: true,
        items: [
            {
                layout: 'fit',
                xtype: 'image',
                id: 'tvEpisodeInfoImage',
                src: '/resources/images/defaultAlbumCover.png'
            }, {
                xtype: 'textareafield',
                style: 'background-color: #cdc9c9',
                cls: 'semi-trans',
                id: 'tvEpisodeInfoBio',
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
