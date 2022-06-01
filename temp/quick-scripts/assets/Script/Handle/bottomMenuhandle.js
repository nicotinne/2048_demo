(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Handle/bottomMenuhandle.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '661688EURRElapz1XNM+fG3', 'bottomMenuhandle', __filename);
// Script/Handle/bottomMenuhandle.js

"use strict";

var Emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
        lblCurrentScore: {
            default: null,
            type: cc.Node
        },
        lblBestScore: {
            default: null,
            type: cc.Node
        },
        _bestScore: null,
        _updateScore: null
    },

    onLoad: function onLoad() {
        this.lblCurrentScore.getComponent(cc.Label).string = 0;
        this._bestScore = this.onBestScore.bind(this);
        this._updateScore = this.updateScore.bind(this);
        Emitter.instance.registerEvent("BEST_SCORE", this._bestScore);
        Emitter.instance.registerEvent("updateScore", this._updateScore);
    },
    start: function start() {},
    onReplay: function onReplay() {
        this.lblCurrentScore.getComponent(cc.Label).string = 0;
        Emitter.instance.emit("rePlayGame");
    },
    onExitGame: function onExitGame() {
        Emitter.instance.emit("CLOSEGAMEPLAYER");
        Emitter.instance.emit("LOBBYLAYER");
    },
    updateScore: function updateScore(number) {
        var _this = this;

        var currentScore = Number(this.lblCurrentScore.getComponent(cc.Label).string);
        var actions = [cc.callFunc(function () {
            currentScore += 1;
        }), cc.delayTime(0.01), cc.callFunc(function () {
            _this.lblCurrentScore.getComponent(cc.Label).string = currentScore + "";
        })];
        var scale = cc.sequence(cc.scaleTo(0.15, 1.2), cc.scaleTo(0.15, 1));
        this.lblCurrentScore.runAction(cc.spawn(cc.repeat(cc.sequence(actions), number), scale));
    },
    onBestScore: function onBestScore(bestScore) {
        this.lblBestScore.getComponent(cc.Label).string = bestScore;
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
        //# sourceMappingURL=bottomMenuhandle.js.map
        