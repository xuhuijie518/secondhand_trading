<script setup>
import { ref } from 'vue';
let selnav = ref(true)
let selitem = ref(1)
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
}
</style>