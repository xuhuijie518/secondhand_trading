<script setup>
import { ref } from 'vue';
let selnav = ref(true)
let selitem = ref(1)

const pageNum = ref(1); // 当前页码
const total = ref(32); // 总条数
const currentChangeHandle = (val) => {
  pageNum.value = val;
  // fetchCompanyList(); //获取数据
};
let goodslist = ref([
  { id: 1, name: 'ブルーアーカイブ「澄んだ青空、萌ゆる心」CD官网自购，全新未拆带特典', img: '', price: 140, seller: '用户名', ifSold: false },
  { id: 2, name: '野兽先辈114514奥术魔刃黑胶至尊皇家限定收藏享受版唱片，梦回下北泽之夜', img: '', price: 114514, seller: '用户名', ifSold: true },
  { id: 7, name: 'BanG Dream! 高松灯同款「南极石」钥匙扣，复刻搬运手感，咕咕嘎嘎限定款', img: '/src/assets/img/test/a1.jpg', price: 99, seller: '用户名', ifSold: true },
  { id: 4, name: '丰川祥子客服话术手册（全语种版），含「すみません」高频回复模板，售后无忧', img: '', price: 10, seller: '用户名', ifSold: true },
  { id: 5, name: '田所浩二专属下北泽红茶冲泡教程+同款搪瓷杯，114℃恒温冲泡，口感醇厚,', img: '', price: 514, seller: '用户名', ifSold: true },
  { id: 6, name: '千早爱音 拉面店打工体验券，管吃管饱，就是有点吵', img: '', price: 58, seller: '用户名', ifSold: true },
  { id: 7, name: '要乐奈 猫叫陪聊服务，喵喵叫一整天，绝不冷场', img: '', price: 25, seller: '用户名', ifSold: true },
  { id: 8, name: '椎名立希 街头劝架代打服务，吵架必赢，主打一个暴躁', img: '', price: 66, seller: '用户名', ifSold: true },
  { id: 11, name: '孤独摇滚 波奇酱自闭角落出租，社恐专用，隔音超好', img: '', price: 11, seller: '用户名', ifSold: true },
  { id: 12, name: '虹夏 架子鼓即兴教学，嗓门大节奏稳，邻居都能听见', img: '', price: 33, seller: '用户名', ifSold: true },
  { id: 13, name: '喜多郁代 可爱夸夸服务，全程彩虹屁，心情秒变好', img: '', price: 15, seller: '用户名', ifSold: true },
  { id: 14, name: 'EVA 初号机暴走陪跑服务，跑得快，就是有点费电', img: '', price: 999, seller: '用户名', ifSold: true },
  { id: 16, name: '链锯人 恶魔代打服务，只要一根棒棒糖', img: '', price: 1, seller: '用户名', ifSold: true },
  { id: 17, name: '初音未来 甩葱歌纯享U盘，无限循环，葱味十足', img: '', price: 39, seller: '虚拟歌姬周边店', ifSold: true },
  { id: 6, name: '梁逸峰 朗诵诗朗诵原声U盘，特别的朗诵技巧，提神醒脑', img: '', price: 22, seller: '朗诵艺术家', ifSold: true },
  { id: 7, name: '波澜哥 离不开你破音版教学，高音不破不收费，破了也不赔', img: '', price: 15, seller: '波澜高音培训', ifSold: true },
  { id: 9, name: '窃·格瓦拉 不打工人生指南，看守所比家好，就是不打工', img: '', price: 24, seller: '精神领袖分店', ifSold: true },
  { id: 10, name: '大力哥 曾经辉煌人生语录，一天不喝大力我浑身难受', img: '', price: 36, seller: '大力经销商', ifSold: true },
  { id: 11, name: '金坷垃 农业至尊肥料，一袋能顶两袋撒，不流失不蒸发', img: '', price: 100, seller: '美国圣地亚哥', ifSold: true },
  { id: 12, name: '蓝蓝路 麦当劳魔性舞蹈教学光盘，鬼畜入门必学', img: '', price: 19, seller: '麦当劳叔叔', ifSold: true },
  { id: 13, name: '德国BOY 键盘破坏教程，我练功发自真心！', img: '', price: 28, seller: '练功狂人', ifSold: true },
  { id: 14, name: '杰哥不要 超勇人生教育DVD，彬彬就是逊啦', img: '', price: 58, seller: '杰哥便利店', ifSold: true },
  { id: 15, name: 'Van样 暗黑佟大为哲学教学，乖乖站好！', img: '', price: 114, seller: '暗黑健身房', ifSold: true },
  { id: 16, name: '多田野数人 真夏夜银梦名场面海报，下北泽限定', img: '', price: 514, seller: '银梦本铺', ifSold: true },
  { id: 17, name: '诸葛亮 骂王朗原声大碟，我从未见过如此厚颜无耻之人', img: '', price: 66, seller: '武乡侯文创', ifSold: true },
  { id: 18, name: '王司徒 苟利国家生死以表情包合集，丞相息怒', img: '', price: 9, seller: '司徒退休办', ifSold: true },
  { id: 19, name: '庞麦郎 我的滑板鞋时尚时尚最时尚CD，摩擦摩擦', img: '', price: 13, seller: '时尚教父', ifSold: true },
  { id: 20, name: '雪姨 开门呐魔性录音，你有本事抢男人，没本事开门啊', img: '', price: 20, seller: '傅文佩家', ifSold: true },
  { id: 21, name: '容嬷嬷 扎针教学手册，手法专业，专治不服', img: '', price: 33, seller: '坤宁宫医务室', ifSold: true },
  { id: 22, name: '男人过了20岁就不要穿得像个孩子 穿搭指南', img: '', price: 45, seller: '老干部穿搭铺', ifSold: true },
  { id: 23, name: '华强买瓜 正版西瓜，保熟，不劈不裂', img: '', price: 15, seller: '生瓜蛋子摊', ifSold: true },
  { id: 24, name: '刘华强 你这瓜保熟吗名场面T恤，鬼畜区标配', img: '', price: 39, seller: '衡州水果摊', ifSold: true },
]);
</script>

<template>
    <div class="main">
        <div class="topinfo">
            <div class="left">
                <div class="avatar">
                <img src="/src/assets/img/avatar2.png"/>
                </div>
                <div class="name">用户名</div>
            </div>
            <div class="editbtn">编辑资料</div>
        </div>
        <div class="navarea">
            <div class="navbox">
                <div class="nav" @click="selnav = true">
                    <div class="word" :class="{navactive: selnav}">宝贝</div>
                    <div class="num">37</div><span :style="{opacity: selnav? 1 : 0}"></span>
                </div>
                <div class="nav" @click="selnav = false">
                    <div class="word" :class="{navactive: !selnav}">信用及评价</div>
                    <div class="num">93</div><span :style="{opacity: selnav? 0 : 1}"></span>
                </div>
            </div>
            <div class="editbtn">宝贝管理</div>
        </div>
        <div class="selarea">
            <div class="selitem" @click="selitem = 1" :class="{ seleditem: selitem == 1 }">综合</div>
            <div class="selitem" @click="selitem = 2" :class="{ seleditem: selitem == 2 }">在售</div>
            <div class="selitem" @click="selitem = 3" :class="{ seleditem: selitem == 3 }">已售出36</div>
        </div>
        <div class="goods">
          <div class="goodsitem" v-for="(item,index) in goodslist.slice(0,12)" :key="index">
            <div class="box">
              <div class="photo">
                <div class="photoc" v-if="item.img">
                    <img :src="item.img"/>
                </div>
                <div class="photoc" v-else><img src="/src/assets/img/noimg.png"/></div>
                <div class="sold" v-if="item.ifSold"><img src="/src/assets/img/soldout.png"/></div>
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
</template>

<style scoped lang="scss">
.main {
    width: 100%;
    display: flex;
    flex-direction: column;
    .topinfo {
        width: 100%;
        height: 185px;
        border-bottom: 1px solid #f5f5f5;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(
          to bottom left,
          #7bccf1 0%,
          #ffffff 100%
        );
        .left {
            display: flex;
            align-items: center;
        }
        .avatar {
            width: 108px;
            height: 108px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            overflow: hidden;
            background-color: #fff;
          img {
                width: 100%;
          }
        }
        .name {
            font-size: 19px;
            font-weight: 800;
            margin-left: 15px;
        }
        .editbtn {
            padding: 5px 15px;
            background-color: #26b3f3;
            color: #fff;
            font-size: 15px;
            border-radius: 30px;
            cursor: pointer;
        }
    }
    .navarea {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 50px;
        align-items: center;
        margin-top: 20px;
        padding: 0 20px;
        .navbox {
            display: flex;
            align-items: center;
        }
        .nav {
            display: flex;
            align-items: start;
            font-size: 17px;
            color: #757575;
            position: relative;
            cursor: pointer;
            margin-right: 55px;
            .word {
                z-index: 1;
            }
            .num {
                position: absolute;
                top: 0;
                left: 100%;
                font-size: 13px;
                margin-right: 35px;
            }
            span {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 8px;
                background-color: #26b3f3;
                z-index: 0;
                opacity: 0;
            }
        }
        .navactive {
            font-weight: 700;
            color: #000;
        }
        .editbtn {
            padding: 2px 7px;
            border: 1px solid #ebebeb;
            border-radius: 5px;
            cursor: pointer;
        }
        .editbtn:hover {
            background-color: #f6f6f6;
        }
    }
    .selarea {
        display: flex;
        width: 100%;
        align-items: center;
        padding: 10px 20px;
        .selitem {
            font-size: 16px;
            padding: 3px 9px;
            background-color: #f6f6f6;
            margin-right: 10px;
            border-radius: 5px;
            cursor: pointer;
        }
        .seleditem {
            font-weight: 600;
            background-color: #26b3f3 !important;
        }
    }
    .goods {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .goodsitem {
        margin-top: 20px;
        width: 25%;
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
            position: relative;
            .photoc {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .sold {
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(198, 198, 198, 0.4);
                z-index: 2;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 60%;
                    height: 60%;
                }
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
      margin-bottom: 20px;
    }
}
</style>