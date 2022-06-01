"use strict";
cc._RF.push(module, '0986eiPfi1Krap+SGGp5zlq', 'leaderBoardHandle');
// Script/Handle/leaderBoardHandle.js

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
var User = require("User");
var emitter = require("mEmitter");

cc.Class({
    extends: cc.Component,

    properties: {
        parent: cc.Layout,
        prefab: cc.Prefab,
        btnClose: cc.Button

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {
        this._renderAll();

        this.btnClose.node.on("click", this.onClick, this);
    },
    onClick: function onClick() {

        emitter.instance.emit("CLOSE_LEADERBOARD");
        cc.log("close leader board");
    },
    _renderAll: function _renderAll() {
        var _this = this;

        // this.sortData();
        // this.users.forEach((user, index) => {
        //     let item = this._createItem(user, index);
        //     this.checkTop(item);
        // });
        // cc.log(this.users);

        var data = JSON.parse(cc.sys.localStorage.getItem("users"));
        if (data != null) {
            var arr = this.sortData(data);
            arr.forEach(function (user, index) {
                var item = _this._createItem(user, index);
                _this.checkTop(item);
            });
        }
    },
    checkTop: function checkTop(item) {
        if (item.getChildByName("rank").getComponent("cc.Label").string == 1) {
            item.color = new cc.color("#00000");
        }
        if (item.getChildByName("rank").getComponent("cc.Label").string == 2) {
            item.color = new cc.color("#5C5757");
        }
        if (item.getChildByName("rank").getComponent("cc.Label").string == 3) {
            item.color = new cc.color("#D1D1D1");
        }
    },
    sortData: function sortData(arr) {
        arr = arr.sort(function (a, b) {
            return b.score - a.score;
        });
        return arr;
    },
    _createItem: function _createItem(user, index) {
        var item = cc.instantiate(this.prefab);
        item.parent = this.parent.node;
        // cc.log(item.getChildByName("rank").getComponent("cc.Label").string = "aaa");
        item.getChildByName("rank").getComponent("cc.Label").string = index + 1;
        item.getChildByName("name").getComponent("cc.Label").string = user.name;
        item.getChildByName("score").getComponent("cc.Label").string = user.score;
        return item;
    }
}

// update (dt) {},
);

cc._RF.pop();