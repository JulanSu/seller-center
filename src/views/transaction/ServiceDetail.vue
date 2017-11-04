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
                <el-col :span="5">
                    收货人：<span>{{detail.receiverName}}</span>
                </el-col>
                <el-col :span="5">
                    收货人手机号：<span>{{detail.receiverPhone}}</span>
                </el-col>
            </el-row>
            <el-row class='send-addres'>
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
            <el-row class='table-detail' v-for='item in detail.productList' :key="item.ProductName">
                <el-col :span="5">
                    <div class="pro-name"><span v-if="item.orderStoreType==1">展会</span>{{item.ProductName}}</div>
                    <div class="pro-color">{{item.standard}}</div>
                    <div class="pro-item">类目：{{item.cate}}</div>
                </el-col>
                <el-col :span="3"><p>￥{{item.unitPrice}}</p></el-col>
                <el-col :span="3">{{item.orderNum}}</el-col>
                <el-col :span="4">{{item.productType}}</el-col>
                <el-col :span="4">{{item.orderProductStatus}}
                    <div class="send-pro" v-if="item.send" @click='dialogFormVisible = true'>发货</div>
                </el-col>
                <el-col :span="5">
                    <div class="order-price">￥{{item.unitPrice * item.orderNum}}</div>
                    <div class="youhui" v-for= 'li in item.proPri'>
                        <p>{{li.mes}}<span>-￥{{li.count}}</span></p>
                    </div>
                    <div class="one-count">小计：￥{{item.orderProductTotal}}</div>
                </el-col>
            </el-row>
        </div>
        <div class="service" v-if='hasServiceOrder'>
            <el-row class='table-detail'>
                <el-col :span="5">售后单编号：{{after.orderProductAfterId}}</el-col>
                <el-col :span="3"></el-col>
                <el-col :span="3"></el-col>
                <el-col :span="4">售后单</el-col>
                <el-col :span="4">{{after.orderStatus}}</el-col>
                <el-col :span="5"></el-col>
            </el-row>
            <div class='service-user'>
                <div class="service-user-detail">
                    <div>售后时间：{{after.orderProductTime}}</div>
                    <div>售后原因：{{after.orderProductAfterReason}}</div>
                    <div>用户备注：{{after.orderProductAfterRemark}}</div>
                    <div>商家备注：{{after.orderProductAfterStoreRemark}}</div>
                    <div>平台备注：{{after.orderProductAfterPlatformRemark}}</div>
                </div>
                <div class='service-img'>
                    <div class="img-con" v-for='item in this.after.orderProductAfterProof'><img :src="item" alt="" ></div>
                </div>
            </div>
        </div>
        <div class="total-message">
            <div><p>订单金额：</p><span>￥{{detail.orderAmount}}</span></div>
            <div><p>优惠金额：</p><span>￥-{{detail.privilegeAmount}}</span></div>
            <div><p>运费：</p><span>{{detail.orderStoreShipping}}</span></div>
            <div><p>实付：</p><span>{{detail.userCost}}</span></div>
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
    import {orderDetail, postAfter } from '@/api/ordersApi';
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
            // let orderId = this.$route.query.orderId;
            let orderId = 1;
            orderDetail({orderStoreId: orderId}).then(res => {
                this.detail = res.data.data;
                this.after = this.detail.productList[0]; 
                for(let i=0; i<this.detail.productList.length; i++){
                    let that = this.detail.productList[i];
                    that.orderProductStatus = this.switchStatus(that.orderProductStatus)
                    that.send = that.orderProductStatus === '待发货' ? true : false;
                    that.proPri = [];
                    for(let key in that.productPrivileges){
                        let money = {mes: key,count: that.productPrivileges[key]}
                        that.proPri.push(money)
                    }
                }
                if(this.after.orderProductAfterId){
                    this.hasServiceOrder = true;
                    this.after.orderStatus = this.switchStatus(this.after.orderProductAfterStatus)
                    this.after.orderProductAfterProof = this.after.orderProductAfterProof.split(',')
                    this.after.orderStatus == "待处理" ? this.serviceIsOk = false : '';
                }
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
                        orderAfterId: self.after.orderProductAfterId,
                        storeRemark: self.serviceText
                    }
                postAfter(qs.stringify(params)).then(res => {
                    console.log(res)
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
                    padding-top:15px;
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
                    height:100px;
                    margin: 30px auto 0;
                    textarea{
                        width: 100%;
                        height: 100%;
                        resize: none
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