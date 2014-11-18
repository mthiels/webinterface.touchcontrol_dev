Ext.define('touchcontrol.view.settings.card', {

    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.Button',
        'Ext.Img',
        'Ext.List'
    ],


    extend: 'Ext.Container',
    xtype: 'settingsContainer',
    id: 'settingsContainer',
    config: {

        tab: {
            title: 'Settings',
            iconCls: 'ico_settings'
        },
        autoDestroy: false,

        layout: 'fit',
        style: 'background-color: black',
        items: [
            {
                xtype: 'togglefield',
                name: 'videoMenuToggle',
                id: 'videoMenuToggle',
                labelCls: 'no-white',
                label: 'Show Video List',
                labelWidth: '20%',
                style: 'background-color: black'
            }
        ]
    }
});
