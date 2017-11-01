<template>
    <section class="detail-con">
        <div class="user-message">
            <div class="title">买家信息</div>
            <el-row class="user-detail">
                <el-col :span="5">
                    用户昵称：<span>芙兰朵露</span>
                </el-col>
                <el-col :span="5">
                    真实姓名：<span>芙兰朵露</span>
                </el-col>
                <el-col :span="5">
                    手机号：<span>15138569862</span>
                </el-col>
            </el-row>
        </div>
        <div class="send-message">
            <div class="title">配送信息</div>
            <el-row class="send-detail">
                <el-col :span="5">
                    配送方式：<span>快递</span>
                </el-col>
                <el-col :span="5">
                    快递公司：<span>顺风快递</span>
                </el-col>
                <el-col :span="5">
                    运单号：<span>8008080808</span>
                </el-col>
                <el-col :span="4">
                    收货人：<span>芙兰朵露</span>
                </el-col>
                <el-col :span="5">
                    收货人手机号：<span>15138569862</span>
                </el-col>
            </el-row>
            <el-row class='send-addres'>
                收货地址：<span>15138569862</span>
            </el-row>
        </div>
        <div class="order-message">
            <div class="title">订单信息</div>
            <el-row class="order-detail">
                <el-col :span="5">
                    订单号：<span>DD10170911SY00001</span>
                </el-col>
                <el-col :span="5">
                    下单时间：<span>2017-09-11 16:58:27</span>
                </el-col>
                <el-col :span="5">
                    交易号：<span>2017091210011002565</span>
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
                    <div class="pro-name">周大福《乘风破浪》阿正同款18K金戒指钻戒U159096</div>
                    <div class="pro-color">颜色分类：黑色</div>
                    <div class="pro-item">类目：美装饰品>珠宝/钻石/翡翠/黄金>K金饰品</div>
                </el-col>
                <el-col :span="3"><p>￥4959</p></el-col>
                <el-col :span="3">1</el-col>
                <el-col :span="4">全款订单</el-col>
                <el-col :span="4">订单已支付</el-col>
                <el-col :span="5">
                    <div class="order-price">￥4962</div>
                    <div class="youhui">
                        <p>会员节优惠<span>-￥2000</span></p>
                        <p>商家优惠券<span>-￥3000</span></p>
                    </div>
                    <div class="one-count">小计：￥-25</div>
                </el-col>
            </el-row>
            <el-row class='table-detail'>
                <el-col :span="5">
                    <div class="pro-name">周大福《乘风破浪》阿正同款18K金戒指钻戒U159096</div>
                    <div class="pro-color">颜色分类：黑色</div>
                    <div class="pro-item">类目：美装饰品>珠宝/钻石/翡翠/黄金>K金饰品</div>
                </el-col>
                <el-col :span="3"><p>￥4959</p></el-col>
                <el-col :span="3">1</el-col>
                <el-col :span="4">全款订单</el-col>
                <el-col :span="4">订单已支付</el-col>
                <el-col :span="5">
                    <div class="order-price">￥4962</div>
                    <div class="youhui">
                        <p>会员节优惠<span>-￥2000</span></p>
                        <p>商家优惠券<span>-￥3000</span></p>
                    </div>
                    <div class="one-count">小计：￥-25</div>
                </el-col>
            </el-row>
            <div class="service" v-if='service'>
                <el-row class='table-detail'>
                    <el-col :span="5">售后单编号：24164684648</el-col>
                    <el-col :span="3"></el-col>
                    <el-col :span="3"></el-col>
                    <el-col :span="4">售后单</el-col>
                    <el-col :span="4">售后已完成</el-col>
                    <el-col :span="5"></el-col>
                </el-row>
                <div class='service-user'>
                    <div class="service-user-detail">
                        <div>售后时间：2017/9/20 17:02:25</div>
                        <div>售后原因：不想买了</div>
                        <div>用户备注：就是不想买了不想</div>
                        <div>商家备注：</div>
                        <div>平台备注：</div>
                    </div>
                    <div class='service-img'>
                        <div class="img-con" v-for='item in [1,2,3]'><img src="http://pic34.photophoto.cn/20150126/0005018481455638_b.jpg" alt="" ></div>
                    </div>
                </div>    
            </div>
        </div>
        <div class="total-message">
            <div><p>订单金额：</p><span>￥4950.00</span></div>
            <div><p>优惠金额：</p><span>￥-5000</span></div>
            <div><p>运费：</p><span>0</span></div>
            <div><p>实付：</p><span>-500</span></div>
        </div>
        <div class="beizhu">
            <div class="font-count">0/200</div>
            <div class="font-content">
                <p>备注信息：</p>
                <textarea></textarea>
            </div>
            <div class='submit-btn gray'>提交审核</div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                service: true,
                status: true
            }
        },
        created(){
        },
        methods: {
        }   
    }

</script>

<style lang='scss'>
    .detail-con {
        width: 100%;
        padding: 40px;
        float: left;
        overflow: hidden;
        box-sizing: border-box !important;
        *{
            box-sizing: border-box !important;
            p{
                margin: 0;
                padding: 0;
            }
        }
        $color: #45cdb6;
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
            padding: 20px 5px;
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
                div{
                    line-height: 150%;
                    text-align: left;
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
            padding-bottom: 20px;
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
                width: 80px;
                height: 40px;
                text-align: center;
                border-radius: 5px;
            }
            .gray{
                background: #999;
            }
        }
    }
</style>