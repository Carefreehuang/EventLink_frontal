<script setup>
import { IconPenFill, IconMessage } from '@arco-design/web-vue/es/icon';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { logoutAPI } from '@/apis/user';
import { Message } from '@arco-design/web-vue';

const router = useRouter();
const userStore = useUserStore();

const doLogout = async () => {
  try {
    await logoutAPI();
    Message.success('退出登录成功');
  } catch (error) {
    Message.error('退出登录失败');
  }
  userStore.clearUserInfo();
  router.replace('/');
};

</script>

<template>
  <a-layout-header class="header">
    <!-- Logo -->
    <div class="logo">EventLink</div>

    <!-- 导航菜单 -->
    <a-menu mode="horizontal" :default-selected-keys="['1']">
      <a-menu-item key="1">首页</a-menu-item>
      <a-menu-item key="2">竞赛</a-menu-item>
      <a-menu-item key="3">论坛</a-menu-item>
      <a-menu-item key="4">关于我们</a-menu-item>
    </a-menu>

    <!-- 用户头像 -->
    <a-popover v-if="userStore.isLogin" placement="bottomRight" trigger="hover">
      <template #content>
        <div class="user-info">
          <div class="user-info-header">
            <a-avatar :size="40" class="info-avatar">用户</a-avatar>
            <p class="username">{{ userStore.userInfo.username }}</p>
          </div>
          <p class="schoolAndMajor">{{ userStore.userInfo.schoolName }} {{ userStore.userInfo.major }}</p>
          <a-divider margin="0"/>
          <div style="display: inline-block;">
            <a-button type="primary" shape="round" @click="router.replace(`/users/${userStore.userInfo.id}`)">个人中心</a-button>
            <a-button type="primary" shape="round" @click="doLogout">退出登录</a-button>
          </div>
        </div>
      </template>
      <a-avatar class="avatar" :size="40">用户</a-avatar>
    </a-popover>
    <a-button v-else type="primary" shape="round" @click="router.replace('/login')">登录/注册</a-button>


    <a v-if="userStore.isLogin" href="#" class="message-link">
      <div class="icon-wrapper">
        <IconMessage :size="24" />
        <span class="text">消息</span>
      </div>
    </a>

    <a-button v-if="userStore.isLogin" type="primary" shape="round">
      <template #icon>
        <icon-pen-fill />
      </template>
      <template #default>发布</template>
    </a-button>

  </a-layout-header>
</template>

<style scoped>
.header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 90px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.avatar {
  margin-left: 20px;
  cursor: pointer;
  margin: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* 内容靠左对齐 */
  gap: 8px;
  /* 元素之间的间距 */
}

.user-info-header {
  display: flex;
  align-items: center;
  /* 头像和用户名水平对齐 */
  gap: 12px;
  /* 头像和用户名之间的间距 */
}

.username {
  font-size: 20px;
  /* 用户名字体大小 */
  margin: 0;
  /* 去除默认 margin */
}

.schoolAndMajor {
  font-size: 12px;
  /* 学校专业字体稍小 */
  color: #666;
  /* 字体颜色稍浅 */
  margin: 0;
  /* 去除默认 margin */
}

.info-avatar {
  margin-right: 12px;
  /* 头像右侧间距 */
}

.message-link {
  text-decoration: none;
  /* 去掉链接下划线 */
  color: #4E5969;
  /* 继承父元素颜色 */
  width: 80px;
  /* 设置宽度 */
}

.icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text {
  margin-top: 2px;
  /* 调整文字与图标的间距 */
  font-size: 14px;
  /* 文字大小 */
  color: #4E5969
    /* 使用 Arco 的设计变量 */
}
</style>