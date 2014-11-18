Ext.define('touchcontrol.store.videoMovies', {
    extend: 'Ext.data.Store',

    config: {
        model: 'touchcontrol.model.videoMovie',
        sorters: [
            {
                property: "title",
                direction: "ASC"
            }
        ]
/*,
        grouper: {
            groupFn: function (record) {
                return record.get('title')[0];
            }
        },
        sorters: [
            {
                property: "title",
                direction: "ASC"
            }
        ]
*/
    }
});
