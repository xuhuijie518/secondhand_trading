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

let fileList = ref([])
// 弹窗相关响应式数据
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
// 删除文件的处理函数
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
// 预览图片的处理函数
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

let introduction = ref('')
let typevalue = ref('')
let price = ref('')
let originalprice = ref('')
let shipment = ref('1')
const ifallowsubmit = computed(() => {
  const isAllFilled = 
    fileList.value.length > 0 &&
    introduction.value.trim() !== '' &&
    typevalue.value.trim() !== '' &&
    price.value.trim() !== '' &&
    shipment.value.trim() !== ''
  return !isAllFilled
})

const router = useRouter()
const goHome = () => {
  router.push({ 
    path: '/'
  });
};
const openMessagePage = () => {
  const routeData = router.resolve({
    path: '/message'
  })
  window.open(routeData.href, '_blank')
}
</script>

<template>
  <div class="add">
    <div class="topbar">
      <div class="word" @click="goHome">
        <img src="/src/assets/img/logo.png"/>
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
        <div class="title">发闲置</div>
        <div class="secondtitle">基础信息</div>
        <div class="thirdtitle">宝贝图片<span>*</span></div>
        <el-upload
          v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <div class="thirdtitle">宝贝描述<span>*</span></div>
        <el-input
          v-model="introduction"
          maxlength="1500"
          style="width: 100%"
          size="large"
          :autosize="{ minRows: 4, maxRows: 6 }"
          placeholder="描述一下宝贝的品牌型号、货品来源..."
          show-word-limit
          type="textarea"
        />
        <div class="thirdtitle">分类<span>*</span></div>
        <el-select v-model="typevalue" placeholder="请选择" style="width: 240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <div class="secondtitle">价格</div>
        <div class="thirdtitle">价格<span>*</span></div>
        <el-input
          v-model="price"
          placeholder="0.00"
          style="width: 240px"
          type="number"
        >
          <template #prefix>
            ￥
          </template>
        </el-input>
        <div class="thirdtitle">原价</div>
        <el-input
          v-model="originalprice"
          placeholder="0.00"
          style="width: 240px"
          type="number"
        >
          <template #prefix>
            ￥
          </template>
        </el-input>

        <div class="secondtitle">发货设置</div>
        <el-radio-group v-model="shipment">
          <el-radio value="1" size="large">配送</el-radio>
          <el-radio value="2" size="large">自提</el-radio>
        </el-radio-group>
      </div>
    </div>

    <div class="submit">
      <el-button type="primary" round :disabled="ifallowsubmit">发布</el-button>
    </div>
  </div>
  <div class="sidebar">
    <div class="side" @click="openMessagePage">
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
  <el-dialog v-model="dialogVisible">
    <img style="width: 100%" :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<style scoped lang="scss">
img {
  width: 100%;
  height: auto;
}
.add {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #f5f7f9;
  position: relative;
}
.topbar {
  width: 100%;
  padding: 3px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #26b3f3;
  .word {
    width: 200px;
    display: flex;
    align-items: center;
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
  padding: 25px 220px;
  .content {
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 100px;
    .title {
      font-size: 24px;
      font-weight: 800;
    }
    .secondtitle {
      font-size: 19px;
      font-weight: 600;
      margin-top: 25px;
    }
    .thirdtitle {
      margin-top: 15px;
      font-size: 16px;
      span {
        color: #ff0000;
      }
    }
  }
}

.submit {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 93px;
  background-color: #fff;
  box-shadow: 0px 0px 3px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  :deep(.el-button) {
    /* 自定义圆角按钮的通用尺寸 */
    width: 230px;
    height: 45px;
    font-size: 19px;
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