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
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.handleKeyUp, this);
        this.createCard();
        this.randomCard();
    },

    handleKeyUp(evt) {
        switch (evt.keyCode) {
            case cc.macro.KEY.up:
            case cc.macro.KEY.down:
            case cc.macro.KEY.left:
            case cc.macro.KEY.right:
                this._canPress = false;
                this.randomCard();
                break;
            default:
                break;
        }
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
    },
    moveDown() {
        for (let col = 0; col < 4; col++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let row = 0; row < 4; row++) {
                flatArrCard[row] = this._arrBlocks[row][col];
            }
            this.handle(flatArrCard.reverse())

        }
    },

    moveLeft() {
        for (let row = 0; row < 4; row++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let col = 0; col < 4; col++) {
                flatArrCard[col] = this._arrBlocks[row][col];
            }
            this.handle(flatArrCard)
        }
    },


    moveRight() {
        for (let row = 0; row < 4; row++) {
            let flatArrCard = [0, 0, 0, 0];
            for (let col = 0; col < 4; col++) {
                flatArrCard[col] = this._arrBlocks[row][col];
            }
            this.handle(flatArrCard.reverse())
        }
    },

    handle(arrCard) {
        let mergeCardTrue = [];
        for (let i = 1; i < arrCard.length; i++) {
            if (arrCard[i].opacity == 0) {
                continue;
            }
            let checkCompare = false;
            for (let j = i - 1; j >= 0; j--) {
                if (checkCompare == true) {
                    j = -1;
                    break;
                }
                checkCompare = this.changeValueCards(arrCard, i, j, mergeCardTrue);
            }
        }
    },

    changeValueCards(arrCard, i, j, mergeCardTrue) {
        cc.log(mergeCardTrue)
        if (arrCard[j].opacity == 0) {
            if (j == 0) {
                arrCard[j].getComponent("card").contentCard.string = arrCard[i].getComponent("card").contentCard.string;
                arrCard[i].getComponent("card").contentCard.string = "0";
                arrCard[i].opacity = 0;
                arrCard[j].opacity = 255;
                return true;
            }
        }
        else {
            if (arrCard[j].getComponent("card").contentCard.string == arrCard[i].getComponent("card").contentCard.string) {
                if (mergeCardTrue.indexOf(j) != -1) {
                    let oldJ = j + 1;
                    arrCard[oldJ].getComponent("card").contentCard.string = arrCard[i].getComponent("card").contentCard.string;
                    arrCard[i].getComponent("card").contentCard.string = "0";
                    arrCard[i].opacity = 0;
                    arrCard[oldJ].opacity = 255;
                    return true;
                }
                mergeCardTrue.push(j);
                arrCard[j].getComponent("card").contentCard.string = Number(arrCard[j].getComponent("card").contentCard.string) * 2 + "";
                arrCard[i].getComponent("card").contentCard.string = "0";
                arrCard[j].opacity = 255;
                arrCard[i].opacity = 0;
                return true;
            }
            else if (arrCard[j].getComponent("card").contentCard.string != arrCard[i].getComponent("card").contentCard.string) {
                let reValue = j + 1;
                if (reValue != i) {
                    arrCard[reValue].getComponent("card").contentCard.string = arrCard[i].getComponent("card").contentCard.string;
                    arrCard[i].getComponent("card").contentCard.string = "0";
                    arrCard[reValue].opacity = 255;
                    arrCard[i].opacity = 0;
                }
                return true;
            }
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
                arrRow.push(newCard);
            }
            this._arrBlocks.push(arrRow)
        }
    },

    randomCard() {
        let flatArray = this._arrBlocks.flat(Infinity);
        let arrNone = flatArray.filter((value) => {
            return value.opacity == 0;
        })
        let index = Math.floor(Math.random() * arrNone.length)
        let arrRandomNum = [2, 4];
        let num = arrRandomNum[Math.floor(Math.random() * arrRandomNum.length)]
        arrNone[index].getComponent("card").contentCard.string = num;
        arrNone[index].color = COLOR[2];
        arrNone[index].opacity = 255;
    },

    handleMoveDown() {
        // moveCard 
    },

    handleMoveUp() {
        // moveCard
    },

    handleMoveLeft() {
        // moveCard
    },

    handleMoveRight() {
        // moveCard
    },

    start() {

    },

    update(dt) {
    },


});
///////////////////// DEMO //////////////////////////////
// const Emitter = require("mEmitter");
// const COLOR = require("Color");

// cc.Class({
//     extends: cc.Component,

//     properties: {
//         _handleMoveDown: null,
//         _handleMoveUp: null,
//         _handleMoveLeft: null,
//         _handleMoveRight: null,
//         _arrBlocks: [],
//         gameBoard: {
//             default: null,
//             type: cc.Node
//         },
//         card: {
//             default: null,
//             type: cc.Prefab
//         },
//         _canPress: false,
//         newValue: null,
//         arrAnim: [],
//     },

//     onLoad() {
//         // this._handleMoveDown = this.handleMoveDown;
//         // this._handleMoveUp = this.handleMoveUp;
//         // this._handleMoveRight = this.handleMoveRight;
//         // this._handleMoveLeft = this.handleMoveLeft;

//         cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.handleKeyDown, this);

//         this.registerEvent();
//         this.createCard();
//         this.randomCard();
//     },

//     registerEvent() {
//         // Emitter.instance.registerEvent("moveDown", this._handleMoveDown);
//         // Emitter.instance.registerEvent("moveUP", this._handleMoveUp);
//         // Emitter.instance.registerEvent("moveLeft", this._handleMoveLeft);
//         // Emitter.instance.registerEvent("moveRight", this._handleMoveRight);
//     },

//     handleKeyDown(evt) {
//         if (this._canPress) return;
//         this._canPress = true;
//         cc.log("block")
//         switch (evt.keyCode) {
//             case cc.macro.KEY.up:
//                 this.moveUp();
//                 cc.log("up")
//                 break;
//             case cc.macro.KEY.down:
//                 this.moveDown();
//                 break;
//             case cc.macro.KEY.left:
//                 this.moveLeft();
//                 break;
//             case cc.macro.KEY.right:
//                 this.moveRight();
//                 break;
//             default:
//                 break;
//         }
//     },

//     moveUp() {
//         for (let col = 0; col < 4; col++) {
//             let flatArrCard = [0, 0, 0, 0];
//             for (let row = 0; row < 4; row++) {
//                 flatArrCard[row] = this._arrBlocks[row][col];
//             }
//             this.handle(flatArrCard)
//         }
//         this.runAnim();
//     },
//     moveDown() {
//         for (let col = 0; col < 4; col++) {
//             let flatArrCard = [0, 0, 0, 0];
//             for (let row = 0; row < 4; row++) {
//                 flatArrCard[row] = this._arrBlocks[row][col];
//             }
//             this.handle(flatArrCard.reverse())

//         }
//         this.runAnim();
//     },

//     moveLeft() {
//         for (let row = 0; row < 4; row++) {
//             let flatArrCard = [0, 0, 0, 0];
//             for (let col = 0; col < 4; col++) {
//                 flatArrCard[col] = this._arrBlocks[row][col];
//             }
//             this.handle(flatArrCard)
//         }
//         this.runAnim();
//     },


//     moveRight() {
//         for (let row = 0; row < 4; row++) {
//             let flatArrCard = [0, 0, 0, 0];
//             for (let col = 0; col < 4; col++) {
//                 flatArrCard[col] = this._arrBlocks[row][col];
//             }
//             this.handle(flatArrCard.reverse())
//         }
//         this.runAnim();
//     },

//     runAnim() {
//         cc.log(this.arrAnim)
//         if (this.arrAnim.length == 0) {
//             this._canPress = false;
//             return;
//         }
//         else if (this.arrAnim.length == 1) {
//             if (this.arrAnim[0] != undefined) {
//                 cc.tween(this.node)
//                     .call(() => {
//                         cc.log(1)
//                         this.arrAnim[0].start();
//                         this.arrAnim = []
//                     })
//                     .delay(1)
//                     .call(() => {
//                         cc.log(2);
//                         this._canPress = false;
//                         this.randomCard();
//                     })
//                     .start();
//             }
//             return;

//         }
//         else {
//             for (let i = 0; i <= this.arrAnim.length; i++) {
//                 if (i == this.arrAnim.length) {
//                     cc.tween(this.node)
//                         .call(() => {
//                             cc.log(1)
//                             this.arrAnim = []
//                         })
//                         .delay(1)
//                         .call(() => {
//                             cc.log(2)
//                             this._canPress = false;
//                             this.randomCard();
//                         })
//                         .start();
//                     return;
//                 }
//                 if (this.arrAnim[i] != undefined) {
//                     this.arrAnim[i].start();
//                 }
//             }
//         }
//     },


//     handle(arrCard) {
//         let mergeCardTrue = [];
//         for (let i = 1; i < arrCard.length; i++) {
//             if (arrCard[i].getComponent("card").contentCard.string == "") {
//                 continue;
//             }
//             let checkCompare = false;
//             let objAnim = { selfCard: null, otherCard: null, callBack: null }
//             for (let j = i - 1; j >= 0; j--) {
//                 if (checkCompare == true) {
//                     j = -1;
//                     break;
//                 }
//                 checkCompare = this.changeValueCards(arrCard, i, j, objAnim , mergeCardTrue);
//             }
//             let cloneObjAnim = Object.assign(objAnim);
//             this.arrAnim.push(this.handleMove(cloneObjAnim.selfCard, cloneObjAnim.otherCard, cloneObjAnim.callBack));
//         }
//     },
//     changeValueCards(arrCard, i, j, objAnim, mergeCardTrue) {
//         if (arrCard[j].getComponent("card").stringCard == "") {
//             if (j == 0) {
//                 let callBack = function (selfCard, otherCard) {
//                     otherCard.children[1].getComponent('cc.Label').string = selfCard.children[1].getComponent('cc.Label').string;
//                     selfCard.children[1].getComponent('cc.Label').string = "";
//                     selfCard.opacity = 0;
//                     otherCard.opacity = 255;
//                 }
//                 objAnim.selfCard = arrCard[i];
//                 objAnim.otherCard = arrCard[j];
//                 objAnim.callBack = callBack;
//                 objAnim.otherCard.getComponent("card").stringCard = objAnim.selfCard.getComponent("card").stringCard;
//                 objAnim.selfCard.getComponent("card").stringCard = "";
//                 return true;
//             }
//         }
//         else {
//             if (arrCard[j].getComponent("card").stringCard == arrCard[i].getComponent("card").stringCard) {
//                 if (mergeCardTrue.indexOf(j) != -1) {
//                     let oldJ  = j +1;
//                     let callBack = function (selfCard, otherCard) {
//                         otherCard.children[1].getComponent('cc.Label').string = selfCard.children[1].getComponent('cc.Label').string;
//                         selfCard.children[1].getComponent('cc.Label').string = "";
//                         selfCard.opacity = 0;
//                         otherCard.opacity = 255;
//                     }
//                     objAnim.selfCard = arrCard[i];
//                     objAnim.otherCard = arrCard[oldJ];
//                     objAnim.callBack = callBack;
//                     objAnim.otherCard.getComponent("card").stringCard = objAnim.selfCard.getComponent("card").stringCard;
//                     objAnim.selfCard.getComponent("card").stringCard = "";
//                     return true;
//                 }
//                 mergeCardTrue.push(j);
//                 let callBack = function (selfCard, otherCard) {
//                     otherCard.children[1].getComponent('cc.Label').string = Number(otherCard.children[1].getComponent('cc.Label').string) * 2 + "";
//                     selfCard.children[1].getComponent('cc.Label').string = "";
//                     let action = cc.sequence(cc.scaleTo(0.1, 1.2), cc.delayTime(0.3), cc.scaleTo(0.1, 1))
//                     otherCard.runAction(action);
//                     otherCard.opacity = 255;
//                     selfCard.opacity = 0;
//                 }
//                 objAnim.selfCard = arrCard[i];
//                 objAnim.otherCard = arrCard[j];
//                 objAnim.callBack = callBack;
//                 cc.log("num1 :", objAnim.otherCard.getComponent("card").stringCard, "num2:", objAnim.selfCard.getComponent("card").stringCard);
//                 objAnim.otherCard.getComponent("card").stringCard = Number(objAnim.otherCard.getComponent("card").stringCard) * 2 + "";
//                 objAnim.selfCard.getComponent("card").stringCard = "";
//                 return true;
//             }
//             else if (arrCard[j].getComponent("card").stringCard != arrCard[i].getComponent("card").stringCard) {
//                 let reValue = j + 1;
//                 if (reValue != i) {
//                     let callBack = function (selfCard, otherCard) {
//                         otherCard.children[1].getComponent('cc.Label').string = selfCard.children[1].getComponent('cc.Label').string;
//                         selfCard.children[1].getComponent('cc.Label').string = "";
//                         otherCard.opacity = 255;
//                         selfCard.opacity = 0;
//                     }
//                     objAnim.selfCard = arrCard[i];
//                     objAnim.otherCard = arrCard[reValue];
//                     objAnim.callBack = callBack;
//                     cc.log("num1 :", objAnim.otherCard.getComponent("card").stringCard, "num2:", objAnim.selfCard.getComponent("card").stringCard);
//                     objAnim.otherCard.getComponent("card").stringCard = objAnim.selfCard.getComponent("card").stringCard;
//                     objAnim.selfCard.getComponent("card").stringCard = "";
//                 }
//                 return true;
//             }
//         }
//     },
//     handleMove(selfCard, otherCard, callBack) {
//         if (selfCard != null && otherCard != null) {
//             let x = otherCard.x;
//             let y = otherCard.y;
//             let xOld = selfCard.x;
//             let yOld = selfCard.y;
//             return cc.tween(selfCard)
//                 .to(1, { position: cc.v2(x, y) })
//                 .to(0, { position: cc.v2(xOld, yOld) })
//                 .call(() => callBack(selfCard, otherCard))
//         }

//     },


//     reloadColor(arrCard) {
//         for (let col = 0; col < arrCard.length; col++) {
//             for (let row = 0; row < arrCard.length; row++) {
//                 let number = 0;
//                 if (arrCard[col][row].getComponent("card").contentCard.string == "") {
//                     number = 0;
//                 }
//                 else {
//                     number = parseInt(arrCard[col][row].getComponent("card").contentCard.string);
//                 }
//                 arrCard[col][row].children[0].color = COLOR[number];

//             }
//         }

//     },

//     createCard() {
//         for (let col = 0; col < 4; col++) {
//             let arrRow = [];
//             for (let row = 0; row < 4; row++) {
//                 let x = -225 + row * 150;
//                 let y = 225 - col * 150;
//                 let newCard = cc.instantiate(this.card);
//                 newCard.parent = this.gameBoard
//                 newCard.x = x;
//                 newCard.y = y;
//                 newCard.width = 140;
//                 newCard.height = 140;
//                 newCard.opacity = 0;
//                 newCard.color = COLOR[0];
//                 arrRow.push(newCard);
//             }
//             this._arrBlocks.push(arrRow)
//         }
//     },

//     randomCard() {
//         let flatArray = this._arrBlocks.flat(Infinity);
//         let arrNone = flatArray.filter((value) => {
//             return value.getComponent("card").contentCard.string == "";
//         })
//         let index = Math.floor(Math.random() * arrNone.length)
//         let arrRandomNum = [2, 4];
//         let num = arrRandomNum[Math.floor(Math.random() * arrRandomNum.length)]
//         arrNone[index].getComponent("card").contentCard.string = num;
//         arrNone[index].color = COLOR[2];
//         arrNone[index].opacity = 255;
//         arrNone[index].getComponent("card").stringCard = num
//         let action = cc.scaleTo(0.3, 1);
//         arrNone[index].runAction(action);
//     },
// });