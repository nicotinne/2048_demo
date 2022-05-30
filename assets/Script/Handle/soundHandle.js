const emitter = require("mEmitter");


cc.Class({
    extends: cc.Component,

    properties: {
        soundPlusScore: {
            default: null,
            type: cc.AudioClip
        },
        soundStart: {
            default: null,
            type: cc.AudioClip
        },
        soundEnd: {
            default: null,
            type: cc.AudioClip
        },

        _volume: 0.5,
        _isMute: null,

        volume: null,
        mute: null,

        _effect: null,
        _bgMusic: null,

        current: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.volume = this.setGameVolume.bind(this);
        this.mute = this.getIsMute.bind(this);
        this.playStart = this.onPlayStart.bind(this);
        this.playPlusScore = this.onPlayPlusScore.bind(this);
        this.playEnd = this.onPlayEnd.bind(this);

        emitter.instance.registerEvent("VOLUME", this.volume);
        emitter.instance.registerEvent("MUTE", this.mute);
        emitter.instance.registerEvent("PLAYSOUNDSTART", this.playStart);
        emitter.instance.registerEvent("PLAYSOUNDPLUS", this.playPlusScore);
        emitter.instance.registerEvent("PLAYSOUNDEND", this.playEnd);
    },

    start () {
        
    },

    onPlayPlusScore() {
        if(this._isMute == false) return;
        this.current = cc.audioEngine.playEffect(this.soundPlusScore, false);
        cc.log(this.current);
    },

    onPlayStart() {
        if(this._isMute == false) return;
        this.current = cc.audioEngine.playEffect(this.soundStart, false);
        cc.log(this.current);
    },
    
    onPlayEnd() {
        if(this._isMute == false) return;
        this.current = cc.audioEngine.playEffect(this.soundEnd, false);
        cc.log(this.current);
    },

    setGameVolume(volume) {
        cc.audioEngine.setVolume(this.current, volume);
    },

    getIsMute(isMute) {
        if(isMute == false) {
            cc.audioEngine.pauseAll();
        } else {
            cc.audioEngine.resumeAll();
        }
        this._isMute = isMute;
    }

    // update (dt) {},
});
