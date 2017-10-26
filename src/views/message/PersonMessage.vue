<template>
    <section class="message-con">
        <div class="message-item" v-for="(item,index) in message">
            <div class="message-item-top" @click="toggleDown(item.bottom,index)">
                <div class="message-title">
                    <i>•</i> <span>{{item.title}}</span>
                </div>
                <div class="message-time">
                    {{item.time}}
                    <i class="el-icon-caret-bottom" v-if="!item.bottom"></i>
                    <i class="el-icon-caret-top" v-else></i>
                </div>
            </div>
            <div class="message-item-detail" v-if="item.bottom">
                <p v-for="tail in item.detail">{{tail}}</p>
            </div>
        </div>
    </section>
</template>

<script>
    import { toolList } from '@/api/toolApi';
    export default {
        data() {
            return {    
                message: [
                    {title: '商品没有通过哒哒哒' ,time: '2017-08-23',bottom: false,
                        detail: ["就是过","就是没有通过","就是没有通过","就是没有通过"]
                    },
                    {title: '我是一个小小的石头' ,time: '2017-08-23',bottom: false,
                        detail: ["就是没","就是没有通过","就有通过","就是没有通过"]
                    },
                    {title: '深深的埋在泥土之中' ,time: '2017-08-23',bottom: false,
                       detail: ["就是没有通过","就是","就是没有通过","就是没有通过"]
                    },
                    {title: '千年之后生死落幕' ,time: '2017-08-23',bottom: false,
                        detail: ["就过","就是没有通过","就是没有通过","就是没有通过"]
                    }
                ]
            }
        },
        created(){
        
        },
        methods: {
            /*详细展示*/
            toggleDown(b, len) {
                var self = this;
                self.message[len].bottom = !b
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
                p{
                    line-height: 150%;
                }
            }
        }
    }
</style>