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
        btnStart: cc.Button,
        btnPlus: cc.Button,
        btnEnd: cc.Button,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
        this.startSound = this.onClickStart.bind(this);
        this.endSound = this.onClickEnd.bind(this);
        this.inputSound = this.onClickPlus.bind(this);

        emitter.instance.registerEvent("GAMELAYER", this.startSound);
        emitter.instance.registerEvent("GAMEOVER", this.endSound);
        emitter.instance.registerEvent("INPUT", this.inputSound);

        this.btnEnd.node.on("click", this.onClick, this)
    },

    onClick() {
        emitter.instance.emit("GAMEOVER", 100);
    },

    onClickStart() {
        cc.log("play start");
        emitter.instance.emit("PLAYSOUNDSTART");
    },

    onClickPlus() {
        cc.log("play input");
        emitter.instance.emit("PLAYSOUNDPLUS");
    },

    onClickEnd() {
        cc.log("play end");
        emitter.instance.emit("PLAYSOUNDEND");
    },

    // update (dt) {},
});
