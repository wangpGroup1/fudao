//校验手机号格式
export function checkPhone(phone){
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
        return false;
    }else{
        return true;
    }
}
//至少6位字母、数字、下划线密码
export function checkPwd(pwd){
    if(!(/^[\w]{6,12}$/).test(pwd)){
        return false;
    }else{
        return true;
    }
}