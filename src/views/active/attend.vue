<template>
    <section class="attend">
        <p>夏季促销活动</p>
        <table class="table-con">
            <tr>
                <td>报名时间</td>
                <td>2017/9/21 00:00-2017/9/21 00:00</td>
            </tr>
            <tr>
                <td>活动时间</td>
                <td>2017/9/21 00:00-2017/9/21 00:00</td>
            </tr>
            <tr>
                <td>活动终端</td>
                <td>APP／WAP／PC</td>
            </tr>
            <tr>
                <td>营销工具</td>
                <td>现金券／拼团／预约</td>
            </tr>
            <tr>
                <td>店铺须知</td>
                <td>1.活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述；<br>2.活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述；</td>
            </tr>
            <tr>
                <td>活动规则</td>
                <td>1.活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述；<br>2.活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述活动描述；</td>
            </tr>
        </table>
        <el-row style="margin-top:28px;" v-if='status=="1"'>
            <router-link to="/marketing-center/management" class="return">返回</router-link>
            <div @click='status="2"' class="goto">立即参与</div>
        </el-row>
        <section v-if='status=="2"'class='atd-con'>
            <div class="atd-title">参与活动</div>
             <section class="create-act">
                <createAct></createAct>
            </section>
        </section>
    </section>
</template>

<script>
    import CreateAct from '../tool/Create.vue'
    export default {
        components: { CreateAct },
        data() {
            return {
                status: '1'
            }
        },
        created(){
        },
        methods: {
             onSubmit: function(){
                console.log(77)
            }
        }   
    }

</script>

<style scoped lang="scss">
    $color: #45cdb6;
    .attend{
        width: 100%;
        float: left;
        padding: 20px;
        >p{
            font-size:16px;
            color:#333333;
            font-weight: 600;
            text-indent:12px;
            border-left: 3px solid $color;
        }
        .table-con{
            margin:0;
            padding: 20px 0 0;
            tr{
                height:40px;
                td:nth-of-type(1){
                    font-size:14px;
                    color:#666666;
                    width:76px;
                    vertical-align: top;
                }
                td:nth-of-type(2){
                    font-size:14px;
                    color:#333;
                    vertical-align: top;
                }
            }
            tr:nth-of-type(n+5){
                height: 50px;
            }
        }
        a,.goto{
            text-decoration: none;
            display: block;
            height:32px;
            line-height: 32px;
            text-align: center;
            float: left;
            font-size:14px;
        }
        .return{
            margin-left: 20px;
            width:100px;
            border:1px solid #cccccc;
            color:#333333;
        }
        .goto{
            width:100px;
            color:#fff;
            background:$color;
            margin-left: 30px;
            cursor:pointer;
        }
        .atd-con{
            margin-top:30px;
            padding-top:20px;
            border-top: 1px solid #ccc;
        }
        .atd-title{ 
            font-size: 16px;
            color: #333333;
            font-weight: 600;
            text-indent: 12px;
            border-left: 3px solid #45cdb6;
        }
    }
</style>