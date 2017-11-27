<template>
	<section class="error">
    	<div class="errContent">
    		<div class="pic"></div>
    		<p class="tishi">抱歉，这个页面不干活跑去太空遨游了，帮忙喊喊他吧！</p>
    		<router-link to="/home/index" class="gotoIndextBtn" icon="plus" style="width:100px;cursor:pointer;">
		      	<el-button type="primary"> 返回首页</el-button>
		    </router-link>	
    		
    	</div>
    	<div class="footWord">
    		<p>版权所有： 北京金海群英网络信息技术有限公司 - 中国婚博会官网 - 咨询电话： 010-58487918</p>
			<p>京ICP证140647号 - 京ICP备11033034号 - 京公网安备11010802017341号</p>
    	</div>
    </section>
</template>
<style lang="scss">
    
.error{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background:#f5f5f5;
    .errContent{
        .pic{
            width:725px;
            height:290px;
            background:url(../../assets/404.jpg) no-repeat center;
            background-size:100%;
            margin:178px  auto 65px;
        }
        
        p{
            text-align:center;
        }
        .gotoIndextBtn{
            display:block;
            margin:30px auto 0;
            button{
                border-radius:20px;
                span{
                    font-size: 18px;
                }
            }
            
        }
    }
  .tishi{
    font-size: 24px;
    color: #333333;
    height:33px;
    line-height: 33px;
  }
  .footWord{
    width:100%;
    
    margin-top:140px;
    p{
        text-align:center;
        font-size: 12px;
        color: #333333;
    }
  }
}
</style>