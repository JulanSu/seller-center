<template>
　　<div id="maps" :style="style" ></div>
</template>
<script>
export default{
　　data(){
　　　　return{
　　　　　　style:{
　　　　　　　　width:'450px',
　　　　　　　　height:this.height+'px'
　　　　　　}
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
　　　　　　var map = new BMap.Map("maps");
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
		againmap(p1,p2,addre){//用户通过输入详细地址，构建地图
			var that=this;
			var map = new BMap.Map("maps");
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
		            alert("搜索不到哦!");
		        }
		    });
		}
	},
	mounted:function() {
		this.creatmap(this.latitude,this.longitude);
	}
}
</script>