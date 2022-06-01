(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Handle/mainMenuHandle.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '16c08yMsttIN5z380Z/wQrP', 'mainMenuHandle', __filename);
// Script/Handle/mainMenuHandle.js

"use strict";

var User = require("User");
var emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {

        btnPlay: cc.Button,
        btnRank: cc.Button,
        btnSetting: cc.Button,

        openStart: null,
        clickPlay: null
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {},
    start: function start() {
        this.btnRank.node.on("click", this.onClickRank, this);
        this.btnPlay.node.on("click", this.onClickPlay, this);
        this.btnSetting.node.on("click", this.onClickSetting, this);
    },
    onClickPlay: function onClickPlay() {
        emitter.instance.emit("GAMELAYER", this.node);
        cc.log("click new game");
    },
    onClickRank: function onClickRank() {
        emitter.instance.emit("LEADERBOARD", this.node);
        cc.log("click rank");
    },
    onClickSetting: function onClickSetting() {
        emitter.instance.emit("SETTING", this.node);
        cc.log("click setting");
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
        //# sourceMappingURL=mainMenuHandle.js.map
        