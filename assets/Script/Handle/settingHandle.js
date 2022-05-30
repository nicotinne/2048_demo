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
        btnQuit: cc.Button,
        btnClose: cc.Button,
        slideVolume: cc.Slider,
        cbMute: cc.Toggle,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       
    },

    start () {
        this.slideVolume.node.on("slide", this.onChange, this);
        this.cbMute.node.on("toggle", this.onToggle, this);
        this.btnClose.node.on("click", this.onClick, this);
    },

    onClick() {
        emitter.instance.emit("CLOSE_SETTING");
        cc.log("close setting");
    },

    onToggle(toggle) {
        cc.log(toggle.isChecked);
        emitter.instance.emit("MUTE", toggle.isChecked);
    },

    onChange(slide) {
        cc.log(typeof slide.progress);
        emitter.instance.emit("VOLUME", slide.progress);
    },
    

    // update (dt) {
    //     cc.log(this.slideVolume.progress);
    // },
});
