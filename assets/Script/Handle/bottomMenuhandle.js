const Emitter = require("mEmitter");
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
        _updateScore: null,
    },

    onLoad() {
        this.lblCurrentScore.getComponent(cc.Label).string = 0;
        this._updateScore = this.updateScore.bind(this);
        this.onBestScore();
        Emitter.instance.registerEvent("updateScore", this._updateScore)
    },

    start() {
    },

    onReplay() {
        this.lblCurrentScore.getComponent(cc.Label).string = 0;
        Emitter.instance.emit("rePlayGame");
    },

    onExitGame() {  
        Emitter.instance.emit("CLOSEGAMEPLAYER");
        Emitter.instance.emit("LOBBYLAYER");
    },

    updateScore(number) {
        let currentScore = Number(this.lblCurrentScore.getComponent(cc.Label).string);
        let actions = [cc.callFunc(() => { currentScore += 1 }),
        cc.delayTime(0.01),
        cc.callFunc(() => { this.lblCurrentScore.getComponent(cc.Label).string = currentScore+"" })];
        let scale = cc.sequence(cc.scaleTo(0.15, 1.2), cc.scaleTo(0.15, 1))
        this.lblCurrentScore.runAction(cc.spawn(cc.repeat(cc.sequence(actions), number), scale))
    },

    onBestScore() {
        let data = JSON.parse(cc.sys.localStorage.getItem("users"));
        if (data != null) {
            data = data.sort((a, b) => {
                return parseInt(b.score) - parseInt(a.score);
            });
            this.lblBestScore.getComponent(cc.Label).string = data[0].score;
        }
    },

    // update (dt) {},
});
