﻿Ext.define('touchcontrol.view.playlists.videoPlaylistView', {

    extend: 'Ext.List',
    xtype: 'videoPlaylistView',

    config: {
        title: 'Playlist',
        variableHeights: true,
        height: '90%',
        itemHeight: 55,
        layout: 'fit',
        itemCls: 'listInfo',
        style: 'background-color: black',
        itemTpl: new Ext.XTemplate(
            '<tpl if="this.isPlaying(currentlyPlaying)">',
                '<div class="playIndex" style="background-image: url(resources/images/arrow-right.png); background-size: contain"></div>',
			    '<h3><p class ="alignleft">{name}</p></h3>',
                '<div class="playRemove" style="background-image: url(resources/images/close.png); background-size:cover"></div>',
            '<tpl else>',
			    '<h3><p class ="alignleft">{name}</p></h3>',
                '<div class="playRemove" style="background-image: url(resources/images/close.png); background-size:cover"></div>',
            '</tpl>',
            {
                isPlaying: function (currentlyPlaying) {
                    if (currentlyPlaying != "") {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        )
    }
});
