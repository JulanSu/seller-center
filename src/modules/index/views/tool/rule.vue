<template>
    <section class="cash-container" v-if="$route.name=='现金券'">
        <el-row>
            <el-col :span="24"><div class="name">现金券</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="margin-top: 10px;font-size:14px;color:#333333;">工具使用规则
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class='mt3'>1.规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容；</el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class='mt3'>2.规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容；
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class='mt3'>3.规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容规则内容；
            </el-col>
        </el-row>
        <el-row style="margin-top:28px;">
            <router-link to="/marketing-center/management" class="active">查看历史活动</router-link>
            <router-link to="/marketing-center/tool/create" class="create">创建活动</router-link>
        </el-row>
    </section>
    <section v-else><el-row><router-view></router-view></el-row></section>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        created(){
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
        padding-left: 20px; 
    }
    .name{
        margin-top: 20px;
        font-size:16px;
        color:#333333;
        border-left: 3px solid #41cac0;
        font-weight: 600;
        text-indent: 12px;
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
        margin-left: 20px;
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