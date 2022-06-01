
const User = require("User");
const emitter = require("mEmitter");
const db = JSON.parse(cc.sys.localStorage.getItem("users"));
cc.Class({
    extends: cc.Component,

    properties: {
        edbUsername: cc.EditBox,
        btnSubmit: cc.Button,
        lblScore: cc.Label,
        phaoBong: cc.Node,

        openGameOver: null,
        clickSubmit: null,
        users: [],
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.openGameOver = this.doOpenGameOver.bind(this);
        emitter.instance.registerEvent("OPEN_GAMEOVER", this.openGameOver);
    },

    start () {
        this.checkData();
        this.btnSubmit.node.on("click", this.doSubmit, this);
        
    },

    doOpenGameOver(totalScore) {
        cc.log(totalScore)
        this.node.active = true;
        let countScore = 0;
        let actions = [cc.callFunc(() => { 
            countScore += 1;
            if(countScore == totalScore) {
                this.phaoBong.active = true;
            }
        }),
        cc.delayTime(0.001),
        cc.callFunc(() => { this.lblScore.string = countScore})];
        this.lblScore.node.runAction(cc.repeat(cc.sequence(actions), totalScore));
        
    },

    getInfoUserAndPushToArray() {
        let user = new User();
        user.name = this.edbUsername.string;
        user.score = this.lblScore.string;
        this.users.push(user);
    },

    doSubmit() {
        if(this.edbUsername.string == "") return;
        this.getInfoUserAndPushToArray();
        if(this.users != null) {
            cc.sys.localStorage.setItem("users", JSON.stringify(this.users));
        }
        this.edbUsername.string = "";
        emitter.instance.emit("CLOSE_GAMEOVER", this.node);
    },

    checkData() {
        if(db != null) {
            this.users = db;
        }
    },
    // update (dt) {},
});
