Ext.define('touchcontrol.store.videoGenres', {
    extend: 'Ext.data.Store',

    config: {
        model: 'touchcontrol.model.videoGenre',
        sorters: [
            {
                property: "genre",
                direction: "ASC"
            }
        ]
    }
});
