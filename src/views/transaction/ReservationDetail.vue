<template>
    <section class="profit">
        <el-row class='detail-row'>
            <el-col :span='5'>订单编号：12120351455</el-col>
            <el-col :span='5'>买家：182****4444</el-col>
            <el-col :span='5'>是否展会订单：否</el-col>
        </el-row>
        <el-table :data="tableData" class='table-con' align='center' :row-style="{height:'100px'}" @cell-click='tt'>
            <el-table-column prop="id" label="时间" align='center'></el-table-column>
            <el-table-column prop="time" label="商品名称" align='center'></el-table-column>
            <el-table-column prop="storeName" label="数量" align='center'></el-table-column>
            <el-table-column prop="proName" label="商家优惠" align='center'>
                <template slot-scope="scope">
                    <div class="store-count">
                        <p>-100.00</p>
                        <p>会员节优惠：-￥{{scope.row.youhui[0]}}</p>
                        <p>商家现金券：-￥{{scope.row.youhui[1]}}</p>
                    </div>
                    <!-- <div class="platform-count"></div> -->
                </template>
            </el-table-column>
            <el-table-column prop="uesrName" label="平台补贴" align='center'>
                 <template slot-scope="scope">
                    <div class="platform-count">
                        <p>-100.00</p>
                        <p>会员节优惠：-￥{{scope.row.youhui[0]}}</p>
                        <p>商家现金券：-￥{{scope.row.youhui[1]}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="uesrPhone" label="用户实付" align='center' ></el-table-column>
            <el-table-column prop="status" label="平台分润" align='center'></el-table-column>
            <el-table-column prop="shouru" label="商家总收入" align='center'></el-table-column>
            <el-table-column prop="yishou" label="已收入金额" align='center'></el-table-column>
            <el-table-column prop="jiesuan" label="结算金额" align='center'></el-table-column>
        </el-table>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [
                {
                    id: '2017-09-11 12:22',
                    time: '周大福《乘风破浪》阿正同款18k金戒指...等3种商品',
                    storeName: '1',
                    proName: '1000.00',
                    uesrName: '100',
                    uesrPhone: '900.00',
                    status: '900.00',
                    shouru: '850.00',
                    yishou: '850.00',
                    jiesuan: '0.00',
                    youhui: [
                        '50','200','150','30'
                    ]  
                },
                {
                    id: 'DD10171001SY00001',
                    time: '周大福《乘风破浪》阿正同款18k金戒指...等3种商品',
                    storeName: '18233052568',
                    proName: '1000.00',
                    uesrName: '-100',
                    uesrPhone: '0.00',
                    status: '900.00',
                    shouru: '850.00',
                    yishou: '850.00',
                    jiesuan: '0.00',
                    youhui: [
                        '100','200','150','30'
                    ] 
                }],
                form: {
                    name: '',
                    number: '',
                    startTime: '',
                    endTime: ''
                },
                value1: '',
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
                console.log(typeof cell.className);
                console.log(typeof cell)
            }
        }   
    }

</script>

<style lang='scss'>
    .profit{
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
        .detail-row{
            background: #F5F7FA;
            height:40px;
            line-height:40px;
            padding-left:10px;
        }
        .table-con{
            margin-top: 20px;
            .store-count,.platform-count{
                p{
                    font-size: 14px;
                    color: #333333;
                }
                p:nth-of-type(n+2){
                    font-size: 12px;
                    color: #666666;
                    text-align: left;
                }
            }
        }
    }
</style>