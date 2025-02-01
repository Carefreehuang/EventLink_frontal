<template>
      <!-- 固定导航栏 -->
      <a-layout-header class="header fixed-header">
        <!-- Logo -->
        <div class="logo">竞赛交流平台</div>
  
        <!-- 导航菜单 -->
        <a-menu mode="horizontal" :default-selected-keys="['1']">
          <a-menu-item key="1">首页</a-menu-item>
          <a-menu-item key="2">竞赛</a-menu-item>
          <a-menu-item key="3">论坛</a-menu-item>
          <a-menu-item key="4">关于我们</a-menu-item>
        </a-menu>
  
        <!-- 用户头像 -->
        <a-popover placement="bottomRight" trigger="hover">
            <template #content>
            <div class="user-info">
                <a-avatar :size="64" class="info-avatar" >
                  <img :src="userInfo.avatarUrl" alt="用户头像" />
                </a-avatar>
                <p class="username">用户名：JohnDoe</p>
                <p class="schoolName">学校：武汉理工大学</p>
                <p class="email">邮箱：john@example.com</p>
                <a-button type="primary" block @click="handleLogout">退出登录</a-button>
            </div>
            </template>
            <a-avatar class="avatar" :size="40">
                  <img :src="userInfo.avatarUrl" alt="用户头像" />
            </a-avatar>
        </a-popover>
        </a-layout-header>
  </template>
  
  <script setup>
  // 无需额外的逻辑
  </script>
  
  <style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 0 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  
  .logo {
    font-size: 20px;
    font-weight: bold;
  }
  
  .avatar {
    margin-left: 20px;
  }
  
  .content {
    padding-top: 64px; /* 与导航栏高度一致，避免内容被遮挡 */
  }
  
  .content-wrapper {
    padding: 20px;
  }
  .user-info {
    text-align: center;
  }
  
  .info-avatar {
    margin-bottom: 10px;
  }
  
  .username,
  .email {
    margin: 5px 0;
    font-size: 14px;
  }
  </style>