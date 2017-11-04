<template>
    <section class="table-container" v-if='$route.name=="活动管理"'>
       <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="店铺活动" name="storeActive" class='tab-select'>

                <el-row class='search'>
                    <el-select v-model="storeStatus" placeholder="活动状态" style='width:120px'>
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="toolCheck" placeholder="营销工具" style='width:120px;margin-left:20px;'>
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input v-model="storeKeyword" placeholder='输入活动名称/ID查询' class='search-input'></el-input>
                    <el-button type="primary" class='search-btn' @click='searchStore'>查询</el-button>
                </el-row>

                <el-table :data="storeTable" class='table-con' align='center' :row-style="{height:'100px'}">
                    <el-table-column prop="marketingActivityId" label="活动ID" align='center'></el-table-column>
                    <el-table-column prop="activityName" label="活动名称" align='center'></el-table-column>
                    <el-table-column prop="toolsName" label="营销工具" align='center'></el-table-column>
                    <el-table-column label="活动时间" align='center'>
                         <template slot-scope="scope">
                            <div>{{switchTime(scope.row.activityBeginTime)}} 至 {{switchTime(scope.row.activityEndTime)}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" align='center'>
                         <template slot-scope="scope">
                            <div>{{switchTime(scope.row.createdAt)}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="活动状态" align='center'>
                        <template slot-scope="scope">
                            <div>{{switchStoreStatus(scope.row.activityStatus)}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align='center'>
                        <template slot-scope="scope">
                            <el-button @click="storeNextGo(scope.row)" type="text" size="small" style="color: #45cdb6">编辑</el-button>
                          </template>
                    </el-table-column>
                </el-table>

                <div class="block">
                    <el-pagination @size-change="storeSizeChange" @current-change="storeCurrentChange" :current-page="currentPageStore" :page-sizes="[20, 50, 100]" :page-size="pageSizeStore" layout="sizes, prev, pager, next, jumper,total" :total="totalStore">
                    </el-pagination>
                </div>

            </el-tab-pane>
            <el-tab-pane label="平台活动" name="platformActive">
                <el-row class='search'>
                    <el-select v-model="platStatus" placeholder="活动状态" style='width:120px'>
                        <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="signStatus" placeholder="报名状态" style='width:120px;margin-left:20px;'>
                        <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="auditStatus" placeholder="审核状态" style='width:120px;margin-left:20px;'>
                        <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input v-model="platKeyword" placeholder='输入活动名称/ID查询' class='search-input'></el-input>
                    <el-button type="primary" class='search-btn' @click='searchPlat'>查询</el-button>
                </el-row>
                <el-table :data="platTable" class='table-con' align='center' :row-style="{height:'100px'}">
                    <el-table-column prop="marketingActivityId" label="活动ID" align='center'></el-table-column>
                    <el-table-column prop="activityName" label="活动名称" align='center'></el-table-column>
                    <el-table-column label="活动时间" align='center'>
                         <template slot-scope="scope">
                            <div>{{switchTime(scope.row.activityBeginTime)}} 至 {{switchTime(scope.row.activityEndTime)}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="报名状态" align='center'>
                        <template slot-scope="scope">
                            <div>{{switchStatus(scope.row.signStatus).sign}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="审核状态" align='center'>
                        <template slot-scope="scope">
                            <div>{{switchStatus(scope.row.auditStatus).audit}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="活动状态" align='center'>
                        <template slot-scope="scope">
                            <div>{{switchStatus(scope.row.activityStatus).plat}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align='center'>
                        <template slot-scope="scope">
                            <el-button @click="platNextGo(scope.row)" type="text" size="small" style="color: #45cdb6">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination @size-change="platSizeChange" @current-change="platCurrentChange" :current-page="currentPagePlat" :page-sizes="[20,50, 100]" :page-size="pageSizePlat" layout="sizes, prev, pager, next, jumper,total" :total="totalPlat">
                    </el-pagination>
              </div>
            </el-tab-pane>
      </el-tabs>
    </section>
    <section v-else><el-row><router-view></router-view></el-row></section>
</template>
<script>
    import { storeActList, platformActList} from '@/api/toolApi';
    export default {
        data() {
            return {
                activeName: 'storeActive',
                currentPageStore: 1,
                pageSizeStore: 20,
                totalStore: 0,
                storeKeyword: null,
                storeStatus: null,
                toolCheck: null,
                options1: [
                        {value: 0,label: '全部'}, 
                        {value: 3,label: '未开始'}, 
                        {value: 1,label: '进行中'}, 
                        {value: 2,label: '已结束'}
                ],
                options2: [
                        {value: 0,label: '全部'},
                        {value: 1,label: '现金券'}
                        ],  
                storeTable: [],           
                /*平台活动数据*/
                platTable: [],
                currentPagePlat: 1,
                pageSizePlat: 20,
                totalPlat: 0,
                platStatus: null,
                signStatus: null,
                auditStatus: null,
                platKeyword: '',
                options3: [
                    {value: 0,label: '全部'}, 
                    {value: 3,label: '未开始'}, 
                    {value: 1,label: '进行中'}, 
                    {value: 2,label: '已结束'}
                ],
                options4: [
                    {value: 0,label: '全部'}, 
                    {value: 2,label: '确认参与'}, 
                    {value: 1,label: '未回应'}, 
                    {value: 3,label: '逾期未回应'}
                ],
                options5: [
                    {value: 0,label: '全部'},
                    {value: 1,label: '未审核'}, 
                    {value: 2,label: '审核通过'},
                    {value: 3,label: '审核不通过'}
                ]
            }
        },
        created(){
            this.$route.query.name ? this.activeName = this.$route.query.name : '';
            /*获取店铺活动*/
            let params1 = {
                storeId: config.storeId,
                toolsId: 1,
                activityStatus: 0,
                page: 1,
                size: 20
            };
            this.getStoreData(params1)
            /*获取平台活动*/
            let params2 = {
                storeId: config.storeId,
                activityStatus: 0,
                signStatus: 0,
                auditStatus: 0,
                page: 1,
                size: 20
            };
            this.getPlatData(params2)
        },
        methods: {
            /*店铺活动搜索*/
            searchStore(){
                let self = this;
                self.getStoreData(self.getStoreParams())
            },
            getStoreParams(){
                let self = this,
                    params = {
                        storeId: config.storeId,
                        toolsId: 1,
                        activityStatus: self.storeStatus,
                        page: self.currentPageStore,
                        size: self.pageSizeStore,
                        keyword: self.storeKeyword
                    }
                return params;
            },
            getStoreData(obj){
                let self = this;
                storeActList(obj).then(res => {
                    self.storeTable = res.data.data.list;
                    self.totalStore = Number(res.data.data.total)
                    for (let i = 0; i < self.storeTable.length; i++) {
                        self.storeTable[i].activityStatus = self.storeStatusIsOk(self.storeTable[i].activityStatus, self.storeTable[i].activityBeginTime, self.storeTable[i].activityEndTime)
                    }
                })
            },
            storeSizeChange(val) {
                let self = this;
                self.pageSizeStore = val;
                self.getStoreData(self.getStoreParams())
            },
            storeCurrentChange(val) {
                let self = this;
                self.currentPageStore = val;
                self.getStoreData(self.getStoreParams())
            },
            storeNextGo(row){
                let self = this,
                    topParams = {
                        type: 'store',                      //表示店铺活动
                        actStatus: row.activityStatus,      //店铺活动状态
                        actId: row.marketingActivityId      //活动Id
                    }
                self.$router.push({path:'/marketing-center/management/detail',query: topParams})
            },
            /*店铺活动判断*/
            storeStatusIsOk(a, bTime, eTime){
                if(a == 1){
                    return 1;
                }else{
                    let timesTamp = Date.parse(new Date());
                    if(timesTamp < bTime){
                        return 2;
                    }else if(bTime < timesTamp < eTime){
                        return 3;
                    }else{
                        return 4;
                    }
                }
            },
            /*店铺活动状态转化*/
            switchStoreStatus(a){
                switch(a) {
                    case 1: return '已关闭'; break;
                    case 2: return '未开始'; break;
                    case 3: return '进行中'; break;
                    default: return '已结束'; 
                }
            },
            /*平台活动搜索*/
            searchPlat(){
                let self = this;
                self.getPlatData(self.getPlatParams())
            },
            getPlatParams(){
                let self = this,
                    params = {
                        storeId: config.storeId,
                        activityStatus: self.platStatus,
                        signStatus: self.signStatus,
                        auditStatus: self.auditStatus,
                        page: self.currentPagePlat,
                        size: self.pageSizePlat,
                        keyword: self.platKeyword
                    }
                return params;
            },
            getPlatData(obj){
                let self = this;
                platformActList(obj).then(res => {
                    self.platTable = res.data.data.list;
                    self.totalPlat = Number(res.data.data.total)
                    for (let i = 0; i < self.platTable.length; i++) {
                        self.platTable[i].activityStatus = self.storeStatusIsOk(self.platTable[i].activityStatus, self.platTable[i].activityBeginTime, self.platTable[i].activityEndTime)
                    }
                })
            },
            /*平台活动转换*/
            switchStatus(a){
                let st = {};
                switch(a) {
                    case 0:
                        st = {sign: '未回应', audit: '未审核'}
                        break;
                    case 1:
                        st = {plat: '已关闭', sign: '确定参加', audit: '审核通过'}
                        break;
                    case 2:
                        st = {plat: '未开始', sign: '逾期未回应', audit: '审核不通过'}
                        break;
                    case 3:
                        st = {plat: '进行中'}
                        break;
                    case 4:
                        st = {plat: '已结束'}
                        break;
                }
                return st
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
                return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
            },
            platSizeChange(val) {
                let self = this;
                self.pageSizePlat = val;
                self.getPlatData(self.getPlatParams())
            },
            platCurrentChange(val) {
                let self = this;
                self.currentPagePlat = val;
                self.getPlatData(self.getPlatParams())
            },
            platNextGo(row) {
                /**
                 * 跳转平台活动页
                 * 1.活动ID
                 * 2.商家参与状态
                 * 3.审核状态
                 **/  
                let self = this,
                    actId = row.marketingActivityId,
                    signStatus = row.signStatus,
                    auditStatus = row.auditStatus
                self.$router.push({path:'/marketing-center/management/attend',query: {
                    type: 'platform',actId: actId,signStatus: signStatus,auditStatus: auditStatus}});
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