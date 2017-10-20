<template>
    <section class="search" v-if="$route.name=='售后订单查询'">
        <el-row class='search-row1'>
            <span>用户手机号</span>
            <el-input v-model="form.name" class='w180' placeholder='请输入手机号码'></el-input>
            <span>订单状态</span>
            <el-select v-model="value1" placeholder="活动状态" class='w180'>
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span>售后状态</span>
            <el-select v-model="value1" placeholder="活动状态" class='w180'>
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span>订单号</span>
            <el-input v-model="form.number" class='w180' placeholder='请输入订单号'></el-input>
            <span>申请售后时间</span>
            <el-date-picker type="date" v-model="form.startTime" class='w120'></el-date-picker>
            <span>—</span>
            <el-date-picker type="date" v-model="form.endTime" class='w120'></el-date-picker>
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
                <template scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" style="color: #45cdb6">处理完成</el-button>
                    <el-button @click="searchDetail(scope.$index, scope.row)" type="text" size="small">查看详情</el-button>
                  </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="sizes, prev, pager, next, jumper,total" :total="100">
                </el-pagination>
        </div>
    </section>
    <section v-else><router-view></router-view></section>
</template>

<script>
    export default {
        data() {
            return {
                addresDialog: {
                    width: '500px',
                },
                onRight: false,
                autoClick: false,
                dialogFormVisible: false,
                form: {
                    name: '',
                    number: '',
                    startTime: '',
                    endTime: ''
                },
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
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
                }],
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
            changeType() {
                var self = this;
                self.onRight = !self.onRight;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            searchDetail(row) {
                var self = this;
                self.$router.push('/transaction/orders/service-detail')

            },
            handleClick(row) {

            }
        }   
    }

</script>

<style lang="scss">
    *{
        box-sizing: border-box !important;
    }
    $color: #45cdb6;
    .search {
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