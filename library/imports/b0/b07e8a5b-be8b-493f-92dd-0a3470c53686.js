"use strict";
cc._RF.push(module, 'b07e8pbvotJP5LdCjRwxTaG', 'mainController');
// Script/Controller/mainController.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var emitter = require("mEmitter");

cc.Class({
    extends: cc.Component,

    properties: {
        lobbyLayer: cc.Node,
        // gameOver: cc.Node,
        gameLayer: cc.Node,

        game: null,
        // _gameOverState: null,
        lobby: null,
        click: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        emitter.instance = new emitter();

        this.lobby = this.onLobby.bind(this);
        this.game = this.onGame.bind(this);

        emitter.instance.registerEvent("LOBBYLAYER", this.lobby);
        emitter.instance.registerEvent("GAMELAYER", this.game);
    },
    start: function start() {},
    onLobby: function onLobby() {
        cc.log("lobby");
    },
    onGame: function onGame() {
        this.gameLayer.active = true;
        cc.log("game");
    }

    // update (dt) {},

});

cc._RF.pop();