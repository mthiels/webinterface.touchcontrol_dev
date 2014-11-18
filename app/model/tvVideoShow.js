Ext.define('touchcontrol.model.tvVideoShow', {
    extend: 'Ext.data.Model',

    config:  {
        fields: [
        { name: 'showtitle', type: 'string' },
        { name: 'year', type: 'string' },
        { name: 'tvshowid', type: 'int' },
        { name: 'banner', type: 'string' },
        { name: 'thumbnail', type: 'string' },
        { name: 'fanart', type: 'string' }
        ]
    }
});
