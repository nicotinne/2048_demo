// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const emitter = require("mEmitter");

cc.Class({
    extends: cc.Component,

    properties: {
        lobbyLayer: cc.Node,
        // gameOver: cc.Node,
        gameLayer: cc.Node,

        game: null,
        // _gameOverState: null,
        lobby: null,
        click: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        emitter.instance = new emitter();

        this.lobby = this.onLobby.bind(this);
        this.game = this.onGame.bind(this);

        emitter.instance.registerEvent("LOBBYLAYER", this.lobby);
        emitter.instance.registerEvent("GAMELAYER", this.game);
    },

    start() {
        this.onLobby();
    },

    onLobby() {
        cc.log("lobby")
        this.doLobby().start();
    },

    onGame() {
        cc.log("game");
        this.doCloseLobby().start();
        this.doOpenGameLayer().start();
    },

    doLobby() {
        let t = cc.tween(this.lobbyLayer)
            .call(() => {
                this.lobbyLayer.active = true;
            })
            .delay(0.4)
            .to(0.9, { position: cc.v2(0, 0) }, { easing: "backOut" });

        return t;
    },

    doCloseLobby() {
        let t = cc.tween(this.lobbyLayer)
            .delay(0.4)
            .to(0.9, { position: cc.v2(0, 630) }, { easing: "backOut" })
            .call(() => {
                this.lobbyLayer.active = false;
            })

        return t;
    },

    doOpenGameLayer() {
        let t = cc.tween(this.gameLayer)
            .delay(0.9)
            .call(() => {
                this.gameLayer.active = true;
            })
            .to(0.9, { scale: 1, rotation: 720 }, { easing: "sineIn" });

        return t;
    },

    doCloseGameLayer() {
        let t = cc.tween(this.gameLayer)
            .to(0.9, { scale: 0, rotation: 720 }, { easing: "sineIn" })
            .call(() => {
                this.gameLayer.active = false;
            })
            .delay(0.5)
        return t;
    },


    // update (dt) {},
});
