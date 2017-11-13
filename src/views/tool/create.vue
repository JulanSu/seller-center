<template>
    <section class="create-act">
        <el-form ref="form" :model="form" label-width="130px" style='margin-top:30px'>
           
            <el-form-item label="现金券名称">
                <el-input v-model="form.name" class='name' :maxlength='20'></el-input>
            </el-form-item>

            <el-form-item label="现金券领取时间">
                <el-row style='padding-left:10px'>
                    <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.getTime[0]" class='w180' :picker-options="pickerOptions0"></el-date-picker>
                    <span style="margin:0 8px">至</span>
                    <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.getTime[1]" class='w180' :picker-options="pickerOptions0"></el-date-picker >
                </el-row>
            </el-form-item>

            <el-form-item label="现金券使用期限">
                <el-radio-group v-model="userTime.type" style="padding-left:10px;" :disabled='disabled'>
                    <el-radio label="有效时间段"></el-radio>
                    <el-radio label="领取后有效天数"></el-radio>
                </el-radio-group>
                <el-row style='margin-top: 10px;padding:0 10px;' v-if="userTime.type =='有效时间段'">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="userTime.timeSection[0]" class='w180' :picker-options="pickerOptions0"></el-date-picker>
                    <span style="margin:0 8px">至</span>
                    <el-date-picker type="datetime" placeholder="选择时间" v-model="userTime.timeSection[1]" class='w180' :picker-options="pickerOptions0"></el-date-picker>
                </el-row>
                <el-row style='margin-top: 10px;padding:0 10px;' v-else>
                    <el-input v-model="userTime.timeNumber" class='w180' placeholder="请输入天数" :maxlength='10' @blur='isNumber($event)'></el-input>
                    <span style="margin:0 8px">天</span>
                </el-row>
            </el-form-item>
                
            <el-form-item label="现金券面值与数量">
                <el-radio-group v-model="cashType.type" style="padding-left:10px;" :disabled='disabled'>
                    <el-radio label="会员等级券"></el-radio>
                    <el-radio label="固定金额券"></el-radio>
                    <el-radio label="满减券"></el-radio>
                    <el-radio label="折扣券"></el-radio>
                </el-radio-group>
                <section class="cash" v-if="cashType.type=='会员等级券'">
                    <el-row style='margin-top: 10px;' v-for="item in cashType.huiYuan" :key="item.name">
                        <span class="cash-name">{{item.name}}</span>
                        <el-input placeholder='请输入' style='width:210px' v-model='item.money'  @blur='isNumber($event, item.money)' :maxlength="10"></el-input>
                        <span style="margin:0 8px">元</span>
                        <el-input placeholder='发放数量' style='width:120px'  v-model='item.count'  @blur='isNumber($event)' :maxlength="10"></el-input>
                        <span style="margin:0 8px">张</span>
                    </el-row>
                </section>
                <section class="cash" v-if="cashType.type=='固定金额券'">
                    <el-row style='margin-top: 10px;padding-left: 10px'>
                        <el-input placeholder='请输入' style='width:210px' v-model="cashType.guDing.money"  @blur='isNumber($event)' :maxlength="10"></el-input>
                        <span style="margin:0 8px" >元</span>
                        <el-input placeholder='发放数量' style='width:120px' v-model="cashType.guDing.count"  @blur='isNumber($event)' :maxlength="10"></el-input>
                        <span style="margin:0 8px">张</span>
                    </el-row>
                </section>
                <section class="cash" v-if="cashType.type=='满减券'">
                    <el-row style='margin-top: 10px;padding-left: 10px' v-for='(item,index) in cashType.manJian' :key="">
                        <el-input placeholder='现金券面值' style='width:210px' v-model='item.smallPrice' :maxlength="10" @blur='isNumber($event)'></el-input>
                        <span style="margin:0 8px">————</span>
                        <el-input placeholder='消费满足金额' style='width:210px' :maxlength="10" @blur='isNumber($event)'  v-model='item.largePrice'></el-input>
                        <span style="margin:0 8px">元</span>
                        <el-input placeholder='发放数量' style='width:120px' v-if="index == 0" :maxlength="10" @blur='isNumber($event)' v-model='item.count'></el-input>
                        <span style="margin:0 8px" v-if="index == 0">张</span>
                    </el-row>
                    <el-row style='margin-top: 10px;padding-left: 10px' class='add' v-if="cashType.manJian.length < 4" >
                        <div @click="addCash"> + <b>添加</b> </div>
                    </el-row>
                </section>
                <section class="cash" v-if="cashType.type=='折扣券'">
                    <el-row style='margin-top: 10px;padding-left: 10px'>
                        <el-input placeholder='请输入' style='width:210px' :maxlength="2" @blur='isNumber($event)' v-model="cashType.zheKou.percent"></el-input>
                        <span style="margin:0 8px">%</span>
                        <el-input placeholder='发放数量' style='width:120px' :maxlength="10" @blur='isNumber($event)' v-model="cashType.zheKou.count"></el-input>
                        <span style="margin:0 8px">张</span>
                    </el-row>
                    <el-row style='margin-top: 10px;padding-left: 10px'>
                        <el-input placeholder='请输入' style='width:210px' :maxlength="10" @blur='isNumber($event)' v-model="cashType.zheKou.min"></el-input>
                        <span style="margin:0 8px">元起用</span>
                    </el-row>
                    <el-row style='margin-top: 10px;padding-left: 10px'>
                        <el-input placeholder='请输入' style='width:210px' :maxlength="10" @blur='isNumber($event)' v-model="cashType.zheKou.max"></el-input>
                        <span style="margin:0 8px">最多抵扣金额元</span>
                    </el-row>
                </section>
              </el-form-item>

            <el-form-item label="抵扣券价格">
                <el-radio-group v-model="cashFree.type" style="padding-left:10px;">
                  <el-radio label="免费"></el-radio>
                  <el-radio label="付费"></el-radio>
                </el-radio-group>
                <el-row style='margin-top: 10px;padding-left:10px' v-if='cashFree.type =="付费"'>
                    <el-input placeholder='现金值' style='width:210px' v-model='cashFree.count' :maxlength="10" @blur='isNumber($event,"cashFree","count")'></el-input>
                    <span style="margin:0 8px">元</span>
                </el-row>
            </el-form-item>

            <el-form-item label="适用商品范围">
                <el-radio-group v-model="forProduct.type" style="padding-left:10px;">
                    <el-radio label="全部商品通用"></el-radio>
                    <el-radio label="部分商品可用"></el-radio>
                </el-radio-group>
                <el-row v-if='forProduct.type == "部分商品可用"'>
                    <div class="area">
                        <div class='add-pro' @click="dialogProduct = true">
                            <p>+</p>
                            <span>添加商品</span>
                        </div>
                        <div class="img-con" v-for="item in forProduct.product" @mouseenter="item.deleteBtn=true" @mouseleave="item.deleteBtn=false" :key="item.productId">
                            <img :src="item.productCoverUrl" alt="">
                            <i class="el-icon-circle-cross" v-if='item.deleteBtn' @click='deleteProduct(item)'></i>
                            <p>{{item.productTitle}}</p>
                        </div>
                    </div>
                </el-row>
            </el-form-item>

            <el-form-item label="领取成功后提示" style="padding-left:10px">
                <el-input style='width:520px' v-model='form.tips' :maxlength="30"></el-input>
                <el-row class="tips">
                    如无特殊说明，一律默认为“先谈单再出示现金券，可直接抵扣订单合同金额”，不能超过30个汉字
                </el-row>
            </el-form-item>

            <el-form-item label="现金券详情页图" style="padding-left:10px">
                <el-row class="tips">
                   图片尺寸200px*200px以上，大小800k以内，格式要求jpg、jpeg、png
                </el-row>
                <el-upload class="img-uploader" action="http://gss.dmp.hzjiehun.bid/gss/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <div class="picture" v-if="imageUrl" @mouseenter='showAgainBtn=true' @mouseleave='showAgainBtn=false'>
                        <img :src="imageUrl" class="avatar">
                        <p v-if='showAgainBtn'>重新上传</p>
                    </div>
                    <div v-else>
                        <p>+</p>
                        <span>添加上传图片</span>
                    </div>
                </el-upload>
            </el-form-item>

            <el-form-item label="现金券使用规则" style="padding-left:10px" class='textarea-con'>
                <el-input type="textarea" v-model="form.rule" :maxlength='300'></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit" class='btn' :disabled="status">{{btnText}}</el-button>
            </el-form-item>
        </el-form>
        <!-- 选择商品弹窗 -->
       <el-dialog title="添加商品" :visible.sync="dialogProduct" custom-class='pro-dialog' top="20%" :close-on-click-modal='false'>
            <div class="pro-container">
                <div class="pro-item" v-for="item in allProduct" @click='checkProduct(item)' >
                    <div class="img-con">
                        <img :src="item.productCoverUrl" alt="">
                        <div class="mask" v-if="item.checked"></div>
                        <i class="el-icon-circle-check" v-if="item.checked"></i>
                    </div>
                    <p>{{item.productTitle}}</p>
                </div>
            </div>
            <el-button type="primary" @click="sureCheck" class='check-btn'>提交</el-button>
        </el-dialog>
    </section>
</template>

<script>
    import qs from 'qs';
    import { productList , createAct, attendAct, actLastData, changeAct, changeAttendAct} from '@/api/toolApi';
    export default {
        data() {
            return {
                disabled: false,
                status: false,
                dialogProduct: false,
                btnText: '立即创建',
                marketingCouponId: '',
                imageUrl: '',
                showAgainBtn: false,
                beginTime: null,
                userTime: {
                    type: '有效时间段',
                    timeSection: [null, null],
                    timeNumber: ''
                },
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
                form: {
                    name: '',
                    getTime: [null,null],
                    tips: '先谈单再出示现金券，可直接抵扣订单合同金额',
                    rule: ''
                },
                cashType: {
                    type: '会员等级券',
                    huiYuan: [
                        {name: '新会员', money: '', count: ''},
                        {name: '老会员', money: '', count: ''},
                        {name: 'VIP会员', money: '', count: ''},
                        {name: '金卡会员', money: '', count: ''}
                    ],
                    guDing:{money: '', count: ''},
                    manJian:[
                        {smallPrice: '', largePrice: '', count: ''},
                    ],
                    zheKou: {percent: '', count: '', min: '', max: ''}
                },
                cashFree: {
                    type: '免费',
                    count: '' 
                },
                forProduct: {
                    type: '全部商品通用',
                    product: []
                },
                allProduct: null
            }
        }, 
        props:[
            'bTime','eTime'
        ],
        created(){
            this.typeFrom()
            productList({'storeId':config.storeId}).then(res => {
                this.allProduct = res.data.data;
                for(let i=0; i<this.allProduct.length; i++){
                    let that = this.allProduct[i];
                    this.$set(that,'checked',false);
                }
            })
        },
        watch:{
            form:{
                handler(val){
                    this.getTimeChange(val)
                },
                deep:true
            },
            userTime:{
                handler(val){
                    this.userTimeChange(val)
                },
                deep:true
            }
            
        },
        methods: {
            /*判断来自那个页面*/
            typeFrom(){
                let self = this;
                if(self.$route.query.type){
                    self.btnText = '保存';
                    let type = self.$route.query.type;
                    type == 'store' ? self.fromStore() : self.fromPlatform();
                }
            },
            /*来自店铺活动页*/
            fromStore(){
                let self = this;
                self.$route.query.actStatus != 2 ? self.status = true : '';
                self.getLastData();
            },
            /*来自平台列表页*/
            fromPlatform(){
                let self = this,
                    auditStatus = this.$route.query.auditStatus,    //审核状态 0未审核，1通过，2不通过
                    signStatus = this.$route.query.signStatus;    //报名状态 0未回应，1确认参与，2逾期未参与
                if(signStatus == '1'){
                    self.getLastData();
                    if(auditStatus == '0' || auditStatus == '2'){
                        let timesTamp = Date.parse(new Date());
                        self.status = timesTamp < self.eTime ? false : true;
                    }else{
                        self.status = true;
                    }
                }
            },
            /*获得曾经填的数据*/
            getLastData(){
                let self = this,
                    params = {
                        storeId: config.storeId,
                        marketingActivityId: self.$route.query.actId
                    }
                self.disabled = true;
                actLastData(params).then(res => {
                    let cBase = res.data.data,
                        cMoney = res.data.data.couponDeliveryTypeList,
                        cRange = res.data.data.rangeIdList;
                    self.form.name = cBase.marketingCouponName;
                    self.form.tips = cBase.couponReceiveTips;
                    self.form.rule = cBase.couponUseRule;
                    self.imageUrl = cBase.couponDetailPic;
                    self.imgUrl = cBase.couponDetailPic;
                    self.marketingCouponId = cBase.marketingCouponId;
                    self.form.getTime = [cBase.couponReceiveBeginTime,cBase.couponReceiveEndTime]
                    if(cBase.couponUseTimeType == 0){
                        self.userTime.type = '有效时间段';
                        self.userTime.timeSection[0] = cBase.couponUseBeginTime;
                        self.userTime. timeSection[1] = cBase.couponUseEndTime;
                    }else{
                        self.userTime.type = '领取后有效天数';
                        self.userTime.timeNumber = cBase.couponUseDays;
                    }
                    if(cBase.couponUseType == 0){
                        self.cashType.type = '会员等级券'
                        for(let i=0; i<cMoney.length; i++){
                            self.cashType.huiYuan[i].money = cMoney[i].couponUseMoney
                            self.cashType.huiYuan[i].count = cMoney[i].couponDeliveryNum
                        }
                    }else if(cBase.couponUseType == 1){
                        self.cashType.type = '固定金额券';
                        self.cashType.guDing.count = cMoney[0].couponDeliveryNum;
                        self.cashType.guDing.money = cMoney[0].couponUseMoney;
                    }else if(cBase.couponUseType == 2){
                        self.cashType.type = '满减券'
                        self.cashType.manJian = [];
                        for(let i=0; i<cMoney.length; i++){
                            let prm = {
                                smallPrice: cMoney[i].couponUseMoney, 
                                largePrice: cMoney[i].couponMinMoney, 
                                count: cMoney[i].couponDeliveryNum
                            }
                            self.cashType.manJian.push(prm)
                        }
                    }else{
                        self.cashType.type = '折扣券'
                        self.cashType.zheKou.count = cMoney[0].couponDeliveryNum
                        self.cashType.zheKou.percent = cMoney[0].couponUseMoney
                        self.cashType.zheKou.max = cMoney[0].couponMaxMoney
                        self.cashType.zheKou.min = cMoney[0].couponMinMoney
                    }
                    if(cBase.couponAmount == 0){
                        self.cashFree.type = '免费'
                    }else{
                        self.cashFree.type = '付费';
                        self.cashFree.count = cBase.couponAmount;
                    }
                    if(cRange.length == 1 && cRange[0] == cBase.storeId){
                        self.forProduct.type = '全部商品通用';
                    }else{
                        self.forProduct.type = '部分商品可用';
                        self.getLastProduct(cRange);
                    }
                })
            },
            /*获得曾经选择的商品*/
            getLastProduct(arr){
                let self = this;
                for(let i=0; i<self.allProduct.length; i++){
                    let that = self.allProduct[i];
                        for(let j=0; j<arr.length; j++){
                        if(arr[j] == that.productId){
                            that.checked = true;
                            self.forProduct.product.push(that);
                        }
                    }
                }
                for(let i=0; i<self.forProduct.product.length; i++){
                    let that = self.forProduct.product[i];
                    self.$set(that,'deleteBtn',false);
                }
            },
            /*领取时间选择*/
            getTimeChange(val){
                let self = this;
                let startTime = Date.parse(val.getTime[0]); 
                let endTime = Date.parse(val.getTime[1]); 
                let localDayEnd = new Date(new Date().toLocaleDateString()).getTime() + 24*60*60*1000 -1;  
                if(startTime < localDayEnd){
                    self.form.getTime[0] = '';
                    self.warn('不可小于今天的23:59:59')
                }
                if(endTime < startTime){
                    self.form.getTime[1] = '';
                    self.warn('不可小于开始时间')
                }
                self.userTimeChange(self.userTime)
            },
            /*使用时间选择*/
            userTimeChange(val){
                let self = this;
                let getStartTime = Date.parse(self.form.getTime[0]);
                let userStartTime = Date.parse(val.timeSection[0]); 
                let userEndTime = Date.parse(val.timeSection[1]);
                if(userStartTime < getStartTime){
                    self.userTime.timeSection[0] = '';
                    self.warn('不可小于领取开始时间')
                }
                if(userEndTime < userStartTime){
                    self.userTime.timeSection[1] = '';
                    self.warn('不可小于开始时间')
                }
            },
            addCash(){ 
                let self = this,
                    addObject = {smallPrice: '', largePrice: '', count: ''};
                self.cashType.manJian.push(addObject);
            },
            /*选取商品*/
            checkProduct(item){
                let self = this;
                item.checked = !item.checked;
            },
            sureCheck(){
                let self = this;
                self.dialogProduct = false;
                self.forProduct.product = [];
                for(let i=0; i<self.allProduct.length; i++){
                    let that = self.allProduct[i];
                    if(that.checked){
                        self.forProduct.product.push(that);
                    }
                }
                for(let i=0; i<self.forProduct.product.length; i++){
                    let that = self.forProduct.product[i];
                    self.$set(that,'deleteBtn',false);
                }
            },
            /*删除商品*/
            deleteProduct(item){
                var self = this;
                self.removeArrItem(self.forProduct.product, item)
            },
            /*上传图片规则*/
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.imgUrl = res.data;
            },
            beforeAvatarUpload(file) {
                const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
                const isLt2M = file.size / 1024 < 800;
                if (!isJPG) {
                  this.$message.error('上传图片只能是png/jpg/jpeg格式!');
                }
                if (!isLt2M) {
                  this.$message.error('上传图片大小不能超过 800K!');
                }
                return isJPG && isLt2M;
            },
            /*数组删除指定元素*/
            removeArrItem(arr, val){
                for(var i=0; i<arr.length; i++) {
                    if(arr[i] == val) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            },
            /*消息警告*/
            warn(str){
                this.$message({
                    message: str,
                    type: 'warning'
                })
            },
            /*校验数字*/
            isNumber(e){
                let self = this;
                // let flag = /^[0-9]{1,10}$/.test(e.target.value)
                // if(!flag){
                //     e.target.value = '';
                //     if(e.target.attributes["maxlength"].value == 2){
                //         self.warn('请输入1-99的整数');
                //         return false;
                //     }
                //     self.warn('请输入数字')
                // }
            },
            /*提交表单数据*/
            onSubmit(){
                let self = this;
                // if(self.form.name == '' || !self.form.getTime[0] || !self.form.getTime[1] || self.form.tips == '' || self.form.rule == ''){
                //     self.warn('请把内容输入完整')
                //     return false;
                // }
                // if(self.userTime.type == "有效时间段"){
                //     if(!self.userTime.timeSection[0] || !self.userTime.timeSection[1]){
                //         self.warn('请输入现金券使用期限')
                //         return false;
                //     }
                // }
                // if(self.userTime.type == "领取后有效天数"){
                //     if(self.userTime.timeNumber == ''){
                //         self.warn('请输入现金券使用期限')
                //         return false;
                //     }
                // }
                // if(self.cashType.type == "会员等级券"){
                //     for(let i=0; i<self.cashType.huiYuan.length; i++){
                //         let that = self.cashType.huiYuan[i];
                //         if(that.money == '' || that.count == ''){
                //             self.warn('请输入现金券面值')
                //             return false;
                //         }
                //     }
                // }
                // if(self.cashType.type == "固定金额券"){
                //    if(self.cashType.guDing.money == '' || self.cashType.guDing.count== ''){
                //         self.warn('请输入现金券面值')
                //         return false;
                //    }
                // }
                // if(self.cashType.type == "满减券"){
                //     if(self.cashType.manJian[0].smallPrice == '' || self.cashType.manJian[0].largePrice == '' || self.cashType.manJian[0].count == ''){
                //             self.warn('请输入现金券面值')
                //             return false;
                //     }
                // }
                // if(self.cashType.type == "折扣券"){
                //     if(self.cashType.zheKou.percent == '' || self.cashType.zheKou.count == '' || self.cashType.zheKou.min == '' || self.cashType.zheKou.max == '' ){
                //             self.warn('请输入现金券面值')
                //             return false;
                //     }
                // }
                // if(self.cashFree.type == '付费'){
                //     if(self.cashFree.count == ''){
                //         self.warn('请输入抵扣券价格')
                //         return false;
                //     }
                // }
                // if(self.forProduct.type == '部分商品可用'){
                //     if(self.forProduct.product.length == 0){
                //         self.warn('请选择商品')
                //         return false;
                //     }
                // }
                // if(self.imageUrl == ''){
                //     self.warn('请选择现金券详情图')
                //     return false;
                // }
                self.postData()
            },
            postData(){
                let self = this,params = {};  
                params.marketingCouponName = self.form.name;    //现金券名称
                params.storeId = config.storeId,              //店铺ID
                params.marketingToolsId = 1,     //营销工具ID
                params.couponReceiveBeginTime = self.timeFormat(self.form.getTime[0]);  //领取开始时间
                params.couponReceiveEndTime = self.timeFormat(self.form.getTime[1]); //领取结束时间
                params.couponReceiveTips = self.form.tips;  //领取提示
                params.couponUseRule = self.form.rule;      //领取规则
                params.couponDetailPic = self.imgUrl;     //现金券详情图片
                params.marketingCouponDeliveryTypeList = []; //现金券面额
                if(self.userTime.type == '有效时间段'){
                    params.couponUseTimeType = 0;   //优惠券使用期限 0:有效时间段，1:领取后有效天数
                    params.couponUseBeginTime = self.timeFormat(self.userTime.timeSection[0])
                    params.couponUseEndTime = self.timeFormat(self.userTime.timeSection[1])
                }else{
                    params.couponUseTimeType = 1;
                    params.couponUseDays = self.userTime.timeNumber;
                }
                if(self.cashType.type == '会员等级券'){
                    params.couponUseType = 0;       //现金券使用类型 0:会员等级，1固定金额，2，满减券，3折扣券            
                    for(let i=0; i<self.cashType.huiYuan.length; i++){
                        let that = self.cashType.huiYuan[i],
                            cash = {
                                couponDeliveryNum: that.count,      //现金券领取数量:'0'
                                couponUseMoney: that.money,          //现金券金额
                                couponUserLevel: i  //会员等级 0:新会员，1老会员，2，VIP会员，3金卡会员
                            };
                        params.marketingCouponDeliveryTypeList.push(cash);
                    }
                }else if(self.cashType.type == '固定金额券'){
                    params.couponUseType = 1;
                    let cash = {
                        couponDeliveryNum: self.cashType.guDing.count,
                        couponUseMoney: self.cashType.guDing.money,
                    }
                    params.marketingCouponDeliveryTypeList.push(cash);
                }else if(self.cashType.type == '满减券'){
                    params.couponUseType = 2;
                    for(let i=0; i<self.cashType.manJian.length; i++){
                        let that = self.cashType.manJian[i],
                        cash = {
                            couponDeliveryNum: that.count,
                            couponMinMoney: that.largePrice,
                            couponUseMoney: that.smallPrice
                        }
                    params.marketingCouponDeliveryTypeList.push(cash);
                    }
                }else{
                    params.couponUseType = 3;
                    let cash = {
                        couponDeliveryNum: self.cashType.zheKou.count,
                        couponUseMoney: self.cashType.zheKou.percent,
                        couponMaxMoney: self.cashType.zheKou.max,
                        couponMinMoney: self.cashType.zheKou.min
                    }
                    params.marketingCouponDeliveryTypeList.push(cash);
                }
                self.cashFree.type == '免费' ? params.couponAmount = '0' : params.couponAmount = self.cashFree.count;
                if(self.forProduct.type == '全部商品通用'){
                    params.couponRangeType = 0;        //现金券适用范围 0店铺，1类目，2商品
                    params.marketingCouponRangeList = [params.storeId];//现金券适用范围,全部商品时，传storeId
                }else{
                    params.couponRangeType = 2; 
                    params.marketingCouponRangeList = [];
                    for(let i=0; i<self.forProduct.product.length; i++){
                        let that = self.forProduct.product[i];
                        params.marketingCouponRangeList.push(that.productId)
                    }
                }
                if(self.$route.query.type){
                    let fTy = self.$route.query.type;
                    if(fTy == 'store'){
                        self.changeStoreAct(params)
                    }else{
                       self.$route.query.signStatus == 1 ? self.changePlatAct(params) : self.attendActive(params)
                    }
                }else{
                    self.createActive(params)
                }
            },
            /*创建活动*/
            createActive(a){
                let self = this;
                createAct(a).then(res => {
                    if(res.data.message === '成功'){
                        this.$alert('创建活动成功', '成功', {
                            confirmButtonText: '确定',
                            callback: action => {
                                self.$router.push('/marketing-center/management');
                            }
                        });
                    }else{
                        self.warn(res.data.message)
                    }
                })
            }, 
            /*修改店铺活动*/
            changeStoreAct(a){
                let self = this;
                a.marketingActivityId = self.$route.query.actId;
                a.marketingCouponId = self.marketingCouponId;
                changeAct(a).then(res => {
                    if(res.data.message === '成功'){
                        this.$alert('修改活动成功', '成功', {
                            confirmButtonText: '确定',
                            callback: action => {
                                self.$router.push('/marketing-center/management');
                            }
                        });
                    }else{
                        self.warn(res.data.message)
                    }
                })
            },
            /*参加平台活动*/
            attendActive(a){
                let self = this;
                a.marketingActivityId = self.$route.query.actId;
                attendAct(a).then(res => {
                    if(res.data.message === '成功'){
                        this.$alert('参加活动成功', '成功', {
                            confirmButtonText: '确定',
                            callback: action => {
                                self.$router.push('/marketing-center/management?name=platformActive');
                            }
                        });
                    }else{
                        self.warn(res.data.message)
                    }
                })
            },
            /*修改参加过的平台活动*/
            changePlatAct(a){
                let self = this;
                a.marketingActivityId = self.$route.query.actId;
                a.marketingCouponId = self.marketingCouponId;
                changeAttendAct(a).then(res => {
                    if(res.data.message === '成功'){
                        this.$alert('修改活动成功', '成功', {
                            confirmButtonText: '确定',
                            callback: action => {
                                self.$router.push('/marketing-center/management?name=platformActive');
                            }
                        })
                    }else{
                        self.warn(res.data.message)
                    }
                })
            },
            timeFormat(time){
                typeof time == 'number' ? time = new Date(time) : '';
                let mou = (time.getMonth() + 1) > 9 ? time.getMonth() + 1 : '0' +  (time.getMonth() + 1),
                    d = time.getDate() > 9 ? time.getDate()  : '0' +  time.getDate(),
                    h = time.getHours() > 9 ? time.getHours()  : '0' +  time.getHours(),
                    m = time.getMinutes() > 9 ? time.getMinutes()  : '0' +  time.getMinutes(),
                    s = time.getSeconds() > 9 ? time.getSeconds()  : '0' +  time.getSeconds();
                let cTime = time.getFullYear() + '-' + mou + '-' + d + ' ' + h + ':' + m + ':' + s;
                return cTime;  
            }
        },
        mounted(){
        }
    }

</script>

<style lang="scss">
    $color: #45cdb6;
    .create-act {
        width: 100%;
        float: left;
        .name{
            margin-left: 10px;
            width: 280px;
        }
        .el-form-item__error{
            margin-left: 10px ;
        }
        .cash{
            .el-col{
                padding: 0;
            }
            .cash-name{
                display: inline-block;
                width: 70px;
                text-align: right;
                margin-right: 8px;
            }
            .add{
                font-size:25px;
                overflow: hidden;
                height: 30px;
                position: relative;
                color:#41cac0;
                div{
                    width: 80px;
                    cursor: pointer;
                     b{
                        position: absolute;
                        display: inline-block;
                        height: 30px;
                        line-height: 37px;
                        font-weight: 400;
                        font-size: 14px;
                        margin-left: 10px;
                    }
                }
            }
        }
        .area{
            margin: 10px 0 0 10px;
            width: 820px;
            height:184px;
            background:#f5f7fa;
            padding: 20px;
            overflow-x: hidden;
            overflow-y: auto;
            .add-pro{
                float: left;
                width: 100px;
                height: 100px;
                border:1px dashed #cccccc;
                background: #fff;
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                p{
                    margin:18px 0 5px;
                    font-size: 80px;
                    color:#41cac0;
                }
                span{
                    font-size:14px;
                    color:#666666;
                }
            }
            .img-con{
                display: inline-block;
                vertical-align: top;
                width: 100px;
                position: relative;
                img{
                    width: 100px;
                    height: 100px;
                }
                i{
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    font-size: 16px;
                    cursor:pointer;
                    color: $color;
                    background: #fff;
                    border-radius: 8px;
                }
                p{
                    width: 100px;
                    font-size: 12px;
                    color: #666666;
                    line-height: 150%;
                    overflow:hidden; 
                    text-overflow:ellipsis;
                    display:-webkit-box; 
                    -webkit-line-clamp:2; 
                    /* autoprefixer: off*/
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on*/
                }
            }
            .img-con:nth-of-type(n+2){
                margin-left: 10px;
            }
            .img-con:nth-of-type(n+8){
                margin-top: 10px;
            }
            .img-con:nth-of-type(7n+1){
                margin-left: 0;
            }
        }
        .area::-webkit-scrollbar{
            width: 4px;
            background-color: #ddd;
        }
        .area::-webkit-scrollbar-track-piece{
            background: #ddd;
        }
        .area::-webkit-scrollbar-thumb{
            background-color: #41CAC0;  
        }
        .grade{
            text-align: right;
            margin-right: 10px;
        }
        .w180{
            width:180px;
        }
        .tips{
            font-size:12px;
            color:#999999;
        }
        .img-uploader{
            .el-upload--text{
                width: 100px;
                height: 100px;
                border:1px dashed #cccccc;
                background: #fff;
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                border-radius: none;
                p{
                    margin:18px 0 5px;
                    font-size: 80px;
                    color:#41cac0;
                }
                span{
                    font-size:14px;
                    color:#666666;
                }
                input{
                    display: none;
                }
                .picture{
                    width:100%;
                    height: 100%;
                    position: relative;
                    p{
                        position: absolute;
                        bottom: 0;
                        background: rgba(0,0,0,0.40);
                        height: 24px;
                        line-height: 24px;
                        font-size: 12px;
                        color: #FFFFFF;
                        margin:0;
                        width: 100%;
                    }
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }  
            }   
        }
        .textarea-con{
            .el-textarea{
                padding-top:10px;
                textarea{
                    width: 520px;
                    height: 150px;
                    resize: none;
                }
            }
        }
        .btn{
            margin-left: 10px;
            width: 100px;
            height: 34px;
        }
        /*弹窗样式*/
        .pro-dialog{
            width: 750px;
            height: 580px;
            .el-dialog__header{
                padding: 0;
                background: $color;
                height: 52px;
                line-height: 52px;
                padding: 0 20px;
                font-size: 16px;
                span{
                    color: #fff;
                }
                .el-dialog__headerbtn{
                    font-size: 14px;
                    i{
                        color: #fff;
                    }
                }
            }
            .el-dialog__body{
                padding: 20px;
                .pro-container{
                    height: 408px;
                    background: #F5F7FA;
                    border: 1px solid #DDDDDD;
                    padding: 20px;
                    overflow-x: hidden;
                    .pro-item{
                        width: 100px;
                        display: inline-block;
                        vertical-align: top;
                        flex-direction: column;
                        align-items: center;
                        overflow: hidden;
                        cursor: pointer;
                        .img-con{
                            width: 100px;
                            height: 100px;
                            position: relative;
                            img{
                                width: 100%;
                                height: 100%
                            }
                            .mask{
                                position: absolute;
                                width: 100px;
                                height: 100px;
                                top: 0;
                                background: rgba(51,51,51,0.49);
                            }
                            i{
                                color: $color;
                                font-size: 16px;
                                position: absolute;
                                right: 5px;
                                top: 5px;
                                background: #fff;
                                border-radius: 7px 7px 8px 8px;
                            }
                        }
                        p{
                            width: 100px;
                            font-size: 12px;
                            color: #666666;
                            margin-top: 10px;
                            overflow:hidden; 
                            text-overflow:ellipsis;
                            display:-webkit-box; 
                            -webkit-line-clamp:2; 
                            /* autoprefixer: off*/
                            -webkit-box-orient: vertical;
                            /* autoprefixer: on*/
                        }
                    }
                    .pro-item:nth-of-type(n+2){
                        margin-left: 10px;
                    }
                    .pro-item:nth-of-type(6n+1){
                        margin-left: 0;
                    }
                    .pro-item:nth-of-type(n+7){
                        margin-top: 20px;
                    }
                }
                .pro-container::-webkit-scrollbar{
                    width: 4px;
                    background-color: #ddd;
                }
                .pro-container::-webkit-scrollbar-track-piece{
                    background: #ddd;
                }
                .pro-container::-webkit-scrollbar-thumb{
                    background-color: #41CAC0;  
                }
                .check-btn{
                    width: 90px;
                    height:34px;
                    color: #fff;
                    font-size: 14px;
                    margin-top: 20px;
                    float: right;
                }
            }
        }
        .el-time-spinner{
            box-sizing: content-box !important;
            *{
                box-sizing: content-box !important;
            }
        }
    }
   
</style>
