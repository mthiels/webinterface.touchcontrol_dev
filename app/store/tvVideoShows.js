Ext.define('touchcontrol.store.tvVideoShows', {
    extend: 'Ext.data.Store',

    config: {
        model: 'touchcontrol.model.tvVideoShow',
        grouper: {
            groupFn: function (record) {
                return record.get('showtitle')[0];
            }
        },
        sorters: [
            {
                property: "showtitle",
                direction: "ASC"
            }
        ]
    }
});
