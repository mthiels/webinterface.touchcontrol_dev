var genreSelected = 'All';

Ext.define('touchcontrol.view.video.videoMediaView', {

    extend: 'Ext.DataView',
    xtype: 'videoMediaView',

    config: {
        title: 'Title',
//        variableHeights: true,
        styleHtmlContent: true,
        scrollable: true,
        inline: true,
        itemCls: 'movieListInfo',
        itemTpl: new Ext.XTemplate(
        '<tpl if="this.hasGenre(genre)">',
        '<tpl if="playcount &gt; 0">',
            '<div><h3>{title}</h3></div>',
            '<div class="movieInfo" style="background: url(resources/images/checkmark.png), url({thumbnail});',
                'background-position: left top, left top;',
                'background-size: 16px 16px, contain;',
                'background-repeat: no-repeat">',
            '</div>',
        '<tpl else>',
            '<div><h3>{title}</h3></div>',
            '<div class="movieInfo" style="background-image: url({thumbnail}); background-size:contain;">',
            '</div>',
        '</tpl>',
        '</tpl>',
        {
            hasGenre: function (genre) {
                if (genreSelected == 'All')
                    return 1;
                else 
                    return (genre.indexOf(genreSelected) > -1);
            }
        }
        )
    }
});



/*
        '<tpl if="playcount &gt; 0">',
            '<div><h3>{title}</h3></div>',
            '<div class="movieInfo" style="background: url(resources/images/checkmark.png), url({thumbnail});',
                'background-position: left top, left top;',
                'background-size: 16px 16px, contain;',
                'background-repeat: no-repeat">',
            '</div>',
        '<tpl else>',
            '<div><h3>{title}</h3></div>',
            '<div class="movieInfo" style="background-image: url({thumbnail}); background-size:contain;">',
            '</div>',
        '</tpl>',
*/


/*
'<tpl if="this.hasGenre(genre)">',
    '<div><h3>{title}</h3></div>',
    '<div class="movieInfo" style="background-image: url({thumbnail});',
        'background-position: left top;',
        'background-size: contain;',
        'background-repeat: no-repeat">',
    '</div>',
'</tpl>',
*/