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
                <el-col :span="5" v-if="detail.shippingWay != '无需配送'">
                    备注：<span>{{detail.remark}}</span>
                </el-col>
                <el-col :span="5" v-if="detail.orderType == 1">
                    收货人：<span>{{detail.receiverName}}</span>
                </el-col>
                <el-col :span="5" v-if="detail.orderType == 1">
                    收货人手机号：<span>{{detail.receiverPhone}}</span>
                </el-col>
            </el-row>
            <el-row class='send-addres' v-if="detail.orderType == 1">
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
            <el-row class='table-detail'>
                <el-col :span="5">
                    <div class="pro-name"><span v-if="detail.orderStoreType==1">展会</span>{{detail.productName}}</div>
                    <div class="pro-color">{{detail.standard}}</div>
                    <div class="pro-item">类目：{{detail.cate}}</div>
                </el-col>
                <el-col :span="3"><p>￥{{detail.unitPrice}}</p></el-col>
                <el-col :span="3">{{detail.orderNum}}</el-col>
                <el-col :span="4">{{detail.productType}}</el-col>
                <el-col :span="4">{{switchStatus(detail.orderProductStatus)}}</el-col>
                <el-col :span="5">
                    <div class="order-price">￥{{detail.unitPrice * detail.orderNum}}</div>
                    <div class="youhui" v-for= 'li in detail.proPri'>
                        <p>{{li.mes}}<span>-￥{{li.count}}</span></p>
                    </div>
                    <div class="one-count">小计：￥{{detail.orderProductTotal}}</div>
                </el-col>
            </el-row>
        </div>
        <div class="service">
            <el-row class='table-detail'>
                <el-col :span="5">售后单编号：{{detail.orderAfterSerialNumber}}</el-col>
                <el-col :span="3"></el-col>
                <el-col :span="3"></el-col>
                <el-col :span="4">售后单</el-col>
                <el-col :span="4">{{switchAfter(detail.orderProductAfterStatus)}}</el-col>
                <el-col :span="5"></el-col>
            </el-row>
            <div class='service-user'>
                <div class="service-user-detail">
                    <div>售后时间：{{detail.orderProductTime}}</div>
                    <div>售后原因：{{detail.orderProductAfterReason}}</div>
                    <div>用户备注：{{detail.orderProductAfterRemark}}</div>
                    <div>商家备注：{{detail.orderProductAfterStoreRemark}}</div>
                    <div>平台备注：{{detail.orderProductAfterPlatformRemark}}</div>
                </div>
                <div class='service-img'>
                    <div class="img-con" v-for='item in this.detail.orderProductAfterProof'><img :src="item" alt="" ></div>
                </div>
            </div>
        </div>
        <div class="total-message">
            <div><p>订单金额：</p><span>￥{{detail.unitPrice * detail.orderNum}}</span></div>
            <div><p>优惠金额：</p><span>￥-{{detail.priMoney}}</span></div>
            <div><p>运费：</p><span>{{detail.orderProductShipping}}</span></div>
            <div><p>实付：</p><span>{{detail.orderProductTotal}}</span></div>
        </div>
        <div class="beizhu" v-if="!serviceIsOk">
            <div class="font-count">{{textLength}}/200</div>
            <div class="font-content">
                <p>备注信息：</p>
                <textarea :maxlength="200" @input='textCount' v-model='serviceText'></textarea>
            </div>
            <el-button class='submit-btn gray' @click="postRight" :disabled='disabled'>提交审核</el-button>
        </div>
    </section>
</template>

<script>
    import {afterDetail, postAfter } from '@/api/ordersApi';
    import qs from 'qs';
    export default {
        data() {
            return {
                hasServiceOrder: false,
                serviceIsOk: false,
                textLength: 0,
                serviceText: '',
                detail:'',
                after: {},
                disabled: true

            }
        },
        beforeCreate(){
        },
        created(){
            let orderId = this.$route.query.orderId,
                productId = this.$route.query.productId;
            afterDetail({orderStoreId: orderId, orderProductId:productId}).then(res => {
                this.detail = res.data.data;
                this.detail.proPri = [],this.detail.priMoney = 0;
                for(let key in this.detail.productPrivileges){
                    let money = {mes: key,count: that.productPrivileges[key]}
                    this.detail.proPri.push(money)
                }
                this.detail.orderProductAfterProof = this.detail.orderProductAfterProof.split(',')
                for(let i=0; i<this.detail.proPri.length; i++) {
                    this.detail.priMoney += this.detail.proPri[i].count
                }
                this.serviceIsOk = this.detail.orderProductAfterStatus == 1 ? false : true; 
            })
        },
        methods: {
            /*订单状态转换*/
            switchStatus(a) {
                let st = ''
                switch(a) {
                    case 1:st = '待用户支付'; break;
                    case 2:st = '待发货';break;
                    case 3:st = '待用户收货';break;
                    case 4:st = '交易成功';break;
                    case 5:st = '待商家处理';break;
                    case 6:st = '待平台审核';break;
                    case 7:st = '售后完成';break;
                    case 8:st = '取消售后';break;
                    default:st = '订单关闭';break;
                }
                return st;
            },
            /*售后订单转换*/
             switchAfter(a) {
                let st = ''
                switch(a) {
                    case 1:st = '待商家处理'; break;
                    case 2:st = '待平台审核';break;
                    case 3:st = '售后完成';break;
                    case 4:st = '售后取消';break;
                }
                return st;
            },
            /*发货方式转换*/
            changeType() {
                var self = this;
                self.onRight = !self.onRight;
            },
            /*控制字符长度*/
            textCount(){
                let self = this;
                self.textLength = self.serviceText.length;
                self.disabled = self.textLength === 0 ? true : false;
            },
            /*提交审核*/
            postRight(){
                let self = this,
                    params = {
                        orderAfterId: self.detail.orderProductAfterId,
                        storeRemark: self.serviceText
                    }
                postAfter(qs.stringify(params)).then(res => {
                    if(res.data.message == '成功'){
                        self.detail.orderProductAfterStatus = 2;
                        self.detail.serviceIsOk = true;
                        this.$message({
                            message: '售后提交成功，请等待审核',
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
        .beizhu{
            clear: both;
            padding:15px 20px;
            color: #666; 
            border-top: 1px solid #eee;
            margin-top:20px;
            .font-count{
                float: right;
            }
            .font-content{
                padding-top: 10px;
                clear: both;
                display: flex;
                p{
                    width: 5%;
                }
                textarea{
                    width: 95%;
                    height:150px;
                    resize: none;
                }
            }
            .submit-btn{
                margin-top: 20px;
                float: right;
                background: $color;
                color: #fff;
                height: 40px;
                text-align: center;
                border-radius: 5px;
            }
        }
    }
</style>