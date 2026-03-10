<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'
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
  { name: '咕咕嘎嘎', avatar: '/src/assets/img/test/a1.jpg', newtalk: '咕咕嘎嘎!!!', time: '2026-03-10 22:33:44', photo: '/src/assets/img/test/p1.png' }
])

const router = useRouter()
const goHome = () => {
  router.push({ 
    path: '/'
  });
};
const openPublishPage = () => {
  const routeData = router.resolve({
    path: '/publish'
  })
  window.open(routeData.href, '_blank')
}
</script>

<template>
  <div class="add">
    <div class="topbar">
      <div class="word" @click="goHome">
        校园二手交易
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
        <div class="left">
          <div class="top">
            消息
            <el-tooltip
              class="box-item"
              effect="dark"
              content="清除未读"
              placement="top"
            >
              <img src="/src/assets/img/read.webp"/>
            </el-tooltip>
          </div>
          <div class="selectarea">
            <div class="selectitem">
              <div class="icon">
                <img src="/src/assets/img/bell.png"/>
              </div>
              <div class="word">
                <div class="name">通知消息</div>
                <div class="talk">您的闲置已被下单</div>
                <div class="time">2026-03-10 11:45:14</div>
              </div>
              <div class="photo"></div>
            </div>
            <div class="selectitem" v-for="(item,index) in selitemlist" :key="index">
              <div class="icon" v-if="item.avatar">
                <img :src="item.avatar"/>
              </div>
              <div class="icon" v-else>
                <img src="/src/assets/img/avatar2.png"/>
              </div>
              <div class="word">
                <div class="name">{{ item.name }}</div>
                <div class="talk">{{ item.newtalk }}</div>
                <div class="time">{{ item.time }}</div>
              </div>
              <div class="photo">
                <img :src="item.photo"/>
              </div>
            </div>
          </div>
        </div>
        <div class="right"></div>
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
.add {
  width: 100%;
  height: 100%;
  background-color: #f5f7f9;
  display: flex;
  flex-direction: column;
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
        display: flex;
        justify-content: center;
        align-items: center;
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
            display: flex;
            justify-content: center;
            align-items: center;
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
  flex: 1;
  padding: 35px 190px 45px 190px;
  .content {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 0px 3px rgba(0,0,0,0.2);
    display: flex;
    overflow: hidden;
    .left {
      width: 30%;
      height: 100%;
      border-right: 1px solid #cecece;
      display: flex;
      flex-direction: column;
      background-color: #fafafa;
      .top {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        font-size: 20px;
        font-weight: 800;
        border-bottom: 0.5px solid #cecece;
        img {
          width: 30px;
          height: auto;
          cursor: pointer;
        }
      }
      .selectarea {
        width: 100%;
        flex: 1;
        overflow-y: auto;
        .selectitem:hover {
          background-color: #eeeeee;
        }
        .selectitem {
          width: 100%;
          height: 70px;
          display: flex;
          align-items: center;
          padding: 0 10px;
          cursor: pointer;
          .icon {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 100%;
              height: auto;
            }
          }
          .word {
            flex: 1;
            height: 100%;
            margin: 0 7px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .name {
              width: 100%;
              font-size: 15px;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;      /* 限制两行 */
              line-clamp: 1;
            }
            .talk {
              width: 100%;
              color: #afafaf;
              font-size: 13px;
              line-height: 1;
              height: calc(1em);
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;      /* 限制两行 */
              line-clamp: 1;
            }
            .time {
              width: 100%;
              color: #afafaf;
              font-size: 12.5px;
            }
          }
          .photo {
            width: 55px;
            height: 55px;
            border-radius: 10px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    .right {
      width: 70%;
      height: 100%;
    }
  }
}
.sidebar {
  position: fixed;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  width: 60px;
  height: 225px;
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