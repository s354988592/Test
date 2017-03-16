
export const telephoneSubstr = (telephone)=>{
    if(telephone!=null ){
        return telephone.substr(0,3) +' '+telephone.substr(3,4)+' '+telephone.substr(7,4)//拆分手机号码定义格式
    }
}
// //调用方法
// import {ToStringLength} from '../../common/telephone_substr.jsx';
// ToStringLength.substrStringLenth(type,content);type 传一个类型 例如小标题 需要截取5位+... type 5 ;//content 是标题内容 
export class ToStringLength {
    static substrStringLenth = (type,content)=>{
        return content.substr(0,type)+"..."
    }
}