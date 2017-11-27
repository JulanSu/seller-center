<template>
    <section class="profit">
        <el-row class='detail-row'>
            <el-col :span='5'>订单编号：{{form.serialNumber}}</el-col>
            <el-col :span='5'>买家：{{form.buyerPhone}}</el-col>
            <el-col :span='5'>是否展会订单：{{orderType}}</el-col>
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
                        <p v-if='scope.row.storeDetail.val != ""'>{{scope.row.storeDetail.key}}：-{{scope.row.storeDetail.val}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="平台补贴" align='center'>
                <template slot-scope="scope">
                    <div class="store-count">
                        <p>-{{scope.row.platformSubsidy}}</p>
                        <p  v-if='scope.row.platformDetail.val != ""'>{{scope.row.platformDetail.key}}：-{{scope.row.platformDetail.val}}</p>
                    </div>
                </template>
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
                orderType: '',
            }
        },
        created(){
            let orderId = this.$route.query.orderId;
            accountDetail({orderStoreId: orderId}).then( res => {
                this.form = res.data.data;
                this.orderType = this.form.orderStoreType == 1 ? '是' : '否';
                this.tableData = res.data.data.accountProductList;
                for(let i=0; i<this.tableData.length; i++){
                    let that = this.tableData[i];
                    that.storeDetail = that.platformDetail = {key:'',val:''};
                    for(let key in that.privileges){
                        if(that.privileges[key] == that.storePrivilege) {
                            that.storeDetail = {key:key,val:that.privileges[key]}
                        }
                        if(that.privileges[key] == that.platformSubsidy) {
                           that.platformDetail = {key:key,val:that.privileges[key]}
                        }
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
                    text-align: center;
                }
            }
        }
    }
</style>