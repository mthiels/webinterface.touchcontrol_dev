Ext.define('touchcontrol.store.shareVideoFiles', {
    extend: 'Ext.data.TreeStore',

    config: {
        model: 'touchcontrol.model.fileShare',
        defaultRootProperty: 'items',
        id: 'shareVideoFiles',
        autoLoad: true,
        autoSync: true
        /*
                root: {
                    items: [
        */
        /*
                    {
                        text: 'Music Share'
                    }
        */
        /*
                    {
                        text: 'Drinks',
                        items: [{
                            text: 'Water',
                            items: [{
                                text: 'Still',
                                leaf: true
                            }, {
                                text: 'Sparkling',
                                leaf: true
                            }]
                        }, {
                            text: 'Soda',
                            leaf: true
                        }]
                    }, {
                        text: 'Snacks',
                        items: [{
                            text: 'Nuts',
                            leaf: true
                        }, {
                            text: 'Pretzels',
                            leaf: true
                        }, {
                            text: 'Wasabi Peas',
                            leaf: true
                        }]
                    }
        */
        /*            
        ]
        }
*/
    }
});