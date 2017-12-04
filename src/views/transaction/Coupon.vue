<template>
    <section class="coupon-con">
         <el-row class='search-row'>
            <el-input v-model="form.orderNumber" class='w180' placeholder='订单编号'></el-input>
            <el-input v-model="form.userPhone" class='w180 ml10' @blur='numberIsRight(1)' placeholder='买家手机号'></el-input>
            <el-select v-model="form.planCheck" placeholder="核销进度" class='w180 ml10'>
                <el-option v-for="item in form.orderPlan" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-input v-model="form.cashNumber" class='w180 ml10' placeholder='点券编号' @blur='numberIsRight(2)'></el-input>
            <el-date-picker type="date" v-model="form.startTime" class='w120 ml10' @change='chooseTime' placeholder='生成日期'></el-date-picker>
            <span class="span-sty">—</span>
            <el-date-picker type="date" v-model="form.endTime" class='w120' @change='chooseTime' placeholder='生成日期'></el-date-picker>
            <el-button type="primary" class='search-btn' @click="searchParams">查询</el-button>
        </el-row>
        <el-table :data="tableData" class='table-con' align='center' :row-style="{height:'100px'}">
            <el-table-column prop="orderSerialNumber" label="订单编号" align='center'></el-table-column>
            <el-table-column prop="userVoucherNumber" label="点券编号" align='center'></el-table-column>
            <el-table-column label="生成时间" align='center'>
                <template slot-scope="scope">
                    <div>{{switchTime(scope.row.createdAt)}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="productTitle" label="商品名称" align='center'></el-table-column>
            <el-table-column prop="infoTelephone" label="用户手机号" align='center'></el-table-column>
            <el-table-column label="已核销" align='center' >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="bottom" popper-class='pop-time'>
                        <p v-for="item in scope.row.voucherRecordList"><i class="el-icon-time"></i>{{ switchTime(item) }}</p>
                        <div slot="reference">
                            <el-tag>{{ scope.row.voucherUseTimes }}</el-tag>
                        </div>
                    </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="voucherTimes" label="总次数" align='center'></el-table-column>
        </el-table>
        <div class="block" v-if="total > pageSize">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 50, 100]" :page-size="pageSize" layout="sizes, prev, pager, next, jumper,total" :total="total">
            </el-pagination>
        </div>
    </section>
</template>

<script>
    import { cashList } from '@/api/ordersApi';
    export default {
        data() {
            return {
                tableData: [],
                currentPage: 1,
                pageSize: 20,
                total: null,
                form: {
                    orderNumber: null,
                    userPhone: null,
                    planCheck: '',
                    orderPlan: [
                            {label: '全部', value: -1},
                            {label: '未核销', value: 0},
                            {label: '核销中', value: 1},
                            {label: '核销完成', value: 2}
                    ],
                    cashNumber: null,
                    startTime: null,
                    endTime: null
                }
            }
        },
        created(){
            let self = this,
                params = {
                    storeId: config.storeId,
                    page: 1,
                    size: 20,
                    voucherStatus: -1   
                };
            self.getTableData(params)
        },
        methods: {
            /*手机号和数字校验*/
            numberIsRight(a){
                let self = this;
                let flag = /^1[0-9]{10}$/.test(self.form.userPhone);
                if(!flag && self.form.userPhone && a == 1){
                    self.form.userPhone = '';
                    self.warn('请输入正确的手机号')
                    return false;
                }
                if(a != 1 && self.form.orderNumber){
                    self.form.orderNumber = '';
                    self.warn('请输入正确的订单号')
                    return false;
                }
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
            searchParams(){
                let self = this;
                self.getTableData(self.getParams())
            },
            /*获取参数*/
            getParams(){
                let self = this,params = {};
                params.storeId = config.storeId;
                params.userMobile = self.form.userPhone;
                params.userVoucherId = self.form.cashNumber;
                params.voucherFromOrder = self.form.orderNumber;
                params.voucherStatus = self.form.planCheck === '' ? -1 : self.form.planCheck;
                params.createBeginTime = self.form.startTime ? self.timeFormat(self.form.startTime) : null;
                params.createEndTime = self.form.endTime ? self.timeFormat(self.form.endTime) + " 23:59:59" : null;
                params.pageNum = self.currentPage;
                params.pageSize = self.pageSize;
                return params;
            },
            /*获取页面数据*/
            getTableData(obj){
                let self = this;
                cashList(obj).then(res => {
                    if(res.data.data.list){
                        self.tableData = res.data.data.list;
                        self.total = Number(res.data.data.total);
                    }
                })
            },
            handleSizeChange(val) {
                let self = this;
                self.pageSize = val
                self.getTableData(self.getParams())
            },
            handleCurrentChange(val) {
                let self = this;
                self.currentPage = val
                self.getTableData(self.getParams())
            },
            /*消息警告*/
            warn(str){
                this.$message({
                    message: str,
                    type: 'warning'
                })
            },
            /*时间戳转换*/
            switchTime(val){
                function add0(m){return m<10?'0'+m:m }
                let time = new Date(val),
                    y = time.getFullYear(),
                    m = time.getMonth()+1,
                    d = time.getDate(),
                    h = time.getHours(),
                    mm = time.getMinutes(),
                    s = time.getSeconds();
                return y+'/'+add0(m)+'/'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
            },
            /*格式化时间*/
            timeFormat(time){
                let m = (time.getMonth() + 1) > 9 ? time.getMonth() + 1 : '0' +  (time.getMonth() + 1),
                    d = time.getDate() > 9 ? time.getDate()  : '0' +  time.getDate();
                let cTime = time.getFullYear() + '-' + m + '-' + d;
                return cTime;
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
        margin-top: -10px;
        box-sizing: border-box !important;
        $color: #45cdb6;
        .w180{
            width: 180px;
            margin: 10px 10px 0 0;
        }
        .w120{
            width:120px;
            margin: 10px 10px 0 0;            
        }
        .search-row{
            .span-sty{
                font-size:14px;
                color:#666;
                margin-right:10px;
            }
            .search-btn{
                margin-top: 10px;
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
                    span.el-tag{
                        background: none;
                        color: $color;
                        cursor: pointer;
                    }
                }
            }
            .cell span{
                font-size: 14px;
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