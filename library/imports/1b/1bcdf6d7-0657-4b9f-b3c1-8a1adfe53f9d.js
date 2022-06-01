"use strict";
cc._RF.push(module, '1bcdfbXBldLn7PBihrf5T+d', 'card');
// Script/Handle/card.js

"use strict";

var Emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
        contentCard: {
            default: null,
            type: cc.Label
        },
        stringCard: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.stringCard = "";
    },
    start: function start() {},
    update: function update(dt) {
        //this.stringCard = this.contentCard.string;
    }
});

cc._RF.pop();