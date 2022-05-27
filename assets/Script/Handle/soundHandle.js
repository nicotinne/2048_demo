

cc.Class({
    extends: cc.Component,

    properties: {
        soundPlusScore: cc.AudioClip,
        soundStart: cc.AudioClip,
        soundEnd: cc.AudioClip,

        _volume: null,
        _isMute: null,

        _effect: null,
        _bgMusic: null
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._effect = cc.audioEngine;
        this._bgMusic = cc.audioEngine;
    },

    playPlusScore() {
        this._effect.playEffect(this.soundPlusScore, false);
    },

    playStart() {
        this._effect.playEffect(this.soundStart, false);
    },
    
    playEnd() {
        this._effect.playEffect(this.soundEnd, false);
    },

    playBackGroundMusic() {
        this._bgMusic.playMusic(this.soundStart, true);
        
    },

    getGameVolume(volume) {
         this._volume = volume;
    },

    getIsMute(isMute) {
         this._isMute = isMute;
    }

    // update (dt) {},
});
