<template>
	<section class="add-sub-account" v-loading="listLoading">
		<el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm">
			<el-form-item label="账号名" label-width="100px" prop="account">
				<el-input :maxlength="20" v-model="ruleForm.account" placeholder="请输入账号名" class="wid280" @blur="findName"></el-input>
			</el-form-item>
			<el-form-item label="密码"  label-width="100px" prop="password" class="passhezi">
				<el-input :maxlength="20" :type="types" v-model="ruleForm.password" placeholder="请输入密码"  class="wid280" auto-complete="off"></el-input>
        <span class="iconfont" :class="iconCls ? 'icon-yanjing' : 'icon-biyan1'" @click="switchs"></span>
			</el-form-item>
			<el-form-item label="姓名"  label-width="100px" prop="name">
				<el-input :maxlength="30" v-model="ruleForm.name" placeholder="请输入姓名" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="性别" label-width="100px" prop="gender" class="requireHezi">
          <span class="require" style='left:-50px;'>*</span>
			    <el-radio-group v-model="ruleForm.gender">
			      <el-radio :label="1">男</el-radio>
			      <el-radio :label="2">女</el-radio>
			    </el-radio-group>
			</el-form-item>
      <el-form-item label="角色" prop="roleId" label-width="100px">
        <el-select v-model="ruleForm.roleId" placeholder="请选择角色" @change="getRoleId">
          <el-option
            v-for="item in ruleForm.role"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
			<el-form-item label="手机号码" label-width="100px" prop="mobile">
				<el-input :maxlength="11" v-model="ruleForm.mobile" placeholder="请输入手机号码" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="身份证号" label-width="100px" prop="identityNumber">
				<el-input :maxlength="18" v-model="ruleForm.identityNumber" placeholder="请输入身份证号码" class="wid280"></el-input>
			</el-form-item> 
			<el-form-item label="" label-width="100px">
				<el-button class="wid100" type="primary" @click="submitForm('ruleForm')">保存</el-button>
			</el-form-item>
			
		</el-form>
	</section>
	
</template>

<script>
import {operatorGet,operatorUpdate,operatorSave,operatorCheckaccount,roleUsedlist} from '@/api/shopApi';
import md5 from 'js-md5';
import crypto from 'crypto'
  export default {
    data() {
      var validatePhone = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入手机号'));
          } else {
            var first=value.slice(0,1);
            if ((value.length!=11)||(first!=1)) {
                callback(new Error('请输入正确的手机号'));
            }else{
              callback();
            }
          }
      };
      var validatePassword= (rule, value, callback) => {
          var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
          if (reg.test(value)) {
            callback(new Error('密码只能是字符、数字、特殊符号'));
          } else {
            callback();
          }
      };
      var validateNumber1= (rule, value, callback) => {
          var reg =/^\d+$/g;
          if (!value.match(reg)) {
            callback(new Error('请输入正确的手机号'));
          } else {
            callback();
          }
      };
      var validateNumber2= (rule, value, callback) => {
          var reg =/(^\d{0,18}$)|(^\d{17}(\d|X|x)$)/g;
          if (!value.match(reg)) {
            callback(new Error('请输入正确的身份证号码'));
          } else {
            callback();
          }
      };
      return {
        iconCls:false,
        types:"password",
        roleList:[],
        listLoading:false,
        isAdd:1,
        csname:'',
        flag:0,
        ruleForm: {
          storeOperatorId:'',
          account: '',
          password: '',
          againpass: '',
          name: '',
          gender: 1,
          role:'',
          roleId:'',
          newRoleId:'',
          mobile: '',
          identityNumber: ''
        },

        rules: {
          account: [
            { required: true, message: '请输入账号名', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 位', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码必须大于6位,小于20位', trigger: 'blur' },
            {  validator: validatePassword, trigger: 'blur'},
            {  validator: validatePassword, trigger: 'change'}
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min:2, max: 30, message: '请输入正确的姓名', trigger: 'blur' }
          ],
          roleId: [
            {  required: true, message: '请选择角色', trigger: 'change' }
          ],
          mobile: [
            { required: true,validator: validatePhone,trigger: 'blur' },
            { validator:validateNumber1,trigger:'blur'},
            { validator:validateNumber1,trigger: 'change'}
          ],
          identityNumber: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
            { min:18, max: 18, message: '身份证号码输入有误', trigger: 'blur' },
            { validator:validateNumber2,trigger:'blur'},
            { validator:validateNumber2,trigger:'change'}
          ]
        }
      };
    },
    mounted:function(){
       //先获取角色列表
      let para = {
        storeId:config.storeId
      };
      roleUsedlist(para).then((res) => {
        if(res.data.code==0){
          this.roleList=res.data.data;
          this.ruleForm.role=res.data.data;
          

        }
        
      });

      /*如果是编辑子账号页面，需要取该子账号的数据*/
      var id=this.$route.query.id;
      if(id){
        //获取子账号信息
        this.isAdd=2;
        this.dataFetch(id);
      }
    },
    methods: {
      //密码切换
      switchs(){
        if(this.types=="password"){
          this.types='text';
          this.iconCls=true;
        }else{
          this.types='password';
           this.iconCls=false;
        }
        
      },
      /*查找账号是否已存在*/
      findName(val){
        if(!(this.ruleForm.account)||(this.ruleForm.account==this.csname)){
          return false;
        }
        operatorCheckaccount({"account":this.ruleForm.account,storeId: config.storeId}).then((res) => {
            if(res.data.code==1){
              this.$message.error('用户名重复，请重新输入');
            }
        });
      },
      getRoleId(){
        this.flag++;
      },
      /*如果是编辑子账号页面，需要取该子账号的数据*/
      dataFetch(id){ 
        let para = {
          storeId: config.storeId,
          storeOperatorId:id
        };
        this.listLoading = true;
        operatorGet(para).then((res) => {
          if (res.data.code==0) {
            this.ruleForm= res.data.data;
            this.ruleForm.againpass=this.ruleForm.password;
            this.ruleForm.role=this.roleList;

            this.ruleForm.password="********************";
            if(res.data.data.roleName){
              this.ruleForm.newRoleId=this.ruleForm.roleId;
              this.ruleForm.roleId=res.data.data.roleName;

            }
            this.csname=this.ruleForm.account;
          }else{
            this.$message.error(res.data.message);
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
          this.$message({message: '提交成功',type: 'success',
            onClose:function(){
              that.$router.push({ path: '/store/bypass-management/account-list' });
            }
          });
        }else{
          this.$message.error(res.data.message);
        }
      },

      submitForm(formName) {
         
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.listLoading = true;
    
            var para = new URLSearchParams();
            para.append('storeId',config.storeId);
            para.append('account',this.ruleForm.account);
            
            para.append('name',this.ruleForm.name);
            para.append('gender',this.ruleForm.gender);
           
            para.append('mobile',this.ruleForm.mobile);
            para.append('identityNumber',this.ruleForm.identityNumber);
            
            if(this.isAdd==2){//2是编辑
              if(this.ruleForm.password!="********************"){
                para.append('password',md5(this.ruleForm.password));
              }
              if(this.flag==1){
                para.append('roleId',this.ruleForm.newRoleId);
              }else{
                para.append('roleId',this.ruleForm.roleId);
              }
              para.append('storeOperatorId',this.ruleForm.storeOperatorId);
              operatorUpdate(para).then((res)=> { 
                this.sucFun(res);  
              }).catch((res)=> {
                this.listLoading = false;
                this.$message.error('接口建立连接失败');
              });
            }else{
              para.append('roleId',this.ruleForm.roleId);
              para.append('password',md5(this.ruleForm.password));
              para.append('storeId',config.storeId);
              operatorSave(para).then((res)=> {
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