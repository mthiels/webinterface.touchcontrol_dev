Ext.define('touchcontrol.model.tvVideoEpisode', {
    extend: 'Ext.data.Model',

    config:  {
        fields: [
            { name: 'tvshowid', type: 'int' },
            { name: 'title', type: 'string' },
            { name: 'season', type: 'string' },
            { name: 'label', type: 'string' },
            { name: 'episode', type: 'int' },
            { name: 'episodeid', type: 'int' },
            { name: 'watched', type: 'string' },
            { name: 'idFile', type: 'string' },
            { name: 'plot', type: 'string' },
            { name: 'writer', type: 'string' },
            { name: 'firstaired', type: 'string' },
            { name: 'director', type: 'string' },
//            { name: 'cast', type: 'string' },
            { name: 'fanart', type: 'string' },
            { name: 'thumbnail', type: 'string' },
            { name: 'resume', type: 'string' },
            { name: 'art', type: 'string' },
            { name: 'type', type: 'string' }
        ],
        hasMany: { model: 'touchcontrol.model.castMember', name: 'cast' }
    }
});
