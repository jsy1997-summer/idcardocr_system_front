import { JSEncrypt } from 'jsencrypt'
import axios from 'axios';
import global_data from "../data/data.vue"
var public_key;
var private_key;


//获取公钥、私钥
const getkey = ()=>{
    
      axios({
        method:"post",
        url:'http://'+global_data.addre+'/getkey/',
        header:{
          'Content-Type':"application/x-www-form-urlencoded",
          }
      })
      .then(response=>{
          let res = response.data;
            
            //  后端以dict的格式传数据到前端，数据格式出现了一些问题，需要进行以下一些处理
             public_key = res["public_key"];
             public_key = public_key.replace("b'","")
             public_key = public_key.replace("'","");
             public_key =  public_key.replace(/\\n/g, " \n ")
             console.log(public_key)
          
           
             private_key = res["private_key"]
             private_key = private_key.replace("b'","")
             private_key = private_key.replace("'","")
             private_key = private_key.replace(/\\n/g, " \n "); 
             
             
      })
      .catch(Error=>{
        console.log(Error)
      })
     
   

}

//miser加密
const miser_encode = (imgdata)=>{
    console.log(public_key)
  
     
    const  encrypt = new JSEncrypt();
    encrypt.setPublicKey(public_key)
   
   
    let fir_head = Math.round(Math.random()*30);//生成第一个序列的起始位置【0-30】
    let sec_head = Math.round(Math.random()*30);//生成第二个序列的起始位置【0-30】
    let fir_seq = imgdata.substr(fir_head,50);//生成第一段序列，长度为50
    // console.log("第一段明文如下")
    // console.log(fir_seq)
    let sec_seq = imgdata.substr(sec_head,50);//生成第二段序列，长度50，与第一段部分重叠不可以再长了，否则会报错
    let fir_ciphertext = encrypt.encrypt(fir_seq);//生成第一段序列的密文
    // console.log("第一段密文如下：")
    // console.log(fir_ciphertext)
    let sec_ciphertext = encrypt.encrypt(sec_seq);//生成第二段序列的密文
    let cip = fir_ciphertext + sec_ciphertext;
    // console.log("打乱顺序之前的总体密文如下")
    // console.log(ciphertext)
    let cutcip_head = Math.abs(fir_head-sec_head)
    cip = cip.substr(0,cutcip_head) + cip.substr(cutcip_head+fir_head+sec_head) + cip.substr(cutcip_head,fir_head+sec_head)
    imgdata = imgdata.substr(0,Math.min(fir_head, sec_head)) + cip +imgdata.substr(Math.max(fir_head,sec_head)+50)//截取部分加密的信息与未截取到的信息，明文+密文+明文
    // let cip_length = ciphertext.length #单个密文的长度是344，两个密文长度688
    return {
        fir:fir_head,
        sec:sec_head,
        imgdata:imgdata
    }

}

//miser解密
const miser_decode = (fir,sec,cip_all)=>{
    let cip = cip_all.substr(fir+2,688);//密文部分 开头+2是byte格式中的开头符号b'占得位数
    cip = cip.substr(0,sec-fir)+cip.substring(688-(sec+fir))+cip.substring(sec-fir,688-(sec+fir))//还原密文原来的顺序
    let fir_cip = cip.substr(0,344)
    let sec_cip = cip.substr(344,344)
 

    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey(private_key);
    let fir_data = decrypt.decrypt(fir_cip);
    let sec_data = decrypt.decrypt(sec_cip);
    fir_data = JSON.parse(fir_data)//fir_data；解析之后的数据，将后端传回来的json对象转换为可识别的js对象
    sec_data = JSON.parse(sec_data)
    let result = cip_all.substr(0,fir)+fir_data.substr(0,sec-fir)+sec_data+cip_all.substr(fir+3+688)
    result = eval('(' + result + ')');
    return result

}

export default{
    public_key,
    private_key,
    getkey,
    miser_encode,
    miser_decode
}