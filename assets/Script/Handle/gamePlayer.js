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
        newValue: null,
        arrAnim: [],
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.handleKeyDown, this);
        this.createCard();
        this.randomCard();
    },
    
    handleKeyDown(evt) {
        if (this._canPress) return;
        this._canPress = true;
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
                break;
        }
    },

    moveUp() {
        for (let col = 0; col < 4; col++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let row = 0; row < 4; row++) {
                flatArrCard[row] = this._arrBlocks[row][col];
            }
            this.handle(flatArrCard)
        }
        this.runAnim();
    },
    moveDown() {
        for (let col = 0; col < 4; col++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let row = 0; row < 4; row++) {
                flatArrCard[row] = this._arrBlocks[row][col];
            }
            this.handle(flatArrCard.reverse())

        }
        this.runAnim();
    },

    moveLeft() {
        for (let row = 0; row < 4; row++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let col = 0; col < 4; col++) {
                flatArrCard[col] = this._arrBlocks[row][col];
            }
            this.handle(flatArrCard)
        }
        this.runAnim();
    },


    moveRight() {
        for (let row = 0; row < 4; row++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let col = 0; col < 4; col++) {
                flatArrCard[col] = this._arrBlocks[row][col];
            }
            this.handle(flatArrCard.reverse())
        }
        this.runAnim();
    },

    runAnim() {
        if (this.arrAnim.length == 0) {
            this._canPress = false;
            return;
        }
        else {
            for (let i = 0; i <= this.arrAnim.length; i++) {
                if (i == this.arrAnim.length) {
                    cc.tween(this.node)
                        .call(() => {
                            this.arrAnim = []
                        })
                        .delay(0.1)
                        .call(() => {
                            this._canPress = false;
                            this.randomCard();
                        })
                        .start();
                    return;
                }
                this.arrAnim[i].start();
            }
        }
    },


    handle(arrCard) {
        let mergeCardTrue = [];
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
                checkCompare = this.changeValueCards(arrCard, i, j, objAnim, mergeCardTrue);
            }
            let cloneObjAnim = Object.assign(objAnim);
            let animCard = this.handleMove(cloneObjAnim.selfCard, cloneObjAnim.otherCard, cloneObjAnim.callBack);
            if (animCard != undefined) {
                this.arrAnim.push(animCard);
            }
        }
    },

    compareNull(arrCard,i , j, objAnim) {
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

    compareEqual(arrCard,i , j, objAnim, mergeCardTrue) {
        if (mergeCardTrue.indexOf(j) != -1) {
            let oldJ = j+1;
            return this.compareNull(arrCard,i,oldJ,objAnim);
        }
        mergeCardTrue.push(j);
        let callBack = function (selfCard, otherCard) {
            otherCard.getComponent("card").contentCard.string = otherCard.getComponent("card").stringCard;
            selfCard.getComponent("card").contentCard.string = "";
            let action = cc.sequence(cc.scaleTo(0.1, 1.2), cc.delayTime(0.3), cc.scaleTo(0.1, 1))
            otherCard.runAction(action);
            otherCard.opacity = 255;
            selfCard.opacity = 0;
        }
        objAnim.selfCard = arrCard[i];
        objAnim.otherCard = arrCard[j];
        objAnim.callBack = callBack;
        objAnim.otherCard.getComponent("card").stringCard = Number(objAnim.otherCard.getComponent("card").stringCard) * 2 + "";
        objAnim.selfCard.getComponent("card").stringCard = "";
        return true;
    },

    compareDifferent(arrCard,i , j, objAnim) {
        let reValue = j + 1;
        if (reValue != i) {
            let callBack = function (selfCard, otherCard) {
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

    changeValueCards(arrCard, i, j, objAnim, mergeCardTrue) {
        if (arrCard[j].getComponent("card").stringCard == "") {
            if( j ==0 ){
                return this.compareNull(arrCard,i , j, objAnim);
            }
        }
        else {
            if (arrCard[j].getComponent("card").stringCard == arrCard[i].getComponent("card").stringCard) {
                return this.compareEqual(arrCard,i , j, objAnim,mergeCardTrue);
            }
            else if (arrCard[j].getComponent("card").stringCard != arrCard[i].getComponent("card").stringCard) {
                return this.compareDifferent(arrCard,i , j, objAnim);
            }
        }
    },
    handleMove(selfCard, otherCard, callBack) {
        if (selfCard != null && otherCard != null) {
            let x = otherCard.x;
            let y = otherCard.y;
            let xOld = selfCard.x;
            let yOld = selfCard.y;
            return cc.tween(selfCard)
                .to(0.1, { position: cc.v2(x, y) })
                .to(0, { position: cc.v2(xOld, yOld) })
                .call(() => callBack(selfCard, otherCard))
        }

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
                newCard.color = COLOR[0];
                newCard.getComponent("card").stringCard = "";
                cc.log( newCard.getComponent("card").contentCard.string)
                arrRow.push(newCard);
            }
            this._arrBlocks.push(arrRow)
        }
    },

    randomCard() {
        let flatArray = this._arrBlocks.flat(Infinity);
        let arrNone = flatArray.filter((value) => {
            return value.getComponent("card").stringCard == "";
        })
        let index = Math.floor(Math.random() * arrNone.length)
        let arrRandomNum = [2];
        let num = arrRandomNum[Math.floor(Math.random() * arrRandomNum.length)]
        arrNone[index].getComponent("card").contentCard.string = num;
        arrNone[index].color = COLOR[2];
        arrNone[index].opacity = 255;
        arrNone[index].getComponent("card").stringCard = num + ""
        let action = cc.scaleTo(0.3, 1);
        arrNone[index].runAction(action);
    },
});
