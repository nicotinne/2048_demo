"use strict";
cc._RF.push(module, '62ecaMFiqJJHoPAt3bWx84a', 'gamePlayer');
// Script/Handle/gamePlayer.js

"use strict";

var Emitter = require("mEmitter");
var COLOR = require("Color");
cc.Class({
    extends: cc.Component,
    properties: {
        _handleMoveDown: null,
        _handleMoveUp: null,
        _handleMoveLeft: null,
        _handleMoveRight: null,
        _arrBlocks: [],
        gameBoard: {
            default: null,
            type: cc.Node
        },
        card: {
            default: null,
            type: cc.Prefab
        },
        _canPress: false,
        _rePlayGame: null,
        _closeGamePLayer: null,
        scoreCurrent: {
            default: null,
            type: cc.Node
        },
        newValue: null,
        arrAnim: []
    },
    onLoad: function onLoad() {
        this.rePlayGame();
    },
    onEnable: function onEnable() {
        this.rePlayGame();
    },
    onDisable: function onDisable() {
        Emitter.instance.removeEvent("CLOSEGAMEPLAYER", this._closeGamePLayer);
        Emitter.instance.removeEvent("rePlayGame", this._rePlayGame);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.handleKeyDown, this);
    },
    closeGamePlayer: function closeGamePlayer() {
        this.node.active = false;
    },
    rePlayGame: function rePlayGame() {
        this.scoreCurrent.getComponent(cc.Label).string = 0;
        this.gameBoard.removeAllChildren();
        this._arrBlocks = [];
        this._rePlayGame = this.rePlayGame.bind(this);
        this._closeGamePLayer = this.closeGamePlayer.bind(this);
        Emitter.instance.registerEvent("CLOSEGAMEPLAYER", this._closeGamePLayer);
        Emitter.instance.registerEvent("rePlayGame", this._rePlayGame);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.handleKeyDown, this);
        this.createCard();
        this.randomCard();
    },
    handleKeyDown: function handleKeyDown(evt) {
        if (this._canPress) return;
        this._canPress = true;
        Emitter.instance.emit("INPUT");
        switch (evt.keyCode) {
            case cc.macro.KEY.up:
                this.moveUp();
                break;
            case cc.macro.KEY.down:
                this.moveDown();
                break;
            case cc.macro.KEY.left:
                this.moveLeft();
                break;
            case cc.macro.KEY.right:
                this.moveRight();
                break;
            default:
                this._canPress = false;
                break;
        }
    },
    moveUp: function moveUp() {
        for (var col = 0; col < 4; col++) {
            var flatArrCard = [0, 0, 0, 0];
            for (var row = 0; row < 4; row++) {
                flatArrCard[row] = this._arrBlocks[row][col];
            }
            this.handleMove(flatArrCard);
        }
        this.runAnimMoveCard();
    },
    moveDown: function moveDown() {
        for (var col = 0; col < 4; col++) {
            var flatArrCard = [0, 0, 0, 0];
            for (var row = 0; row < 4; row++) {
                flatArrCard[row] = this._arrBlocks[row][col];
            }
            this.handleMove(flatArrCard.reverse());
        }
        this.runAnimMoveCard();
    },
    moveLeft: function moveLeft() {
        for (var row = 0; row < 4; row++) {
            var flatArrCard = [0, 0, 0, 0];
            for (var col = 0; col < 4; col++) {
                flatArrCard[col] = this._arrBlocks[row][col];
            }
            this.handleMove(flatArrCard);
        }
        this.runAnimMoveCard();
    },
    moveRight: function moveRight() {
        for (var row = 0; row < 4; row++) {
            var flatArrCard = [0, 0, 0, 0];
            for (var col = 0; col < 4; col++) {
                flatArrCard[col] = this._arrBlocks[row][col];
            }
            this.handleMove(flatArrCard.reverse());
        }
        this.runAnimMoveCard();
    },
    runAnimMoveCard: function runAnimMoveCard() {
        var _this = this;

        if (this.arrAnim.length == 0) {
            this._canPress = false;
            this.randomCard(true);
            return;
        } else {
            for (var i = 0; i <= this.arrAnim.length; i++) {
                if (i == this.arrAnim.length) {
                    cc.tween(this.node).call(function () {
                        _this.arrAnim = [];
                    }).delay(0.105).call(function () {
                        _this._canPress = false;
                        _this.randomCard();
                        _this.randomCard(true);
                    }).start();
                    return;
                }
                this.arrAnim[i].start();
            }
        }
    },
    handleMove: function handleMove(arrCard) {
        var hadMerge = [];
        for (var i = 1; i < arrCard.length; i++) {
            if (arrCard[i].getComponent("card").stringCard == "") {
                continue;
            }
            var checkCompare = false;
            var objAnim = { selfCard: null, otherCard: null, callBack: null };
            for (var j = i - 1; j >= 0; j--) {
                if (checkCompare == true) {
                    j = -1;
                    break;
                }
                checkCompare = this.changeValueCards(arrCard, i, j, objAnim, hadMerge);
            }
            var cloneObjAnim = Object.assign(objAnim);
            var animCard = this.defineAnimMoveCard(cloneObjAnim.selfCard, cloneObjAnim.otherCard, cloneObjAnim.callBack);
            if (animCard != undefined) {
                this.arrAnim.push(animCard);
            }
        }
    },
    defineAnimMoveCard: function defineAnimMoveCard(selfCard, otherCard, callBack) {
        if (selfCard != null && otherCard != null) {
            var x = otherCard.x;
            var y = otherCard.y;
            var xOld = selfCard.x;
            var yOld = selfCard.y;
            return cc.tween(selfCard).to(0.055, { position: cc.v2(x, y) }, { easing: "sineIn" }).to(0, { position: cc.v2(xOld, yOld) }).call(function () {
                return callBack(selfCard, otherCard);
            }).call(function () {
                Emitter.instance.emit("changedValue");
            });
        }
    },
    changeValueCards: function changeValueCards(arrCard, i, j, objAnim, hadMerge) {
        if (arrCard[j].getComponent("card").stringCard == "") {
            if (j == 0) {
                return this.compareNull(arrCard, i, j, objAnim);
            }
        } else {
            if (arrCard[j].getComponent("card").stringCard == arrCard[i].getComponent("card").stringCard) {
                return this.compareEqual(arrCard, i, j, objAnim, hadMerge);
            } else if (arrCard[j].getComponent("card").stringCard != arrCard[i].getComponent("card").stringCard) {
                return this.compareDifferent(arrCard, i, j, objAnim);
            }
        }
    },
    compareNull: function compareNull(arrCard, i, j, objAnim) {
        var callBack = function callBack(selfCard, otherCard) {
            otherCard.getComponent("card").contentCard.string = otherCard.getComponent("card").stringCard;
            selfCard.getComponent("card").contentCard.string = "";
            selfCard.opacity = 0;
            otherCard.opacity = 255;
        };
        objAnim.selfCard = arrCard[i];
        objAnim.otherCard = arrCard[j];
        objAnim.callBack = callBack;
        objAnim.otherCard.getComponent("card").stringCard = objAnim.selfCard.getComponent("card").stringCard;
        objAnim.selfCard.getComponent("card").stringCard = "";
        return true;
    },
    compareEqual: function compareEqual(arrCard, i, j, objAnim, hadMerge) {
        if (hadMerge.indexOf(j) != -1) {
            var oldJ = j + 1;
            return this.compareNull(arrCard, i, oldJ, objAnim);
        }
        hadMerge.push(j);
        var callBack = function callBack(selfCard, otherCard) {
            otherCard.getComponent("card").contentCard.string = otherCard.getComponent("card").stringCard;
            selfCard.getComponent("card").contentCard.string = "";
            otherCard.getComponent("card").animCompareEqual();
            otherCard.opacity = 255;
            selfCard.opacity = 0;
        };
        objAnim.selfCard = arrCard[i];
        objAnim.otherCard = arrCard[j];
        objAnim.callBack = callBack;
        objAnim.otherCard.getComponent("card").stringCard = Number(objAnim.otherCard.getComponent("card").stringCard) * 2 + "";
        objAnim.selfCard.getComponent("card").stringCard = "";
        Emitter.instance.emit("updateScore", Number(objAnim.otherCard.getComponent("card").stringCard));
        return true;
    },
    compareDifferent: function compareDifferent(arrCard, i, j, objAnim) {
        var reValue = j + 1;
        if (reValue != i) {
            var callBack = function callBack(selfCard, otherCard) {
                otherCard.getComponent("card").contentCard.string = otherCard.getComponent("card").stringCard;
                selfCard.getComponent("card").contentCard.string = "";
                otherCard.opacity = 255;
                selfCard.opacity = 0;
            };
            objAnim.selfCard = arrCard[i];
            objAnim.otherCard = arrCard[reValue];
            objAnim.callBack = callBack;
            objAnim.otherCard.getComponent("card").stringCard = objAnim.selfCard.getComponent("card").stringCard;
            objAnim.selfCard.getComponent("card").stringCard = "";
        }
        return true;
    },
    checkGameOver: function checkGameOver() {
        for (var x = 0; x < 4; x++) {
            for (var y = 0; y < 4; y++) {
                if (x == 3) continue;
                var self = this._arrBlocks[x][y].getComponent("card").stringCard;
                var other = this._arrBlocks[x + 1][y].getComponent("card").stringCard;
                if (self == other) {
                    return true;
                }
            }
        }
        for (var _x = 0; _x < 4; _x++) {
            for (var _y = 0; _y < 4; _y++) {
                if (_y == 3) continue;
                var _self = this._arrBlocks[_x][_y].getComponent("card").stringCard;
                var _other = this._arrBlocks[_x][_y + 1].getComponent("card").stringCard;
                if (_self == _other) {
                    return true;
                }
            }
        }
        return false;
    },
    createCard: function createCard() {
        for (var col = 0; col < 4; col++) {
            var arrRow = [];
            for (var row = 0; row < 4; row++) {
                var x = -225 + row * 150;
                var y = 225 - col * 150;
                var newCard = cc.instantiate(this.card);
                newCard.parent = this.gameBoard;
                newCard.x = x;
                newCard.y = y;
                newCard.width = 140;
                newCard.height = 140;
                newCard.opacity = 0;
                newCard.getComponent("card").stringCard = "";
                cc.log(newCard.getComponent("card").contentCard.string);
                arrRow.push(newCard);
            }
            this._arrBlocks.push(arrRow);
        }
    },
    randomCard: function randomCard() {
        var check = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var flatArray = this._arrBlocks.flat(Infinity);
        var arrNone = flatArray.filter(function (value) {
            return value.getComponent("card").stringCard == "";
        });
        if (arrNone.length == 0) {
            if (this.checkGameOver() == false) {
                Emitter.instance.emit("GAMEOVER", Number(this.scoreCurrent.getComponent(cc.Label).string));
            }
            return;
        }
        if (check) return;
        var index = Math.floor(Math.random() * arrNone.length);
        var arrRandomNum = [2, 4];
        var num = arrRandomNum[Math.floor(Math.random() * arrRandomNum.length)];
        arrNone[index].getComponent("card").contentCard.string = num;
        arrNone[index].getComponent("card").backgroundCard.color = COLOR[Number(num)];
        arrNone[index].opacity = 255;
        arrNone[index].getComponent("card").stringCard = num + "";
        var action = cc.scaleTo(0.3, 1);
        arrNone[index].runAction(action);
    }
});

cc._RF.pop();