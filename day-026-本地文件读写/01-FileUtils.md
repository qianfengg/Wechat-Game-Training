# FileUtils

> 知识大纲
1. jsb是javascript bind的代表，整个C/C++ 导出的绑定都在这个jsb里面,jsb 支持不支持h5;
2. FileUtils是本地文件读写的一个工具类,全局只有一个实例;
3. jsb.fileUtils来获取文件读写工具类的实例;
4. jsb.fileUtils.isDirectoryExist(path): 判断路径是否存在;
5. jsb.fileUtils.createDirectory(path); 创建一个路径;
6. jsb.fileUtils.getDataFromFile(path)获取二进制数据; // Uint8Array文本
7. jsb.fileUtils.writeDataToFile(data,path); 写二进制数据; // Uint8Array 对象
8. jsb.fileUtils.writeStringToFile(data,path); 写文本文件; // data String对象
9. jsb.fileUtils.getStringFromFile(path); 获取文本数据; // data String
9. jsb.fileUtils.removeFile(path); 删除掉一个文件;
10. jsb.fileUtils.getWritablePath(); 获取文件的可写目录,是一个内部存储的目录
    * 我们的手机OS会为每个APP分配一个可读写的路径，但是这个App如果卸载以后，这个数据也会被删除;
    * 如果你要想保存到本地有又是持久的，你可以写入外部存储，外部存储的这个路径也是适用于
        fileUtils工具类的;
