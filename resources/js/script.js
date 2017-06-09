var dataController = (function() {
    
    var Music = function(artist, song, cover, link) {
        this.artist = artist;
        this.song = song;
        this.cover = cover;
        this.link = link;
    }
    
    var Player = function(songs) {
        this.songs = songs;
        this.currentSongs = 0;
    }
    
    Player.prototype.getSongInfo = function() {
        return this.songs[this.currentSongs];
    }
    
    Player.prototype.nextSong = function() {
        this.currentSongs++;
    }
    
    Player.prototype.prevSong = function() {
        this.currentSongs--;
    }
    
    Player.prototype.isEnd = function() {
        if(this.currentSongs >= this.songs.length - 1) {
            this.currentSongs = 0;
        } else {
            this.nextSong();
        }
    }
    
    // Songs
    var track1 = new Music("Kungs", "Tripping Off", "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14591699_1264982760213118_5603123519826105458_n.jpg?oh=82b9dd2dbef114ce9679e16243186b14&oe=59AEDB2D", "http://audio.itunes.apple.com/apple-assets-us-std-000001/AudioPreview71/v4/18/2a/e0/182ae0de-17e4-58f2-ead2-38e0573f6822/mzaf_6022066148953060811.plus.aac.p.m4a");
    
    var track2 = new Music("Martin Garrix", "Scared To Be Lonely (Remix)", "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/17309462_1378782382164612_402370102480544098_n.jpg?oh=24e7246ad629813fb41e2cffc59e66c4&oe=59B8BB4C", "http://audio.itunes.apple.com/apple-assets-us-std-000001/AudioPreview122/v4/12/58/00/1258006d-0922-1220-271f-e00446605ce0/mzaf_2193112697300898411.plus.aac.p.m4a");
    
    var track3 = new Music("Avicii", "Liar Liar", "https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/11914098_10153220438246799_4329680944409755865_n.jpg?oh=10e03f9897d3f09a0895fe9b3604805d&oe=59B6F8B6", "http://a466.phobos.apple.com/us/r1000/001/Music6/v4/db/d4/e9/dbd4e928-a03a-4c4e-35bd-de976a92f8da/mzaf_4854986667232643621.plus.aac.p.m4a");
    
    var track4 = new Music("Low Steppa", "I Won't Stop", "https://geo-media.beatport.com/image/15921956.jpg", "http://audio.itunes.apple.com/apple-assets-us-std-000001/AudioPreview122/v4/ae/aa/6b/aeaa6bb4-93bc-acba-2710-5da68a2b24f6/mzaf_4372523850634876442.plus.aac.p.m4a");
    
    var track5 = new Music("Ryan Tennison", "Mind", "https://i1.sndcdn.com/artworks-000163667354-xkkcuk-t500x500.jpg", "http://audio.itunes.apple.com/apple-assets-us-std-000001/AudioPreview60/v4/d8/0e/97/d80e9723-f4a8-444c-6330-153abb8738d9/mzaf_6340758348931149735.plus.aac.p.m4a");
    
    
    // Create list with songs
    var playList = [track1, track2, track3, track4, track5];
    
    // Create Music Player
    var MusicPlayer = new Player(playList);
    
    return {
        getMusicPlayer: function() {
            return MusicPlayer;
        }
    }
    
})();


var UIController = (function() {
    var DOMstring = {
        volumeSlider: "#volume-slider",
        btnVolume: "#btn-volume",
        artist: ".artist",
        songTitle: ".title",
        coverBox: ".cover",
        songCover: "#song-cover",
        audio: "#music",
        btnPlay: "#btn-play",
        btnNext: "#btn-next",
        btnPrevious: "#btn-prev",
        btnPlayLabel: "#btn-play i",
        songTimeSpan: ".song-time span",
        currentsongTime: ".current-time",
        durationtSongTime: ".duration-time"
    }
    
    
    return {
        
        displaySong: function(artist, song, cover) {
            
            document.querySelector(DOMstring.artist).textContent = artist;
            
            document.querySelector(DOMstring.songTitle).textContent = song; 
            
            document.querySelector(DOMstring.songCover).src = cover;
            
        },
        
        updateSong: function(artist, song) {
            
            document.querySelector(DOMstring.artist).textContent = artist;
            
            document.querySelector(DOMstring.songTitle).textContent = song; 
        },
        
        displayTimeLine: function(time) {
            
            var audio = document.querySelector(DOMstring.audio);
            document.querySelector(DOMstring.songTimeSpan).style.width = time *  audio.currentTime + "px";
        },
        
        getDOM: function() {
            return DOMstring;
        }
    }
    
})();


var AppController = (function(dataCrtl, UICrtl) {
    var DOM;
    
    DOM = UICrtl.getDOM();
    
    var timeLine = function(songLenght) {
        
        // Get width of timeline
        var timeLineWidth = 210;
        
        // Divide the timeline's width by the song's length 
        var seconds = timeLineWidth / songLenght;
        
        UICrtl.displayTimeLine(seconds);
    }
    
    var formatSeconds = function(second) {
        
        var hr  = Math.floor(second / 3600);
        var min = Math.floor((second - (hr * 3600))/60);
        var sec = Math.floor(second - (hr * 3600) -  (min * 60));

        if (min < 10){ 
            min = "0" + min; 
        }
        if (sec < 10){ 
            sec  = "0" + sec;
        }

        return min + ':' + sec;
    }
    
    var trackTimeInfo = function(song) {
        
        var time = document.querySelector(DOM.currentsongTime);
        var duration = document.querySelector(DOM.durationtSongTime);
        
        
        var currentT = Math.floor(song.currentTime);
        var durationT = Math.floor(song.duration);
        
        // Format seconds
        time.textContent = formatSeconds(currentT);
        duration.textContent = formatSeconds(durationT);
    }
    
    
    var playAudio = function() {
        
        if(document.querySelector(DOM.audio).paused) {
            
            document.querySelector(DOM.audio).play();
            document.querySelector(DOM.btnPlayLabel).classList.remove("ion-ios-play");
            document.querySelector(DOM.btnPlayLabel).classList.add("ion-ios-pause");
            
            // Song time update info
            document.querySelector(DOM.audio).ontimeupdate = function() {
                
                 // 1. Update timeline
                timeLine(document.querySelector(DOM.audio).duration);
                
                // 2. Update time info
                trackTimeInfo(document.querySelector(DOM.audio));
            }
             
        } else {
            
            document.querySelector(DOM.audio).pause();
            document.querySelector(DOM.btnPlayLabel).classList.add("ion-ios-play");
            document.querySelector(DOM.btnPlayLabel).classList.remove("ion-ios-pause");
        }
    }
    
    var volumeChange = function() {
        document.querySelector(DOM.audio).volume = this.value;
    }
    
    var setSong = function(song) {
        document.querySelector(DOM.audio).src = song;
    }
    
    
    var setUpInfo = function() {
         
        // 1. Dislpay Artist and Song
        var artist = dataCrtl.getMusicPlayer().getSongInfo().artist;
        var song = dataCrtl.getMusicPlayer().getSongInfo().song;
        var cover = dataCrtl.getMusicPlayer().getSongInfo().cover;
        UICrtl.displaySong(artist, song, cover);
        
        // 2. Set the song
        setSong(dataCrtl.getMusicPlayer().getSongInfo().link);
    }
    
    var updateInfo = function() {
        
        // Dislpay Artist and Song
        var artist = dataCrtl.getMusicPlayer().getSongInfo().artist;
        var song = dataCrtl.getMusicPlayer().getSongInfo().song;
        UICrtl.updateSong(artist, song);
    }
    
    var coverAnimation = function(aniamtion) {
        
        // Add aniamtion
        document.querySelector(DOM.coverBox).classList.add(aniamtion);

        // Set Cover after 4 milsec;
        setTimeout(function() {
            document.querySelector(DOM.songCover).src = dataCrtl.getMusicPlayer().getSongInfo().cover;
        }, 400);
        
        // Remove aniamtoin
        setTimeout(function() {
            document.querySelector(DOM.coverBox).classList.remove(aniamtion);
        }, 900);
        
    }
    
    var playButton = function(aniamtion) {
        
        // 1. Set the song
        setSong(dataCrtl.getMusicPlayer().getSongInfo().link);

        // 2. Set the song info
        updateInfo();
        
        // 3. Cover aniamtion
        coverAnimation(aniamtion);

        //4. Play
        playAudio();
    }
    
    var playNext = function() {
        
        // 1. Check If song number is bigger than playlist lenght
        dataCrtl.getMusicPlayer().isEnd();

        // 2. Set the song
        setSong(dataCrtl.getMusicPlayer().getSongInfo().link);
        
        // 3. Set the songinfo
        updateInfo();

        // 4. Cover aniamtion
        coverAnimation("animation");

        // 5. Play the song
        playAudio();
        
    }
    
    var setUpEventListeners = function() {
        
        // Sho the volume slider
        document.querySelector(DOM.btnVolume).addEventListener("click", function() {
            document.querySelector(DOM.volumeSlider).classList.toggle("show");
        });
        
        // Change the volume
        document.querySelector(DOM.volumeSlider).addEventListener("change", volumeChange);
        
        // Play Song
        document.querySelector(DOM.btnPlay).addEventListener("click", playAudio);
        
        // Play next track If song is ended
        document.querySelector(DOM.audio).addEventListener("ended", playNext);
        
        // Play next button
        document.querySelector(DOM.btnNext).addEventListener("click", function() {
            
            // Change song number
            dataCrtl.getMusicPlayer().nextSong();
            playButton("animation");
            
        });
        
        // Play previous button
        document.querySelector(DOM.btnPrevious).addEventListener("click", function() {
            
            // Change song number
            dataCrtl.getMusicPlayer().prevSong();
            playButton("animationPrevious");
        });
        
    }
    
    return {
        init: function() {
            console.log("App is working");
            setUpInfo();
            setUpEventListeners();
        }
    }
})(dataController, UIController);

AppController.init();









