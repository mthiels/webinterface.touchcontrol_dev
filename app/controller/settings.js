Ext.define('touchcontrol.controller.settings', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'mainpanel',
            settingsContainer: 'settingsContainer',
            videoMenuToggle: 'videoMenuToggle'
        },
        control: {
            videoMenuToggle: {
                change: 'onMenuToggle'
            }
        }
    },
    onMenuToggle: function (button) {
//        myContainer.getLayout().setItemFlex(myComponent, newFlex);
        var temp = this.getNavVideoLibary();
        temp.setActiveItem(0);
    }
});
