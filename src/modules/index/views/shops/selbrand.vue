<template>
	<section class="selbrand">
		<category-bar :title="categoryBarTitle"></category-bar>
		<div class="searchhezi">
			<div class="hezi">
				<input placeholder="请输入你想经营的品牌名称" class="searchbrand"></input>
				<span class="searchbtn">搜索</span>
			</div>
			<div class="levelhezi">
				<ul class="stair">
					<li class="oneli">
						<p>
							<span>结婚</span><i></i>
						</p>
						<ul class="twolevel" v-if>
							<li class="twoli">
								<p>
									<span>卫浴陶瓷</span><i></i>
								</p>
								<ul class="threelevel">
									<li class="threeli"><span>结婚</span><i></i></li>
									<li  class="threeli"><span>家装</span><i></i></li>
									<li  class="threeli"><span>母婴</span><i></i></li>
								</ul>
							</li>
							<li  class="twoli">
								<p>
									<span>地板门窗</span><i></i>
								</p>
								<ul class="threelevel">
									<li class="threeli"><span>结婚</span><i></i></li>
									<li  class="threeli"><span>家装</span><i></i></li>
									<li  class="threeli"><span>母婴</span><i></i></li>
								</ul>
							</li>
						</ul>
					</li>
					<li class="oneli">
						<p>
							<span>结婚</span><i></i>
						</p>
						<ul  class="twolevel">
							<li class="twoli">
								<p>
									<span>卫浴陶瓷</span><i></i>
								</p>
							</li>
						</ul>
					</li>
					<li class="oneli">
						<p>
							<span>结婚</span><i></i>
						</p>
						<ul  class="twolevel">
							<li class="twoli">
								<p>
									<span>卫浴陶瓷</span><i></i>
								</p>
							</li>
						</ul>
					</li>
				</ul>		
			</div>	

		</div>
		<div class="showsel">
			<div class="brandsel">
				<b>您当前选择的是：</b>
			</div>
			<div class="brandbtn">
				<span>没有找到品牌？——</span>
				<router-link to="/store/brand-management/create-brand" class="addbrand">创建品牌</router-link>
			</div>
		</div>
		<div class="btns">
			<router-link to="/store/brand-management/add-brand" class="makesure">确定</router-link>
			<router-link to="/store/brand-management" class="cancel">取消</router-link>
		</div>
	</section>
</template>

<script>
	import CategoryBar from 'components/CategoryBar.vue'
    export default {
      components: {CategoryBar},
      data() {
        return {
          categoryBarTitle: '选择品牌'
        }
      },
      mounted: function () {

      }
    }

</script>
<style scoped>
a{
	text-decoration:none;
	color:#333;
}
ul,ol{
	list-style:none;
	padding:0;
}
h3,p,ul,ol{
	margin:0;
}

.selbrand .searchhezi{
	padding:15px 20px;
	border:1px solid #9fdbd1;
}
.selbrand .hezi{
	height:32px;
	width:380px;
	margin-bottom:15px;
}
.selbrand .hezi .searchbrand{
	float:left;
	border:1px solid #cccccc;
	width:283px;
	height:30px;
	padding-left: 15px;
	font-size:12px;
	color:#333333;
}
.selbrand .hezi .searchbrand::-webkit-input-placeholder { /* WebKit browsers */ 
	color: #333; 
} 
.selbrand .hezi .searchbrand:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
	color: #333; 
} 
.selbrand .hezi .searchbrand::-moz-placeholder { /* Mozilla Firefox 19+ */ 
	color: #333; 
} 
.selbrand .hezi .searchbrand:-ms-input-placeholder { /* Internet Explorer 10+ */ 
	color: #333; 
} 
.selbrand .hezi .searchbtn{
	background:#45cdb6;
	width:60px;
	height:34px;
	font-size:12px;
	color:#ffffff;
	line-height:34px;
	text-align:center;
	float:right;
	cursor:pointer;
}
.selbrand .levelhezi{
	height:264px;
}
.selbrand .levelhezi ul{
	width:197px;
	height:252px;
	border:1px solid #9fdbd1;
	padding:6px 5px;
}
.selbrand .levelhezi ul .secondlevel{
	display:none;
}
.selbrand .levelhezi ul li{
	cursor:pointer;
	height:27px;
	line-height:27px;
	padding:0 10px;
	color:#333;
}
.selbrand .levelhezi ul li.oneli:hover{
	background:rgba(141,215,214,0.50);
}
.selbrand .levelhezi ul li.oneli:hover>span{
	color:#333;
}
.selbrand .levelhezi ul.stair{
	position:relative;
}
.selbrand .levelhezi ul.stair li{
	color:#41cac0;
	font-size:12px;
}
.selbrand .levelhezi ul.stair li ul.twolevel,
.selbrand .levelhezi ul.stair li ul.twolevel .threelevel{
	position:absolute;
	top:-1px;
	left:208px;
}
.selbrand .twolevel,.addbrand .threelevel{
	display:none;
}

.selbrand .showsel{
	background:#fffaf2;
	border:1px solid #fad29a;
	height:30px;
	line-height:30px;
	margin-top:10px;
}
.selbrand .brandsel{
	padding-left:20px;
	font-size:12px;
	min-width:150px;
	float:left;
}
.showsel .brandsel b{
	color:#333;
}
.showsel .brandbtn{
	float:right;
	width:220px;
	text-align:right;
	padding-right:20px;
	color:#333;
}
.selbrand .btns{
	text-align:center;
	margin-top:30px;
}
.selbrand .btns a{
	display:inline-block;
	background:#41cac0;
	width:100px;
	height:40px;
	line-height:40px;
	font-size:14px;
	color:#fff;
}
.selbrand .btns a.cancel{
	background:#fff;
	color:#666;
	border:1px solid #cccccc;
	width:98px;
	height:38px;
	line-height:38px;
	margin-left:30px;
}
</style>