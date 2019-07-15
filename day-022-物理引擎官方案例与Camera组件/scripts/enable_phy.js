cc.Class({
    extends: cc.Component,

    properties: {
        is_debug: false,
        gravity: cc.v2(0, -320), //这个是系统默认的，这个320是怎么来的，我们可以在onload的时候打印
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        if(this.is_debug){
            let Bits = cc.PhysicsManager.DrawBits;
            cc.director.getPhysicsManager().debugDrawFlags = Bits.e_jointBit | Bits.e_shapeBit;
        }else{
            cc.director.getPhysicsManager().debugDrawFlags = 0;
        }
        cc.director.getPhysicsManager().gravity = this.gravity;
    },

    start () {

    },

    update (dt) {},
});
