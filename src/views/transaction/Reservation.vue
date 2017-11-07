<template>
    <section class="coupon-con" v-if="$route.name=='结算管理'">
         <el-row class='search-row'>
            <el-input v-model="form.orderNumber" class='w180' placeholder='订单编号'></el-input>
            <el-date-picker type="date" v-model="form.startTime" class='w120' @change='chooseTime' placeholder='创建时间'></el-date-picker>
            <span>—</span>
            <el-date-picker type="date" v-model="form.endTime" class='w120' @change='chooseTime' placeholder='创建时间'></el-date-picker>
            <el-button type="primary" class='search-btn' @click="searchParams">查询</el-button>
        </el-row>
        <el-table :data="tableData" class='table-con' align='center' :row-style="{height:'100px'}">
            <el-table-column label="订单编号" align='center'>
                <template slot-scope="scope">
                    <div @click='directionGo(scope.row)'>{{scope.row.serialNumber}}</div>    
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" align='center'></el-table-column>
            <el-table-column prop="buyerPhone" label="买家手机" align='center'></el-table-column>
            <el-table-column prop="orderTotalMoney" label="订单金额" align='center'></el-table-column>
            <el-table-column prop="storePrivilege" label="商家优惠" align='center'></el-table-column>
            <el-table-column prop="platformSubsidy" label="平台补贴" align='center' ></el-table-column>
            <el-table-column prop="userCost" label="用户实付" align='center'></el-table-column>
            <el-table-column prop="platformCommission" label="平台分润" align='center'></el-table-column>
            <el-table-column prop="storeIncome" label="商家总收入" align='center'></el-table-column>
            <el-table-column prop="settledAmount" label="已收入金额" align='center'></el-table-column>
            <el-table-column prop="settleAmount" label="结算金额" align='center'></el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20,50,100]" :page-size="pageSize" layout="sizes, prev, pager, next, jumper,total" :total="total">
                </el-pagination>
        </div>
    </section>
    <section v-else><el-row><router-view></router-view></el-row></section>
</template>

<script>
    import {accountList } from '@/api/ordersApi'
    export default {
        data() {
            return {
                total: 0,
                pageSize: 20,
                currentPage: 1,
                tableData: [],
                form: {
                    orderNumber: '',
                    startTime: '',
                    endTime: ''
                }
            }
        },
        created(){
            let params = {
                pageNum: 1,
                pageSize: 20,
                storeId: config.storeId
            }
            this.getData(params)
        },
        methods: {
            /*日期选择限制*/
            chooseTime(){
                let self = this;
                let sTime = Date.parse(self.form.startTime);
                let eTime = Date.parse(self.form.endTime);
                if(sTime > eTime){
                    self.form.endTime = '';
                    self.warn('不可小于查询起始时间')
                }
            },
            /*格式化时间*/
            timeFormat(time){
                let m = (time.getMonth() + 1) > 9 ? time.getMonth() + 1 : '0' +  (time.getMonth() + 1),
                    d = time.getDate() > 9 ? time.getDate()  : '0' +  time.getDate();
                let cTime = time.getFullYear() + '-' + m + '-' + d;
                return cTime;
            },
            /*查询结算列表*/
            searchParams(){
                this.getData(this.getParams());
            },
            /*获取参数*/
            getParams(){
                let self = this,params = {};
                params.storeId = config.storeId;
                params.orderNumber = self.form.orderNumber == '' ? null : self.form.orderNumber;
                params.startDate = self.form.startTime == '' ? null : self.timeFormat(self.form.startTime);
                params.endDate = self.form.endTime == '' ? null : self.timeFormat(self.form.endTime);
                params.pageNum = self.currentPage;
                params.pageSize = self.pageSize;
                return params;
            },
            /*从接口获取数据*/
            getData(obj){
                let self = this;
                accountList(obj).then(res => {
                    let moc = res.data
                    if(!moc.data){
                        this.tableData = [];
                        this.total = 0;
                        return false;
                    }
                    this.total = Number(moc.data.total);
                    this.tableData = moc.data.list
                })
            },
            /*页面条数*/
            handleSizeChange(val) {
                let self = this;
                self.pageSize = val
                self.getData(self.getParams())
            },
            /*页面页数*/
            handleCurrentChange(val) {
                let self = this;
                self.pageSize = val
                self.getData(self.getParams())
            },
            directionGo(row){
                var self = this,
                    orderId = row.orderStoreId;
                self.$router.push(`/transaction/reservation/reservation-detail?orderId=${orderId}`)
            },
            /*消息警告*/
            warn(str){
                this.$message({
                    message: str,
                    type: 'warning'
                })
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
            >div:nth-of-type(2){
                margin-left:20px;
            }
            >span{
                font-size:14px;
                color:#666666;
                margin: 0 10px;
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