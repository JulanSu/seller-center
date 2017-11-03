<template>
    <section class="attend">
        <p>{{detail.activityName}}</p>
        <table class="table-con">
            <tr>
                <td>报名时间</td>
                <td>{{switchTime(detail.signUpBeginTime)}} - {{switchTime(detail.signUpEndTime)}}</td>
            </tr>
            <tr>
                <td>活动时间</td>
                <td>{{switchTime(detail.activityBeginTime)}} - {{switchTime(detail.activityEndTime)}}</td>
            </tr>
            <tr>
                <td>活动终端</td>
                <td>{{switchType(detail.activityTerminal)}}</td>
            </tr>
            <tr>
                <td>营销工具</td>
                <td>{{detail.toolsName}}</td>
            </tr>
            <tr>
                <td>店铺须知</td>
                <td>{{detail.activityRequiredRule}}</td>
            </tr>
            <tr>
                <td>活动规则</td>
                <td>{{detail.activityRule}}</td>
            </tr>
        </table>
        <el-row style="margin-top:28px;" v-if='!showAct'>
            <router-link to="/marketing-center/management" class="return">返回</router-link>
            <el-button class="goto" type="primary" :disabled='btnNotClick' @click='attendAct'>立即参与</el-button>
        </el-row>
        <section v-if='showAct'class='atd-con'>
            <div class="atd-title">参与活动</div>
             <section class="create-act" >
                <createAct :bTime="detail.signUpBeginTime" :eTime="detail.signUpEndTime"></createAct>
            </section>
        </section>
    </section>
</template>

<script>
    import CreateAct from '../tool/Create.vue'
    import {platformActDetail} from '@/api/toolApi';
    export default {
        components: { CreateAct },
        data() {
            return {
                btnNotClick: false,
                showAct: false,
                detail:'',
            }
        },
        created(){
            let actId = this.$route.query.actId;    
            /*获取平台详情*/
            platformActDetail({storeId: config.toolsStoreId, marketingActivityId:actId }).then(res => {
                this.detail = res.data.data;
                this.statusIsOk();
            })
        },
        methods: {
            /*判断活动状态*/
            statusIsOk(){
                let actId = this.$route.query.actId,
                    signStatus = this.$route.query.signStatus,    //报名状态 0未回应，1确认参与，2逾期未参与
                    auditStatus = this.$route.query.auditStatus;    //审核状态 0未审核，1通过，2不通过
                if(signStatus == 2)  this.btnNotClick = true;
                if(signStatus == 0){
                    let timesTamp = Date.parse(new Date());
                    if(this.detail.signUpEndTime < timesTamp && timesTamp < this.detail.signUpEndTime ){
                        this.btnNotClick = false;
                    }else{
                        this.btnNotClick = true;
                    }
                }
                if(signStatus == 1) this.showAct = true;
                
            },
            /*参与平台活动*/
            attendAct(){
                let self = this;
                self.showAct = true;
            },
             /*时间戳转换*/
            switchTime(val){
                function add0(m){return m<10?'0'+m:m }
                let time = new Date(val),
                    y = time.getFullYear(),
                    m = time.getMonth()+1,
                    d = time.getDate(),
                    h = time.getHours(),
                    mm = time.getMinutes(),
                    s = time.getSeconds();
                return y+'/'+add0(m)+'/'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
            },
            /*活动终端转化*/
            switchType(a){
                switch(a) {
                    case '0': return 'PC'; break;
                    case '1': return 'APP'; break;
                    case '2': return 'H5'; break;
                    case '3': return '小程序'; break;
                    case '4': return '微信公众号';  
                }
            },
            onSubmit(){
                
            }
        }   
    }

</script>

<style lang="scss">
    .attend{
        $color: #45cdb6;
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
                td{
                    padding: 8px;
                }
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
        }
        a,.goto{
            text-decoration: none;
            display: block;
            height:32px;
            text-align: center;
            float: left;
            font-size:14px;
            line-height: 13px;
        }
        .is-disabled{
            background-image: none;
            background-color: rgb(238, 245, 246) !important;
            border-color: rgb(209, 229, 229) !important;
        }
        .return{
            margin-left: 20px;
            width:100px;
            border:1px solid #cccccc;
            color:#333333;
            line-height: 32px;
            cursor: pointer;
            color:#000;
        }
        .goto{
            width:100px;    
            background:$color;
            margin-left: 30px;
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



