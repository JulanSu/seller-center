<template>
    <section class="bind">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="帐号E-mail" prop="email">
                <el-input v-model="ruleForm.email" placeholder='请输入企业支付宝帐号E-mail'></el-input>
            </el-form-item>
            <el-form-item label="企业账号App-ID" prop="appId">
                <el-input v-model="ruleForm.appId" placeholder='请输入企业帐号App-ID'></el-input>
            </el-form-item>
            <el-form-item label="Private-key私钥" prop="privateKey">
                <el-input v-model="ruleForm.privateKey" placeholder='请输入Private-key私钥'></el-input>
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
    import {getPayMessage, savePayMessage } from '@/api/ordersApi';
    import qs from 'qs';
    export default {
        data() {
            return {
                ruleForm: {
                    storeId: config.storeId,
                    email: '',
                    appId: '',
                    privateKey: '',
                    publicKey: ''
                },
                rules: {
                    email: [
                        {required: true, message: '请输入企业支付宝帐号E-mail', trigger: 'blur'},
                        { type:'email', message: '请输入正确的E-mail格式', trigger: 'blur' }
                    ],
                    appId: [
                        {required: true, message: '请输入企业帐号App-ID', trigger: 'blur'},
                        {message: '请输入正确格式的App-ID', trigger: 'blur', pattern:/^[0-9a-z]+$/},
                    ],
                    privateKey: [
                        {required: true, message: '请输入Private-key私钥', trigger: 'blur'},
                        {message: '请输入正确格式的私钥', trigger: 'blur', pattern:/^[0-9a-z]+$/},
                    ],
                    publicKey: [
                        {required: true, message: '请输入Private-key公钥', trigger: 'blur'},
                        {message: '请输入正确格式的公钥', trigger: 'blur', pattern:/^[0-9a-z]+$/},
                    ],
                }
            }
        },
        beforeCreate(){
            
        },
        created(){ 
            this.getAliPay()
        },
        methods: {
            /*获取支付宝信息*/
            getAliPay(){
                let self = this;
                getPayMessage({storeId: config.storeId}).then( res => {
                    if(res.data.data){
                        let that = res.data.data
                        self.ruleForm.email = that.email;
                        self.ruleForm.appId = that.appId;
                        self.ruleForm.privateKey = that.privateKey;
                        self.ruleForm.publicKey = that.publicKey;
                    }
                })
            },
            /*提交表单*/
            submitForm(data){
                let self = this;
                self.$refs[data].validate((valid) => {
                    if (valid) {
                        savePayMessage(qs.stringify(this.ruleForm)).then(res => {
                            if(res.data.success){
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                            }else{
                                this.$message.error(res.data.errorData);
                            }
                        })
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