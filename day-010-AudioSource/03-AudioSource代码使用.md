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
