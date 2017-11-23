<template>
    <section class="message-con">
        <div class="message-item" v-for="(item,index) in message">
            <div class="message-item-top" @click="toggleDown(item.bottom,index)">
                <div class="message-title">
                    <i>•</i> <span>【{{switchType(item.majorType)}}】{{item.title}}</span>
                </div>
                <div class="message-time">
                    {{switchTime(item.createdAt)}}
                    <i class="el-icon-caret-bottom" v-if="!item.bottom"></i>
                    <i class="el-icon-caret-top" v-else></i>
                </div>
            </div>
            <div class="message-item-detail" v-if="item.bottom">
                <p v-html="item.content"></p>
                <router-link :to="item.jumpLink" v-if='item.jumpNot != ""'>查看详情</router-link>
            </div>
        </div>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20,50,100]" :page-size="pageSize" layout="sizes, prev, pager, next, jumper,total" :total="total">
            </el-pagination>
        </div>
    </section>
</template>

<script>
    import { msgList } from '@/api/toolApi';
    export default {
        data() {
            return {    
                message: null,
                currentPage : 1,
                pageSize:20,
                total: null
            }
        },
        created(){
            let self = this;
            self.getData()
        },
        methods: {
            /*详细展示*/
            toggleDown(b, len) {
                let self = this;
                self.message[len].bottom = !b
            },
            /*获取消息列表*/
            getData() {
                let self = this,
                    params = {
                        uid: config.uid,
                        pageNum: self.currentPage,
                        pageSize: self.pageSize
                    }
                msgList(params).then( res => {
                    if(res.data.data){
                        self.message = res.data.data.list;
                        self.total = Number(res.data.data.total)
                        for(let i=0; i<self.message.length; i++){
                            self.$set(self.message[i],'bottom',false);
                            self.message[i].jumpLink = self.switchUrl(self.message[i].subType) + '&id=' + self.message[i].jumpId;
                            self.$set(self.message[i],'jumpNot',self.switchUrl(self.message[i].subType));
                        }
                    }
                })
            },
            /*跳转地址转化*/
            switchUrl(a){
                switch(a) {
                    /*活动消息*/
                    case 3011: return '/marketing-center/management?name=platformActive'; break;//平台对店铺发起活动的邀请-店铺受邀
                    case 3021: return '/marketing-center/management?name=storeActive'; break;
                        // 店铺报名平台活动的申请-审核通过
                    case 3022: return '/marketing-center/management?name=platformActive'; break; //店铺报名平台活动的申请-审核未通过
                    case 3031: return '/marketing-center/management?name=storeActive'; break; 
                        //平台对店铺活动的审核-下架店铺活动
                    case 3041: return '/marketing-center/management?from=mes'; break; 
                        //平台/店铺活动开始结束状态-活动开始
                    case 3042: return '/marketing-center/management?from=mes'; break;
                        //平台/店铺活动开始结束状态-活动结束
                    /*订单消息*/
                    case 2011: return '/transaction/orders/order-detail?from=mes'; break; 
                        //新订单产生订单状态为PY时
                    case 2021: return '/transaction/orders/order-detail?from=mes'; break; 
                        //用户申请售后订单状态为RO时
                    /*店铺消息*/
                    case 6012: return '/store/brand-management?from=mes'; break;  
                        //商家发起创建品牌的申请-审核不通过
                    case 6022: return '/store/shop-management?from=mes'; break;  
                        //商家发起店铺入驻的申请-审核不通过
                    case 6032: return '/store/message?from=mes'; break;
                        //商家发起修改店铺信息的申请-审核不通过
                    case 6042: return '/seller-management/notpass?from=mes'; break;
                        //商家发起上传商品的申请-审核不通过
                    case 6052: return '/seller-management/notpass?from=mes'; break;
                        //商家发起修改商品信息的申请-审核不通过
                    case 7026: return '/seller-management/downshelve?from=mes'; break;
                        //后台修改行业信息的通知-取消行业关联类目导致店铺商品下架
                    case 7032: return '/seller-management/downshelve?from=mes'; break;
                        //后台修改品牌信息的通知-禁用品牌导致店铺商品下架
                    case 7046: return '/store/message?from=mes'; break;
                        //后台修改店铺信息的通知-关闭店铺
                    case 7051: return '/seller-management/downshelve?from=mes'; break;
                        //后台修改商品信息的通知-下架商品
                    case 7061: return '/store/message?from=mes'; break;
                        //品牌授权有效期到期、店铺失去品牌经营权的通知
                    default: return '';
                }
            },
            /*时间戳转化*/
            switchTime(val){
                function add0(m){return m<10?'0'+m:m }
                let time = new Date(val),
                    y = time.getFullYear(),
                    m = time.getMonth()+1,
                    d = time.getDate(),
                    h = time.getHours(),
                    mm = time.getMinutes(),
                    s = time.getSeconds();
                return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
            },
            /*活动类型转化*/
            switchType(a){
                switch(a) {
                    case 1: return '资产消息'; break;
                    case 2: return '订单消息'; break;
                    case 3: return '活动消息'; break;
                    case 4: return '社区消息'; break;
                    case 5: return '帐号消息'; break;
                    case 6: return '审核消息'; break;
                    case 7: return '系统消息';
                }
            },
            handleSizeChange(val){
                let self = this;
                self.pageSize = val;
                self.getData()
            },
            handleCurrentChange(val){
                let self = this;
                self.currentPage = val;
                self.getData()
            }
        }   
    }

</script>

<style lang='scss'>
    .message-con{
        *{
            box-sizing: border-box !important;
            p{
                padding: 0;
                margin: 0;
            }
        }
        width: 100%;
        float: left;
        box-sizing: border-box !important;
        .message-item{
            font-size: 14px;
            color: #333333;
            overflow: hidden;
            cursor: pointer;
            .message-item-top{
                width: 100%;
                height: 56px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #EEEEEE;
                .message-title{
                    i{
                        display: inline-block;
                        height: 56px;
                        line-height: 56px;
                        font-size: 30px;
                        vertical-align: top;
                        color: #F7B868;
                    }
                    span{
                        margin-left: 20px;
                        display: inline-block;
                        font-size: 14px;
                        height: 56px;
                        line-height: 56px;
                        }
                }
                .message-time{
                    i{
                        font-size: 10px;
                        margin-left:20px;
                        color: #333;
                    }
                }
            }
            .message-item-detail{
                background: #F5F7FA;
                padding: 20px 40px;
                cursor: default;
                p{
                    display:inline;
                    line-height: 150%;
                }
                a{
                    color: #41cac0;
                }
            }
        }
        .block{
            float: right;
        }
    }
</style>