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
        _bestScore: null,
        _updateScore: null,
    },

    onLoad() {
        this.lblCurrentScore.getComponent(cc.Label).string = 0;
        this._bestScore = this.onBestScore.bind(this);
        this._updateScore = this.updateScore.bind(this);
        Emitter.instance.registerEvent("BEST_SCORE", this._bestScore);
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

    onBestScore(bestScore) {
        this.lblBestScore.getComponent(cc.Label).string = bestScore;
    },

    // update (dt) {},
});
