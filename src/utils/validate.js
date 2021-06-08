/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 验证密码格式
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function validPassword(rule, value,callback) {
  const reg = /(?!^\d+$)(?!^[A-Za-z]+$)(?!^[^A-Za-z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S{6,16}$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else{
    if (!reg.test(value)){
      callback(new Error('密码格式错误'));
    } else {
      callback();
    }
  }
}

/**
 * 验证手机号码格式
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function validPhone(rule, value,callback) {
  const reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,3,5-9]))\d{8}$/;
  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    if ((!reg.test(value))&& value!='') {
      callback(new Error('您输入的手机格式不正确'));
    }else{
      callback();
    }
  }
}

/**
 * 验证邮箱格式
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function validEmail(rule, value,callback) {
  const reg =/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else{
    if (!reg.test(value)){
      callback(new Error('请输入正确的邮箱'));
    } else {
      callback();
    }
  }
}
/**
 * 验证用户名格式
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function validateUsername(rule,value,callback){
  const reg =/^[_a-zA-Z0-9]{5,10}$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else{
    if (!reg.test(value)){
      callback(new Error('用户名格式错误'));
    } else {
      callback();
    }
  }
}
/**
 * 验证数字
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
 export function validateNumber(rule,value,callback){
  const reg =/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else{
    
    if (!reg.test(value)){
      callback(new Error('请输入大于0的数字'))
    } else {
      callback();
    }
  }
}

export function same(rule,value,callback){
  if(value==''||value==undefined||value==null){
    callback();
  }else{
    if (value == "distance"){
      callback(new Error('关键词重复'))
    } else {
      callback();
    }
  }
}

export function same1(rule,value,callback){
  if(value==''||value==undefined||value==null){
    callback();
  }else{
    if (value == " 0"){
      callback(new Error('字典值重复'))
    } else {
      callback();
    }
  }
}

export default {}