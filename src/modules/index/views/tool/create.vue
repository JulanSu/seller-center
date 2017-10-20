<template>
    <section class="create-act">
        <el-form ref="form" :model="form" label-width="130px" style='margin-top:30px'>
           
          <el-form-item label="现金券名称">
            <el-input v-model="form.name" class='name'></el-input>
          </el-form-item>

          <el-form-item label="现金券领取时间">
            <el-row style='padding-left:10px'>
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" class='w160'></el-date-picker>
                <span style="margin:0 8px">至</span>
                <el-date-picker type="date" placeholder="选择时间" v-model="form.date2" class='w160'></el-date-picker>
            </el-row>
          </el-form-item>

          <el-form-item label="现金券使用期限">
            <el-radio-group v-model="form.resource" style="padding-left:10px;">
              <el-radio label="有效时间段"></el-radio>
              <el-radio label="领取后有效天数"></el-radio>
            </el-radio-group>
            <el-row style='margin-top: 10px;padding:0 10px;' v-if="form.delay">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date3" class='w160'></el-date-picker>
                <span style="margin:0 8px">至</span>
                <el-date-picker type="date" placeholder="选择时间" v-model="form.date4" class='w160'></el-date-picker>
            </el-row>
            <el-row style='margin-top: 10px;padding:0 10px;' v-if="!form.delay">
                <el-input v-model="form.cname" class='w160' placeholder="请输入..."></el-input>
                <span style="margin:0 8px">天</span>
            </el-row>
          </el-form-item>
            
          <el-form-item label="现金券面值与数量">
            <el-radio-group v-model="form.resource2" style="padding-left:10px;">
              <el-radio label="会员等级"></el-radio>
              <el-radio label="固定金额"></el-radio>
              <el-radio label="满减券"></el-radio>
              <el-radio label="折扣券"></el-radio>
            </el-radio-group>
            <section class="cash" v-if="cash.type==1">
                <el-row style='margin-top: 10px;' v-for="item in cash.name">
                    <span class="cash-name">{{item}}</span>
                    <el-input placeholder='请输入' style='width:210px'></el-input>
                    <span style="margin:0 8px">元</span>
                    <el-input placeholder='发放数量' style='width:120px'></el-input>
                    <span style="margin:0 8px">张</span>
                </el-row>
            </section>
            <section class="cash" v-if="cash.type==2">
                <el-row style='margin-top: 10px;padding-left: 10px'>
                    <el-input placeholder='请输入' style='width:210px'></el-input>
                    <span style="margin:0 8px">元</span>
                    <el-input placeholder='发放数量' style='width:120px'></el-input>
                    <span style="margin:0 8px">张</span>
                </el-row>
            </section>
            <section class="cash" v-if="cash.type==3">
                <el-row style='margin-top: 10px;padding-left: 10px' v-for='item in [1,2]'>
                    <el-input placeholder='现金券面值' style='width:210px'></el-input>
                    <span style="margin:0 8px">————</span>
                    <el-input placeholder='消费满足金额' style='width:210px'></el-input>
                    <span style="margin:0 8px">元</span>
                    <el-input placeholder='发放数量' style='width:120px'></el-input>
                    <span style="margin:0 8px">张</span>
                </el-row>
                <el-row style='margin-top: 10px;padding-left: 10px' class='add'>
                    + <b>添加</b>
                </el-row>
            </section>
            <section class="cash" v-if="cash.type==4">
                <el-row style='margin-top: 10px;padding-left: 10px'>
                    <el-input placeholder='请输入' style='width:210px'></el-input>
                    <span style="margin:0 8px">%</span>
                    <el-input placeholder='发放数量' style='width:120px'></el-input>
                </el-row>
                <el-row style='margin-top: 10px;padding-left: 10px'>
                    <el-input placeholder='请输入' style='width:210px'></el-input>
                    <span style="margin:0 8px">元起用</span>
                </el-row>
                <el-row style='margin-top: 10px;padding-left: 10px'>
                    <el-input placeholder='请输入' style='width:210px'></el-input>
                    <span style="margin:0 8px">最多抵扣金额元</span>
                </el-row>
            </section>
          </el-form-item>

          <el-form-item label="抵扣券价格">
            <el-radio-group v-model="form.desc" style="padding-left:10px;">
              <el-radio label="有效时间段"></el-radio>
              <el-radio label="领取后有效天数"></el-radio>
            </el-radio-group>
             <el-row style='margin-top: 10px;padding-left:10px' v-if='form.types'>
                <el-input placeholder='现金值' style='width:210px'></el-input>
                <span style="margin:0 8px">元</span>
            </el-row>
          </el-form-item>

          <el-form-item label="适用商品范围">
            <el-radio-group v-model="form.resource" style="padding-left:10px;">
                <el-radio label="全部商品通用"></el-radio>
                <el-radio label="部分商品通用"></el-radio>
            </el-radio-group>
            <el-row v-if='form.sert'>
                <div class="area">
                    <div class='add-pro'>
                        <p>+</p>
                        <span>添加商品</span>
                    </div>
                </div>
            </el-row>
          </el-form-item>

          <el-form-item label="领取成功后提示" style="padding-left:10px">
            <el-input style='width:520px' value='先谈单再出示现金券，可直接抵扣订单合同金额' v-model='form.tips' max-length='30'></el-input>
            <el-row class="tips">
                如无特殊说明，一律默认为“先谈单再出示现金券，可直接抵扣订单合同金额”，不能超过20个汉字
            </el-row>
          </el-form-item>

          <el-form-item label="现金券详情页图" style="padding-left:10px">
            <el-row class="tips">
               图片尺寸200px*200px以上，大小800k以内，格式要求jpg、jpeg、png，不超过10MB
            </el-row>
            <el-row class="add-pic">
                <p>+</p>
                <span>添加上传图片</span>
            </el-row>

          </el-form-item>

          <el-form-item label="现金券使用规则" style="padding-left:10px">
            <el-input type="textarea" v-model="form.desc" :rows="8"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit" class='btn'>立即创建</el-button>
          </el-form-item>
        </el-form>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                  name: '',
                  region: '',
                  date1: '',
                  date2: '',
                  date3: '',
                  date4: '',
                  delivery: false,
                  type: [],
                  resource: '',
                  resource2: '',
                  desc: '',
                  delay: true,
                  cname:'',
                  types:true,
                  sert:true,
                  tips: '先谈单再出示现金券，可直接抵扣订单合同金额'
                },
                cash: {
                    type: '4',
                    name: ['新会员','老会员','VIP会员','金卡会员']
                }
            }
        },
        created(){
        },
        methods: {
            onSubmit: function(){
                console.log(77)
            }
        }   
    }

</script>

<style scoped lang="scss">
    .create-act {
        width: 100%;
        float: left;
    }
    .el-col {
        padding-left: 20px; 
    }
    .name{
        margin-left: 10px;
        width: 280px;
    }
    .cash{
        .el-col{
            padding: 0;
        }
        .cash-name{
            display: inline-block;
            width: 70px;
            text-align: right;
            margin-right: 8px;
        }
        .add{
            font-size:25px;
            overflow: hidden;
            height: 30px;
            position: relative;
            color:#41cac0;
            cursor: pointer;
            b{
                position: absolute;
                display: inline-block;
                height: 30px;
                line-height: 37px;
                font-weight: 400;
                font-size: 14px;
                margin-left: 10px;
            }
        }
    }
    .area{
        margin: 10px 0 0 10px;
        width: 800px;
        height:184px;
        background:#f5f7fa;
        padding: 20px;
        .add-pro{
            width: 100px;
            height: 100px;
            border:1px dashed #cccccc;
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            p{
                margin:18px 0 5px;
                font-size: 80px;
                color:#41cac0;
            }
            span{
                font-size:14px;
                color:#666666;
            }
        }   
    }
    .grade{
        text-align: right;
        margin-right: 10px;
    }
    .w160{
        width:160px;   
    }
    .tips{
        font-size:12px;
        color:#999999;
    }
    .add-pic{
        width: 100px;
        height: 100px;
        border:1px dashed #cccccc;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        p{
            margin:18px 0 5px;
            font-size: 80px;
            color:#41cac0;
        }
        span{
            font-size:14px;
            color:#666666;
        }
    }
    .btn{
        margin-left: 10px;
        width: 100px;
        height: 34px;
        background:#41cac0;
    }
</style>