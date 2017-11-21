
const rules = {
	init: function(a){
		a.tipArray = [false,false,false,false,false,false,false,false,false];
        a.tipText = [
                        '请输入现金券名称','请输入领取时间','请输入有效天数','请输入现金券面值与数量','请输入抵扣券价'        
                    ]
    },
	allRight: function(a){
		let flag = true;
        let right1 = /^[1-9]\d{0,20}$/;
        let right2 = /^([0-9]\d{0,20})(\.\d{1,2})?$/;
        let right3 = /^([0]{0,20})(\.[0]{1,2})?$/;
		a.form.name == '' ? a.$set(a.tipArray,0,true) : a.$set(a.tipArray,0,false);
		(!a.form.getTime[0] || !a.form.getTime[1]) ? a.$set(a.tipArray,1,true) : a.$set(a.tipArray,1,false);

		if(a.userTime.type == "有效时间段"){
			(!a.userTime.timeSection[0] || !a.userTime.timeSection[1]) ? a.$set(a.tipArray,2,true) : a.$set(a.tipArray,2,false);
        }else{
        	(a.userTime.timeNumber == '' || !right1.test(a.userTime.timeNumber)) ? a.$set(a.tipArray,2,true) : a.$set(a.tipArray,2,false);
        }
        
        if(a.cashFree.type == '付费' ){
            (a.cashFree.count == '' || (!right2.test(a.cashFree.count) && !right3.test(a.cashFree.count))) ? a.$set(a.tipArray,4,true) : a.$set(a.tipArray,4,false);
        }

        (a.forProduct.type == '部分商品可用' && a.forProduct.product.length == 0) ? a.$set(a.tipArray,5,true) : a.$set(a.tipArray,5,false)
   
        a.form.tips == ''	? a.$set(a.tipArray,6,true) : a.$set(a.tipArray,6,false);
        a.imgUrl == ''	? a.$set(a.tipArray,7,true) : a.$set(a.tipArray,7,false);
        a.form.rule == ''	? a.$set(a.tipArray,8,true) : a.$set(a.tipArray,8,false);

        if(a.cashType.type == "会员等级券"){
            for(let i=0; i<a.cashType.huiYuan.length; i++){
                let that = a.cashType.huiYuan[i];
                if(that.money == '' || that.count == '' || (!right2.test(that.money) && !right3.test(that.money)) || !right1.test(that.count)){
                    a.$set(a.tipArray,3,true);
                    return false;
                }
            }
            a.$set(a.tipArray,3,false)
        }
        if(a.cashType.type == "固定金额券"){
           (a.cashType.guDing.money == '' || a.cashType.guDing.count == '' || (!right2.test(a.cashType.guDing.money ) && !right3.test(a.cashType.guDing.money)) || !right1.test(a.cashType.guDing.count)) ? a.$set(a.tipArray,3,true) : a.$set(a.tipArray,3,false);
        }
        if(a.cashType.type == "满减券"){
           for(let i=0; i<a.cashType.manJian.length; i++){
                let that = a.cashType.manJian[i];
                if(that.smallPrice == '' || that.largePrice == '' || a.cashType.manJian[0].count == '' || (!right2.test(that.smallPrice) && (!right3.test(that.smallPrice))) || (!right2.test(that.largePrice) && !right3.test(that.largePrice)) || !right1.test(a.cashType.manJian[0].count)){
                    a.$set(a.tipArray,3,true);
                    return false;
                }
            }
            a.$set(a.tipArray,3,false)
        }
        if(a.cashType.type == "折扣券"){
            if(a.cashType.zheKou.percent == '' || a.cashType.zheKou.count == '' || a.cashType.zheKou.min == '' || a.cashType.zheKou.max == '' || (!right2.test(a.cashType.zheKou.min) && !right3.test(a.cashType.zheKou.min))  || (!right2.test(a.cashType.zheKou.max) && !right3.test(a.cashType.zheKou.max)) || !right1.test(a.cashType.zheKou.percent) || !right1.test(a.cashType.zheKou.count)){
               	a.$set(a.tipArray,3,true);
            }else{
            	a.$set(a.tipArray,3,false);
            }
        }
        a.tipArray.forEach( v => {
        	if(v){
        		flag = false;
        		return false;
        	}
        })
        return flag;
	},
	numberCorrect: function(e, t ,i, self){
		let flag1 = /^[1-9]\d{0,20}$/.test(e);
        let flag2 = /^([0-9]\d{0,20})(\.\d{1,2})?$/.test(e);
        let flag3 = /^([0]{0,20})(\.[0]{1,2})?$/.test(e);
        switch (t) { 
            case 'init' :
                if(!flag1 && e != ''){
                    self.$set(self.tipArray, i, true)
                    self.$set(self.tipText, i, '请输入大于0的整数')
                }else{
                    self.$set(self.tipArray, i, false)
                }
                break;
            default:
                if(!flag2 && e != ''){
                    self.$set(self.tipArray, i, true)
                    self.$set(self.tipText, i, '请输入最多2位小数的数字')
                }else{
                    flag3 ? self.$set(self.tipArray, i, true) : self.$set(self.tipArray, i, false)
                }
        }
	}
}


export default rules;