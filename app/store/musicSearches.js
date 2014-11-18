Ext.define('touchcontrol.store.musicSearches', {
    extend: 'Ext.data.Store',

    config: {
        model: 'touchcontrol.model.musicSearch',
        sorters: [
            {
                property: "type",
                direction: "ASC"
            }
        ]
    }
});
