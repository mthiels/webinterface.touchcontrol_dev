Ext.define('touchcontrol.model.videoMovie', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        { name: 'id', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'year', type: 'string' },
        { name: 'genre', type: 'string' },
        { name: 'file', type: 'string' },
        { name: 'thumbnail', type: 'string' },
        { name: 'fanart', type: 'string' },
        { name: 'playcount', type: 'string' },
        { name: 'rating', type: 'string' },
        { name: 'resume', type: 'string' },
        { name: 'plot', type: 'string' },
        { name: 'runtime', type: 'string' }
        ],
        hasMany: { model: 'touchcontrol.model.castMember', name: 'cast' }
    }
});
