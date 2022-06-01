const emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
        _mouseDown: null,
        gameBoard: cc.Node,
    },

    onLoad(){
        this._mouseDown = {};
        this.gameBoard.on(cc.Node.EventType.MOUSE_DOWN, this.mouseDown, this);
        this.gameBoard.on(cc.Node.EventType.MOUSE_UP, this.mouseUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.handleKeyDown, this);
        this.eventTouchHanlder();
    },
    mouseUp(evt) {
        let mouseUpX = evt.getLocationX();
        let mouseUpY = evt.getLocationY();
        if (Math.abs(this._mouseDown.x - mouseUpX) > Math.abs(this._mouseDown.y - mouseUpY)) {
            if (Math.abs(this._mouseDown.x - mouseUpX) < 50) return;
            if (this._mouseDown.x - mouseUpX < 0) {
                emitter.instance.emit("moveRight");
            }
            else {
                emitter.instance.emit("moveLeft");
            }
        }
        else {
            if (Math.abs(this._mouseDown.y - mouseUpY) < 50) return;
            if (this._mouseDown.y - mouseUpY < 0) {
                emitter.instance.emit("moveUp");
            }
            else {
                emitter.instance.emit("moveDown");
            }
        }
    },
    mouseDown(evt) {
        this._mouseDown.x = evt.getLocationX();
        this._mouseDown.y = evt.getLocationY();
    },
    eventTouchHanlder () {
        cc.log("vo ne")
        this.gameBoard.on("touchstart", (event) => {
            this._startTouch = event.getLocation();
            cc.log("start")
        })
        this.gameBoard.on("touchend", (event) => {
            this._endTouch = event.getLocation();
            this.checkTouch();
            cc.log("end")
        })
    },
    checkTouch() {
        let startTouch = this._startTouch;
        let endTouch = this._endTouch;
        let dinstance = endTouch.sub(startTouch);
        let VecLength = dinstance.mag();
        if (VecLength > 50) {
            if (Math.abs(dinstance.x) > Math.abs(dinstance.y)) {
                if (dinstance.x > 0) emitter.instance.emit("moveRight");
                else emitter.instance.emit("moveLeft");
            }
            else {
            
                if (dinstance.y > 0) emitter.instance.emit("moveUp");
                else emitter.instance.emit("moveDown");
            }
            this.randomNumber();
        }
    },
    handleKeyDown(evt) {
        switch (evt.keyCode) {
            case cc.macro.KEY.up:
                cc.log("upo")
                emitter.instance.emit("moveUp");
                break;
            case cc.macro.KEY.down:
                emitter.instance.emit("moveDown");
                break;
            case cc.macro.KEY.left:
                emitter.instance.emit("moveLeft");
                break;
            case cc.macro.KEY.right:
                emitter.instance.emit("moveRight");
                break;
            default:
                break;
        }
    },
});
