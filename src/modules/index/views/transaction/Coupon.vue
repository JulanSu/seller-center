<template>
    <section class="coupon-con">
         <el-row class='search-row'>
            <span>订单编号</span>
            <el-input v-model="form.name" class='w180'></el-input>
            <span>买家手机</span>
            <el-input v-model="form.name" class='w180'></el-input>
            <span>核销进度</span>
            <el-select v-model="value1" placeholder="活动状态" class='w180'>
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span>点券编号</span>
            <el-input v-model="form.number" class='w180'></el-input>
            <span>生成日期</span>
            <el-date-picker type="date" v-model="form.startTime" class='w120'></el-date-picker>
            <span>—</span>
            <el-date-picker type="date" v-model="form.endTime" class='w120'></el-date-picker>
            <el-button type="primary" class='search-btn'>查询</el-button>
        </el-row>
        <el-table :data="tableData" class='table-con' align='center' :row-style="{height:'100px'}" cell-mouse-enter='tt'>
            <el-table-column prop="id" label="订单编号" align='center'></el-table-column>
            <el-table-column prop="time" label="点券编号" align='center'></el-table-column>
            <el-table-column prop="storeName" label="生成时间" align='center'></el-table-column>
            <el-table-column prop="proName" label="商品名称" align='center'></el-table-column>
            <el-table-column prop="uesrName" label="用户手机号" align='center'></el-table-column>
            <el-table-column prop="uesrPhone" label="已核销" align='center' >
            </el-table-column>
            <el-table-column prop="status" label="总次数" align='center'></el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="sizes, prev, pager, next, jumper,total" :total="100">
                </el-pagination>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                tableData: [
                {
                    id: 'DD10171001SY00001',
                    time: 'DQ10170930MY00001',
                    storeName: '2017-09-11 12:22',
                    proName: '周大福《乘风破浪》阿正同款18k金戒指3种商品',
                    uesrName: '18668096609',
                    uesrPhone: '5',
                    status: '10'
                },
                {
                    id: 'DD10171001SY00001',
                    time: 'DQ10170930MY00001',
                    storeName: '2017-09-11 12:22',
                    proName: '周大福《乘风破浪》阿正同款18k金戒指3种商品',
                    uesrName: '18668096609',
                    uesrPhone: '5',
                    status: '10'
                }],
                form: {
                    name: '',
                    number: '',
                    startTime: '',
                    endTime: ''
                },
                value1: '',
                options1: [{
                    value: '0',
                    label: '未开始'
                }, 
                {
                    value: '1',
                    label: '进行中'
                }, 
                {
                    value: '2',
                    label: '已结束'
                }, 
                {
                    value: '3',
                    label: '已关闭'
                }],
            }
        },
        created(){
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            tt(){
                console.log(747)
            }
        }   
    }

</script>

<style lang='scss'>
    *{
        box-sizing: border-box !important;
        p{
            margin: 0;
            padding: 0;
        }
    }
    $color: #45cdb6;
    .coupon-con {
        width: 100%;
        float: left;
        padding: 40px;
        .w180{
            width: 180px;
        }
        .w120{
            width:120px;
        }
        .search-row{
            span{
                font-size:14px;
                color:#666666;
                margin-right: 10px;
            }
            span:nth-of-type(n+2){
                margin-left: 20px;
            }
            span:nth-of-type(6){
                margin-left: 10px;
                color: #999;
            }
            .search-btn{
                margin-left: 40px;
                width: 60px;
                background: $color;
                color: #fff;
                border: none;
                span{
                    color: #fff;
                }
            }
        }
        .table-con{
            margin-top: 30px;
            tr{
                td:nth-of-type(6){
                    cursor: pointer;
                    color: $color;
                }
            }
        }
        .block{
            float: right;
        }
    }
</style>