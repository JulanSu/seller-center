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
                <router-link :to="item.jumpLink" v-if='item.jumpType != 0'>查看详情</router-link>
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
                        page: self.currentPage,
                        size: self.pageSize
                    }
                msgList(params).then( res => {
                    if(res.data.data){
                        self.message = res.data.data.list;
                        self.total = Number(res.data.data.total)
                        for(let i=0; i<self.message.length; i++){
                            self.$set(self.message[i],'bottom',false);
                            self.message[i].jumpType != 2 ? self.message[i].jumpLink = self.message[i].jumpLink + self.switchUrl(self.message[i].subType) + '?id=' + self.message[i].jumpId : '';
                        }
                    }
                })
            },
            /*跳转地址转化*/
            switchUrl(a){
                switch(a) {
                    /*活动消息*/
                    case 3011: return '/marketing-center/management'; break;     
                    case 3021: return '/marketing-center/management'; break; 
                    case 3022: return '/marketing-center/management'; break; 
                    case 3031: return '/marketing-center/management'; break; 
                    case 3041: return '/marketing-center/management'; break; 
                    case 3042: return '/marketing-center/management'; break; 
                    /*订单消息*/
                    case 2011: return '/transaction/orders/order-detail'; break; 
                    case 2012: return '/transaction/orders/order-detail'; break; 
                    /*店铺消息*/
                    case 6012: return '/store/brand-management'; break;
                    case 6022: return '/store/shop-management'; break;
                    case 6032: return '/store/shop-management'; break;
                    case 6042: return '/seller-management/notpass'; break;
                    case 6052: return '/seller-management/notpass'; break;
                    case 7026: return '/seller-management/downshelve'; break;
                    case 7032: return '/seller-management/downshelve'; break;
                    case 7046: return '/store/message'; break;
                    case 7051: return '/seller-management/downshelve'; break;
                    case 7061: return '/store/message'; break;
                    default: return '/';
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
        padding: 40px;
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
                    display:inline-block;
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