<template>
    <section class="profit">
        <el-row class='detail-row'>
            <el-col :span='5'>订单编号：{{form.serialNumber}}</el-col>
            <el-col :span='5'>买家：{{form.buyerPhone}}</el-col>
            <el-col :span='5'>是否展会订单：否</el-col>
        </el-row>
        <el-table :data="tableData" class='table-con' align='center' :row-style="{height:'100px'}">
            <el-table-column prop="createdAt" label="时间" align='center'></el-table-column>
            <el-table-column prop="productName" label="商品名称" align='center'></el-table-column>
            <el-table-column prop="productNum" label="数量" align='center'></el-table-column>
            <el-table-column prop="orderTotalMoney" label="订单金额" align='center'></el-table-column>
            <el-table-column label="商家优惠" align='center'>
                <template slot-scope="scope">
                    <div class="store-count">
                        <p>-{{scope.row.storePrivilege}}</p>
                        <p v-for="item in scope.row.proPri">{{item.mes}}：-￥{{item.count}}</p>
                    </div>
                    <!-- <div class="platform-count"></div> -->
                </template>
            </el-table-column>
            <el-table-column prop="platformSubsidy" label="平台补贴" align='center'>
                 <!-- <template slot-scope="scope">
                    <div class="platform-count">
                        <p>-100.00</p> -->
                       <!--  <p>会员节优惠：-￥{{scope.row.youhui[0]}}</p>
                        <p>商家现金券：-￥{{scope.row.youhui[1]}}</p> -->
                    <!-- </div>
                </template> -->
            </el-table-column>
            <el-table-column prop="userCost" label="用户实付" align='center' ></el-table-column>
            <el-table-column prop="platformCommission" label="平台分润" align='center'></el-table-column>
            <el-table-column prop="storeIncome" label="商家总收入" align='center'></el-table-column>
            <el-table-column prop="settledAmount" label="已收入金额" align='center'></el-table-column>
            <el-table-column prop="settleAmount" label="结算金额" align='center'></el-table-column>
        </el-table>
    </section>
</template>

<script>
    import {accountDetail} from '@/api/ordersApi';
    export default {
        data() {
            return {
                tableData: null,
                form: {},
                value1: '',
            }
        },
        created(){
            let orderId = this.$route.query.orderId;
            accountDetail({orderStoreId: orderId}).then( res => {
                this.form = res.data.data;
                this.tableData = res.data.data.accountProductList;
                for(let i=0; i<this.tableData.length; i++){
                    let that = this.tableData[i];
                    that.proPri = [];
                    for(let key in that.privileges){
                        let money = {mes: key,count: that.privileges[key]}
                        that.proPri.push(money)
                    }
                }
            })
        },
        methods: {
           
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