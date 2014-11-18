Ext.define('touchcontrol.model.musicAlbum', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        { name: 'id', type: 'string' },
        { name: 'album', type: 'string' },
        { name: 'playcount', type: 'string' },
        { name: 'thumbnail', type: 'string' },
        { name: 'year', type: 'string' }
        ]
    }
});

