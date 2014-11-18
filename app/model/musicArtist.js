Ext.define('touchcontrol.model.musicArtist', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        { name: 'id', type: 'string' },
        { name: 'artist', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'thumbnail', type: 'string' },
        { name: 'fanart', type: 'string' },
        { name: 'instrument', type: 'string' },
        { name: 'style', type: 'string' },
        { name: 'mood', type: 'string' },
        { name: 'born', type: 'string' },
        { name: 'formed', type: 'string' },
        { name: 'genre', type: 'string' },
        { name: 'died', type: 'string' },
        { name: 'disbanded', type: 'string' },
        { name: 'yearsactive', type: 'string' },
        { name: 'musicbrainzartistid', type: 'string' }
        ]
    }
});

