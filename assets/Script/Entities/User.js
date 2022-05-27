const User = cc.Class({
    properties: {
        name: String,
        score: String,
    },
    

    __ctor__(name, score) {
        this.name = name;
        this.score = score;
    }
});
module.exports = User;