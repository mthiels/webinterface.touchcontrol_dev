Ext.define('touchcontrol.controller.musicSongList', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            musicSong: 'musicContainer',
            musicSongList: 'songList',
            navMusicLibary: '#navMusicLibary'

        },
        control: {
            musicSongList: {
                itemtap: 'onSongTap',
                disclose: 'onSongDisclose',
                back: 'onSongBackButton'
            },
            back: 'onSongBackButton'
        }
    },
    onSongBackButton: function () {
        var temp = this.getNavMusicLibary();
        temp.setActiveItem(2);
    },
    onSongTap: function (list, idx, el, record, e) {
        if (e.getTarget('div.x-list-disclosure')) {
            return null;
        }
        if (e.target.className == "playlistEntry") {
            if (Ext.getCmp('localSelect').getValue() == 'Local') {
                addSongToLocalPlaylist(record, "NoPlay");
            } else {
            addSongToPlaylist(record);
            }
            return null;
        }

        if (e.target.className == "playEntry") {
            if (Ext.getCmp('localSelect').getValue() == 'Local') {
                addSongToLocalPlaylist(record, "Play");
            } else {
            playSong(record);
            }
            return null;
        }
        //        Ext.Msg.alert('Tap', 'More info for ' + record.get('name'), Ext.emptyFn);
    },

    onSongDisclose: function (view, record, target, index, event) {
        addSongToPlaylist(record);
//        Ext.Msg.alert('Disclose', 'More info for ' + record.get('name'), Ext.emptyFn);
    }
});


function playSong(record) {

    if (currentPlayer == undefined || currentPlayer == null) {
        return;
    }

    var obj = {
        "jsonrpc": "2.0",
        "method": "Player.Open",
        "params": {
            "item": {
                "songid": record.data.id
            }
        },
        "id": "playAlbum"
    };

    tempStr = Ext.encode(obj);

    Ext.Ajax.request({
        url: '/jsonrpc',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: tempStr,
        success: playMusicSuccess,
        failure: playMusicFailure,
        timeout: interfaceTimeout
    });

}
