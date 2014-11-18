Ext.define('touchcontrol.store.videoSearches', {
    extend: 'Ext.data.Store',

    config: {
        model: 'touchcontrol.model.videoMovie',
        sorters: [
            {
                property: "type",
                direction: "ASC"
            }
        ]
    }
});
