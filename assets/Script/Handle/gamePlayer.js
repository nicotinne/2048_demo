const Emitter = require("mEmitter");
const COLOR = require("Color");
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
        _rePlayGame:null,
        _closeGamePLayer: null,
        scoreCurrent:{
            default: null,
            type: cc.Node
        },
        newValue: null,
        arrAnim: [],
    },
    onLoad() {
        this.rePlayGame();
        this.registerEvent();
    },
    onEnable(){
        this.rePlayGame();
    },
    onDisable(){
        Emitter.instance.removeEvent("CLOSEGAMEPLAYER",this._closeGamePLayer);
        Emitter.instance.removeEvent("rePlayGame", this._rePlayGame);
    },
    registerEvent(){
        Emitter.instance.registerEvent("moveUp",this.moveUp.bind(this));
        Emitter.instance.registerEvent("moveDown",this.moveDown.bind(this));
        Emitter.instance.registerEvent("moveLeft",this.moveLeft.bind(this));
        Emitter.instance.registerEvent("moveRight",this.moveRight.bind(this));
    },
    closeGamePlayer(){
        this.node.active = false;
    },
    rePlayGame(){
        this.scoreCurrent.getComponent(cc.Label).string = 0;
        this.gameBoard.removeAllChildren();
        this._arrBlocks = [];
        this._rePlayGame = this.rePlayGame.bind(this);
        this._closeGamePLayer = this.closeGamePlayer.bind(this);
        Emitter.instance.registerEvent("CLOSEGAMEPLAYER",this._closeGamePLayer);
        Emitter.instance.registerEvent("rePlayGame", this._rePlayGame);
        this.createCard();
        this.randomCard();
    },
    handleClickInput() {
        if (this._canPress) return;
        this._canPress = true;
        Emitter.instance.emit("INPUT");
    },
    moveUp() {
        this.handleClickInput();
        for (let col = 0; col < 4; col++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let row = 0; row < 4; row++) {
                flatArrCard[row] = this._arrBlocks[row][col];
            }
            this.handleMove(flatArrCard)
        }
        this.runAnimMoveCard();
    },
    moveDown() {
        this.handleClickInput();
        for (let col = 0; col < 4; col++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let row = 0; row < 4; row++) {
                flatArrCard[row] = this._arrBlocks[row][col];
            }
            this.handleMove(flatArrCard.reverse())
        }
        this.runAnimMoveCard();
    },
    moveLeft() {
        this.handleClickInput();
        for (let row = 0; row < 4; row++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let col = 0; col < 4; col++) {
                flatArrCard[col] = this._arrBlocks[row][col];
            }
            this.handleMove(flatArrCard)
        }
        this.runAnimMoveCard();
    },
    moveRight() {
        this.handleClickInput();
        for (let row = 0; row < 4; row++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let col = 0; col < 4; col++) {
                flatArrCard[col] = this._arrBlocks[row][col];
            }
            this.handleMove(flatArrCard.reverse())
        }
        this.runAnimMoveCard();
    },
    runAnimMoveCard() {
        if (this.arrAnim.length == 0) {
            this._canPress = false;
            this.randomCard(true);
            return;
        }
        else {
            for (let i = 0; i <= this.arrAnim.length; i++) {
                if (i == this.arrAnim.length) {
                    cc.tween(this.node)
                        .call(() => {
                            this.arrAnim = []
                        })
                        .delay(0.105)
                        .call(() => {
                            this._canPress = false;
                            this.randomCard();
                            this.randomCard(true);
                        }).start();
                        return;
                    }
                    this.arrAnim[i].start();
                }
            }
        },
        handleMove(arrCard) {
            let hadMerge = [];
            for (let i = 1; i < arrCard.length; i++) {
                if (arrCard[i].getComponent("card").stringCard == "") {
                    continue;
                }
                let checkCompare = false;
                let objAnim = { selfCard: null, otherCard: null, callBack: null }
                for (let j = i - 1; j >= 0; j--) {
                    if (checkCompare == true) {
                        j = -1;
                        break;
                    }
                    checkCompare = this.changeValueCards(arrCard, i, j, objAnim, hadMerge);
                }
                let cloneObjAnim = Object.assign(objAnim);
                let animCard = this.defineAnimMoveCard(cloneObjAnim.selfCard, cloneObjAnim.otherCard, cloneObjAnim.callBack);
                if (animCard != undefined) {
                    this.arrAnim.push(animCard);
                }
            }
        },
        defineAnimMoveCard(selfCard, otherCard, callBack) {
            if (selfCard != null && otherCard != null) {
                let x = otherCard.x;
                let y = otherCard.y;
                let xOld = selfCard.x;
                let yOld = selfCard.y;
                return cc.tween(selfCard)
                    .to(0.055, { position: cc.v2(x, y) }, { easing: "sineIn" })
                    .to(0, { position: cc.v2(xOld, yOld) })
                    .call(() => callBack(selfCard, otherCard))
                    .call(() => { Emitter.instance.emit("changedValue") })
            }
        },
        changeValueCards(arrCard, i, j, objAnim, hadMerge) {
            if (arrCard[j].getComponent("card").stringCard == "") {
                if (j == 0) {
                    return this.compareNull(arrCard, i, j, objAnim);
                }
            }
            else {
                if (arrCard[j].getComponent("card").stringCard == arrCard[i].getComponent("card").stringCard) {
                    return this.compareEqual(arrCard, i, j, objAnim, hadMerge);
                }
                else if (arrCard[j].getComponent("card").stringCard != arrCard[i].getComponent("card").stringCard) {
                    return this.compareDifferent(arrCard, i, j, objAnim);
                }
            }
        },
        compareNull(arrCard, i, j, objAnim) {
            let callBack = function (selfCard, otherCard) {
                otherCard.getComponent("card").contentCard.string = otherCard.getComponent("card").stringCard;
                selfCard.getComponent("card").contentCard.string = "";
                selfCard.opacity = 0;
                otherCard.opacity = 255;
            }
            objAnim.selfCard = arrCard[i];
            objAnim.otherCard = arrCard[j];
            objAnim.callBack = callBack;
            objAnim.otherCard.getComponent("card").stringCard = objAnim.selfCard.getComponent("card").stringCard;
            objAnim.selfCard.getComponent("card").stringCard = "";
            return true;
        },
        compareEqual(arrCard, i, j, objAnim, hadMerge) {
            if (hadMerge.indexOf(j) != -1) {
                let oldJ = j + 1;
                return this.compareNull(arrCard, i, oldJ, objAnim);
            }
            hadMerge.push(j);
            let callBack = function (selfCard, otherCard) {
                otherCard.getComponent("card").contentCard.string = otherCard.getComponent("card").stringCard;
                selfCard.getComponent("card").contentCard.string = "";
                otherCard.getComponent("card").animCompareEqual();
                otherCard.opacity = 255;
                selfCard.opacity = 0;
            }
            objAnim.selfCard = arrCard[i];
            objAnim.otherCard = arrCard[j];
            objAnim.callBack = callBack;
            objAnim.otherCard.getComponent("card").stringCard = Number(objAnim.otherCard.getComponent("card").stringCard) * 2 + "";
            objAnim.selfCard.getComponent("card").stringCard = "";
            Emitter.instance.emit("updateScore",Number(objAnim.otherCard.getComponent("card").stringCard));
            return true;
        },
        compareDifferent(arrCard, i, j, objAnim) {
            let reValue = j + 1;
            if (reValue != i) {
                let callBack = function(selfCard, otherCard) {
                    otherCard.getComponent("card").contentCard.string = otherCard.getComponent("card").stringCard;
                    selfCard.getComponent("card").contentCard.string = "";
                    otherCard.opacity = 255;
                    selfCard.opacity = 0;
                }
                objAnim.selfCard = arrCard[i];
                objAnim.otherCard = arrCard[reValue];
                objAnim.callBack = callBack;
                objAnim.otherCard.getComponent("card").stringCard = objAnim.selfCard.getComponent("card").stringCard;
                objAnim.selfCard.getComponent("card").stringCard = "";
            }
            return true;
        },
        checkGameOver() {
            for (let x = 0; x < 4; x++) {
                for (let y = 0; y < 4; y++) {
                    if (x == 3) continue;
                    let self = this._arrBlocks[x][y].getComponent("card").stringCard;
                    let other = this._arrBlocks[x + 1][y].getComponent("card").stringCard;
                    if (self == other) {
                        return true;
                    }
                }
            }
            for (let x = 0; x < 4; x++) {
                for (let y = 0; y < 4; y++) {
                    if (y == 3) continue;
                    let self = this._arrBlocks[x][y].getComponent("card").stringCard;
                    let other = this._arrBlocks[x][y + 1].getComponent("card").stringCard;
                    if (self == other) {
                        return true;
                    }
                }
            }
            return false;
        },
        createCard() {
            for (let col = 0; col < 4; col++) {
                let arrRow = [];
                for (let row = 0; row < 4; row++) {
                    let x = -225 + row * 150;
                    let y = 225 - col * 150;
                    let newCard = cc.instantiate(this.card);
                    newCard.parent = this.gameBoard
                    newCard.x = x;
                    newCard.y = y;
                    newCard.width = 140;
                    newCard.height = 140;
                    newCard.opacity = 0;
                    newCard.getComponent("card").stringCard = "";
                    cc.log(newCard.getComponent("card").contentCard.string)
                    arrRow.push(newCard);
                }
                this._arrBlocks.push(arrRow)
            }
        },
        randomCard(check = false) {
            let flatArray = this._arrBlocks.flat(Infinity);
            let arrNone = flatArray.filter((value) => {
                return value.getComponent("card").stringCard == "";
            })
            if(arrNone.length == 0 ){
                if (this.checkGameOver() == false) {
                    Emitter.instance.emit("GAMEOVER",Number(this.scoreCurrent.getComponent(cc.Label).string));
                }
                return;
            }
            if(check) return;
            let index = Math.floor(Math.random() * arrNone.length)
            let arrRandomNum = [2, 4];
            let num = arrRandomNum[Math.floor(Math.random() * arrRandomNum.length)]
            arrNone[index].getComponent("card").contentCard.string = num;
            arrNone[index].getComponent("card").backgroundCard.color = COLOR[Number(num)];
            arrNone[index].opacity = 255;
            arrNone[index].getComponent("card").stringCard = num + ""
            let action = cc.scaleTo(0.3, 1);
            arrNone[index].runAction(action);
        },
    });