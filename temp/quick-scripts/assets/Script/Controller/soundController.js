(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Controller/soundController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7a12fDX3qhMfJxi5mVH2Mtj', 'soundController', __filename);
// Script/Controller/soundController.js

"use strict";

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
        btnStart: cc.Button,
        btnPlus: cc.Button,
        btnEnd: cc.Button

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.btnStart.node.on("click", this.onClickStart, this);
        this.btnPlus.node.on("click", this.onClickPlus, this);
        this.btnEnd.node.on("click", this.onClickEnd, this);
    },
    onClickStart: function onClickStart() {
        cc.log("play start");
        emitter.instance.emit("PLAYSOUNDSTART");
    },
    onClickPlus: function onClickPlus() {
        cc.log("play plus");
        emitter.instance.emit("PLAYSOUNDPLUS");
    },
    onClickEnd: function onClickEnd() {
        cc.log("play end");
        emitter.instance.emit("PLAYSOUNDEND");
        emitter.instance.emit("GAMEOVER");
    }
}

// update (dt) {},
);

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
        //# sourceMappingURL=soundController.js.map
        