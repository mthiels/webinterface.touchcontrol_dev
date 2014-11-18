Ext.define('touchcontrol.store.localMusicPlaylists', {
    extend: 'Ext.data.Store',

    requires: ['touchcontrol.model.playlist'],
    config: {
        model: 'touchcontrol.model.playlist'
    }
});
