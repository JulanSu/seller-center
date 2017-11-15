<template>
    <section class="detail-con">
        <div class="user-message">
            <div class="title">买家信息</div>
            <el-row class="user-detail">
                <el-col :span="5">
                    用户昵称：<span>{{detail.buyerName}}</span>
                </el-col>
                <el-col :span="5">
                    手机号：<span>{{detail.buyerPhone}}</span>
                </el-col>
            </el-row>
        </div>
        <div class="send-message">
            <div class="title">配送信息</div>
            <el-row class="send-detail">
                <el-col :span="5">
                    配送方式：<span>{{detail.shippingWay}}</span>
                </el-col>
                <el-col :span="5" v-if="detail.shippingWay == '配送'">
                    备注：<span>{{detail.remark}}</span>
                </el-col>
                <el-col :span="5" v-if="allPay">
                    收货人：<span>{{detail.receiverName}}</span>
                </el-col>
                <el-col :span="5" v-if="allPay">
                    收货人手机号：<span>{{detail.receiverPhone}}</span>
                </el-col>
            </el-row>
            <el-row class='send-addres' v-if="allPay">
                收货地址：<span>{{detail.receiverAddr}}</span>
            </el-row>
        </div>
        <div class="order-message">
            <div class="title">订单信息</div>
            <el-row class="order-detail">
                <el-col :span="5">
                    订单号：<span>{{detail.serialNumber}}</span>
                </el-col>
                <el-col :span="5">
                    下单时间：<span>{{detail.orderTime}}</span>
                </el-col>
                <el-col :span="5">
                    交易号：<span>{{detail.tradeId}}</span>
                </el-col>
            </el-row>
            <el-row class='table-head'>
                <el-col :span="5">商品</el-col>
                <el-col :span="3">单价</el-col>
                <el-col :span="3">数量</el-col>
                <el-col :span="4">订单类型</el-col>
                <el-col :span="4">订单状态</el-col>
                <el-col :span="5">订单金额</el-col>
            </el-row>
            <div v-for='item in detail.productList' :key="item.ProductName">
                <el-row class='table-detail' >
                    <el-col :span="5">
                        <div class="pro-name"><span v-if="item.orderStoreType==1">展会</span>{{item.productName}}</div>
                        <div class="pro-color">{{item.standard}}</div>
                        <div class="pro-item">类目：{{item.cate}}</div>
                    </el-col>
                    <el-col :span="3"><p>￥{{item.unitPrice}}</p></el-col>
                    <el-col :span="3">{{item.orderNum}}</el-col>
                    <el-col :span="4">{{switchOrderType(item.productType)}}</el-col>
                    <el-col :span="4">{{item.orderProductStatus}}</el-col>
                    <el-col :span="5">
                        <div class="order-price">￥{{item.unitPrice * item.orderNum}}</div>
                        <div class="youhui" v-for= 'li in item.proPri'>
                            <p>{{li.mes}}<span>-￥{{li.count}}</span></p>
                        </div>
                        <div class="one-count">小计：￥{{item.orderProductSubtotal}}</div>
                    </el-col>
                </el-row>
                <div class="service" v-if='item.orderProductAfterId'>
                    <el-row class='table-detail'>
                        <el-col :span="5">售后单编号：{{item.orderProductAfterId}}</el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="3"></el-col>
                        <el-col :span="4">售后单</el-col>
                        <el-col :span="4">{{switchAfter(item.orderProductAfterStatus)}}</el-col>
                        <el-col :span="5"></el-col>
                    </el-row>
                    <div class='service-user'>
                        <div class="service-user-detail">
                            <div>售后时间：{{item.orderProductTime}}</div>
                            <div>售后原因：{{item.orderProductAfterReason}}</div>
                            <div>用户备注：{{item.orderProductAfterRemark}}</div>
                            <div>商家备注：{{item.orderProductAfterStoreRemark}}</div>
                            <div>平台备注：{{item.orderProductAfterPlatformRemark}}</div>
                        </div>
                        <div class='service-img'>
                            <div class="img-con" v-for='cell in switchPic(item.orderProductAfterProof)'><img :src="cell" alt="" ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="send-pro" @click='dialogFormVisible=true' v-if='btnStatus'>发货</div>
        <div class="total-message">
            <div><p>订单金额：</p><span>￥{{detail.orderAmount}}</span></div>
            <div><p>优惠金额：</p><span>￥-{{detail.privilegeAmount}}</span></div>
            <div><p>运费：</p><span>{{detail.orderStoreShipping}}</span></div>
            <div><p>实付：</p><span>{{detail.userCost}}</span></div>
        </div>
        <!--发货弹窗 -->
        <el-dialog title="发货" :visible.sync="dialogFormVisible" custom-class='addres-dialog' top="30%" :close-on-click-modal='false'>
           <div class="send-type">
               <div class="kuaidi" :class='{"click-on":onRight}' @click="changeType">快递配送</div>
               <div class="zisong" :class='{"click-on":!onRight}' @click="changeType">商家自送</div>
           </div>
           <div class="input-row" v-if='onRight'>
               <span>快递公司：</span>
               <input type="text" v-model='gongSi'>
           </div>
           <div class="input-row" v-if='onRight'>
               <span>快递单号：</span>
               <input type="text" v-model='danHao'>
           </div>
           <div class="textarea-row" v-if='!onRight'>
                <p>备注：</p>
                <textarea v-model='beiZhu'></textarea>
           </div>
           <div class="btn-row">
               <div class="send-sure" @click='sureSend'>确认发货</div>
               <div class="send-cancel" @click="dialogFormVisible = false">取消</div>
           </div>
        </el-dialog>
    </section>
</template>

<script>
    import {orderDetail, sendProduct} from '@/api/ordersApi';
    import qs from 'qs';
    export default {
        data() {
            return {
                btnStatus: false,
                hasServiceOrder: false,
                serviceIsOk: false,
                textLength: 0,
                serviceText: '',
                detail:'',
                after: {},
                allPay: false,
                disabled: true,
                /*弹窗数据*/
                dialogFormVisible: false,
                onRight: true,
                gongSi: '',
                danHao: '',
                beiZhu: ''
            }
        },
        beforeCreate(){
        },
        created(){
            let orderId = this.$route.query.orderId;
            orderDetail({orderStoreId: orderId}).then(res => {
                this.detail = res.data.data;
                this.allPay = this.detail.orderType == 1 ? true : false; 
                for(let i=0; i<this.detail.productList.length; i++){
                    let that = this.detail.productList[i];
                    that.orderProductStatus == 1 ? this.detail.tradeId = '用户未支付' : '';
                    that.orderProductStatus = this.switchStatus(that.orderProductStatus)
                    that.proPri = [];
                    for(let key in that.productPrivileges){
                        let money = {mes: key,count: that.productPrivileges[key]}
                        that.proPri.push(money)
                    }
                }
                this.detail.productList[0].orderProductStatus == '待发货' ? this.btnStatus = true : '';
            })
        },
        methods: {
            /*订单状态转换*/
            switchStatus(a) {
                let st = ''
                switch(a) {
                    case 1:st = '待用户支付'; break;
                    case 2:st = '待发货';break;
                    case 3:st = '待收货';break;
                    case 4:st = '交易成功';break;
                    case 5:st = '待处理';break;
                    case 6:st = '待平台审核';break;
                    case 7:st = '售后完成';break;
                    case 8:st = '取消售后';break;
                    case 9:st = '订单关闭';break;
                }
                return st;
            },
            /*售后订单转换*/
            switchAfter(a){
                let st = '';
                switch(a) {
                    case 1:st = '待处理'; break;
                    case 2:st = '待平台审核';break;
                    case 3:st = '售后完成';break;
                    case 4:st = '已取消';break;
                }
                return st;
            },
            /*订单类型转换*/
            switchOrderType(a){
                let st = ''
                switch(a) {
                    case 1:st = '全款订单'; break;
                    case 2:st = '定金订单';break;
                    case 3:st = '点券订单';break;
                    case 4:st = '现金券订单';break;
                }
                return st;
            },
            /*发货方式转换*/
            changeType() {
                var self = this;
                self.onRight = !self.onRight;
            },
            /*图片转换*/
            switchPic(a){
                if(a){
                   return a.split(',') 
                }      
            },
            /*控制字符长度*/
            textCount(){
                let self = this;
                self.textLength = self.serviceText.length;
                self.disabled = self.textLength === 0 ? true : false;
            },
            /*发货*/
            sureSend(){
                let self = this;
                if(self.onRight){     //true为快递配送，fasle为自送
                    if(self.gongSi == ''){self.warn('快递公司不能为空');return false}
                    if(self.danHao == ''){self.warn('快递单号不能为空');return false};
                }
                let params = {
                    orderStoreId: self.detail.orderStoreId,
                    shippedBy: self.gongSi,
                    trackNum: self.danHao,
                    remark: self.beiZhu
                }
                sendProduct(qs.stringify(params)).then( res => {
                    if(res.data.data){
                        self.btnStatus = false;
                        self.dialogFormVisible = false;
                        this.$message({
                            message: '发货成功',
                            type: 'success'
                        });
                    }else{
                        self.warn(res.data.message)
                    }
                })
            },
            /*消息警告*/
            warn(str){
                this.$message({
                    message: str,
                    type: 'warning'
                })
            }
        }
    }

</script>

<style lang='scss'>
    .detail-con {
        *{
            box-sizing: border-box !important;
            p{
                margin: 0;
                padding: 0;
            }
        }
        $color: #45cdb6;
        box-sizing: border-box !important;
        width: 100%;
        padding: 40px;
        float: left;
        .title{
            font-size: 16px;
            color: #333333;
            border-left: 3px solid $color;
            font-weight:600;
            text-indent: 12px;
        }
        .user-message{
            padding-bottom: 5px;
            .user-detail{
                margin-top: 20px;
                font-size: 14px;
                color: #666666;
                span{
                    margin-left: 8px;
                    color: #333333;
                }
            }
        }
        .send-message{
            margin-top: 15px;
            padding: 20px 5px 5px;
            border-top: 1px solid #eee;
            .send-detail,.send-addres{
                padding-top: 20px;
                font-size: 14px;
                color: #666666;
                span{
                    margin-left: 8px;
                    color: #333333;
                }
            }
        }
        .order-message{
            margin-top: 15px;
            padding: 20px 5px 0 !important;
            border-top: 1px solid #eee;
            .order-detail{
                padding-top: 20px;
                font-size: 14px;
                color: #666666;
                span{
                    margin-left: 8px;
                    color: #333333;
                }
            }
        }
        .table-head{
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #333333;
            font-weight: 600;
            height:44px;
            line-height: 44px;
            background: #F5F7FA;
            box-shadow: 0 1px 0 0 #EEEEEE;
        }
        .table-detail{
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            align-items:center;
            .el-col{
                height: 100%;
                font-size: 14px;
                color: #333333;
                text-align: center;
                position: relative;
                .pro-name{
                    span{
                        color: #f00;
                        border: 1px solid #f00;
                    }
                }
                div{
                    line-height: 150%;
                    text-align: left;
                }
                .send-pro{
                    text-align: center;
                    margin-top: 3px;
                    cursor: pointer;
                    color : $color;
                }
                .pro-color,.pro-item{
                    color: #666666;
                }
                div:nth-of-type(n+2){
                    margin-top: 5px;
                }
                p{
                    position: relative;
                    top: 48%;
                }
            }
            .el-col:nth-of-type(6){
                display: flex;
                align-items: center;
                flex-direction: column;
                font-size: 12px;
                .order-price{
                    color: #333333;
                }
                .youhui{
                    color: #666666;
                    p{
                        font-size: 12px;
                        span{
                        margin-left: 15px;
                        }
                    }    
                }
                .one-count{
                    color:$color;
                }
            }
        }
        .send-pro{
            float: right;
            width: 60px;
            height: 30px;
            background: $color;
            line-height: 30px;
            color: #fff;
            text-align: center;
            border-radius: 5px;
            margin-top: 10px;
            margin-right: 3px;
            cursor: pointer;
        }
        .service{
            .table-detail{
                .el-col:nth-of-type(1){
                    text-align: left;
                }
            }
            .service-user{
                padding: 15px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #eee;
                .service-user-detail{
                    font-size: 14px;
                    color: #666666;
                    div:nth-of-type(n+2){
                        margin-top: 8px;
                    }
                }
                .service-img{
                    display: flex;
                    align-items: center;
                    .img-con{
                        width: 100px;
                        height: 100px;
                    }
                    .img-con:nth-of-type(n+2){
                        margin-left: 8px;
                    }
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            img{
                width: 100px;
                height: 100px;
            }
        }
        .total-message{
            float:right;
            padding: 10px 0;
            clear: both;
            div{
                margin-top: 10px;
                font-size: 12px;
                p{
                    display: inline-block;
                    width: 60px;
                    margin-right:35px;
                    color: #666666;
                    text-align: right;
                }
                span{
                    color: #333333;
                }
            }
            div:nth-of-type(4){
                span{
                    font-weight: 600;
                    font-size: 14px;
                    color: $color;
                }
            }
        }
        .addres-dialog{
            width: 490px;
            height: 370px;
            .el-dialog__header{
                padding: 0 20px;
                height: 50px;
                line-height: 50px;
                box-shadow: inset 0 -1px 0 0 #DDDDDD;
                .el-dialog__title{
                    font-size: 14px;
                    color: #333333;
                    font-weight: 400;
                }
                .el-dialog__headerbtn{
                    font-size: 14px;
                }
            }
            .el-dialog__body{
                padding: 0;
                .send-type,.btn-row{
                    margin-top: 30px;
                    display: flex;
                    align-items: center;
                    justify-content:center;
                    div{
                        width: 90px;
                        height: 34px;
                        border: 1px solid #CCCCCC;
                        font-size: 14px;
                        color: #666666;
                        text-align:center;
                        line-height: 34px;
                        cursor: pointer;
                    }
                    div:nth-of-type(2){
                        margin-left:30px;
                    }
                    .click-on{
                        border: 1px solid $color;
                        color: $color;
                    } 
                }
                .textarea-row{
                    width:370px;
                    height:110px;
                    margin: 20px auto 0;
                    textarea{
                        width: 100%;
                        height: 100px;
                        resize: none
                    }
                    p{
                        margin-bottom: 10px;
                    }
                }
                .input-row{
                    padding-left:55px;
                    margin-top:30px;
                    span{
                        margin-right: 10px;
                    }
                    input{
                        width: 290px;
                        height: 40px;
                        border: 1px solid #CCCCCC;
                    }
                }
                .input-row:nth-of-type(3){
                   margin-top: 20px;
                }
                .btn-row{
                    margin-top: 40px;
                    .send-sure{
                        color:#fff;
                        background: $color;
                        border: none;
                    }
                }
            }
        }
    }
</style>