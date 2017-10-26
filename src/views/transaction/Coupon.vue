<template>
    <section class="coupon-con">
         <el-row class='search-row'>
            <span>订单编号</span>
            <el-input v-model="form.orderNumber" class='w180'></el-input>
            <span>买家手机</span>
            <el-input v-model="form.userPhone" class='w180' @blur='phoneIsRight'></el-input>
            <span>核销进度</span>
            <el-select v-model="form.planCheck" placeholder="活动状态" class='w180'>
                <el-option v-for="item in form.orderPlan" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span>点券编号</span>
            <el-input v-model="form.cashNumber" class='w180'></el-input>
            <span>生成日期</span>
            <el-date-picker type="date" v-model="form.startTime" class='w120' @change='chooseTime'></el-date-picker>
            <span>—</span>
            <el-date-picker type="date" v-model="form.endTime" class='w120' @change='chooseTime'></el-date-picker>
            <el-button type="primary" class='search-btn'>查询</el-button>
        </el-row>
        <el-table :data="tableData" class='table-con' align='center' :row-style="{height:'100px'}">
            <el-table-column prop="id" label="订单编号" align='center'></el-table-column>
            <el-table-column prop="time" label="点券编号" align='center'></el-table-column>
            <el-table-column prop="storeName" label="生成时间" align='center'></el-table-column>
            <el-table-column prop="proName" label="商品名称" align='center'></el-table-column>
            <el-table-column prop="uesrName" label="用户手机号" align='center'></el-table-column>
            <el-table-column prop="uesrPhone" label="已核销" align='center' >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="bottom" popper-class='pop-time'>
                        <p v-for="item in scope.row.xiao"><i class="el-icon-time"></i>{{ item }}</p>
                        <div slot="reference">
                            <el-tag>{{ scope.row.uesrPhone }}</el-tag>
                        </div>
                    </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="总次数" align='center'></el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="sizes, prev, pager, next, jumper,total" :total="100">
                </el-pagination>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [
                {
                    id: 'DD10171001SY00001',
                    time: 'DQ10170930MY00001',
                    storeName: '2017-09-11 12:22',
                    proName: '周大福《乘风破浪》阿正同款18k金戒指3种商品',
                    uesrName: '18668096609',
                    uesrPhone: '5',
                    status: '10',
                    xiao: ['2017-10:-20 10:20' ,'2016-10:-20 10:20','2017-18:-20 10:20']
                },
                {
                    id: 'DD10171001SY00001',
                    time: 'DQ10170930MY00001',
                    storeName: '2017-09-11 12:22',
                    proName: '周大福《乘风破浪》阿正同款18k金戒指3种商品',
                    uesrName: '18668096609',
                    uesrPhone: '5',
                    status: '10',
                    xiao: ['3025-10:-20 10:20' ,'2016-10:-20 10:20']
                }],
                form: {
                    orderNumber: '',
                    userPhone: '',
                    planCheck: 'quanBu',
                    orderPlan: [
                            {label: '全部', value: 'quanBu'},
                            {label: '未核销', value: 'weiHeXiao'},
                            {label: '核销中', value: 'heXiaoZhogn'},
                            {label: '核销完成', value: 'heXiaoWanCheng'}
                    ],
                    cashNumber: '',
                    startTime: '',
                    endTime: ''
                }
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
        box-sizing: border-box !important;
        $color: #45cdb6;
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
                    span.el-tag{
                        background: none;
                        color: $color;
                        cursor: pointer;
                    }
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