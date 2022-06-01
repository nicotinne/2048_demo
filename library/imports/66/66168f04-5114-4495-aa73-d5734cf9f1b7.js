"use strict";
cc._RF.push(module, '661688EURRElapz1XNM+fG3', 'bottomMenuhandle');
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
        _updateScore: null
    },

    onLoad: function onLoad() {
        this.lblCurrentScore.getComponent(cc.Label).string = 0;
        this._updateScore = this.updateScore.bind(this);
        this.onBestScore();
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
    onBestScore: function onBestScore() {
        var data = JSON.parse(cc.sys.localStorage.getItem("users"));
        if (data != null) {
            data = data.sort(function (a, b) {
                return parseInt(b.score) - parseInt(a.score);
            });
            this.lblBestScore.getComponent(cc.Label).string = data[0].score;
        }
    }
}

// update (dt) {},
);

cc._RF.pop();