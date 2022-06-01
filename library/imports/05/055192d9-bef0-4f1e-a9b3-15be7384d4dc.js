"use strict";
cc._RF.push(module, '05519LZvvBPHqmzFb5zhNTc', 'card');
// Script/Entities/card.js

"use strict";

var Emitter = require("mEmitter");
var color = require('Color');
cc.Class({
    extends: cc.Component,
    properties: {
        contentCard: {
            default: null,
            type: cc.Label
        },
        backgroundCard: {
            default: null,
            type: cc.Node
        },
        stringCard: null
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        Emitter.instance.registerEvent("changedValue", this.changedValue.bind(this));
    },
    changedValue: function changedValue() {
        if (this.contentCard.string != "") {
            this.node.opacity = 255;
            this.backgroundCard.color = color[Number(this.contentCard.string)];
        }
        if (this.stringCard != "") {
            this.contentCard.string = this.stringCard;
            this.node.opacity = 255;
            this.backgroundCard.color = color[Number(this.contentCard.string)];
        }
    },
    animCompareEqual: function animCompareEqual() {
        var action = cc.sequence(cc.scaleTo(0.005, 1.2), cc.delayTime(0.01), cc.scaleTo(0.035, 1));
        this.node.runAction(action);
    },
    start: function start() {},
    update: function update(dt) {}
});

cc._RF.pop();