# autoScroll细节

> 知识大纲
1. autoScroll有自己的控制content的位置的机制,
    会导致content的位置与我们加载时候的位置修改冲突，体现在快速滚动后的连续加载;
2. 处理细节:
     * 在判断要加载的时候，先判断当前是否在autoScroll模式, 如果是返回;
     * 监听autoScroll结束后抛出的end事件,在来计算加载;
     * 当autoScroll滚动到最上头的时候，会有回弹，那个时候发生了加载，所以
        在要加载的时候，检测到时autoScroll,关闭掉回弹的效果,等auto scroll end事件发生了以后再打开;
     * this.scroll_view.elastic = false  
     * this.scroll_view._autoScrolling
