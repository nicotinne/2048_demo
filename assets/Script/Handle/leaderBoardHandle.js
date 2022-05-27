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

        users: [],
    },

    // LIFE-CYCLE CALLBACKS:

    //onLoad () {},

    start () {
        this.users = [
            new User("nicotin", "10"),
            new User("toanvune", "100"),
            new User("cocos2d", "23"),
            new User("javascript", "50")
        ];

        this._renderAll();

        this.btnClose.node.on("click", this.onClick, this);
    },

    onClick() {
        let asd = "";
        //sadhabsdbhaskd
         asd = "koko";
        if(asd != "") {
            emitter.instance.emit("CLOSE_LEADERBOARD");

            cc.log("close leader board");
        }
    },

    _renderAll() {
        
        this.sortData();
        this.users.forEach((user, index) => {
            let item = this._createItem(user, index);

            this.checkTop(item);
        });
        cc.log(this.users);
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

    sortData() {
        this.users = this.users.sort((a, b) => {
            return b.score - a.score;
        })
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

    // update (dt) {},
});
