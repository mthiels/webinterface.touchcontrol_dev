Ext.define('touchcontrol.model.castMember', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        { name: 'name', type: 'string' },
        { name: 'order', type: 'string' },
        { name: 'role', type: 'string' },
        { name: 'thumbnail', type: 'string', defaultValue: null }
        ]
/*        ,
        belongsTo: 'touchcontrol.model.tvVideoEpisode' */
    }
});
