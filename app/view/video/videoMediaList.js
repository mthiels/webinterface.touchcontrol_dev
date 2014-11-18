Ext.define('touchcontrol.view.video.videoMediaList', {

    extend: 'Ext.List',
    xtype: 'videoMediaList',

    config: {
        title: 'Genre',
        variableHeights: true,
        layout: 'fit',
        itemHeight: 120,
        styleHtmlContent: true,
        itemCls: 'movieListInfo',
        itemTpl: new Ext.XTemplate(
        '<tpl if="genre == "Animation">',
            '<div class="movieInfo" style="background-image: url({thumbnail}); background-size:contain;">',
            '</div>',
            '<div class="playEntry" style="background-image: url(resources/images/play.png);"></div>',
            '<div class="playlistEntry" style="background-image: url(resources/images/playlist-add.png); "></div>',
            '<h3>{title}</h3>',
                '<h4>',
                '<p class ="alignleft">Year:{year}</p>',
                '<p class ="alignRight">Rating:{rating}</p>',
                '</h4>',
       '</tpl>'
        )
    }
});



/*
'<tpl if="playcount &gt; 0">',
    '<div class="movieInfo" style="background-image: url({thumbnail}); background-size:contain; border:2px solid #880000 ;">',
    '<img src="resources/images/checkmark.png" width="16" height="16">',
    '</div>',
    '<div class="playEntry" style="background-image: url(resources/images/play.png);"></div>',
    '<div class="playlistEntry" style="background-image: url(resources/images/playlist-add.png); "></div>',
    '<h3>{title}</h3>',
        '<h4>',
        '<p class ="alignleft">Year:{year}</p>',
        '<p class ="alignRight">Rating:{rating}</p>',
        '</h4>',
'<tpl else>',
    '<div class="movieInfo" style="background-image: url({thumbnail}); background-size:contain;">',
    '</div>',
    '<div class="playEntry" style="background-image: url(resources/images/play.png);"></div>',
    '<div class="playlistEntry" style="background-image: url(resources/images/playlist-add.png); "></div>',
    '<h3>{title}</h3>',
        '<h4>',
        '<p class ="alignleft">Year:{year}</p>',
        '<p class ="alignRight">Rating:{rating}</p>',
        '</h4>',
    '</tpl>',
*/