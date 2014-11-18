Ext.define('touchcontrol.store.localVideoPlaylists', {
    extend: 'Ext.data.Store',

    requires: ['touchcontrol.model.playlist'],
    config: {
        model: 'touchcontrol.model.playlist'
    }
});
