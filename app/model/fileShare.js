Ext.define('touchcontrol.model.fileShare', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        { name: 'text', type: 'string' },
        { name: 'path', type: 'string' },
        { name: 'filetype', type: 'string' },
        { name: 'img', type: 'string'},
        { name: 'id', type: 'string' }

        ]
    }
});
