//Ext.define('touchcontrol.view.video..movieSelected', {
Ext.define('touchcontrol.view.video.movieSelected', {
    extend: 'Ext.Sheet',
    xtype: 'movieSelected',

    requires: ['Ext.Img'],

    config: {
        baseCls: 'movieSelected-view',
        id: 'movieSelected',
        centered: true,
        width: '80%',
        height: '70%',
        modal: true,
        hideOnMaskTap: true,
            layout: {
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'image',
                    flex: 1
                },
                {
                    flex: 2,
                    id: 'description',
                    cls: 'description',
                    scrollable: true,
                    tpl: new Ext.XTemplate(
                        '<div class="name">{data.title}  [{data.year}]</div>',
                        '<div class="text">{data.plot}</div>',
                        '<div class="text"><br>Rating: {data.rating}</div>',
                        '<div class="text">Length: {data.runtime}</div>',
                        '<div style="line-height:200%; text-align:middle; color:white"><br>Cast</div>',
                        '<ul>',
                            '<tpl for="data.cast">',
// Change       
                                '<li>',
			                    '<img src={thumbnail} style="float:right; height:120px; margin-right:20px"/>',
                                '<div style="color:white; height:30px; font-size:0.8em">{role}</div>',
                                '<div style="color:white; height:100px; font-size:0.8em">{name}</div>',
                                '</li>',

// Change
                            '</tpl>',
                        '</ul>'

                    ),
                    items: [{
                            docked: 'bottom',
                            items: [{
                                //                            docked: 'bottom',
                                xtype: 'button',
                                text: 'Add to Playlist',
                                iconCls: 'ico_box_add',
                                id: 'addMovieToPlaylistButton',
                                iconMask: true,
                                left: '55%',
                                width: '45%'
                            },
                            {
                                xtype: 'button',
                                text: 'Play',
                                iconCls: 'ico_play',
                                width: '45%',
                                id: 'playMovieButton',
                                iconMask: true
                            }]
                    }]
                }

            ],
        showAnimation: {
            type: 'fadeIn',
            duration: 250,
            easing: 'ease-out'
        },

        hideAnimation: {
            type: 'fadeOut',
            duration: 250,
            easing: 'ease-in'
        }
    },
    initialize: function () {
       var image = this.down('image');

        image.on({
            scope: this,
            load: function () {
                image.element.dom.style.backgroundSize = "contain";
            }
        });
    },

    updateData: function (newData) {
        var image = this.down('image');

        image.element.dom.style.backgroundSize = "30%";
//        image.element.dom.style.backgroundImage = 'url(resources/images/loading.gif)';
        image.element.dom.style.backgroundImage = '/resources/images/loading.gif';
        image.setSrc('');
        image.setSrc(newData.data.thumbnail);
        Ext.getCmp('description').setData(newData);
    }
});
