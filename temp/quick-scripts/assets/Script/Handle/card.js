(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Handle/card.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1bcdfbXBldLn7PBihrf5T+d', 'card', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=card.js.map
        