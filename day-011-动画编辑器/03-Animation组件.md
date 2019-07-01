# Animation组件

> 知识大纲
1. 代码中获得cc.Animation组件: 
        编辑器关联; 
        代码获取组件;
2. Animation组件主要的方法:
     play([name], [start_time]), 播放指定的动画，如果没有制定就播放默认的动画;
     playAdditive: 与play一样，但是不会停止当前播放的动画;
     stop([name]): 停止指定的动画，如果没有指定名字就停止当前播放的动画;
     pause/resume: 暂停唤醒动画;
     getClips: 返回组件里面带的AnimationClip数组
3. Animation重要的属性:
     defaultClip: 默认的动画剪辑;
     currentClip: 当前播放的动画剪辑;
4. Animation播放事件:  动画组件对象来监听on,不是节点
    play : 开始播放时  stop : 停止播放时 pause : 暂停播放时 resume : 恢复播放时
    lastFrame : 假如动画循环次数大于 1，当动画播放到最后一帧时 finished : 动画播放完成时
