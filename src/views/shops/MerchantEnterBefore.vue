<template>
  <section class="merchantEnterBefore">
      <h2>入驻流程22222</h2>
      <ol>
        <li>
          <h6>
            <b class="iconfont icon-dengyuhao"></b>
            <span>阶段一</span>
            <b class="iconfont icon-dengyuhao"></b>
          </h6>
          <div>
            <span>店铺入驻</span>
            <b class="iconfont icon-xiangyou"></b>
          </div>
          <ul>
            <li>• 填写企业信息</li>
            <li>• 填写联系人信息</li>
            <li>• 填写店铺关键信息</li>
          </ul>
        </li>
        <li>
          <h6>
            <b class="iconfont icon-dengyuhao"></b>
            <span>阶段二</span>
            <b class="iconfont icon-dengyuhao"></b>
          </h6>
          <div>
            <span>完善店铺信息</span>
            <b class="iconfont icon-xiangyou"></b>
          </div>
          <ul>
            <li>• 填写店铺详细信息</li>
            <li>• 选择经营品牌，填写品牌资质</li>
          </ul>
        </li>
        <li>
          <h6>
            <b class="iconfont icon-dengyuhao"></b>
            <span>阶段三</span>
            <b class="iconfont icon-dengyuhao"></b>
          </h6>
          <div>
            <span>发布商品</span>
            <b class="iconfont icon-xiangyou"></b>
          </div>
          <ul>
            <li>• 选择类目与品牌，发布商品</li>
          </ul>
        </li>
        <li>
          <h6>
            <b class="iconfont icon-dengyuhao"></b>
            <span>阶段四</span>
            <b class="iconfont icon-dengyuhao"></b>
          </h6>
          <div>
            <span>资质审核</span>
            <b class="iconfont icon-xiangyou"></b>
          </div>
          <ul>
            <li>• 审核企业资料是否真实有效</li>
            <li>• 审核品牌授权是否有效</li>
            <li>• 审核商品是否符合中国婚博会商品规范</li>
          </ul>
        </li>
        <li>
          <h6>
            <b class="iconfont icon-dengyuhao"></b>
            <span>阶段五</span>
            <b class="iconfont icon-dengyuhao"></b>
          </h6>
          <div>
            <span>店铺上线</span>
            <b class="iconfont icon-gou"></b>
          </div>
          <ul>
            <li>• 去不审核通过，店铺即可成功上线</li>
          </ul>
        </li>
      </ol>
  </section>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods:{

    }

  }

</script>
<style lang="scss">
ul,ol,li {
  margin: 0;
  padding: 0;
  list-style: none;
  
}
.merchantEnterBefore{
  h2{
    margin:0;
    padding:0;
    font-size: 28px;
    color: #333333;
    height:40px;
    line-height:40px;
    text-align:center;
    margin: 70px 0 50px;
    background:none;
  }

  ol{
    overflow: hidden;
    &>li{
      float:left;
      width:220px;
      h6{
        margin:0;
        padding:0;
        font-size: 24px;
        color: #666666;
        height:33px;
        line-height:33px;
      }
      div{
        margin:10px 0;
        text-align:center;
        span,b{
          display:inline-block;
          height:46px;
          line-height:46px;
          color:#fff;
        }
        span{
          width:164px;
          background: #41CAC0;
        }
        b{
          width:56px;
          background: #FF6003;
        }
      }
    }
  }
}
</style>