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
        this.btnStart.node.on("click", this.onClickStart, this);
        this.btnPlus.node.on("click", this.onClickPlus, this);
        this.btnEnd.node.on("click", this.onClickEnd, this);

    },

    onClickStart() {
        cc.log("play start");
        emitter.instance.emit("PLAYSOUNDSTART");
    },

    onClickPlus() {
        cc.log("play plus");
        emitter.instance.emit("PLAYSOUNDPLUS");
    },

    onClickEnd() {
        cc.log("play end");
        emitter.instance.emit("PLAYSOUNDEND");
        emitter.instance.emit("GAMEOVER");
    },

    // update (dt) {},
});
