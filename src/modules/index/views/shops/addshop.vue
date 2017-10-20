<template>
	<section class="add-store">
		<el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" style="width:60%;min-width:600px;">
			<el-form-item label="门店名称" label-width="100px" prop="name">
				<el-input v-model="ruleForm.name" placeholder="请输入门店名称" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="门店联系人" label-width="100px" prop="linkman">
				<el-input v-model="ruleForm.linkman" placeholder="请输入门店联系人" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="营业时间" label-width="100px" prop="business">
				<el-input v-model="ruleForm.business" placeholder="请输入营业时间" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="门店地址"  label-width="100px">
				<v-distpicker @province="onProvince" @city="onProvince" @selected="onProvince"></v-distpicker>
			</el-form-item>
			<el-form-item label="" label-width="100px" prop="detailAddress">
				<el-input v-model="searchsite" placeholder="输入详细地址" class="wid280"></el-input>
				<el-button type="primary" class="mapbtn" @click="searchbtn">搜索地图</el-button>
			</el-form-item>
			<el-form-item label="经纬坐标" label-width="100px" prop="accountname">
				<p>{{site}}</p>
			</el-form-item>
			<el-form-item label="" label-width="100px" prop="accountname">
				<map-view :height="height" :longitude="longitude" :latitude="latitude" @listenToChildEvent="showsite" ref="MapView">
				</map-view>
			</el-form-item>
			<el-form-item label="" label-width="100px">
				<el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
			</el-form-item>
			
		</el-form>
	</section>
	
</template>

<script>

import VDistpicker from 'v-distpicker';/*城市三级联动*/
import MapView from 'components/Map';/*地图组件*/

  export default {
  	components: {
		VDistpicker,
      	MapView
  	},
    data() {
      return {
      	/*地图组件需要传递的数据*/
		height:300,
　　　　longitude:116.404,
　　　　latitude:39.915,
		site:"116.4.404015,39.912734",
		searchsite:"",
		selcity:"",

        ruleForm: {
          name: '',
          linkman: '',
          business: '',
          detailAddress: ''
        },

        rules: {
          name: [
            { required: true, message: '请输入门店名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 位', trigger: 'blur' }
          ],
          linkman: [
            { required: true, message: '请输入门店联系人', trigger: 'blur' },
            { min:1, max: 30, message: '长度在 1 到 30 位', trigger: 'blur'}
          ],
          business: [
            { type: 'date', required: false, message: '长度在最多 30 位', trigger: 'change' }
          ]
        }
      };
    },
    created:function(){
    	/*如果是编辑门店页面，需要取该店铺的数据*/
    	var id=this.$route.query.id;alert(id)
		if(id!="add"){
			this.dataFetch(id);
		}
    },
    methods: {
    	/*城市三级联动，选择城市后将数据存储起来，点击搜索地图按钮时，加在自己输入的地址之前*/
		onProvince(data) {
		    var province=data.province.code==undefined?"":data.province.value;
		    var city=data.city.code==undefined?"":data.city.value;
		    var area=data.area.code==undefined?"":data.area.value;
		    this.selcity=province+city+area;
	    },
	    /*点击搜索地图调用map子组件里面的地图事件*/
		searchbtn(){
			var addr=this.selcity+this.searchsite
			this.$refs.MapView.againmap(this.longitude,this.latitude,addr);
		},
		/*地图组件更改后传递数据到父组件*/
		showsite(data){
			this.site=data;
		},
		/*如果是编辑门店页面，需要取该店铺的数据*/
		dataFetch(){
			this.ruleForm.name="123";
			this.ruleForm.linkman="123";
			this.ruleForm.business="123";
			this.ruleForm.detailAddress="123";
		},
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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
.add-store{
	padding-top:20px;
	/* 公共样式 */
	p{
		margin: 0;
	}
    .wid280{
    	width:280px;
    }
    .wid400{
    	width:400px;
    }

    /* 只读样式 */
    .exhibition{
    	font-size:14px;
		color:#333333;
    }
}

</style>