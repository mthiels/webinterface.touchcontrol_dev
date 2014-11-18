/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

//<<<<<<< Generated
//=======
// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'touchcontrol': 'app'
});
//</debug>

//>>>>>>> Custom
Ext.application({
    name: 'touchcontrol',

    requires: [
        'Ext.data.Store',
        'Ext.MessageBox',
        'Ext.Button'
    ],

    views: [
        'Main'
],

    models: [
        'playlist',
        'musicGenre',
        'musicArtist',
        'musicAlbum',
        'musicSong',
        'videoGenre',
        'videoMovie',
        'tvVideoShow',
        'tvVideoSeason',
        'tvVideoEpisode',
        'musicSearch',
        'castMember',
        'fileShare'
    ],

    stores: [
        'musicPlaylists',
        'videoPlaylists',
        'localMusicPlaylists',
        'localVideoPlaylists',
        'musicGenres',
        'musicArtists',
        'musicAlbums',
        'musicSongs',
        'videoGenres',
        'videoMovies',
        'tvVideoShows',
        'tvVideoSeasons',
        'tvVideoEpisodes',
        'musicSearches',
        'videoSearches',
        'shareMusicFiles',
        'shareVideoFiles'
    ],

    
    controllers: [
        'musicPlaylist',
        'videoPlaylist',
        'musicGenreList',
        'musicArtistList',
        'musicAlbumList',
        'musicSongList',
        'videoGenreList',
        'videoMovieList',
        'videoMovieView',
        'tvTitleList',
        'controlList',
        'settings',
        'musicSearchList',
        'videoSearchList',
        'fileShares'
    ],
    
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        if (Ext.Viewport.getOrientation() == "landscape") {
            screenWidth = Ext.Viewport.getWindowWidth();
            screenHeight = Ext.Viewport.getWindowHeight();
//            logo.setLeft(5);
//            logo.setTop(5);
//            logo.setHeight((screenWidth / 3) - 5);
//            logo.setWidth((screenWidth / 3) - 5);
//            currentPlayingText.setLeft(5);
//            currentPlayingText.setTop(screenWidth / 3);
        } else {
            screenWidth = Ext.Viewport.getWindowWidth();
            screenHeight = Ext.Viewport.getWindowHeight();
//            logo.setLeft(5);
//            logo.setTop(5);
//            logo.setHeight((screenWidth / 3) - 5);
//            logo.setWidth((screenWidth / 3) - 5);
//            currentPlayingText.setLeft((screenWidth / 3) + 1);
//            currentPlayingText.setTop(5);
        }


        // Initialize the main view
        Ext.Viewport.add(Ext.create('touchcontrol.view.Main'));

        storeMusicPlaylist = Ext.getStore('musicPlaylists');
        storeVideoPlaylist = Ext.getStore('videoPlaylists');
        storeLocalMusicPlaylist = Ext.getStore('localMusicPlaylists');
        storeLocalVideoPlaylist = Ext.getStore('localVideoPlaylists');
        storeMusicGenre = Ext.getStore('musicGenres');
        storeMusicArtist = Ext.getStore('musicArtists');
        storeMusicAlbum = Ext.getStore('musicAlbums');
        storeMusicSongs = Ext.getStore('musicSongs');
        storeVideoGenre = Ext.getStore('videoGenres');
        storeVideoLibrary = Ext.getStore('videoMovies');
        storeTvVideoLibary = Ext.getStore('tvVideoShows');
        storeTvVideoSeason = Ext.getStore('tvVideoSeasons');
        storeTvVideoEpisode = Ext.getStore('tvVideoEpisodes');
        storeMusicFileShare = Ext.getStore('shareMusicFiles');
        storeVideoFileShare = Ext.getStore('shareVideoFiles');

        GetIntroRetroSpec();
        GetPing();
        //        myMask = new Ext.LoadMask(Ext.getBody());
        getShares("video");
        getShares("music");
        InitializeMusicLib();
        InitializeMovieLib();
        InitializeTVShowLib();
        updatePlaylist("Music");
        updatePlaylist("Video");
        getVolume();

        setInterval(function () {
            GetCurrentlyPlaying()
        }, 1500);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
