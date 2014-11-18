Ext.define('touchcontrol.model.musicSearch', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        { name: 'type', type: 'string' },
        { name: 'id', type: 'string' },
        { name: 'artist', type: 'string' },
        { name: 'album', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'thumbnail', type: 'string' },
        { name: 'location', type: 'string' }
        ]
    }
});

