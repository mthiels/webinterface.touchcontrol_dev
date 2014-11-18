Ext.define('touchcontrol.store.musicGenres', {
    extend: 'Ext.data.Store',

    config: {
        model: 'touchcontrol.model.musicGenre',
        sorters: [
            {
                property : "genre",
                direction: "ASC"
            }
        ]
    }
});
