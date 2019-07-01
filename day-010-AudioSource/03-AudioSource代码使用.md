# AudioSource代码使用

> 知识大纲
1. 代码中获得cc.AudioSource组件: 
    * 编辑器关联; 
    * 代码获取组件;
2. AudioSource 主要的方法:
    * play(); 播放音频;
    * stop(); 停止声音播放;
    * pause(); 暂停声音播放;
    * resume(); 恢复声音播放;
    * rewind(); 重头开始播放;
    * 其它接口见文档;  
3. AudioSource代码主要属性:
   * loop: 是否循环播放
   * isPlaying: 是否正在播放; 
   * mute: 是否静音;
   * 如果要在开始的时候设置某些属性，可以放到start函数里面;

> 练习
1. 创建**game_scene.js**脚本，然后在Canvas下添加该组件
2. 代码获得组件
    1. 编辑器关联
        * 直接上代码
        ```
        properties: {
        	audio:{
        		type: cc.AudioSource,
        		default: null
        	}
        },
        ```
        * 这样我们就可以和编辑器关联，把有音频组件的audio节点拖拽至编辑器的audio属性下
            
            ![](./images/编辑器关联.jpg)
        
    2. 代码获取组件
        * 直接上代码
        ```
        onLoad () {
            this.audioSource = this.node.getChildByName("audio").getComponent(cc.AudioSource);
        },
        ```
3. AudioSource主要的方法
    1. 播放
        ```
        start () {
            this.audioSource.play();
        },
        ```
    2. 停止声音播放  
        ```
        start () {
            this.audioSource.play();
            //3s后停止
            this.scheduleOnce(function(){
                this.audioSource.stop();
            }.bind(this),3)
        },
        ```          
    3. 暂停和恢复是配合使用的
        * 这里不做演示了，练习题，2个定时器，一个3秒后暂停，一个6s后恢复
    4. 重头开始播放
        * 小伙伴自行玩耍
    5. 其余方法查阅api
4. AudioSource代码主要属性
    1. loop可以设置循环播放
        * `this.audioSource.loop = true`这行代码表示开启循环播放
    2. isPlaying判断是否播放                    
        * `console.log(this.audioSource.isPlaying)`
    3. mute可以设置是否静音
        * `this.audioSource.mute = false`这行代码表示不静音