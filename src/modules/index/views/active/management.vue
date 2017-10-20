<template>
    <section class="table-container" v-if='$route.name=="活动管理"'>
       <el-tabs v-model="activeName2" type="card" active-name='first'>
            <el-tab-pane label="店铺活动" name="first">
                <el-row class='search'>
                    <el-select v-model="value1" placeholder="活动状态" style='width:120px'>
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="value2" placeholder="营销工具" style='width:120px;margin-left:20px;'>
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input v-model="name" placeholder='输入活动名称/ID查询' class='search-input'></el-input>
                    <el-button type="primary" class='search-btn'>查询</el-button>
                </el-row>
                <el-table :data="tableData" class='table-con' align='center' :row-style="{height:'100px'}">
                    <el-table-column prop="id" label="活动ID" align='center'></el-table-column>
                    <el-table-column prop="name" label="活动名称" align='center'></el-table-column>
                    <el-table-column prop="tool" label="营销工具" align='center'></el-table-column>
                    <el-table-column prop="timeOn" label="活动时间" align='center'></el-table-column>
                    <el-table-column prop="timeCreate" label="创建时间" align='center'></el-table-column>
                    <el-table-column prop="status" label="活动状态" align='center'></el-table-column>
                    <el-table-column label="操作" align='center'>
                        <template scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small" style="color: #45cdb6">编辑</el-button>
                          </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="sizes, prev, pager, next, jumper,total" :total="100">
                    </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="平台活动" name="second">
                <el-row class='search'>
                    <el-select v-model="value1" placeholder="活动状态" style='width:120px'>
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="value2" placeholder="营销工具" style='width:120px;margin-left:20px;'>
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="value2" placeholder="营销工具" style='width:120px;margin-left:20px;'>
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input v-model="name" placeholder='输入活动名称/ID查询' class='search-input'></el-input>
                    <el-button type="primary" class='search-btn'>查询</el-button>
                </el-row>
                <el-table :data="tableData" class='table-con' align='center' :row-style="{height:'100px'}">
                    <el-table-column prop="id" label="活动ID" align='center'></el-table-column>
                    <el-table-column prop="name" label="活动名称" align='center'></el-table-column>
                    <el-table-column prop="tool" label="营销工具" align='center'></el-table-column>
                    <el-table-column prop="timeOn" label="活动时间" align='center'></el-table-column>
                    <el-table-column prop="timeCreate" label="创建时间" align='center'></el-table-column>
                    <el-table-column prop="status" label="活动状态" align='center'></el-table-column>
                    <el-table-column label="操作" align='center'>
                        <template scope="scope">
                            <el-button @click="directGo(scope.row)" type="text" size="small" style="color: #45cdb6">编辑</el-button>
                          </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="sizes, prev, pager, next, jumper,total" :total="100">
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
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                name: '',
                activeName2: '',
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
                options2: [{
                    value: '4',
                    label: '营销工具'
                }, 
                {
                    value: '5',
                    label: '现金券'
                }],
                value1: '',
                value2: '',
                tableData: [
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
                    status: '进行中'
                }]
            }
        },
        created(){
        },
        methods: {
            handleClick(row) {
                // console.log(row);
                var self = this;
                self.$router.push('/marketing-center/tool/create');
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            directGo(row) {
                var self = this;
                self.$router.push('/marketing-center/management/attend');
            }
        }   
    }

</script>

<style scoped lang="scss">
    $color: #45cdb6;
    .table-container {
        width: 100%;
        float: left;
        padding-top: 20px;
    }
    .el-col {
        padding: 20px 20px;
    }
    .el-tabs__item.is-active{
        color: #f00;
    }
    .search{
        margin-top: 10px;
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
        margin-top: 20px;
        text-align: center;
    }
    .block{
        margin-top:30px;
        float: right;
    }
</style>