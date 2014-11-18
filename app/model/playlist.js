Ext.define('touchcontrol.model.playlist', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        { name: 'id', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'currentlyPlaying', type: 'string' },
        { name: 'artist', type: 'string' },
        { name: 'artistId', type: 'string' },
        { name: 'album', type: 'string' },
        { name: 'duration', type: 'string' },
        { name: 'thumbnail', type: 'string' },
        { name: 'fanart', type: 'string' }
        ]
    }
});

