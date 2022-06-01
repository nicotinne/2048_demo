
const User = require("User");
const emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {

        btnPlay: cc.Button,
        btnRank: cc.Button,
        btnSetting: cc.Button,

        openStart: null,
        clickPlay: null,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        
        
    },

    start() {
        this.btnRank.node.on("click", this.onClickRank, this);
        this.btnPlay.node.on("click", this.onClickPlay, this);
        this.btnSetting.node.on("click", this.onClickSetting, this);
    },

    onClickPlay() {
        emitter.instance.emit("GAMELAYER", this.node);
        cc.log("click new game");
    },

    onClickRank() {
        emitter.instance.emit("CLOSE_LOBBY");
        emitter.instance.emit("LEADERBOARD", this.node);
        cc.log("click rank");
    },

    onClickSetting() {
        emitter.instance.emit("CLOSE_LOBBY");
        emitter.instance.emit("SETTING", this.node);
        cc.log("click setting");
    },

    emitCloseMenu() {
        
    }
    
    // update (dt) {},
});