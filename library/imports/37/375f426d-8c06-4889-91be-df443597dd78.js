"use strict";
cc._RF.push(module, '375f4JtjAZIiZG+30Q1l914', 'User');
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