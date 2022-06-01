// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
        leaderBoard: cc.Node,
        settingLayer: cc.Node,
        gameOver: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.openLeader = this.onOpenLeader.bind(this);
        this.closeLeader = this.onCloseLeader.bind(this);
        this.openSetting = this.onOpenSetting.bind(this);
        this.closeSetting = this.onCloseSetting.bind(this);
        this.openGameOver = this.onOpenGameOver.bind(this);
        this.closeGameOver = this.onCloseGameOver.bind(this);

        emitter.instance.registerEvent("LEADERBOARD", this.openLeader);
        emitter.instance.registerEvent("CLOSE_LEADERBOARD", this.closeLeader);
        emitter.instance.registerEvent("SETTING", this.openSetting);
        emitter.instance.registerEvent("CLOSE_SETTING", this.closeSetting);
        emitter.instance.registerEvent("GAMEOVER", this.openGameOver);
        emitter.instance.registerEvent("CLOSE_GAMEOVER", this.closeGameOver);
    },

    start () {

    },

    onOpenGameOver(totalScore) {
        cc.log(totalScore)
        this.gameOver.active = true;
        emitter.instance.emit("OPEN_GAMEOVER", totalScore);
    },

    onCloseGameOver() {
        this.gameOver.active = false;
    },

    onOpenSetting() {
        this.settingLayer.active = true;
    },

    onCloseSetting() {
        this.settingLayer.active = false;
    },

    onOpenLeader() {
        this.leaderBoard.active = true;
    },

    onCloseLeader() {
        this.leaderBoard.active = false;
    },

    // update (dt) {},
});
