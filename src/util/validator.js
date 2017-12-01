export const getStrLength = (value) => {
	var len = value.length
	return len
}

/**
 * validInputIsNumber 只允许输入数字且最多2位小数 
 * @param  { String } value input内容
 * @return {[type]}       [description]
 */
export const validInputIsNumber = (value)=>{
  var regExp =  /^\d+\.?\d{0,2}/
  var newValue = ''
  if(regExp.test(value)) {
    newValue = value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2')
  }
  return newValue
}

/**
 * validInputIsFloat 只允许输入数字
 * @param  { String } value input 内容
 * @return {[type]}       [description]
 */
export const validInputIsFloat = (value)=>{
  var newValue = ''
  newValue = value.replace(/\D/g,'')
  return newValue
}