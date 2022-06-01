
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
        title: cc.Sprite,

        openGameOver: null,
        clickSubmit: null,
        users: [],
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.openGameOver = this.onOpenGameOver.bind(this);
        emitter.instance.registerEvent("OPEN_GAMEOVER", this.openGameOver);
    },

    start() {
        this.checkData();
        this.btnSubmit.node.on("click", this.doSubmit, this);

    },

    onOpenGameOver(totalScore) {
        cc.log(totalScore)
        this.node.active = true;
        let countScore = 0;
        let actions = [cc.callFunc(() => {
            countScore += 1;
            if (countScore == totalScore) {

            }
        }),
        cc.delayTime(0.01),
        cc.callFunc(() => {
            this.lblScore.string = countScore;
            if (this.lblScore.string == 100) {
                this.phaoBong.active = true;
                let t = this.doAnimTitle();
                t.clone(this.title.node).repeatForever().start();
            }
        })];
        this.lblScore.node.runAction(cc.repeat(cc.sequence(actions), totalScore));

    },

    doAnimTitle() {
        let t = cc.tween()
            .to(0.3, { position: cc.v2(0, 218)})
            .by(0.3, { position: cc.v2(0, -3)}, {delayTime: 0.1}).repeat(5)
            .by(0.3, { position: cc.v2(0, +3)}, {delayTime: 0.1}).repeat(5)
            
            // .to(1, { scaleY: 1, skewX: -10 })

        return t;
    },

    getInfoUserAndPushToArray() {
        let user = new User();
        user.name = this.edbUsername.string;
        user.score = this.lblScore.string;
        this.users.push(user);
    },

    doSubmit() {
        if (this.edbUsername.string == "") return;
        this.getInfoUserAndPushToArray();
        if (this.users != null) {
            cc.sys.localStorage.setItem("users", JSON.stringify(this.users));
        }
        this.edbUsername.string = "";
        emitter.instance.emit("CLOSE_GAMEOVER", this.node);
    },

    checkData() {
        if (db != null) {
            this.users = db;
        }
    },
    // update (dt) {},
});
