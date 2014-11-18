Ext.define('touchcontrol.model.tvVideoSeason', {
    extend: 'Ext.data.Model',

    config:  {
        fields: [
        { name: 'tvshowid', type: 'int' },
        { name: 'season', type: 'int' },
        { name: 'label', type: 'string' },
        { name: 'episodes', type: 'string' },
        { name: 'episodeswatched', type: 'string' },
        { name: 'poster', type: 'string' },
        { name: 'type', type: 'string' }
        ]
    }
});
