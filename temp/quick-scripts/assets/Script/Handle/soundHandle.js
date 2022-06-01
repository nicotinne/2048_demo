(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Handle/soundHandle.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e9a15uLEpdN96ZXAdDd4oxV', 'soundHandle', __filename);
// Script/Handle/soundHandle.js

"use strict";

var emitter = require("mEmitter");

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

        current: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
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
    start: function start() {},
    onPlayPlusScore: function onPlayPlusScore() {
        if (this._isMute == false) return;
        this.current = cc.audioEngine.playEffect(this.soundPlusScore, false);
        cc.log(this.current);
    },
    onPlayStart: function onPlayStart() {
        if (this._isMute == false) return;
        this.current = cc.audioEngine.playEffect(this.soundStart, false);
        cc.log(this.current);
    },
    onPlayEnd: function onPlayEnd() {
        if (this._isMute == false) return;
        this.current = cc.audioEngine.playEffect(this.soundEnd, false);
        cc.log(this.current);
    },
    setGameVolume: function setGameVolume(volume) {
        cc.audioEngine.setVolume(this.current, volume);
    },
    getIsMute: function getIsMute(isMute) {
        if (isMute == false) {
            cc.audioEngine.pauseAll();
        } else {
            cc.audioEngine.resumeAll();
        }
        this._isMute = isMute;
    }

    // update (dt) {},

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=soundHandle.js.map
        