<template>
    <section class="bind">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="email">
                <el-input v-model="ruleForm.email" placeholder='请输入企业支付宝帐号E-mail'></el-input>
            </el-form-item>
            <el-form-item label="企业账号App-ID" prop="appId">
                <el-input v-model="ruleForm.appId" placeholder='请输入企业帐号App-ID'></el-input>
            </el-form-item>
            <el-form-item label="Private-key私钥" prop="ownKey">
                <el-input v-model="ruleForm.ownKey" placeholder='请输入Private-key私钥'></el-input>
            </el-form-item>
            <el-form-item label="Private-key公钥" prop="publicKey">
                <el-input v-model="ruleForm.publicKey" placeholder='请输入Private-key公钥'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    import {orderStatus, orderStore } from '@/api/ordersApi'
    export default {
        data() {
            return {
                ruleForm: {
                    email: '',
                    appId: '',
                    ownKey: '',
                    publicKey: ''
                },
                rules: {
                    email: [
                        {required: true, message: '请输入企业支付宝帐号E-mail', trigger: 'blur'},
                        { type:'email', message: '请输入正确的E-mail格式', trigger: 'blur' }
                    ],
                    appId: [{required: true, message: '请输入企业帐号App-ID', trigger: 'blur'}],
                    ownKey: [{required: true, message: '请输入Private-key私钥', trigger: 'blur'}],
                    publicKey: [{required: true, message: '请输入Private-key公钥', trigger: 'blur'}],
                }
            }
        },
        beforeCreate(){
            
        },
        created(){ 
    
        },
        methods: {
            submitForm(data){
                this.$refs[data].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }   
    }

</script>

<style lang="scss">
    .bind{
        *{
            box-sizing: border-box !important;
        }
        $color: #45cdb6;
        box-sizing: border-box !important;
        font-size: 14px;
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
        label{
            width: 122px !important;
        }
        .el-form-item__content{
            margin-left: 130px !important;
            width: 280px;
        }
        button{
            width: 100px;
        }
        
    }
</style>