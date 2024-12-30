
<script setup>
import { ref } from 'vue';
import { loginAPI, registerAPI } from '@/apis/user';
import { Message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router'

const router = useRouter()
// 定义响应式数据
const isLogin = ref(true); // 当前是否为登录模式
const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone: '',
  schoolName: '',
  major: '',
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
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '请输入有效的邮箱地址' },
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
  ],
};

// 切换登录/注册模式
const toggleMode = () => {
  isLogin.value = !isLogin.value;
  formRef.value.resetFields(); // 重置表单
};

// 登录逻辑
const doLogin = async () => {
  loading.value = true;
  try {
    const res = await loginAPI({
      username: form.value.username,
      password: form.value.password,
    });
    if (res.data.code !== 500) {
      Message.success('登录成功');
      console.log('登录成功', res);
      // 处理登录成功逻辑，如跳转到首页
      router.replace({path:'/'})
    } else {
      Message.error(res.data.msg);
    }
  } catch (error) {
    Message.error('登录失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};

// 注册逻辑
const doRegister = async () => {
  loading.value = true;
  try {
    const res = await registerAPI({
      username: form.value.username,
      password: form.value.password,
      email: form.value.email,
      phone: form.value.phone,
      schoolName: form.value.schoolName,
      major: form.value.major,
    });
    if (res.data.code !== 500) {
      Message.success('注册成功');
      console.log('注册成功', res);
      toggleMode(); // 注册成功后切换到登录模式
    } else {
      Message.error(res.data.msg);
    }
  } catch (error) {
    Message.error('注册失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};

// 登录或注册
const LoginOrRegister = async () => {
  try {
    const valid = await formRef.value.validate();
    console.log('valid', valid);
    if (!valid) {
      if (isLogin.value) {
        await doLogin();
      } else {
        await doRegister();
      }
    }
  } catch (error) {
    Message.error('请检查表单填写是否正确');
  }
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
          <a-form-item v-if="!isLogin" field="email" label="邮箱">
            <a-input v-model="form.email" placeholder="请输入邮箱" />
          </a-form-item>
          <a-form-item v-if="!isLogin" field="phone" label="手机号">
            <a-input v-model="form.phone" placeholder="请输入手机号" />
          </a-form-item> 
          <a-form-item v-if="!isLogin" field="schoolName" label="学校名称">
            <a-input v-model="form.schoolName" placeholder="请输入学校名称" />
          </a-form-item>
          <a-form-item v-if="!isLogin" field="major" label="专业">
            <a-input v-model="form.major" placeholder="请输入专业名称" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit" :loading="loading" @click="LoginOrRegister">
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