<template>
    <section class="search" v-if="$route.name=='售后订单查询'">
        <el-row class='search-row1'>
            <span>买家手机</span>
            <el-input v-model="form.userPhone" class='w180' placeholder='请输入手机号码' @blur="phoneIsRight"></el-input>
            <span>订单类型</span>
            <el-select v-model="form.typeCheck" class='w180'>
                <el-option v-for="item in form.orderType" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span>售后进度</span>
            <el-select v-model="form.planCheck" placeholder="活动状态" class='w180'>
                <el-option v-for="item in form.orderPlan" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span>订单编号</span>
            <el-input v-model="form.orderNumber" class='w180' placeholder='请输入订单号'></el-input>
            <span>申请售后时间</span>
            <el-date-picker type="date" v-model="form.startTime" class='w120' @change="chooseTime"></el-date-picker>
            <span>—</span>
            <el-date-picker type="date" v-model="form.endTime" class='w120' @change="chooseTime"></el-date-picker>
            <el-button type="primary" class='search-btn'>查询</el-button>
        </el-row>
        <el-table :data="tableData" class='table-con' align='center' :row-style="{height:'100px'}">
            <el-table-column prop="id" label="订单号" align='center'></el-table-column>
            <el-table-column prop="time" label="下单时间" align='center'></el-table-column>
            <el-table-column prop="storeName" label="商品名称" align='center'></el-table-column>
            <el-table-column prop="proName" label="用户昵称" align='center'></el-table-column>
            <el-table-column prop="uesrName" label="用户手机号" align='center'></el-table-column>
            <el-table-column prop="uesrPhone" label="售后状态" align='center'></el-table-column>
            <el-table-column label="操作" align='center'>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" style="color: #45cdb6">处理完成</el-button>
                    <el-button @click="searchDetail(scope.$index, scope.row)" type="text" size="small">查看详情</el-button>
                  </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="sizes, prev, pager, next, jumper,total" :total="100">
                </el-pagination>
        </div>
    </section>
    <section v-else><router-view></router-view></section>
</template>

<script>
    export default {
        data() {
            return {
                onRight: false,
                autoClick: false,
                form: {
                    userPhone: '',
                    typeCheck: 'quanBu',
                    planCheck: 'quanBu',
                    orderType: [
                            {label: '全部', value: 'quanBu'},
                            {label: '全款订单', value: 'quanKuan'},
                            {label: '定金订单', value: 'dingJin'},
                            {label: '点券订单', value: 'dianQuan'},
                            {label: '现金券订单', value: 'xianJinQuan'}
                    ],
                    orderPlan:[
                            {label: '全部', value: 'quanBu'},
                            {label: '未处理', value: 'weiChiLi'},
                            {label: '已处理', value: 'yiChuLi'},
                            {label: '售后完成', value: 'wanCheng'}
                    ],
                    orderNumber: '',
                    startTime: '',
                    endTime: ''
                },
                tableData: [
                {
                    id: '16544',
                    time: '2017-09-11 12:22',
                    storeName: '周大福',
                    proName: '周大福《乘风破浪》阿正同款18k金戒指3种商品',
                    uesrName: '芙兰朵露',
                    uesrPhone: '15256666299',
                    status: '待发货'
                },
                 {
                    id: '16544',
                    time: '2017-09-11 12:22',
                    storeName: '周大福',
                    proName: '周大福《乘风破浪》阿正同款18k金戒指3种商品',
                    uesrName: '芙兰朵露',
                    uesrPhone: '15256666299',
                    status: '待发货'
                }]
            }
        },
        created(){
        },
        methods: {
            /*手机号校验*/
            phoneIsRight(){
                let self = this;
                let flag = /^1[0-9]{10}$/.test(self.form.userPhone);
                if(!flag){
                    self.form.userPhone = '';
                    self.warn('请输入正确的手机号')
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            searchDetail(row) {
                var self = this;
                self.$router.push('/transaction/service-orders/service-detail')

            },
            handleClick(row) {

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
        padding: 40px;
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
        .search-row1{
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