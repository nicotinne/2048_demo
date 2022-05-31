const Emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,
    properties: {
        contentCard: {
            default: null,
            type: cc.Label
        },
        stringCard: null,
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        Emitter.instance.registerEvent("changedValue", this.changedValue.bind(this));
    },
    changedValue() {
        if (this.contentCard.string != "") {
            this.node.opacity = 255;
        }
        if (this.stringCard != "") {
            this.contentCard.string = this.stringCard;
            this.node.opacity = 255
        }
    },
    animCompareEqual(){
        let action = cc.sequence(cc.scaleTo(0.005, 1.2), cc.delayTime(0.01), cc.scaleTo(0.035, 1))
        this.node.runAction(action);
    },
    start() {
    },
    update(dt) {
    },
});
