# Action
> 概念及API
1. Action类是动作命令，我们创建Action，然后节点运行action就能执行Action的动作
2. Action分为两类
    1. 瞬时完成的ActionInstant
    2. 要一段时间才能完成的ActionInterval
3. runAction: 节点运行action
4. cc.moveTo, cc.moveBy - to是目标 by是变化
5. cc.rotateBy, cc.rotateTo
6. cc.scaleBy, cc.scaleTo
7. cc.fadeOut, cc.fadeIn
8. cc.callFunc
9. cc.sequnce, cc.repeat, cc.repeatForever
10. easing: 加上缓动特效，cc.easeXXXXX查看文档设置自己想要的缓动对象
11. stopAction: 停止运行action
12. stopAllActions: 停止所有的action

> 练习
