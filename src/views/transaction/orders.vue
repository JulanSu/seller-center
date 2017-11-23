<template>
    <section class="search" v-if="$route.name=='订单查询'">
        <el-row class='search-row'>
            <el-input v-model="form.userPhone" class='w180' placeholder='请输入手机号码' :maxlength='11' @blur="numberIsRight(1)"></el-input>
            <el-select v-model="form.typeCheck" placeholder="订单类型" class='w180' @change="changeOrder">
                <el-option v-for="item in form.orderType" :key="item.orderId" :label="item.orderName" :value="item.orderId"></el-option>
            </el-select>
            <el-select v-model="form.statusCheck" placeholder="订单状态" class='w180'>
                <el-option v-for="item in form.orderStatus" :key="item.statusId" :label="item.label" :value="item.statusId"></el-option>
            </el-select>
            <el-input v-model="form.orderNumber" class='w180' placeholder='请输入订单号'  @blur="numberIsRight(2)"></el-input>
            <el-date-picker type="date" v-model="form.startTime" class='w120' @change='chooseTime' placeholder='订单时间'></el-date-picker>
            <span>—</span>
            <el-date-picker type="date" v-model="form.endTime" class='w120' @change='chooseTime' placeholder='订单时间'></el-date-picker>
            <el-button type="primary" class='search-btn' @click='searchParams'>查询</el-button>
        </el-row>
        <el-table :data="tableData" class='table-con' align='center' :row-style="{height:'100px'}">
            <el-table-column prop="serialNumber" label="订单号" align='center'></el-table-column>
            <el-table-column prop="orderTime" label="下单时间" align='center'></el-table-column>
            <el-table-column prop="pName" label="商品名称" align='center'></el-table-column>
            <el-table-column prop="infoName" label="买家昵称" align='center'></el-table-column>
            <el-table-column prop="infoTelephone" label="买家手机号" align='center'></el-table-column>
            <el-table-column prop="orderStoreStatus" label="状态" align='center'></el-table-column>
            <el-table-column label="操作" align='center'>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" style="color: #45cdb6" v-if="scope.row.orderStoreStatus == '待发货' && scope.row.orderType == 1">去发货</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
                  </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 50, 100]" :page-size="pageSize" layout="sizes, prev, pager, next, jumper,total" :total="total">
                </el-pagination>
        </div>
    </section>
    <section v-else><router-view></router-view></section>
</template>

<script>
    import {orderStatus, orderStore } from '@/api/ordersApi'
    export default {
        data() {
            return {
                total: null,
                pageSize: 20,
                currentPage: 1,
                form: {
                    userPhone: '',
                    typeCheck: '',
                    statusCheck: '',
                    orderType: [
                        {orderId: null, orderName: '全部'}
                    ],
                    orderStatus:[],
                    statusArr: [
                        {id: null, status:[
                            {label: '全部', statusId: null},
                            {label: '待用户支付', statusId: 1},
                            {label: '待发货', statusId: 2},
                            {label: '待用户收货', statusId: 3},
                            {label: '待用户自提', statusId: 3.1},
                            {label: '待用户核销', statusId: 3.2},
                            {label: '交易成功', statusId: 4},
                            {label: '待商家处理', statusId: 6},
                            {label: '待平台审核', statusId: 7},
                            {label: '售后完成', statusId: 8},
                            {label: '订单关闭', statusId: 5},

                        ]},
                        {id: 1, status:[                        //全款
                            {label: '全部', statusId: null},
                            {label: '待用户支付', statusId: 1},
                            {label: '待发货', statusId: 2},
                            {label: '待用户收货', statusId: 3},
                            {label: '待用户自提', statusId: 3.1},  
                            {label: '交易成功', statusId: 4},
                            {label: '待商家处理', statusId: 6},
                            {label: '待平台审核', statusId: 7},
                            {label: '售后完成', statusId: 8},
                            {label: '订单关闭', statusId: 5},

                        ]},
                        {id: 2, status:[                        //定金
                            {label: '全部', statusId: null},
                            {label: '待用户支付', statusId: 1},
                            {label: '待发货', statusId: 2},
                            {label: '待用户核销', statusId: 3},
                            {label: '交易成功', statusId: 4},
                            {label: '待商家处理', statusId: 6},
                            {label: '待平台审核', statusId: 7},
                            {label: '售后完成', statusId: 8},
                            {label: '订单关闭', statusId: 5},

                        ]},
                        {id: 3, status:[                        //点券
                            {label: '全部', statusId: null},
                            {label: '待用户支付', statusId: 1},
                            {label: '待发货', statusId: 2},
                            {label: '交易成功', statusId: 34},
                            {label: '待商家处理', statusId: 6},
                            {label: '待平台审核', statusId: 7},
                            {label: '售后完成', statusId: 8},
                            {label: '订单关闭', statusId: 5},

                        ]},
                        {id: 4, status:[
                            {label: '全部', statusId: null},      //现金券
                            {label: '待用户支付', statusId: 1},
                            {label: '待发货', statusId: 2},
                            {label: '待用户收货', statusId: 3},
                            {label: '交易成功', statusId: 4},
                            {label: '订单关闭', statusId: 5},
                        ]}
                    ],
                    orderNumber: '',
                    startTime: '',
                    endTime: ''
                },
                tableData: [],
                value1: ''
            }
        },
        beforeCreate(){
            
        },
        created(){ 
            /*获取订单类型和状态*/
            orderStatus().then(res => {
                if(res.data.data){
                    this.form.orderType = [...this.form.orderType,...res.data.data];
                    this.form.orderStatus = [...this.form.statusArr[0].status]
                }
            })
            /*获取商家全部订单*/
            this.getTableData({storeId: config.storeId, pageNum: 1, pageSize: 20})
        },
        methods: {
            /*订单类型变化*/
            changeOrder(){
                let self = this;
                for(let i=0; i<self.form.statusArr.length; i++){
                    let that = self.form.statusArr[i];
                    if(that.id == self.form.typeCheck){
                        self.form.orderStatus = that.status;
                    }
                }
                self.form.statusCheck = null;
            },
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
            /*订单状态转换*/
            switchStatus(a) {
                let st = ''
                switch(a) {
                    case 1:st = '待用户支付'; break;
                    case 2:st = '待发货';break;
                    case 3:st = '待用户收货';break;
                    case 4:st = '交易成功';break;
                    case 5:st = '订单关闭';break;
                    case 6:st = '待商家处理';break;
                    case 7:st = '待平台审核';break;
                    case 8:st = '售后完成';break;
                    case 9:st = '取消售后';break;
                    
                }
                return st;
            },
            /*手机号和数字校验*/
            numberIsRight(a){
                let self = this;
                let flag = /^1[0-9]{10}$/.test(self.form.userPhone);
                if(!flag && self.form.userPhone != '' && a == 1){
                    self.form.userPhone = '';
                    self.warn('请输入正确的手机号')
                    return false;
                }
            },
            /*根据条件查询*/
            searchParams(){
                let self = this;
                self.getTableData(self.getParams())
            },
            /*格式化时间*/
            timeFormat(time){
                let m = (time.getMonth() + 1) > 9 ? time.getMonth() + 1 : '0' +  (time.getMonth() + 1),
                    d = time.getDate() > 9 ? time.getDate()  : '0' +  time.getDate();
                let cTime = time.getFullYear() + '-' + m + '-' + d;
                return cTime;
            },
            /*获取参数*/
            getParams(){
                let self = this,params = {};
                params.storeId = config.storeId;
                params.infoTelephone = self.form.userPhone == '' ? null : self.form.userPhone;
                params.orderStoreType = self.form.typeCheck == '' ? null : self.form.typeCheck
                if(self.form.statusCheck == undefined){
                    params.orderStoreStatus = null
                }else{
                    if(self.form.typeCheck == 3 && self.form.statusCheck == 34){
                        params.orderStoreStatus = [...[3,4]]
                    }else{
                        if(self.form.statusCheck != ''){
                            params.orderStoreStatus = [];
                            params.orderStoreStatus.push(parseInt(self.form.statusCheck))
                        }else{
                            params.orderStoreStatus = null; 
                        }
                    }
                }
                params.orderNumber = self.form.orderNumber == '' ? null : self.form.orderNumber;
                params.orderStartTime = self.form.startTime == '' ? null : self.timeFormat(self.form.startTime);
                params.orderEndTime = self.form.endTime == '' ? null : self.timeFormat(self.form.endTime);
                params.pageNum = self.currentPage;
                params.pageSize = self.pageSize;
                return params;
            },
            /*获取页面数据*/
            getTableData(obj){
                let self = this;
                orderStore(obj).then(res => {
                    let moc = res.data
                    if(!moc.data){
                        this.tableData = [];
                        this.total = 0;
                        return false;
                    }
                    if(moc.data.list){
                       for(let i=0; i<moc.data.list.length; i++) {
                            let that = moc.data.list[i];
                            that.pName = self.textSubstr(that.productNames.join(''), that.productNames.length);
                            that.orderStoreStatus = this.switchStatus(that.orderStoreStatus)
                        }
                    } 
                    this.total = Number(moc.data.total);
                    this.tableData = moc.data.list
                })
            },
             /*字数控制*/
            textSubstr(a, len){
                if(a.length > 20){
                    a = a.substr(0,20) + '...'
                }
                if(len > 1){
                    return a = a + `等${len}件`;
                }else{
                    return a;
                }
            },
            /*页面条数*/
            handleSizeChange(val) {
                let self = this;
                self.pageSize = val
                self.getTableData(self.getParams())
            },
            /*页数更改*/
            handleCurrentChange(val) {
                let self = this;
                self.currentPage = val;
                self.getTableData(self.getParams())
            },
            handleClick(row) {
                let self = this,
                    orderId = row.orderStoreId;
                    self.$router.push(`/transaction/orders/order-detail?orderId=${orderId}` )
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

<style lang="scss">
    .search {
        *{
            box-sizing: border-box !important;
        }
        $color: #45cdb6;
        width: 100%;
        float: left;
        box-sizing: border-box !important;
        p{
            margin: 0;
            padding: 0;
        }
        .w180{
            width: 180px;
        }
        .w120{
            width:120px;
        }
        .search-row{
            >div:nth-of-type(n+2){
                margin-left: 10px;
            }
            >span{
                font-size:14px;
                color:#666666;
                margin-left: 10px;
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
            margin-top: 40px;
        }
        .block{
            float: right;
        }
        .addres-dialog{
            width: 490px;
            height: 370px;
            .el-dialog__header{
                padding: 0 20px;
                height: 50px;
                line-height: 50px;
                box-shadow: inset 0 -1px 0 0 #DDDDDD;
                .el-dialog__title{
                    font-size: 14px;
                    color: #333333;
                    font-weight: 400;
                }
                .el-dialog__headerbtn{
                    padding-top:15px;
                    font-size: 14px;
                }
            }
            .el-dialog__body{
                padding: 0;
                .send-type,.btn-row{
                    margin-top: 30px;
                    display: flex;
                    align-items: center;
                    justify-content:center;
                    div{
                        width: 90px;
                        height: 34px;
                        border: 1px solid #CCCCCC;
                        font-size: 14px;
                        color: #666666;
                        text-align:center;
                        line-height: 34px;
                        cursor: pointer;
                    }
                    div:nth-of-type(2){
                        margin-left:30px;
                    }
                    .click-on{
                        border: 1px solid $color;
                        color: $color;
                    } 
                }
                .textarea-row{
                    width:370px;
                    height:100px;
                    margin: 30px auto 0;
                    textarea{
                        width: 100%;
                        height: 100%;
                    }
                }
                .input-row{
                    padding-left:55px;
                    margin-top:30px;
                    span{
                        margin-right: 10px;
                    }
                    input{
                        width: 290px;
                        height: 40px;
                        border: 1px solid #CCCCCC;
                    }
                }
                .input-row:nth-of-type(3){
                   margin-top: 20px;
                }
                .btn-row{
                    margin-top: 40px;
                    .send-sure{
                        color:#fff;
                        background: $color;
                        border: none;
                    }
                }
            }
        }
    }
</style>