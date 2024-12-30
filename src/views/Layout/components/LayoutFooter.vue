<template>
    <a-layout-footer class="footer">
      <div class="footer-content">
        <!-- 版权信息 -->
        <div class="copyright">
          &copy; 2023 竞赛交流平台. 保留所有权利。
        </div>
  
        <!-- 友情链接 -->
        <div class="links">
          <a href="https://example.com" target="_blank">关于我们</a>
          <a href="https://example.com" target="_blank">联系我们</a>
          <a href="https://example.com" target="_blank">隐私政策</a>
          <a href="https://example.com" target="_blank">服务条款</a>
        </div>
  
        <!-- 社交媒体 -->
        <div class="social-media">
          <a href="https://facebook.com" target="_blank">
            <icon-facebook :size="20" />
          </a>
          <a href="https://twitter.com" target="_blank">
            <icon-twitter :size="20" />
          </a>
          <a href="https://instagram.com" target="_blank">
            <icon-instagram :size="20" />
          </a>
          <a href="https://github.com" target="_blank">
            <icon-github :size="20" />
          </a>
        </div>
      </div>
    </a-layout-footer>
  </template>
  
  <script setup>
  import {
    IconFacebook,
    IconTwitter,
    IconInstagram,
    IconGithub,
  } from '@arco-design/web-vue/es/icon';
  </script>
  
  <style scoped>
  .footer {
    background-color: #f0f0f0;
    padding: 20px 0;
    text-align: center;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .copyright {
    font-size: 14px;
    color: #666;
  }
  
  .links {
    display: flex;
    gap: 20px;
  }
  
  .links a {
    color: #666;
    text-decoration: none;
    font-size: 14px;
  }
  
  .links a:hover {
    color: #000;
  }
  
  .social-media {
    display: flex;
    gap: 20px;
  }
  
  .social-media a {
    color: #666;
  }
  
  .social-media a:hover {
    color: #000;
  }
  </style>