//Ext.define('touchcontrol.view.tvShow..tvEpisodeSelected', {
Ext.define('touchcontrol.view.tvShow.tvEpisodeSelected', {
    extend: 'Ext.Sheet',
    xtype: 'tvEpisodeSelected',

    requires: ['Ext.Img'],

    config: {
        baseCls: 'movieSelected-view',
        id: 'tvEpisodeSelected',
        centered: true,
        width: '85%',
        height: '80%',
        modal: true,
        hideOnMaskTap: true,
            layout: {
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'image',
                    flex: 2
                },
                {
                    flex: 2,
                    id: 'tvDescription',
                    cls: 'description',
                    scrollable: true,
//                    itemCls: 'castListInfo',
                    tpl: new Ext.XTemplate(
                        '<div class="name">{data.title}  [{data.firstaired}]</div>',
                        '<div class="text">{data.plot}</div>',
                        '<div class="text"><br>Writer: {data.writer}</div>',
                        '<div class="text">Director: {data.director}</div>',
                        '<div style="line-height:200%; text-align:middle; color:white">Cast</div>',
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
                                id: 'addTVEpisodeToPlaylistButton',
                                iconMask: true,
                                left: '55%',
                                width: '45%' 
                            },
                            {
                                xtype: 'button',
                                text: 'Play',
                                iconCls: 'ico_play',
                                width: '45%',
                                id: 'playTVEpisodeButton',
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
        image.element.dom.style.backgroundImage = 'url(resources/images/loading.gif)';
        image.setSrc('');

        var tempImage = newData.data.thumbnail;
        tempString = encodeURIComponent(tempImage);
        imgSrc = "http://" + hostAddress + "/image/" + tempString;

        image.setSrc(imgSrc);
        Ext.getCmp('tvDescription').setData(newData);
    }
});
