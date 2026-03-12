<script setup>
import { ref, computed, nextTick } from 'vue';
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
  { id: 1, name: '咕咕嘎嘎', avatar: '/src/assets/img/test/a1.jpg', newtalk: '咕咕嘎嘎!!!', time: '2026-03-10 22:33:44', photo: '/src/assets/img/test/p1.png' },
  { id: 2, name: '下北泽小卖部', avatar: '', newtalk: 'やりますね', time: '2025-11-14 11:45:14', photo: '/src/assets/img/test/p2.jpg' },
  { id: 3, name: '奏大煎饼店', avatar: '', newtalk: '阿嘎慕斯！！', time: '2025-11-11 10:40:10', photo: '/src/assets/img/test/p3.gif' },
])
let selectedrole = ref('')
const selectrole = (id) => {
  selectedrole.value = id;
  nextTick(() => {
    scrollToBottom2();
  });
}


let currentuser = ref({
  id: Date.now() + Math.random().toString(36).substring(2, 9),
  role: 'self',
  userId: 1,
  name: '用户名',
  avatar: '/src/assets/img/avatar2.png'
});
// 对话内容
const messages = ref([
  {
    id: 2020601,
    role: 'other',
    userId: 1,
    name: '咕咕嘎嘎',
    avatar: '/src/assets/img/test/a1.jpg',
    text: '我从南极来',
    time: Date.now()
  },
  {
    id: 2020602,
    role: 'other',
    userId: 1,
    name: '咕咕嘎嘎',
    avatar: '/src/assets/img/test/a1.jpg',
    text: '最喜欢持石',
    time: Date.now()
  },
  {
    id: 2020603,
    role: 'other',
    userId: 1,
    name: '咕咕嘎嘎',
    avatar: '/src/assets/img/test/a1.jpg',
    text: '灵感菇刮擦',
    time: Date.now()
  },
  {
    id: 2020604,
    role: 'other',
    userId: 1,
    name: '咕咕嘎嘎',
    avatar: '/src/assets/img/test/a1.jpg',
    text: '咕咕又嘎嘎',
    time: Date.now()
  },
  {
    id: 2020605,
    role: 'other',
    userId: 1,
    name: '咕咕嘎嘎',
    avatar: '/src/assets/img/test/a1.jpg',
    text: '组了个乐队',
    time: Date.now()
  },
  {
    id: 2020606,
    role: 'other',
    userId: 1,
    name: '咕咕嘎嘎',
    avatar: '/src/assets/img/test/a1.jpg',
    text: '全都不是人',
    time: Date.now()
  },
  {
    id: 2020607,
    role: 'other',
    userId: 1,
    name: '咕咕嘎嘎',
    avatar: '/src/assets/img/test/a1.jpg',
    text: '想成为人类',
    time: Date.now()
  },
  {
    id: 2020608,
    role: 'other',
    userId: 1,
    name: '咕咕嘎嘎',
    avatar: '/src/assets/img/test/a1.jpg',
    text: '神人把我黑',
    time: Date.now()
  },
  {
    id: 2020609,
    role: 'self',
    userId: 2,
    name: '用户名',
    avatar: '/src/assets/img/avatar2.png',
    text: '咕咕嘎嘎！！！',
    time: Date.now()
  },
]);
let inputText = ref('')
const ifallowsubmit = computed(() => {
  const isAllFilled = 
    inputText.value.trim() !== ''
  return !isAllFilled
})
let newMessage = ref('');
const sendmessage = () => {
  if(!inputText.value) {
    console.log('请输入消息')
    return;
  }
  newMessage.value = {
    ...currentuser.value,
    text: String(inputText.value),
    time: Date.now()
  }
  messages.value.push(newMessage.value);
  nextTick(scrollToBottom);
  inputText.value = '';
};
const sendemoji = (img) => {
  newMessage.value = {
    ...currentuser.value,
    emoji: img,
    time: Date.now()
  }
  messages.value.push(newMessage.value);
  nextTick(scrollToBottom);
  ifEmoji.value = false;
  ifchafen.value = false;
};
const sendphoto = (img) => {
  newMessage.value = {
    ...currentuser.value,
    photo: img,
    time: Date.now()
  }
  messages.value.push(newMessage.value);
  nextTick(scrollToBottom);
};
const handleEnterKey = (event) => {
  if (event.key !== 'Enter') return;

  // Shift + Enter 换行
  if (event.shiftKey) {
    return; // 直接允许默认换行
  }

  // 普通 Enter 发送
  event.preventDefault();
  sendmessage();
};

const acceptFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const fileInput = ref(null)
const handleClickUpload = () => {
  if(currentuser.value) {
    fileInput.value.click();
  }
}
const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    const base64 = reader.result
    sendphoto(base64);
  }
}
const delmessage = (id) => {
  messages.value = messages.value.filter(item => item.id !== id)
};
const chatarea = ref('');
const scrollToBottom = () => {
  const el = chatarea.value
  if (el) {
    el.scrollTo({
      top: el.scrollHeight,
      behavior: 'smooth'
    })
  }
}
// 无动画、瞬间定位到最底部的函数
const scrollToBottom2 = () => {
  const el = chatarea.value;
  if (!el) return;

  // 步骤1：临时禁用浏览器的平滑滚动（关键！）
  const originalBehavior = el.style.scrollBehavior;
  el.style.scrollBehavior = 'auto'; // 强制关闭平滑滚动

  // 步骤2：瞬间定位到底部（无任何动画）
  el.scrollTop = el.scrollHeight;

  // 步骤3：恢复原有scrollBehavior（避免影响后续操作）
  // 用setTimeout确保定位完成后再恢复，防止浏览器优化导致失效
  setTimeout(() => {
    el.style.scrollBehavior = originalBehavior;
  }, 0);
};



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
            <div class="area">
              <div class="selectitem" :style="{backgroundColor: selectedrole == 'notice' ? '#eeeeee':'#fafafa'}" @click="selectedrole = 'notice'">
                <div class="icon">
                  <img src="/src/assets/img/bell.png"/>
                </div>
                <div class="word">
                  <div class="name">通知消息</div>
                  <div class="talk">您的闲置已被下单</div>
                  <div class="time">2026-03-10 11:45:14</div>
                </div>
              </div>
              <div class="selectitem" :style="{backgroundColor: selectedrole == item.id ? '#eeeeee':'#fafafa'}" v-for="(item,index) in selitemlist" :key="index" @click="selectrole(item.id)">
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
        </div>
        <div class="right">
          <div v-if="selectedrole" style="width: 100%; height: 100%;">
            <div v-if="selectedrole == 'notice'" class="main">
              <div class="top">
                <div class="name">通知消息</div>
              </div>
              <div class="bottom">
                <div class="area">

                </div>
              </div>
            </div>
            <div v-else class="main">
              <div class="top" style="height: 140px;flex-direction: column;">
                <div class="info">
                  <div class="name">咕咕嘎嘎</div>
                  <div class="home">
                    <img src="/src/assets/img/home.svg"/>
                    个人空间
                  </div>
                </div>
                <div class="shop">
                  <div class="shopimg">
                    <img src="/src/assets/img/test/p1.png"/>
                  </div>
                  <div class="price">
                    ￥99.00
                  </div>
                </div>
              </div>
              <div class="bottom">
                <div class="area">
                  <div class="talkarea" ref="chatarea">
                    <div class="chatbox" ref="chatbox">
                      <div class="chatrole" v-for="(item) in messages" :key="item.id">
                        <div class="rolevary" v-if="item.role == 'other'">
                          <div class="chatavatar">
                            <img :src="item.avatar"/>
                          </div>
                          <div class="chatright">
                            <div class="charname">{{ item.name }}</div>
                            <div class="chartalk">
                              <div class="bubblebox">
                                <div v-if="item.emoji" class="emojibubble">
                                  <div class="emojiimgbox">
                                    <img :src="item.emoji"/>
                                  </div>
                                </div>
                                <div v-else-if="item.photo" class="photobubble">
                                  <img :src="item.photo" style="max-width: 100%;"/>
                                </div>
                                <div
                                  class="bubble"
                                  v-else
                                >
                                  {{ item.text }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="rolevary2" v-if="item.role == 'self'">
                          <div class="chatright2">
                            <div class="chartalk2">
                              <div class="bubblebox2">
                                <div v-if="item.emoji" class="emojibubble">
                                  <div class="emojiimgbox">
                                    <img :src="item.emoji"/>
                                  </div>
                                </div>
                                <div v-else-if="item.photo" class="photobubble">
                                  <img :src="item.photo" style="max-width: 100%;"/>
                                </div>
                                <div
                                  v-else
                                  class="bubble2"
                                >
                                  {{ item.text }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="sendarea">
                    <div class="tool">
                      <div class="emoji" @click="openemoji()"></div>
                      <div class="photo" @click="handleClickUpload"></div>
                      <input
                        ref="fileInput"
                        type="file"
                        :accept="acceptFileTypes"
                        style="display: none"
                        @change="handleFileChange"
                      />
                    </div>
                    <div class="inputa">
                      <textarea
                        ref="inputRef"
                        v-model="inputText"
                        placeholder="请输入"
                        class="textarea"
                        @keydown="handleEnterKey"
                      ></textarea>
                    </div>
                    <div class="send">
                      <el-button @click="sendmessage" type="primary" round :disabled="ifallowsubmit">发送</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="none">
            <img src="/src/assets/img/mbg.png"/>
            <div class="font1">尚未选择任何联系人</div>
            <div class="font2">快点左侧列表聊起来吧~</div>
          </div>
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
        z-index: 100;
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
        img {
          width: 30px;
          height: auto;
          cursor: pointer;
        }
      }
      .selectarea {
        width: 100%;
        flex: 1;
        position: relative;
        .area {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow-y: auto;
          scroll-behavior: smooth;
        }
        /* 滚动条整体 */
        .area::-webkit-scrollbar {
          width: 7px;
        }
        /* 滚动条轨道 */
        .area::-webkit-scrollbar-track {
          background: transparent;
        }
        /* 滑块 */
        .area::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .selectitem:hover {
          background-color: #eeeeee !important;
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
              -webkit-line-clamp: 1;
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
              -webkit-line-clamp: 1;
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
            background-color: #fff;
          }
        }
      }
    }
    .right {
      width: 70%;
      height: 100%;
      .none {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 130px;
        }
        .font1 {
          font-size: 15px;
          font-weight: 500;
        }
        .font2 {
          font-size: 13px;
          color: #a6a6c4;
        }
      }
      .main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .top {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        font-weight: 800;
        border-bottom: 0.5px solid #cecece;
        .info {
          width: 100%;
          height: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .shop {
          width: 100%;
          height: 80px;
          display: flex;
          align-items: start;
          .shopimg {
            width: 70px;
            height: 70px;
            border-radius: 10px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
          }
          .price {
            color: #ff4d4d;
            font-weight: 600;
            font-size: 16px;
            margin-left: 5px;
          }
        }
        .name {
          font-size: 18px;
          font-weight: 600;
        }
        .home {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 500;
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid #ebebeb;
          cursor: pointer;
          img {
            width: 16px;
            height: 17px;
            margin-right: 5px;
          }
        }
      }
      .bottom {
        width: 100%;
        flex: 1;
        position: relative;
        .area {
          position: absolute;
          width: 100%;
          height: 100%;
          .talkarea {
            width: 100%;
            height: calc(100% - 150px);
            position: relative;
            overflow-y: auto;
            overflow-x: hidden;
            scroll-behavior: smooth;
          }
          .talkarea::-webkit-scrollbar {
            width: 6px;
          }
          .talkarea::-webkit-scrollbar-track {
            background: transparent;
          }
          .talkarea::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 10px;
          }
          .chatbox {
            position: absolute;
            width: 100%;
            display: flex;
            flex-direction: column;
            padding-top: 10px;
            .chatrole {
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: start;
            }
            .rolevary {
              margin-left: 20px;
              width: 96%;
              display: flex;
              align-items: start;
            }
            .rolevary2 {
              width: 100%;
              display: flex;
              align-items: start;
              justify-content: end;
            }
            .chatavatar {
              width: 55px;
              aspect-ratio: 1 / 1;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              border-radius: 50%;
              margin-top: 10px;
            }
            .chatright {
              width: 84.5%;
              margin-left: 15px;
              display: flex;
              flex-direction: column;
            }
            .chatright2 {
              width: 89.5%;
              display: flex;
              justify-content: end;
            }
            .charname {
              width: 100%;
              color: #666666;
              font-size: 15px;
              padding: 0.1vw 0;
            }
            .chartalk {
              display: flex;
              width: 89%;
              margin-bottom: 5px;
            }
            .chartalk2 {
              display: flex;
              justify-content: end;
              width: 98%;
              margin-bottom: 5px;
              padding-right: 20px;
            }
            .bubblebox {
              display: flex;
              position: relative;
            }
            .emojibubble {
              position: relative;
              padding: 5px;
              background-color: #ffffff;
              border: 2px solid #cdd3dc;
              border-radius: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .emojiimgbox {
              width: 190px;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
            }
            .emojiimgbox img {
              height: auto;
              width: 100%;
            }
            .photobubble {
              position: relative;
              background-color: #ffffff;
              border: 2px solid #cdd3dc;
              border-radius: 10px;
              padding: 5px;
              display: flex;
              max-width: 250px;
            }
            .bubble {
              position: relative;
              font-size: 13.5px;
              background-color: #f2f2f4;
              border-radius: 6px;
              padding: 6px 8px;
              /* 关键部分：让英文单词也能自动换行 */
              word-wrap: break-word;
              word-break: break-all;
              white-space: pre-wrap;
            }
            .bubble::after {
              content: '';
              position: absolute;
              right: 99.8%;
              top: 25%;
              border-width: 5px;
              border-style: solid;
              border-color: transparent #f2f2f4 transparent transparent;
            }

            .bubblebox2 {
              display: flex;
              position: relative;
            }
            .bubble2 {
              position: relative;
              font-size: 13.5px;
              color: #fff;
              background-color: #26b3f3;
              border-radius: 6px;
              padding: 6px 8px;
              /* 关键部分：让英文单词也能自动换行 */
              word-wrap: break-word;
              word-break: break-all;
              white-space: pre-wrap;
            }
            .bubble2::after {
              content: '';
              position: absolute;
              left: 99.8%;
              top: 25%;
              border-width: 0.4vw;
              border-style: solid;
              border-color: transparent transparent transparent #26b3f3;
            }
          }

          .sendarea {
            width: 100%;
            height: 150px;
            background-color: #fcfcfc;
            border-top: 1px solid #cecece;
            .tool {
              width: 100%;
              height: 35px;
              display: flex;
              align-items: center;
              .photo {
                width: 30px;
                height: 30px;
                cursor: pointer;
                -webkit-mask: url('/src/assets/photo.png') no-repeat center;
                mask: url('/src/assets/photo.png') no-repeat center;
                -webkit-mask-size: contain;
                mask-size: contain;
                background-color: #bdbdbd;
                transition: all 0.3s ease;
                margin-left: 10px;
              }
              .emoji {
                width: 27px;
                height: 27px;
                cursor: pointer;
                -webkit-mask: url('/src/assets/emoji.png') no-repeat center;
                mask: url('/src/assets/emoji.png') no-repeat center;
                -webkit-mask-size: contain;
                mask-size: contain;
                background-color: #bdbdbd;
                transition: all 0.3s ease;
                position: relative;
                margin-left: 10px;
              }
              .photo:hover, .emoji:hover {
                background-color: #409eff;
              }
            }
            .inputa {
              width: 100%;
              height: 75px;
              display: flex;
              .textarea {
                width: 100%;
                height: 100%;
                border: none;
                background-color: #fcfcfc;
                font-size: 16px;
                font-family: sans-serif;
                padding: 0 10px;
                resize: none;
                overflow: auto;
                transition: all 0.3s ease;
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE、Edge */
              }
              .textarea::-webkit-scrollbar {
                display: none; /* Chrome、Safari */
              }
              .textarea::placeholder { color: #a8abb2; }
              .textarea:focus {
                outline: none;
              }
            }
            .send {
              width: 100%;
              height: 40px;
              display: flex;
              justify-content: end;
              align-items: center;
              padding-right: 5px;
              :deep(.el-button) {
                width: 77px;
                height: 30px;
                font-size: 14px;
              }
            }
          }
        }
        /* 滚动条整体 */
        .area::-webkit-scrollbar {
          width: 7px;
        }
        /* 滚动条轨道 */
        .area::-webkit-scrollbar-track {
          background: transparent;
        }
        /* 滑块 */
        .area::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
      }
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