(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Entities/User.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '375f4JtjAZIiZG+30Q1l914', 'User', __filename);
// Script/Entities/User.js

"use strict";

var User = cc.Class({
    properties: {
        name: String,
        score: String
    },

    __ctor__: function __ctor__(name, score) {
        this.name = name;
        this.score = score;
    }
});
module.exports = User;

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
        //# sourceMappingURL=User.js.map
        