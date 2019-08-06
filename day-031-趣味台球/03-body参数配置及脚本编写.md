# body参数配置及脚本编写

> 参数设置
1. 重力为 0, 对物体进行分类，配置碰撞关系。
2. 球:线性阻尼，角速度阻尼为 1;
3. 球碰撞器的弹性系数为 1;
4. 球杆的能量系数: 18;
5. 球杆最小距离: 20, 最大距离 100;
6. `this.body.applyLinearImpulse`(方向, 世界坐标的质心, true);
7. 设计分辨率: 414x736

> 练习
1. 首先我们要确定
    * 我们的杆什么时候出来可以打球
    * 一般是在白球上做点击事件
    * 点击后远离白球出现杆，旋转可以调整角度，
        拉大距离可以增加力度，减小距离杆消失

2. 脚本写代码 
    * 在white_ball的脚本，编辑器绑定杆，以及设置个最小距离，即隐藏杆
    * touch move的时候是调整杆的位置
    * touch cancel的时候是发力打球
    * 我们还要在cue.js脚本里写个方法，完成杆打球的逻辑,需要给杆一个冲量
        ```
        cc.Class({
            extends: cc.Component,
        
            properties: {
                SHOOT_POWER: 18,
            },
        
            // LIFE-CYCLE CALLBACKS:
        
            onLoad() {
        
            },
        
            start() {
                this.body = this.node.getComponent(cc.RigidBody);
            },
        
            update(dt) {
        
            },
        
            shoot_at(dst){
                // console.log("shoot"); 
                let src = this.node.getPosition(); //球杆的位置，dst指的是白球的位置
                let dir = dst.sub(src); // 计算出向量
                let len = dir.mag();    // 计算出长度，注意这里的长度是杆的中心点到白球的距离
                let half_len = this.node.width / 2;
                let distance = len - half_len; //所以这里要减去杆的一半，就代表着杆的头部到母球的距离
                let power_x = distance * this.SHOOT_POWER * dir.x / len; //计算x方向的冲量
                let power_y = distance * this.SHOOT_POWER * dir.y / len; //计算y方向的冲量
                this.body.applyLinearImpulse(cc.v2(power_x, power_y), this.node.convertToWorldSpaceAR(cc.v2(0, 0)), true);
            },
        
        });

        ```
    * 然后处理white_ball代码如下
        ```
        cc.Class({
            extends: cc.Component,
        
            properties: {
                cue: {
                    type: cc.Node,
                    default: null,
                },
                min_dis: 20
            },
        
            // LIFE-CYCLE CALLBACKS:
        
            onLoad () {},
        
            start () {
                this.cue_inst = this.cue.getComponent("cue");
                this.node.on(cc.Node.EventType.TOUCH_MOVE, (e) => {
                    let w_pos = e.getLocation(); //注意这里是世界坐标系
                    let dst = this.node.parent.convertToNodeSpaceAR(w_pos); //这边要把球杆的位置转成母球的坐标系
                    let src = this.node.getPosition(); //拿到母球白球的坐标
                    let dir = dst.sub(src); //算出向量
                    let len = dir.mag(); //向量的长度
                    if(len < this.min_dis){
                        this.cue.active = false; //球杆隐藏
                        return;
                    }
                    this.cue.active = true; //把球杆显示出来
                    let r = Math.atan2(dir.y, dir.x); //算出弧度制的角度
                    let degree = r * 180 / Math.PI; //转换角度
                    degree = 360 - degree + 180; //360-是因为和数学的角度保持一致，+180为了转个方向
                    this.cue.rotation = degree;
        
                    let cue_pos = dst;
                    let cue_len_half = this.cue.width / 2; //因为球杆的锚点在球杆的正中间，所以下面要计算下
                    cue_pos.x += (cue_len_half * dir.x / len);
                    cue_pos.y += (cue_len_half * dir.y / len);
                    this.cue.setPosition(cue_pos);
                }, this);
        
                this.node.on(cc.Node.EventType.TOUCH_END, () => {
                    if(!this.cue.active) return;
                    this.cue_inst.shoot_at(this.node.getPosition()); //球杆打白球，参数传的就是白球的位置
                }, this)
        
                this.node.on(cc.Node.EventType.TOUCH_CANCEL, () => {
                    if(!this.cue.active) return;
                    this.cue_inst.shoot_at(this.node.getPosition()); //球杆打白球，参数传的就是白球的位置
                }, this)
            },
        
            update (dt) {},
        });
        ```
        
3. 运行后能看到简单的效果，但有些不太对劲啊，比如球杆在打球后和球一起飞出去了，
    之后就要开始做[碰撞检测](./04-碰撞检测复习.md)了        
        
        