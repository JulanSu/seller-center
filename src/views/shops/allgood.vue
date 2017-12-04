<template>
  <section  class="all-good" v-loading="listLoading">
    <el-row class='search-row' stylle="min-width:960px"> 
      <el-input v-model="form.productTitle" class='w160' placeholder='请输入商品名称' :maxlength='11' >
      </el-input>
      <el-input v-model="form.goodId" class='w160' placeholder='请输入商品ID' :maxlength='11'>
      </el-input>
      <el-select v-model="form.storeCateId" placeholder="店铺中分类" style="margin-right:10px;">
        <el-option
          v-for="item in form.fenlei"
          :key="item.storeCateId"
          :label="item.cateName"
          :value="item.storeCateId">
        </el-option>
      </el-select>
      <el-date-picker class='wid320'
        v-model="form.searchDate"
        :editable="false"
        type="datetimerange"
        @change="datePickerHandle"
        placeholder="选择日期范围">
      </el-date-picker>
      <el-button type="primary" class='search-btn' @click="findGood">查询</el-button>
    </el-row>
    <!--列表-->
    <el-table :data="datas"  style="width: 100%;"  class="hover-style">
      <el-table-column prop="productId" label="ID" min-width="120" align="center">
      </el-table-column>
      <el-table-column prop="productTitle" label="商品名称" min-width="120" align="center">
      </el-table-column>
      <el-table-column min-width="190" align="center"
            prop="productCoverUrl"
            label="图片">
            <template slot-scope="scope">
              <div class="table-pic">
                <img :src="scope.row.productCoverUrl" />
              </div>
            </template>
          </el-table-column>
      <el-table-column prop="productStatus" :formatter="formatUsed" label="状态" min-width="120" align="center">
      </el-table-column>
      <el-table-column prop="storeCateNameList" :formatter="formatFenlei" label="当前所属分类" min-width="120" align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="120" align="center">
        <template slot-scope="scope">
          <span style="padding:0;" @click="handleBangding(scope.row)">关联</span>
        </template>
      </el-table-column>
    </el-table>

     <!--工具条-->
    <el-col :span="24" class="tool-bar pages-bar" style="margin-top:20px;" v-if="total">
      <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :page-sizes="[20, 50, 100]"
      :current-page="pageNum"
      :page-size="pageSize"
      layout="sizes,prev, pager, next, jumper,total"
      :total="total" style="float:right;">
    </el-pagination>
    </el-col>

    <el-dialog
      v-loading="listLoading"
      title="关联"
      top="30%"
      :visible.sync="dialogVisible1"
      size="tiny">
      <div class="relevanceGood">
        <el-checkbox-group v-model="roleAuthority" class="scorllbar">
          <el-checkbox v-for="item in jurisdiction" :label="item.storeCateId" :key="item.storeCateId">
              {{item.cateName}}
          </el-checkbox>
        </el-checkbox-group> 
      </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addRelevanceBtn">确定</el-button>
          <el-button @click="cancelBtn">取消</el-button>
        </span>
    </el-dialog>
  </section>
</template>

<script>
import { cateList,productListcate,productSave,productPagetheshelves } from '@/api/shopApi';

  export default {
    data() {
      return {
        flag:true,
        form:{
          fenlei:[
            {cateName:"全部",storeCateId:""},
            {cateName:"无",storeCateId:0}
          ],
          storeCateId:"",
          goodId:'',
          productTitle:'',
          searchDate:'',
          searchStartTime:'',
          searchEndTime:''
        },
        
        dialogVisible1:false,
        jurisdiction: [],
        roleAuthority:[],
        total: 0,
        pageSize: 20,//每页显示多少条
        pageNum:1,//当前页数
        datas: [],
        listLoading: false
      }
    },
    mounted() {
      this.getProductPagetheshelves();
      let para = {
        storeId:config.storeId,
        pageSize:1000
      };

      cateList(para).then((res) => {
        this.listLoading = false;

        if(res.data.code==0){
          this.jurisdiction = res.data.data.list;
          //将取到的店铺分类插入页面的选择框里面
          for(var i=0;i<this.jurisdiction.length;i++){
            this.$set(this.form.fenlei, this.form.fenlei.length,this.jurisdiction[i]);
          }
        }else{
          this.$message.error(res.data.message);
        }
        
      }).catch((res)=> {
        this.listLoading = false;
      });
    },
    methods: {
      /**
       * datePickerHandle 用户选择时间后回调方法
       * @param  { String } value 用户选择后时间
       * @return {[type]}       [description]
       */
      datePickerHandle (value){
        let self = this
        if(value) {
          let dateArr = value.split(' - ')
          self.form.searchStartTime = dateArr[0] || ''
          self.form.searchEndTime = dateArr[1] || ''
        }else {
          self.form.searchStartTime = ''
          self.form.searchEndTime = ''
        }
      },
      //当选择每页多少条时触发
      handleSizeChange(val){
        this.pageSize = val;
        this.getProductPagetheshelves();
      },
      //查询商品
      findGood(){
        this.getProductPagetheshelves();
      },
      //转换状态
      formatUsed(row){
        var state='';
        switch(row.productStatus){
          case -1:state="未通过";break;
          case 0:state="草稿箱";break;
          case 1:state="审核中";break;
          case 2:state="待上架";break;
          case 3:state="已上架";break;
          case 4:state="已下架";break;
          case 5:state="回收站";break;
        }
        return state;
      },
      //转换分类
      formatFenlei(row){
        var fenlei=row.storeCateNameList;
        if(!row.storeCateNameList){
          fenlei='无';
        }else{
          fenlei=fenlei.join(" / ");
        }
        return fenlei;
      },
      //关联按钮
      handleBangding(row){
        this.dialogVisible1=true;
        this.productId=row.productId;
        this.roleAuthority=[];
        let para = {
          productId:row.productId,
          storeId: config.storeId
        };
        productListcate(para).then((res) => {
          if(res.data.code==0){
            this.roleAuthority=res.data.data;
          }else{
            this.$message.error(res.data.message);
          }
          this.listLoading = false;
         
        }).catch((res)=> {
          this.listLoading = false;
        });
       
      },
      //关联弹框的取消按钮
      cancelBtn(){
        this.dialogVisible1=false;
      },
      //关联弹框的确定关联按钮
      addRelevanceBtn(){
        if(!this.flag){
          return false;
        }
        this.flag=false;
        var para = new URLSearchParams();
        para.append('storeId', config.storeId);
        para.append('productId',this.productId);
        para.append('storeCateIdList',this.roleAuthority);


        productSave(para).then((res) => {
          var that=this;
          if(res.data.code==0){
            that.dialogVisible1=false;
            that.getProductPagetheshelves();
          }else{
            this.$message.error('关联失败');
          }
          this.listLoading = false;
          this.flag=true;
        }).catch((res)=> {
          this.flag=true;
          this.listLoading = false;
        });
      },
      //获取列表
      getProductPagetheshelves(){
        let para = {
          storeId:config.storeId,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          productId:this.form.goodId,
          productTitle:this.form.productTitle,
          storeCateId:this.form.storeCateId,
          searchStartTime:this.form.searchStartTime,
          searchEndTime:this.form.searchEndTime
        };

        this.listLoading = true;
        productPagetheshelves(para).then((res) => {
          if(res.data.code==0){
            this.total = Number(res.data.data.total);
            this.datas = res.data.data.list;
          }else{
            this.$message.error(res.data.message);
          }
          this.listLoading = false;
        }).catch((res)=> {
          this.listLoading = false;
        });
      },
      handleCurrentChange(val) {
        this.pageNum =val;
        this.getProductPagetheshelves();
      }

    }
  }

</script>