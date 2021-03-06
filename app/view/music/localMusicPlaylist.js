﻿Ext.define('touchcontrol.view.music.localMusicPlaylist', {

    extend: 'Ext.List',
    xtype: 'localMusicPlaylist',

    config: {
        title: 'Local Playlist',
//        height: '100%',
        variableHeights: true,
        itemHeight: 55,
        layout: 'fit',
        itemCls: 'localListInfo',
//        style: 'background-color: black',
        style: 'background-color: rgba(0, 0, 0, .4);',

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
