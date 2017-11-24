<template>
	<div class="maps-hezi">
		<div id="maps" style="width:400px;height:300px;"></div>
		<input type="text" id="suggestId" v-model="inputHtml" @input="detailed"/>
		<div id="searchResultPanel" style="border:1px solid #c0c0c0;width:150px;height:auto;display:none">
			{{resultHtml}}
		</div>
		<!-- <el-form-item label="" label-width="200px" class="search-hezi">
			<el-input v-model="ruleForm.address" id="ser" placeholder="输入详细地址" class="wid280"></el-input>
		</el-form-item> -->
		<div id="r-result" v-if="searchResult.length">
			<ol>
				<li v-for="item in searchResult" @click="clickKeys(item)">{{item}}</li>
			</ol>
		</div>
		
	</div>
　　
</template>
<script>
export default{
　　data(){
　　　　return{
			searchResult:[],
			inputHtml:'2',
			resultHtml:''
　　　　}
　　},

　　props:{ //里面存放的也是数据，与data里面的数据不同的是，这里的数据是从其他地方得到的数据
		longitude:{}, //定义经度
　　　　latitude:{} //定义纬度
　　},

	methods:{
		//监听输入框输入的值，传递给父组件的input里面
		detailed(){
			that.$emit('listenTolongitude',this.inputHtml);//触发父组件的方法并赋值
		},


		setPlace(){
			map.clearOverlays();    //清除地图上所有覆盖物
			function myFun(){
				var point = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
				map.centerAndZoom(point, 16);
				that.jump(point);
				
			}
			var local = new BMap.LocalSearch(map, { //智能搜索
			  onSearchComplete: myFun
			});
			local.search(myValue);
			that.clickMap();
		},

		//点击定位
		clickMap(){
			//单击获取点击的经纬度
			map.addEventListener("click",function(e){
				var point = new BMap.Point(e.point.lng,e.point.lat); // 创建点坐标
				map.centerAndZoom(point,16); 
				that.jump(point);
				
			});
		},

		//添加跳动的动画
		jump(point){
			map.clearOverlays(); //清除标注
　　　　　　var marker = new BMap.Marker(point);// 创建标注
　　　　　　map.addOverlay(marker);// 将标注添加到地图中
			marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
			that.$emit("listenToChildEvent",point.lng , point.lat);//传递值给父组件
		},

		//手动搜索地图
		searchMap(addre){
		    var myGeo = new BMap.Geocoder();
		    myGeo.getPoint(addre, function(point){
		        if (point) {
		            map.centerAndZoom(point, 16);
		            map.addOverlay(new BMap.Marker(point));
		            that.jump(point);
		        }else{
		        	that.$message.error('请挪动地图,点击地图手动定位');

		        }
		    });
		},

		//添加滚轮事件
		addZoom(){
			map.enableScrollWheelZoom();//启用地图滚轮放大缩小
   			map.enableKeyboard();//启用键盘上下左右键移动地图

   			//向地图中添加缩放控件
			var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
			map.addControl(ctrl_nav);
			//向地图中添加比例尺控件
			var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
			map.addControl(ctrl_sca);
		}
	},
	mounted:function() {
		window.that=this;
		window.map = new BMap.Map("maps");

		var p1=this.longitude;
		var p2=this.latitude;
		if(!this.longitude||!this.latitude){//如果没有传 经纬度，就是新建，地图默认定位为北京
			p1='116.404';
			p2='39.915';
		}
		
		var point = new BMap.Point(p1,p2);
　　　　map.centerAndZoom(point, 16);
		that.jump(point);

		that.addZoom();

		that.clickMap();
		

		window.ac = new BMap.Autocomplete({"input" : "suggestId",   //建立一个自动完成的对象
			"location" : map
		});

		ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
			var str = "";
			var _value = e.fromitem.value;
			var value = "";
			if (e.fromitem.index > -1) {
				value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			}    
			str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
			
			value = "";
			if (e.toitem.index > -1) {
				_value = e.toitem.value;
				value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			}    
			str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
			//that.G("searchResultPanel").innerHTML =str;
			that.resultHtml=value;
		});

		window.myValue='';
		ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
			var _value = e.item.value;
			myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			//that.G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
			//that.resultHtml="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
			that.resultHtml=myValue
			that.setPlace();
			that.$emit('listenTolongitude',myValue);//触发父组件的方法并赋值
		});


	}
}
</script>
<style lang="scss">
.maps-hezi{
	position:relative;
	#r-result{
		position:absolute;
		top:-85px;
		background: #fff;
	    border: 1px solid rgb(131, 162, 165);
	    z-index: 999;
	    li{
	    	padding:0px 10px;
	    	cursor:pointer;
	    }
	    li:hover{
	    	background:#eeeeee;
	    }
	}
	#suggestId{
		position:absolute;
		top: -121px;
	    width: 280px;
	    height: 36px;
	    padding-left: 10px;
	}

}
.load_hezi{
	.avatar-uploader{
		.el-upload{
			border-radius: 0 !important;
		}
	}
}
</style>
