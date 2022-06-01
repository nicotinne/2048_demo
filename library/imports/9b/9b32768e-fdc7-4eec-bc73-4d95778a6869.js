"use strict";
cc._RF.push(module, '9b327aO/cdO7LxzTZV3imhp', 'settingHandle');
// Script/Handle/settingHandle.js

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var emitter = require("mEmitter");

cc.Class({
    extends: cc.Component,

    properties: {
        btnQuit: cc.Button,
        btnClose: cc.Button,
        slideVolume: cc.Slider,
        cbMute: cc.Toggle

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {
        this.slideVolume.node.on("slide", this.onChange, this);
        this.cbMute.node.on("toggle", this.onToggle, this);
        this.btnClose.node.on("click", this.onClick, this);
    },
    onClick: function onClick() {
        emitter.instance.emit("CLOSE_SETTING");
        cc.log("close setting");
    },
    onToggle: function onToggle(toggle) {
        cc.log(toggle.isChecked);
        emitter.instance.emit("MUTE", toggle.isChecked);
    },
    onChange: function onChange(slide) {
        cc.log(_typeof(slide.progress));
        emitter.instance.emit("VOLUME", slide.progress);
    }
}

// update (dt) {
//     cc.log(this.slideVolume.progress);
// },
);

cc._RF.pop();