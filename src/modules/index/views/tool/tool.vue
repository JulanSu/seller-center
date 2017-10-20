<template>
    <section class="cash-container" v-if="$route.name=='营销工具'">
        <el-row >
            <el-col :span="12">
                <router-link to="/marketing-center/tool/detail">
                    <img src="../../../../assets/images/cash.png" alt="" >
                    <div class="title">
                        <p>现金券</p>
                        <span>设置商品蛮近进啊思考和贷款</span>
                    </div>
                </router-link>
            </el-col>
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
        padding: 20px 20px;
    }
    .el-col img{
        width: 60px;
        height: 60px;
        float: left;
    }
    .title{
        float: left;
        margin-left: 17px;
        cursor: pointer;
    }
    .title p{
        margin: 0;
        padding: 0;
        font-size:14px;
        color:#333333;
    }
    .title span{
        display: block;
        margin-top: 5px;
        font-size:12px;
        line-height: 18px;
        color:#999999;
        width: 96px;
    }
</style>