<template>

    <Tabs value="name1">
        <TabPane label="身份证识别" name="name1">1、角度问题造成的识别障碍  可以扭正但是识别仍然有问题<br>
          2、曝光度造成的识别障碍  曝光度过于强烈的情况下一些字完全看不到了，可以考虑返回tip，曝光度过于强烈的地方留白而不是空过<br>
          3、时间上能否继续提高（多进程） https://blog.csdn.net/wsp_1138886114/article/details/82778409<br>
          4、识别率可以继续提高  模糊图片变清楚<br>
          5、识别之后的处理<br>
          6、https://www.cnblogs.com/tgzhu/p/11512101.html 使用lstm形式的ocr识别
            在用命令行执行的时候，添加 “–oem 1”参数即可
             • handle = tesseract_raw.init(lang='eng', oem=1)
</TabPane>
        <TabPane label="通用文字识别" name="name2">标签二的内容</TabPane>
        <TabPane label="身份信息验证" name="name3">模拟考试输入自己的名字等信息，判断与身份证是否匹配（考前验证）</TabPane>
        <TabPane label="照片比对" name="name4">模拟照片与身份证信息是否匹配(考中验证)</TabPane>
        <TabPane label="pdf转图片" name="name5">标签五的内容</TabPane>
    </Tabs>
 
  
</template>