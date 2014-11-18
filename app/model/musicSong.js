Ext.define('touchcontrol.model.musicSong', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        { name: 'id', type: 'string' },
        { name: 'artist', type: 'string' },
        { name: 'album', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'thumbnail', type: 'string' },
        { name: 'fanart', type: 'string' },
        { name: 'location', type: 'string' }
        ]
    }
});

