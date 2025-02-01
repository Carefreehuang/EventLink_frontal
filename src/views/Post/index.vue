<script setup>
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import httpInstance from '@/utils/http';

// 表单数据
const postForm = ref({
  title: '',
  content: '',
});

// 提交表单函数
const submitPost = async () => {
  if (!postForm.value.title.trim() || !postForm.value.content.trim()) {
    Message.error('标题和内容不能为空');
    return;
  }
  try {
    const response = await httpInstance.post('/posts', postForm.value);
    if (response.data.code === 200) {
      Message.success('发帖成功');
      postForm.value.title = '';
      postForm.value.content = '';
    } else {
      Message.error(response.data.msg || '发帖失败');
    }
  } catch (error) {
    console.error('发帖失败:', error);
    Message.error('发帖请求失败，请稍后再试');
  }
};
</script>

<template>
  <a-card title="" class="post-card">
    <!-- 标题输入框 -->
    <a-form-item label="" required>
      <a-input v-model="postForm.title" placeholder="请输入帖子标题" class="custom-input no-border" />
    </a-form-item>
    <a-divider />

    <!-- 内容输入框 -->
    <a-form-item label="" required>
      <a-textarea v-model="postForm.content" placeholder="请输入帖子内容" class="custom-textarea no-border"
        :auto-size="{ minRows: 4, maxRows: 8 }" />
    </a-form-item>

    <!-- 提交按钮 -->
    <a-button type="primary" @click="submitPost">提交</a-button>
  </a-card>
</template>

<style scoped>
.post-card {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background: #FFFFFF;
  /* 背景颜色 */
}

/* 自定义输入框样式 */
.custom-input,
.custom-textarea {
  color: #333;
  /* 文本颜色 */
  border-radius: 4px;
  /* 圆角 */
  padding: 8px;
  /* 内边距 */
  background: #FFFFFF;
  /* 背景颜色 */
}

/* 去掉边框 */
.no-border {
  border: none;
  outline: none;
  /* 移除聚焦时的默认边框 */
}

.custom-textarea {
  resize: none;
  /* 禁止拖动调整大小 */
}
</style>
