<template>
    <section class="cash-container" v-if="$route.name=='营销工具'">
        <el-row >
             <el-col :span="8" v-for="item in tools" :key="item.id">
                <div class="item-tool" @click='directionTo(item)'>
                    <img :src="item.toolsLogo" alt="" >
                    <div class="title">
                        <p>{{item.toolsName}}</p>
                        <span>{{item.toolsDesc}}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </section>
    <section v-else><router-view></router-view></section>
</template>

<script>
    import { toolList } from '@/api/toolApi';
    export default {
        data() {
            return {
                tools: [],
            }
        },
        created(){
            toolList().then( res => {
                this.tools = [...res.data.data];
            })
        },
        methods: {
            directionTo(item) {
                this.$router.push({path:'/marketing-center/tool/detail', query: {toolId: item.marketingToolsId}});
            }
        }
    }

</script>

<style scoped>
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
    .item-tool{
        float: left;
        position: relative;
        overflow: hidden;
        cursor: pointer;
    }
</style>


