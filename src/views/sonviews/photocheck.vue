<template>
   <Card class="configCard">
       <p slot="title">考中身份验证</p>
        <div class="demo-split" style="height:400px;">
             <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
                <Card style="width:600px">
                   <p slot="title">
                     <Icon type="md-images"></Icon>
                      身份证图片
                  </p>
                  <Upload type="drag" action="//jsonplaceholder.typicode.com/posts/" :before-upload="Upload_idcard" :show-upload-list="false" style="height:290px">
                  <div style="height:290px">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff;margin-top:100px"></Icon>
                        <p>Click or drag files here to upload</p>
                        <div style="text-align:center;margin-top:-160px;z-index:-2" v-for="item in uploadList1">
                            <img class="img"  :src="item.url">
                        </div>
                  </div>
                  </Upload>
                
                  
                </Card>    
            </div>
            <div slot="right" class="demo-split-pane">
                 <Card style="width:592px;margin-left:8px">
                   <p slot="title">
                     <Icon type="md-camera" />
                      考中拍照图片
                  </p>
                   <Upload type="drag" action="//jsonplaceholder.typicode.com/posts/" :before-upload="Upload_photo" :show-upload-list="false" style="height:290px">
                   <div style="height:290px">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff;margin-top:100px"></Icon>
                        <p>Click or drag files here to upload</p>
                        <div style="text-align:center;margin-top:-160px" v-for="item in uploadList2">
                            <img class="img"  :src="item.url">
                        </div>
                   </div>
                  </Upload>
                 </Card>
            </div>
          </Split> 
        </div>
       <Button icon="md-color-wand" style="margin-top:30px;">对比验证</Button>
   </Card>
 
    
</template>
<script>


    export default {
        name:'photocheck',
        data(){
            return {
                uploadList1: [],
                uploadList2: [],
             
           
            }
        },
        methods: {
             Upload_idcard(file) {
                //上传新的图片之前先删除上一个图片
                this.uploadList1=[];
               // 创建一个 FileReader 对象
                let reader = new FileReader()
               // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
               // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
               // 读取文件作为 URL 可访问地址
                reader.readAsDataURL(file)

                const _this = this
                reader.onloadend = function (e) {
                file.url = reader.result
                _this.uploadList1.push(file)
            }  
            },
             Upload_photo(file) {
                //上传新的图片之前先删除上一个图片
                this.uploadList2=[];
               // 创建一个 FileReader 对象
                let reader = new FileReader()
               // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
               // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
               // 读取文件作为 URL 可访问地址
                reader.readAsDataURL(file)

                const _this = this
                reader.onloadend = function (e) {
                file.url = reader.result
                _this.uploadList2.push(file)
            }  
    },
    
    }
    }
 
</script>
<style scoped>


</style>