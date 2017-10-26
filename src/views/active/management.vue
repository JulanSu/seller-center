<template>
    <section class="table-container" v-if='$route.name=="活动管理"'>
       <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="店铺活动" name="storeActive" class='tab-select'>

                <el-row class='search'>
                    <el-select v-model="statusValue" placeholder="活动状态" style='width:120px'>
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="toolValue" placeholder="营销工具" style='width:120px;margin-left:20px;'>
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input v-model="storeActiveId" placeholder='输入活动名称/ID查询' class='search-input'></el-input>
                    <el-button type="primary" class='search-btn' @click='search1'>查询</el-button>
                </el-row>

                <el-table :data="tableData1" class='table-con' align='center' :row-style="{height:'100px'}">
                    <el-table-column prop="id" label="活动ID" align='center'></el-table-column>
                    <el-table-column prop="name" label="活动名称" align='center'></el-table-column>
                    <el-table-column prop="tool" label="营销工具" align='center'></el-table-column>
                    <el-table-column prop="timeOn" label="活动时间" align='center'></el-table-column>
                    <el-table-column prop="timeCreate" label="创建时间" align='center'></el-table-column>
                    <el-table-column prop="status" label="活动状态" align='center'></el-table-column>
                    <el-table-column label="操作" align='center'>
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small" style="color: #45cdb6">编辑</el-button>
                          </template>
                    </el-table-column>
                </el-table>

                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[20, 30, 50, 100, 150]" :page-size="20" layout="sizes, prev, pager, next, jumper,total" :total="100">
                    </el-pagination>
                </div>

            </el-tab-pane>
            <el-tab-pane label="平台活动" name="platformActive">
                <el-row class='search'>
                    <el-select v-model="platformActiveStatus" placeholder="活动状态" style='width:120px'>
                        <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="platformActiveJoin" placeholder="报名状态" style='width:120px;margin-left:20px;'>
                        <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="platformActiveCheck" placeholder="审核状态" style='width:120px;margin-left:20px;'>
                        <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input v-model="platformActiveId" placeholder='输入活动名称/ID查询' class='search-input'></el-input>
                    <el-button type="primary" class='search-btn' @click='search2'>查询</el-button>
                </el-row>
                <el-table :data="tableData2" class='table-con' align='center' :row-style="{height:'100px'}">
                    <el-table-column prop="id" label="活动ID" align='center'></el-table-column>
                    <el-table-column prop="name" label="活动名称" align='center'></el-table-column>
                    <el-table-column prop="time" label="活动时间" align='center'></el-table-column>
                    <el-table-column prop="order" label="报名状态" align='center'></el-table-column>
                    <el-table-column prop="check" label="审核状态" align='center'></el-table-column>
                    <el-table-column prop="status" label="活动状态" align='center'></el-table-column>
                    <el-table-column label="操作" align='center'>
                        <template slot-scope="scope">
                            <el-button @click="directGo(scope.row)" type="text" size="small" style="color: #45cdb6">编辑</el-button>
                          </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[20, 30, 50, 100, 150]" :page-size="100" layout="sizes, prev, pager, next, jumper,total" :total="100">
                    </el-pagination>
              </div>
            </el-tab-pane>
      </el-tabs>
    </section>
    <section v-else><el-row><router-view></router-view></el-row></section>
</template>
<script>
    export default {
        data() {
            return {
                currentPage4: 1,
                storeActiveId: '',
                activeName: 'storeActive',
                statusValue: '',
                options1: [
                        {value: 'will',label: '未开始'}, 
                        {value: 'doing',label: '进行中'}, 
                        {value: 'done',label: '已结束'}
                ],
                toolValue: '',
                options2: [{value: 'coupon',label: '现金券'}],
                tableData1: [
                {
                    id: '16544',
                    name: '芙兰朵露',
                    tool: '上海市普陀区金沙江路 1518 弄',
                    timeOn: '2017-08-18 00:00 至 2017-08-20 00:00',
                    timeCreate: '2017-08-18 00:00',
                    status: '进行中'
                },
                {
                    id: '16544',
                    name: '芙兰朵露',
                    tool: '上海市普陀区金沙江路 1518 弄',
                    timeOn: '2017-08-18 00:00 至 2017-08-20 00:00',
                    timeCreate: '2017-08-18 00:00',
                    status: '未开始'
                }],
                platformActiveId: '',
                platformActiveStatus:'',
                platformActiveJoin:'',
                platformActiveCheck:'',
                options3: [
                        {value: 'will',label: '未开始'}, 
                        {value: 'doing',label: '进行中'}, 
                        {value: 'done',label: '已结束'}
                ],
                options4: [
                        {value: 'jion',label: '确认参与'}, 
                        {value: 'canJion',label: '未回应'}, 
                        {value: 'noJoin',label: '逾期未回应'}
                ],
                options5: [
                        {value: 'waitCheck',label: '未审核'}, 
                        {value: 'noCheck',label: '审核不通过'}, 
                        {value: 'checked',label: '审核通过'}
                ],
                tableData2: [
                {
                    id: '16544',
                    name: '放飞梦想，看见世界',
                    time: '2017-08-18 00:00 至 2017-08-20 00:00',
                    order: '确认参与',
                    check: '审核通过',
                    status: '已结束'
                },
                {
                    id: '16544',
                    name: '放飞梦想，看见世界',
                    time: '2017-08-18 00:00 至 2017-08-20 00:00',
                    order: '未参与',
                    check: '未审核',
                    status: '进行中'
                },
                {
                    id: '16544',
                    name: '放飞梦想，看见世界',
                    time: '2017-08-18 00:00 至 2017-08-20 00:00',
                    order: '未参与',
                    check: '审核未通过',
                    status: '未开始'
                }]
            }
        },
        created(){
        },
        methods: {
            /*店铺活动搜索*/
            search1(){
                let self = this,
                    postData = {
                        status: self.statusValue,
                        tool: self.toolValue,
                        storeActiveId: self.storeActiveId
                    }
                console.log(postData)
            },
            /*平台活动搜索*/
            search2(){
                
            },
            handleClick(row) {
                // console.log(row);
                let self = this,actStatus;
                row.status == '未开始' ? actStatus = false : actStatus = true;
                self.$router.push({path:'/marketing-center/tool/create', query: {status: actStatus}});
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            directGo(row) {
                let self = this,thref,actStatus;
                thref = row.order == '未参与' ? '/marketing-center/management/attend':'/marketing-center/tool/create';
                actStatus = row.status == '未开始' ? actStatus = false : actStatus = true;
                self.$router.push({path:thref,query: {status: actStatus,}});
            }
        }   
    }

</script>

<style lang="scss">
    $color: #45cdb6;
    .table-container {
        width: 100%;
        float: left;
        padding-top: 20px;
        .el-col {
        padding: 20px 20px;
        }
        .el-tabs__item{
            vertical-align: bottom
        }
        .is-active{
            border-top: 3px solid $color !important;
        }
        .search{
            margin: 20px 0;
            padding: 0;
        }
        .search-input{
            width: 200px;
            margin-left: 20px;
        }
        .search-btn{
            margin-left: 20px;
            width: 60px;
            text-align: center;
            color:#fff;
            font-size:12px;
            background: $color;
            border: none;
        }
        .row-sty{
            color: #f00;
            height: 100px;
        }
        .table-con{
            text-align: center;
        }
        .block{
            margin-top:30px;
            float: right;
        }
    }
</style>