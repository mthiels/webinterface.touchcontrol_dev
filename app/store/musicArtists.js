Ext.define('touchcontrol.store.musicArtists', {
    extend: 'Ext.data.Store',

    config: {
        model: 'touchcontrol.model.musicArtist',
        grouper: {
            groupFn: function (record) {
                return record.get('artist')[0];
            }
        },
        sorters: [
            {
                property : "artist",
                direction: "ASC"
            }
        ]
    }
});
