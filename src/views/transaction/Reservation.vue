<template>
    <section class="coupon-con" v-if="$route.name=='结算管理'">
         <el-row class='search-row'>
            <span>一级类目</span>
            <el-input v-model="form.name" class='w180'></el-input>
            <span>二级类目</span>
            <el-select v-model="value1" placeholder="活动状态" class='w180'>
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span>三级类目</span>
            <el-select v-model="value1" placeholder="活动状态" class='w180'>
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span>订单编号</span>
            <el-input v-model="form.number" class='w180'></el-input>
            <span>创建时间</span>
            <el-date-picker type="date" v-model="form.startTime" class='w120'></el-date-picker>
            <span>—</span>
            <el-date-picker type="date" v-model="form.endTime" class='w120'></el-date-picker>
            <el-button type="primary" class='search-btn'>查询</el-button>
        </el-row>
        <el-table :data="tableData" class='table-con' align='center' :row-style="{height:'100px'}" @cell-click='tt'>
            <el-table-column prop="id" label="订单编号" align='center'></el-table-column>
            <el-table-column prop="time" label="创建时间" align='center'></el-table-column>
            <el-table-column prop="storeName" label="买家手机" align='center'></el-table-column>
            <el-table-column prop="proName" label="订单金额" align='center'></el-table-column>
            <el-table-column prop="uesrName" label="商家优惠" align='center'></el-table-column>
            <el-table-column prop="uesrPhone" label="平台补贴" align='center' ></el-table-column>
            <el-table-column prop="status" label="用户实付" align='center'></el-table-column>
            <el-table-column prop="fenrun" label="平台分润" align='center'></el-table-column>
            <el-table-column prop="shouru" label="商家总收入" align='center'></el-table-column>
            <el-table-column prop="yishou" label="已收入金额" align='center'></el-table-column>
            <el-table-column prop="jiesuan" label="结算金额" align='center'></el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="sizes, prev, pager, next, jumper,total" :total="100">
                </el-pagination>
        </div>
    </section>
    <section v-else><el-row><router-view></router-view></el-row></section>
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
                    time: '2017-08-20 12:12',
                    storeName: '18233052568',
                    proName: '1000.00',
                    uesrName: '-100',
                    uesrPhone: '0.00',
                    status: '900.00',
                    fenrun: '-50.00',
                    shouru: '850.00',
                    yishou: '850.00',
                    jiesuan: '0.00'         
                },
                {
                    id: 'DD10171001SY00001',
                    time: '2017-08-20 12:12',
                    storeName: '18233052568',
                    proName: '1000.00',
                    uesrName: '-100',
                    uesrPhone: '0.00',
                    status: '900.00',
                    fenrun: '-50.00',
                    shouru: '850.00',
                    yishou: '850.00',
                    jiesuan: '0.00'     
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
            tt(row, column, cell){
                var self = this;
                if(cell.className.indexOf('column_1') > -1){
                    self.$router.push('')
                }
            }
        }   
    }

</script>

<style lang='scss'>
    .coupon-con {
        *{
            box-sizing: border-box !important;
            p{
                margin: 0;
                padding: 0;
            }
        }
        $color: #45cdb6;
        box-sizing: border-box !important;
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
                td:nth-of-type(1){
                    color: $color;
                    cursor: pointer;
                }
            }
        }
        .block{
            float: right;
        }
    }
    .pop-time{
        font-size: 14px;
        color: #666666;
        i{
            color:#999;
            margin-right: 10px;
        }
        p:nth-of-type(n+2){
            margin-top: 10px;
        }
    }
</style>