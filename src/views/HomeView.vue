<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
let searchcontent = ref('')
let infoshow = ref(false)

let timer = null
const hideInfo = () => {
  timer = setTimeout(() => {
    infoshow.value = false
  }, 500)
}
const showInfo = () => {
  clearTimeout(timer)
  infoshow.value = true
}

let selitemlist = ref([
  { name: '猜你喜欢' },
  { name: '个人闲置' },
  { name: '手办' },
  { name: '吉他乐器' },
  { name: '摄影摄像' },
  { name: 'CD光盘' },
  { name: '动漫周边' },
]);
let selitem = ref(selitemlist.value[0].name);
const selectitem = (name) => {
  selitem.value = name;
}

const pageNum = ref(1); // 当前页码
const total = ref(32); // 总条数
const currentChangeHandle = (val) => {
  pageNum.value = val;
  // fetchCompanyList(); //获取数据
};
let goodslist = ref([
  { id: 1, name: 'ブルーアーカイブ「澄んだ青空、萌ゆる心」CD官网自购，全新未拆带特典', img: '', price: 140, seller: '就在这理发店' },
  { id: 2, name: '野兽先辈114514奥术魔刃黑胶至尊皇家限定收藏享受版唱片，梦回下北泽之夜', img: '', price: 114514, seller: '压力马斯内' },
  { id: 7, name: 'BanG Dream! 高松灯同款「南极石」钥匙扣，复刻搬运手感，咕咕嘎嘎限定款', img: '', price: 99, seller: '咕咕嘎嘎' },
  { id: 4, name: '丰川祥子客服话术手册（全语种版），含「すみません」高频回复模板，售后无忧', img: '', price: 10, seller: '客服小祥' },
  { id: 5, name: '田所浩二专属下北泽红茶冲泡教程+同款搪瓷杯，114℃恒温冲泡，口感醇厚,', img: '', price: 514, seller: '下北泽小卖部' },
  { id: 6, name: '千早爱音 拉面店打工体验券，管吃管饱，就是有点吵', img: '', price: 58, seller: 'MyGO食堂' },
  { id: 7, name: '要乐奈 猫叫陪聊服务，喵喵叫一整天，绝不冷场', img: '', price: 25, seller: '猫猫奈事务所' },
  { id: 8, name: '椎名立希 街头劝架代打服务，吵架必赢，主打一个暴躁', img: '', price: 66, seller: '立希拳击馆' },
  { id: 11, name: '孤独摇滚 波奇酱自闭角落出租，社恐专用，隔音超好', img: '', price: 11, seller: '结束乐队小卖部' },
  { id: 12, name: '虹夏 架子鼓即兴教学，嗓门大节奏稳，邻居都能听见', img: '', price: 33, seller: '下北泽鼓手' },
  { id: 13, name: '喜多郁代 可爱夸夸服务，全程彩虹屁，心情秒变好', img: '', price: 15, seller: '喜多应援团' },
  { id: 14, name: 'EVA 初号机暴走陪跑服务，跑得快，就是有点费电', img: '', price: 999, seller: 'NERV临时分部' },
  { id: 16, name: '链锯人 恶魔代打服务，只要一根棒棒糖', img: '', price: 1, seller: '玛奇玛忠实信徒' },
  { id: 17, name: '初音未来 甩葱歌纯享U盘，无限循环，葱味十足', img: '', price: 39, seller: '虚拟歌姬周边店' },
  { id: 6, name: '梁逸峰 朗诵诗朗诵原声U盘，特别的朗诵技巧，提神醒脑', img: '', price: 22, seller: '朗诵艺术家' },
  { id: 7, name: '波澜哥 离不开你破音版教学，高音不破不收费，破了也不赔', img: '', price: 15, seller: '波澜高音培训' },
  { id: 9, name: '窃·格瓦拉 不打工人生指南，看守所比家好，就是不打工', img: '', price: 24, seller: '精神领袖分店' },
  { id: 10, name: '大力哥 曾经辉煌人生语录，一天不喝大力我浑身难受', img: '', price: 36, seller: '大力经销商' },
  { id: 11, name: '金坷垃 农业至尊肥料，一袋能顶两袋撒，不流失不蒸发', img: '', price: 100, seller: '美国圣地亚哥' },
  { id: 12, name: '蓝蓝路 麦当劳魔性舞蹈教学光盘，鬼畜入门必学', img: '', price: 19, seller: '麦当劳叔叔' },
  { id: 13, name: '德国BOY 键盘破坏教程，我练功发自真心！', img: '', price: 28, seller: '练功狂人' },
  { id: 14, name: '杰哥不要 超勇人生教育DVD，彬彬就是逊啦', img: '', price: 58, seller: '杰哥便利店' },
  { id: 15, name: 'Van样 暗黑佟大为哲学教学，乖乖站好！', img: '', price: 114, seller: '暗黑健身房' },
  { id: 16, name: '多田野数人 真夏夜银梦名场面海报，下北泽限定', img: '', price: 514, seller: '银梦本铺' },
  { id: 17, name: '诸葛亮 骂王朗原声大碟，我从未见过如此厚颜无耻之人', img: '', price: 66, seller: '武乡侯文创' },
  { id: 18, name: '王司徒 苟利国家生死以表情包合集，丞相息怒', img: '', price: 9, seller: '司徒退休办' },
  { id: 19, name: '庞麦郎 我的滑板鞋时尚时尚最时尚CD，摩擦摩擦', img: '', price: 13, seller: '时尚教父' },
  { id: 20, name: '雪姨 开门呐魔性录音，你有本事抢男人，没本事开门啊', img: '', price: 20, seller: '傅文佩家' },
  { id: 21, name: '容嬷嬷 扎针教学手册，手法专业，专治不服', img: '', price: 33, seller: '坤宁宫医务室' },
  { id: 22, name: '男人过了20岁就不要穿得像个孩子 穿搭指南', img: '', price: 45, seller: '老干部穿搭铺' },
  { id: 23, name: '华强买瓜 正版西瓜，保熟，不劈不裂', img: '', price: 15, seller: '生瓜蛋子摊' },
  { id: 24, name: '刘华强 你这瓜保熟吗名场面T恤，鬼畜区标配', img: '', price: 39, seller: '衡州水果摊' },
]);


const router = useRouter()
const openPublishPage = () => {
  const routeData = router.resolve({
    path: '/publish'
  })
  window.open(routeData.href, '_blank')
}
</script>

<template>
  <div class="home">
    <div class="topbar">
      <div class="word">
        校园二手交易
      </div>
      <div class="searchb">
        <input class="searchbox" v-model="searchcontent"/>
        <div class="searchbtn">
          <el-icon><Search /></el-icon>
          搜索
        </div>
      </div>
      <div class="info">
        <div class="user" @mouseenter="showInfo" @mouseleave="hideInfo">
          <div class="avatar">
            <img src="/src/assets/img/avatar.png"/>
          </div>
          用户名
          <transition name="fade">
            <div class="infodetail" v-if="infoshow" @mouseenter="showInfo" @mouseleave="infoshow = false">
              <div class="name">
                <div class="avatar">
                  <img src="/src/assets/img/avatar2.png"/>
                </div>
                  用户名
              </div>
              <div class="item">
                <div class="itemname">我买到的</div>
                <div class="itemnum">
                  80
                  <el-icon><ArrowRight /></el-icon>
                </div>
              </div>
              <div class="item">
                <div class="itemname">我卖出的</div>
                <div class="itemnum">
                  42
                  <el-icon><ArrowRight /></el-icon>
                </div>
              </div>
              <div class="item">
                <div class="itemname">我收藏的</div>
                <div class="itemnum">
                  320
                  <el-icon><ArrowRight /></el-icon>
                </div>
              </div>
              <div class="logout">
                退出登录
              </div>
            </div>
          </transition>
        </div>
        <div class="order">
          <el-icon><Tickets /></el-icon>
          订单
        </div>
      </div>
    </div>
    <div class="contentbox">
      <div class="content">
        <div class="topsel">
          <div class="selitem" :class="{ seleditem: item.name == selitem }" v-for="(item,index) in selitemlist" :key="index" @click="selectitem(item.name)">
            <img v-if="item.name == '猜你喜欢'" src="/src/assets/img/heart.png"/>{{ item.name }}
          </div>
        </div>
        <div class="goods">
          <div class="goodsitem" v-for="(item,index) in goodslist.slice(0,15)" :key="index">
            <div class="box">
              <div class="photo">
                <div v-if="item.img"></div>
                <div v-else><img src="/src/assets/img/noimg.png"/></div>
              </div>
              <div class="intd">
                <div class="goodsname">{{ item.name }}</div>
                <div class="goodsprice"><span style="font-size: 16px;">￥</span>{{ item.price }}</div>
                <div class="goodsseller">
                  <img src="/src/assets/img/avatar2.png"/>
                  {{ item.seller }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="page">
          <el-pagination
            v-model:current-page="pageNum"
            background
            :page-size="15"
            size="large"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="currentChangeHandle"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="sidebar">
    <div class="side" @click="openPublishPage">
      <div class="img icon1"></div>
      <div class="word">发闲置</div>
    </div>
    <span></span>
    <div class="side">
      <div class="img icon2"></div>
      <div class="word">消息</div>
    </div>
    <span></span>
    <div class="side">
      <div class="img icon3"></div>
      <div class="word">反馈</div>
    </div>
    <span></span>
    <div class="side">
      <div class="img icon4"></div>
      <div class="word">客服</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  width: 100%;
  height: auto;
}
.home {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #f5f7f9;
}
.topbar {
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #26b3f3;
  .word {
    font-size: 25px;
    color: #fff;
    font-weight: 800;
    font-family: 'youyuan';
    margin-left: 12vw;
    cursor: pointer;
  }
  .searchb {
    flex: 1;  
    height: 40px;
    margin: 0 5vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 2vw;
    background-color: #fff;
    .searchbox {
      flex: 1;
      height: 85%;
      border: none;
      margin-left: 0.7vw;
      font-size: 1vw;
    }
    .searchbox:focus {
      outline: none;
      border: none;
      box-shadow: none;
    }
    .searchbtn {
      padding: 0 0.8vw;
      height: 85%;
      border-radius: 2vw;
      background-color: #26b3f3;
      margin-left: 0.7vw;
      margin-right: 4px;
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 15px;
      cursor: pointer;
      .el-icon {
        width: 15px;
      }
    }
  }

  .info {
    margin-right: 10vw;
    display: flex;
    .user {
      display: flex;
      align-items: center;
      font-size: 15px;
      color: #fff;
      position: relative;
      cursor: pointer;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 0.2vw;
      }
      .infodetail {
        position: absolute;
        left: 50%;
        top: 140%;
        transform: translateX(-50%);
        width: 300px;
        padding:15px;
        background-color: #f6f6f6;
        border-radius: 10px;
        box-shadow: 0px 0px 3px rgba(0,0,0,0.5);
        display: flex;
        flex-direction: column;
        color: #000;
        align-items: flex-start;
        cursor: default;
        .name {
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 10px;
          }
        }
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 9px;
          width: 100%;
          background-color: #fff;
          border-radius: 10px;
          margin-top: 10px;
          cursor: pointer;
          .itemname {
            font-size: 16px;
          }
          .itemnum {
            display: flex;
            align-items: center;
            color: #999999;
            font-size: 16px;
            .el-icon {
              width: 14px;
            }
          }
        }
        .item:hover {
          background-color: #f0f0f0;
          .itemname {
            font-weight: 800;
          }
        }
        .logout {
          margin-top: 15px;
          margin-left: 10px;
          font-size: 16px;
          cursor: pointer;
        }
        .logout:hover {
          font-weight: 600;
        }
      }
    }
    .order {
      margin-left: 1.2vw;
      display: flex;
      align-items: center;
      font-size: 15px;
      color: #fff;
      cursor: pointer;
      .el-icon {
        width: 15px;
        margin-top: 0.2vw;
      }
    }
  }
}
.contentbox {
  width: 100%;
  padding: 25px 110px;
  .content {
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
    padding: 15px;
    .topsel {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .selitem {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
        border-radius: 20px;
        background-color: #f7f7f7;
        font-size: 15px;
        margin-right: 10px;
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
          margin-right: 4px;
        }
      }
      .seleditem {
        font-weight: 800;
        background-color: #26b3f3 !important;
      }
    }
    .goods {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .goodsitem {
        margin-top: 20px;
        width: 20%;
        padding: 0 10px;
        .box:hover {
          box-shadow: 0px 0px 5px rgba(0,0,0,0.4);
        }
        .box {
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 10px;
          border-radius: 20px;
          cursor: pointer;
          .photo {
            width: 100%;
            aspect-ratio: 1 / 1;
            border-radius: 20px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .intd {
            margin-top: 10px;
            width: 100%;
            display: flex;
            flex-direction: column;
            .goodsname {
              width: 100%;
              font-size: 15px;
              line-height: 1.4;
              height: calc(1.4em * 2);   /* 固定两行高度 */
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;      /* 限制两行 */
              line-clamp: 2;
            }
            .goodsprice {
              margin-top: 5px;
              font-size: 22px;
              font-weight: 900;
              color: #ff4f24;
            }
            .goodsseller {
              img {
                width: 20px;
                height: 20px;
                margin-right: 5px;
              }
              font-size: 14px;
              color: #999999;
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
    .page {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}

.sidebar {
  position: fixed;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  width: 60px;
  height: 300px;
  border-radius: 40px;
  background-color: #fff;
  box-shadow: 0px 0px 3px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 13px 0;
  justify-content: space-between;
  span {
    width: 30px;
    border-bottom: 1px solid #c1bfbf;;
  }
  .side {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    .img {
      width: 25px;
      height: 25px;
      background-size: 100% 100%;
    }
    .icon1 {
      background-image: url('/src/assets/img/plus.png');
    }
    .icon2 {
      background-image: url('/src/assets/img/message.png');
    }
    .icon3 {
      background-image: url('/src/assets/img/back.png');
    }
    .icon4 {
      background-image: url('/src/assets/img/console.png');
    }
    .word {
      font-size: 13px;
    }
  }
  .side:hover .icon1 {
    background-image: url('/src/assets/img/plus_a.png');
  }
  .side:hover .icon2 {
    background-image: url('/src/assets/img/message_a.png');
  }
  .side:hover .icon3 {
    background-image: url('/src/assets/img/back_a.png');
  }
  .side:hover .icon4 {
    background-image: url('/src/assets/img/console_a.png');
  }
}

:deep(.el-pagination.is-background .el-pager li.is-active) {
  background: #26b3f3;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>