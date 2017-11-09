<template>
	<div class="maps-hezi">
		<div id="maps" :style="style" ></div>
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
　　　　　　style:{
　　　　　　　　width:'450px',
　　　　　　　　height:this.height+'px'
　　　　　　},
			searchResult:[]
　　　　}
　　},

　　props:{ //里面存放的也是数据，与data里面的数据不同的是，这里的数据是从其他地方得到的数据
　　　　height:{
　　　　　　type:Number,
　　　　　　default:300
　　　　},
　　　　longitude:{}, //定义经度
　　　　latitude:{} //定义纬度
　　},

	methods:{	
		creatmap(p1,p2){//创建地图
			var that=this;
　　　　　　window.map = new BMap.Map("maps");
　　　　　　var point = new BMap.Point(p1,p2);
　　　　　　map.centerAndZoom(point, 16);
			map.clearOverlays(); //清除标注
　　　　　　var marker = new BMap.Marker(point);// 创建标注
　　　　　　map.addOverlay(marker);// 将标注添加到地图中
			marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

			that.mapevent(map);//给初始化的地图添加事件
		},
		mapevent(o){//给初始化的地图添加事件
			var that=this;
			o.enableScrollWheelZoom();//启用地图滚轮放大缩小
   			o.enableKeyboard();//启用键盘上下左右键移动地图

   			//向地图中添加缩放控件
			var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
			o.addControl(ctrl_nav);
			//向地图中添加比例尺控件
			var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
			o.addControl(ctrl_sca);

			//单击获取点击的经纬度
			o.addEventListener("click",function(e){
				that.longitude=e.point.lng;
				that.latitude= e.point.lat;
				that.creatmap(that.longitude,that.latitude);//根据点击的经纬度重绘地图
				that.$emit("listenToChildEvent",e.point.lng , e.point.lat);//传递值给父组件
			});
		},
		againmap(p1,p2,addre,key){//用户通过输入详细地址，构建地图
			var that=this;
			
		    if(arguments.length==4){
		    	that.searchs(p1,p2,addre,key);//模糊搜索
		    }else{
		    	window.map = new BMap.Map("maps");
				var point = new BMap.Point(p1,p2);
			    map.centerAndZoom(point,16);
			    // 将地址解析结果显示在地图上,并调整地图视野
			    var myGeo = new BMap.Geocoder();
			    myGeo.getPoint(addre, function(point){
			        if (point) {
			            map.centerAndZoom(point, 16);
			            map.addOverlay(new BMap.Marker(point));
			            map.clearOverlays(); //清除标注
			            var marker = new BMap.Marker(point);  // 创建标注
			            map.addOverlay(marker);               // 将标注添加到地图中
			            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
			            that.$emit("listenToChildEvent",point.lng, point.lat);//传递值给父组件
			            that.mapevent(map);//给初始化的地图添加事件
			        }else{
			            that.$message({
				          message: '请挪动地图,点击地图手动定位',
				          type: 'warning'
				        });
			        }
			    });
		    }
		    
		},
		searchs(p1,p2,addre,key){
			var that=this;
			var options = {
				onSearchComplete: function(results){
					// 判断状态是否正确
					if (local.getStatus() == BMAP_STATUS_SUCCESS){
						var s = [];
						for (var i = 0; i < results.getCurrentNumPois(); i ++){
							s.push(results.getPoi(i).title + ", " + results.getPoi(i).address);
						}
						that.searchResult=s;
					}
				}
			};
			var local = new BMap.LocalSearch(map, options);
			local.search(key);

		},
		clickKeys(item){
			//this.searchResult=[];
			this.$emit("listenToSel",item);//传递值给父组件
		},
		/*清空搜索关键字列表*/
		clearKey(){
			this.searchResult=[];
		}
	},
	mounted:function() {
		this.creatmap(this.latitude,this.longitude);
	}
}
</script>
<style lang="scss">
/* <div class="maps-hezi">
		<div id="maps" :style="style" ></div>
		<div id="r-result" ></div>
	</div> */
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
}
</style>
