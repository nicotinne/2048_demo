// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const User = require("User");
const emitter = require("mEmitter");

cc.Class({
    extends: cc.Component,

    properties: {
        parent: cc.Layout,
        prefab: cc.Prefab,
        btnClose: cc.Button,
        title: cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
        this._renderAll();
        let t = this.doAnimTitle();
        t.clone(this.title.node).repeatForever().start();
        this.btnClose.node.on("click", this.onClick, this);
    },

    onClick() {
        
            emitter.instance.emit("CLOSE_LEADERBOARD");
            cc.log("close leader board");
    },

    _renderAll() {
        let data = JSON.parse(cc.sys.localStorage.getItem("users"));
        if (data != null) {
            let arr = this.sortData(data);
            arr.forEach((user, index) => {
                let item = this._createItem(user, index);
                this.checkTop(item);
            })
        }
    },

    checkTop(item) {
        if(item.getChildByName("rank").getComponent("cc.Label").string == 1) {
            item.color = new cc.color("#00000");
        }
        if(item.getChildByName("rank").getComponent("cc.Label").string == 2) {
            item.color = new cc.color("#5C5757");
        }
        if(item.getChildByName("rank").getComponent("cc.Label").string == 3) {
            item.color = new cc.color("#D1D1D1");
        }
    },

    sortData(arr) {
        arr = arr.sort((a, b) => {
            return b.score - a.score;
        })
        return arr;
    },

    _createItem(user, index) {
        let item = cc.instantiate(this.prefab);
        item.parent = this.parent.node;
        // cc.log(item.getChildByName("rank").getComponent("cc.Label").string = "aaa");
        item.getChildByName("rank").getComponent("cc.Label").string = index + 1;
        item.getChildByName("name").getComponent("cc.Label").string = user.name;
        item.getChildByName("score").getComponent("cc.Label").string = user.score;
        return item;
    },

    doAnimTitle() {
        let t = cc.tween().by(1, {position: cc.v2(23, 11)}, {easing: "sineOut"})
                            .by(0.5, {position: cc.v2(-23, -11)}, {easing: "sineIn"})
                            .by(1, {position: cc.v2(-23, 11)}, {easing: "sineOut"})
                            .by(0.5, {position: cc.v2(23, -11)}, {easing: "sineIn"})                                   
            return t;
    },

    doOpenLeader() {
        let t = cc.tween(this.node)
            .delay(0.5)
            .call(() => {
                this.node.active = true;
            })
            .to(1, { scale: 1 }, { easing: "bounceOut" });

        return t;
    },

    doCloseLeader() {
        let t = cc.tween(this.node)
            .by(0.07, { position: cc.v2(64, 0) }, { easing: "sineIn" }).repeat(10)
            .to(0.7, { scale: 1 }, { easing: "bounceIn" })
            .delay(0.5);

        return t;
    },

    // update (dt) {},
});
