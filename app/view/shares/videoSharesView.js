Ext.define('touchcontrol.view.shares.videoSharesView', {

    extend: 'Ext.NestedList',
    xtype: 'videoSharesView',

    config: {
        store: 'shareVideoFiles',
        title: 'Video Files',
        displayField: 'text'
    },
    getItemTextTpl: function (node) {
        return '<div class="nestedList-play" style="background-image: url(resources/images/play.png); background-size:contain;"></div>' +
        '<div class="nestedList-playList" style="background-image: url(resources/images/playlist-add.png); background-size:contain;"></div>' +
        '<div style="color: white;"><img width="20" height="20" src="{img}"/> <b>{text}<b></div>';

    },
    onItemTap: function (list, index, target, record, e) {
        var me = this,
                store = list.getStore(),
                node = store.getAt(index);

        if (e.getTarget('.nestedList-play')) {
            me.fireEvent('play_itemtap', this, list, index, target, record, e);
            return false;
        }

        if (e.getTarget('.nestedList-playList')) {
            me.fireEvent('list_itemtap', this, list, index, target, record, e);
            return false;
        }
        me.fireEvent('itemtap', this, list, index, target, record, e);
        if (node.isLeaf()) {
            me.fireEvent('leafitemtap', this, list, index, target, record, e);
            me.goToLeaf(node);
        }
        else {
            this.goToNode(node);
        }
    }

});
