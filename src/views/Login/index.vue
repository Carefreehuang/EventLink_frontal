
<script>
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { Message } from '@arco-design/web-vue';

export default {
  name: 'AuthPage',
  setup() {
    const isLogin = ref(true); // 当前是否为登录模式
    const form = ref({
      username: '',
      password: '',
      confirmPassword: '',
    });
    const formRef = ref(null);
    const loading = ref(false);

    // 表单验证规则
    const rules = {
      username: [
        { required: true, message: '请输入用户名' },
        { minLength: 3, message: '用户名长度至少为 3 个字符' },
        { maxLength: 20, message: '用户名长度最多为 20 个字符' },
      ],
      password: [
        { required: true, message: '请输入密码' },
        { minLength: 6, message: '密码长度至少为 6 个字符' },
        { maxLength: 20, message: '密码长度最多为 20 个字符' },
      ],
      confirmPassword: [
        { required: true, message: '请确认密码' },
        {
          validator: (value, callback) => {
            if (value !== form.value.password) {
              callback('两次输入的密码不一致');
            } else {
              callback();
            }
          },
        },
      ],
    };

    // 切换登录/注册模式
    const toggleMode = () => {
      isLogin.value = !isLogin.value;
      formRef.value.resetFields(); // 重置表单
    };

    const doLogin = async () => {
        loading.value = true
        const res = await loginAPI({
            username: form.value.username,
            password: form.value.password,
        })
        if (res.data.code != 500) {
            Message.success('登录成功')
            console.log('登录成功', res)
        } else {
            Message.error(res.data.msg)
        }
        loading.value = false
    }

    return {
      isLogin,
      form,
      formRef,
      loading,
      rules,
      toggleMode,
      doLogin
    };
  },
};
</script>

<template>
    <div class="auth-page">
      <a-card class="auth-card">
        <h2>{{ isLogin ? '登录' : '注册' }}</h2>
        <a-form :model="form" :rules="rules" ref="formRef">
          <a-form-item field="username" label="用户名">
            <a-input v-model="form.username" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item field="password" label="密码">
            <a-input-password v-model="form.password" placeholder="请输入密码" />
          </a-form-item>
          <a-form-item v-if="!isLogin" field="confirmPassword" label="确认密码">
            <a-input-password v-model="form.confirmPassword" placeholder="请确认密码" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" :loading="loading" @click="doLogin()">
              {{ isLogin ? '登录' : '注册' }}
            </a-button>
          </a-form-item>
        </a-form>
        <p class="toggle-text" @click="toggleMode()">
          {{ isLogin ? '没有账号？立即注册' : '已有账号？立即登录' }}
        </p>
      </a-card>
    </div>
  </template>
  
  <style scoped>
  .auth-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--color-bg-2);
  }
  
  .auth-card {
    width:440px;
    padding: 20px;
  }
  
  .toggle-text {
    text-align: center;
    color: var(--color-primary);
    cursor: pointer;
  }
  
  .toggle-text:hover {
    text-decoration: underline;
  }
  </style>