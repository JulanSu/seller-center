<template>
	<section class="new-role" v-loading="listLoading">
		<el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" style="width:60%;min-width:600px;">
			<el-form-item label="岗位名称" label-width="100px" prop="roleName">
				<el-input :maxlength="20" v-model="ruleForm.roleName" placeholder="请输入岗位名称" class="wid270" @blur="findName"></el-input>
			</el-form-item>	
			<el-form-item label="权限" label-width="100px" prop="roleAuthority">
			    <el-checkbox-group v-model="ruleForm.roleAuthority">
            <el-checkbox v-for="item in jurisdiction" :label="item.value" :key="item.value">
                {{item.name}}
            </el-checkbox>
			    </el-checkbox-group> 
			</el-form-item>
			<el-form-item label="" label-width="100px">
				<el-button type="primary" @click="changePermission('ruleForm')">{{btnHtml}}</el-button>
			</el-form-item>
		</el-form>
	</section>	
</template>

<script>
import {roleGet,roleUpdate,roleSave,roleGetAuthority,roleCheckname} from '@/api/shopApi';

  export default {
    data() {
      return {
        csname:'',
        btnHtml:'保存权限',
        isAdd:1,
        listLoading:false,
        jurisdiction: [],

        ruleForm: {
          storeOperatorRoleId:'',
          roleName: '',
          roleAuthority:[]
        },

        rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 1, max: 20, message: '请输入角色名称', trigger: 'blur' }
          ],
          roleAuthority: [
            { type: 'array', required: true, message: '请选择权限', trigger: 'change' }
          ]
        }
      };
    },
    created:function(){
      //获取店铺权限列表
      this.listLoading = true;
      roleGetAuthority({}).then((res) => {
        this.listLoading = false;
        if(res.data.code==0){
          this.jurisdiction=res.data.data;
        }else{
          this.$message.error(res.data.message);
        }
        
      }).catch((res)=> {
        this.listLoading = false;
        this.$message.error('接口建立连接失败');
      });
    },
    mounted:function(){
      /*如果是编辑角色页面，需要取该角色的数据*/
      var id=this.$route.params.id;
      if(id){
        this.dataFetch(id);
        this.isAdd=2;//1是添加,2是编辑
      }
    },
    methods: {
      /*查找角色名是否重名*/
      findName(){
        if(!(this.ruleForm.roleName)||(this.ruleForm.roleName==this.csname)){
          return false;
        }
        var para={
          storeId:config.storeId,
          roleName:this.ruleForm.roleName
        }
        roleCheckname(para).then((res) => {
            if(res.data.code==1){
              this.$message.error('角色重名，请重新输入角色名称');
            }
        });
      },
      /*如果是编辑角色页面，需要取该角色的数据*/
      dataFetch(id){
        this.btnHtml='修改权限';
        let para = {
          storeOperatorRoleId:id
        };
        this.listLoading = true;
        roleGet(para).then((res) => {
          if(res.data.code==0){
            
            this.ruleForm= res.data.data;
            this.csname=this.ruleForm.roleName;
            if(!this.ruleForm.roleAuthority){
              this.ruleForm.roleAuthority=[];   
            }else{
              this.ruleForm.roleAuthority=JSON.parse(this.ruleForm.roleAuthority);

            }
          }
         
          this.listLoading = false;
        }).catch((res)=> {
          this.listLoading = false;
          this.$message.error('接口建立连接失败');
        });

      },
      //新增或编辑成功后的回调
      sucFun(res){
        var that=this;
        this.listLoading = false;

        if(res.data.code==0){
          this.$message({
            message: '提交成功',
            type: 'success',
            onClose:function(){
              that.$router.push({ path: '/store/bypass-management/role-list' });
            }
          });
        }else{
          this.$message.error(res.data.message);
        }
      },
      /*修改权限按钮*/
      changePermission(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.listLoading = true;

            var para = new URLSearchParams();
            para.append('roleName',this.ruleForm.roleName);
            para.append('roleAuthority',JSON.stringify(this.ruleForm.roleAuthority));
            
            if(this.isAdd==2){//2是编辑
              para.append('storeOperatorRoleId',this.ruleForm.storeOperatorRoleId);
              roleUpdate(para).then((res)=> {
                this.sucFun(res);
              }).catch((res)=> {
                this.listLoading = false;
                this.$message.error('接口建立连接失败');
              });
            }else{
              para.append('storeId',config.storeId);
              roleSave(para).then((res)=>{
                this.sucFun(res);
              }).catch((res)=> {
                this.listLoading = false;
                this.$message.error('接口建立连接失败');
              });
            }
            
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss">
.new-role{
  .wid270{
    width:270px;
  }
  .el-button{
    width:100px;
    height:34px;
    line-height:34px;
    background:#41cac0;
    padding:0;
    border-color:#41cac0;
    border-radius:0;
  }
} 
</style>