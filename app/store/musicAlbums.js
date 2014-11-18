Ext.define('touchcontrol.store.musicAlbums', {
    extend: 'Ext.data.Store',

    config: {
        model: 'touchcontrol.model.musicAlbum',
        sorters: [
            {
                property: "album",
                direction: "ASC"
            }
        ]
    }
});
