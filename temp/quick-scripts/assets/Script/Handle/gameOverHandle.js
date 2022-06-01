(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Handle/gameOverHandle.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0fbe7ZIHU5ARLZ0QeDT5sou', 'gameOverHandle', __filename);
// Script/Handle/gameOverHandle.js

"use strict";

var User = require("User");
var emitter = require("mEmitter");
var db = JSON.parse(cc.sys.localStorage.getItem("users"));
cc.Class({
    extends: cc.Component,

    properties: {
        edbUsername: cc.EditBox,
        btnSubmit: cc.Button,
        lblScore: cc.Label,
        phaoBong: cc.Node,

        openGameOver: null,
        clickSubmit: null,
        users: []
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        this.openGameOver = this.doOpenGameOver.bind(this);
        emitter.instance.registerEvent("OPEN_GAMEOVER", this.openGameOver);
    },
    start: function start() {
        this.checkData();
        this.btnSubmit.node.on("click", this.doSubmit, this);
    },
    doOpenGameOver: function doOpenGameOver(totalScore) {
        var _this = this;

        this.node.active = true;
        var countScore = 0;
        var actions = [cc.callFunc(function () {
            countScore += 1;
            if (countScore == totalScore) {
                _this.phaoBong.active = true;
            }
        }), cc.delayTime(0.01), cc.callFunc(function () {
            _this.lblScore.string = countScore;
        })];
        this.lblScore.node.runAction(cc.repeat(cc.sequence(actions), totalScore));
    },
    getInfoUserAndPushToArray: function getInfoUserAndPushToArray() {
        var user = new User();
        user.name = this.edbUsername.string;
        user.score = this.lblScore.string;
        this.users.push(user);
    },
    doSubmit: function doSubmit() {
        if (this.edbUsername.string == "") return;
        this.getInfoUserAndPushToArray();
        if (this.users != null) {
            cc.sys.localStorage.setItem("users", JSON.stringify(this.users));
        }
        this.edbUsername.string = "";
        emitter.instance.emit("CLOSE_GAMEOVER", this.node);
    },
    checkData: function checkData() {
        if (db != null) {
            this.users = db;
        }
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
        //# sourceMappingURL=gameOverHandle.js.map
        