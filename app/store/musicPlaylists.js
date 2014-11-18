Ext.define('touchcontrol.store.musicPlaylists', {
    extend: 'Ext.data.Store',

    requires: ['touchcontrol.model.playlist'],
    config: {
        model: 'touchcontrol.model.playlist'
    }
});

