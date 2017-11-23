<template>
    <section class="cash-container" v-if="$route.name=='现金券'">
        <el-row>
            <el-col :span="24"><div class="name">{{toolName}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="margin-top: 10px;font-size:14px;color:#333333;">工具使用规则
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class='mt3'>{{toolDesc}}</el-col>
        </el-row>
        <el-row style="margin-top:28px;">
            <router-link to="/marketing-center/management" class="active">查看历史活动</router-link>
            <router-link to="/marketing-center/tool/create" class="create">创建活动</router-link>
        </el-row>
    </section>
    <section v-else><el-row><router-view></router-view></el-row></section>
</template>

<script>
    import { toolList } from '@/api/toolApi';
    export default {
        data() {
            return {    
                tools: [],
                toolDesc: '',
                toolName: ''
            }
        },
        created(){
            toolList({}).then( res => {
                let resTools = res.data.data;
                for(let i=0; i<resTools.length; i++){
                    let that = resTools[i];
                    if(that.marketingToolsId = this.$route.query.toolId){
                        this.toolDesc = that.toolsDetails;
                        this.toolName = that.toolsName;
                    }
                }
            })
        },
        methods: {
        }   
    }

</script>

<style scoped>
    .cash-container {
        width: 100%;
        float: left;
    }
    .el-col {
        /*padding-left: 20px; */
    }
    .name{
        /*margin-top: 20px;*/
        font-size:16px;
        color:#333333;
        border-left: 3px solid #41cac0;
        font-weight: 600;
        text-indent: 12px;
        padding-left: 10px;
    }
    .mt3{
        margin-top: 3px;
        line-height: 160%;
        font-size:14px;
        color:#666666;
        letter-spacing:0;
    }
    a{
        text-decoration: none;
        display: block;
        height:32px;
        line-height: 32px;
        text-align: center;
        float: left;
        font-size:14px;
    }
    .active{
       /* margin-left: 20px;*/
        width:118px;
        border:1px solid #cccccc;
        color:#333333;
    }
    .create{
        width:120px;
        color:#fff;
        background:#41cac0;
        margin-left: 30px;
    }
</style>