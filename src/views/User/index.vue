<script setup>
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { onMounted, ref, computed } from 'vue';
import { fetchUserInfo, updateAvatar, updateUserInfo } from '@/apis/user';
import { Message } from '@arco-design/web-vue';
import { uploadAPI } from '@/apis/common';
import { IconCamera } from '@arco-design/web-vue/es/icon';

const userStore = useUserStore();
const route = useRoute();

// 用户信息
const userInfo = ref({});

// 当前用户 ID
const curUserId = ref(userStore.userInfo.id);

// 目标用户 ID
const targetUserId = Number(route.params.id);

// 判断当前用户是否正在查看自己的页面
const isCurUser = computed(() => curUserId.value === targetUserId);

// 编辑弹窗的显示状态
const editModalVisible = ref(false);

// 编辑表单数据
const editForm = ref({
    username: '',
    schoolName: '',
    major: '',
    className: '',
    email: '',
});

// 头像上传输入框引用
const avatarInputRef = ref(null);

// 打开编辑弹窗
const openEditModal = () => {
    // 将当前用户信息填充到表单中
    editForm.value = { ...userInfo.value };
    editModalVisible.value = true;
};

// 保存编辑
const saveEdit = async () => {
    try {
        const res = await updateUserInfo(curUserId.value, editForm.value);
        if (res.data.code == 200) {
            await userStore.getNewUserInfo(curUserId.value);
            userInfo.value = userStore.userInfo;
            Message.success('更新成功');
        }
    } catch (error) {
        console.error('更新用户信息失败:', error);
    }
};

// 点击头像触发文件选择框
const handleAvatarClick = () => {
    if (isCurUser.value) {
        avatarInputRef.value.click();
    }
};

// 处理文件选择
const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        try {
            const res = await uploadAPI(file);
            updateAvatar(curUserId.value, res.data.data);
            if (res.data.code === 200) {
                // 更新用户信息中的头像 URL
                // ...
                Message.success('头像更新成功');
                userStore.getNewUserInfo(curUserId.value);
            } else {
                Message.error('头像更新失败');
            }
        } catch (error) {
            console.error('头像上传失败:', error);
            Message.error('头像上传失败，请稍后重试');
        }
    }
};

onMounted(async () => {
    try {
        if (isCurUser.value) {
            // 如果是当前用户，直接获取用户信息
            userInfo.value = userStore.userInfo;
            console.log('当前用户信息:', userInfo.value);
        } else {
            // 否则，通过接口获取目标用户信息
            const res = await fetchUserInfo(targetUserId);
            userInfo.value = res.data.data;
        }
    } catch (error) {
        console.error('获取用户信息失败:', error);
    }
});

// 模拟帖子数据
const posts = ref([
    {
        id: 1,
        title: '第一篇帖子',
        description: '这是第一篇帖子的内容简介...',
    },
    {
        id: 2,
        title: '第二篇帖子',
        description: '这是第二篇帖子的内容简介...',
    },
    {
        id: 3,
        title: '第三篇帖子',
        description: '这是第三篇帖子的内容简介...',
    },
]);

// 方法：查看帖子
const viewPost = (id) => {
    console.log('查看帖子:', id);
};

// 方法：编辑帖子
const editPost = (id) => {
    console.log('编辑帖子:', id);
};

// 方法：删除帖子
const deletePost = (id) => {
    console.log('删除帖子:', id);
};
</script>

<template>
    <a-layout class="user-center">
        <!-- Header：用户基本信息 -->
        <a-layout-header class="header">
            <a-row align="center">
                <!-- 头像 -->
                <a-col :span="4">
                    <a-avatar :size="100" class="avatar">
                        <img :src="userInfo.avatarUrl" alt="用户头像" />
                    </a-avatar>
                    <input ref="avatarInputRef" type="file" style="display: none" @change="handleFileChange" />
                </a-col>
                <!-- 用户信息 -->
                <a-col :span="20">
                    <h1 class="username">{{ userInfo.username }}</h1>
                    <p class="info-item"><a-icon type="bank" /> 学校: {{ userInfo.schoolName }}</p>
                    <p class="info-item"><a-icon type="book" /> 专业: {{ userInfo.major }}</p>
                    <p class="info-item"><a-icon type="book" /> 班级: {{ userInfo.className }}</p>
                    <p class="info-item"><a-icon type="mail" /> 邮箱: {{ userInfo.email }}</p>
                    <!-- 编辑按钮 -->
                    <a-button v-if="isCurUser" type="primary" @click="openEditModal">编辑个人资料</a-button>
                </a-col>
            </a-row>
        </a-layout-header>

        <!-- Content：用户发布的帖子 -->
        <a-layout-content class="content">
            <a-card title="我的帖子" class="post-list">
                <a-list :data="posts">
                    <template #item="{ item }">
                        <a-list-item>
                            <a-list-item-meta :title="item.title" :description="item.description" />
                            <template #actions>
                                <a-button type="text" @click="viewPost(item.id)">查看</a-button>
                                <a-button v-if="isCurUser" type="text" @click="editPost(item.id)">编辑</a-button>
                                <a-button v-if="isCurUser" type="text" @click="deletePost(item.id)">删除</a-button>
                            </template>
                        </a-list-item>
                    </template>
                </a-list>
            </a-card>
        </a-layout-content>
    </a-layout>

    <!-- 编辑个人资料弹窗 -->
    <a-modal v-model:visible="editModalVisible" title="编辑个人资料" @ok="saveEdit" @cancel="editModalVisible = false"
        shape="round">
        <a-avatar :size="100" class="edit-avatar" @click="handleAvatarClick">
            <img :src="userInfo.avatarUrl" alt="用户头像" />
            <template #trigger-icon>
                <IconCamera />
            </template>
        </a-avatar>
        <a-form :model="editForm" layout="horizontal" class="edit-form">
            <a-form-item label="用户名">
                <a-input v-model="editForm.username" />
            </a-form-item>
            <a-form-item label="学校">
                <a-input v-model="editForm.schoolName" />
            </a-form-item>
            <a-form-item label="专业">
                <a-input v-model="editForm.major" />
            </a-form-item>
            <a-form-item label="班级">
                <a-input v-model="editForm.className" />
            </a-form-item>
            <a-form-item label="邮箱">
                <a-input v-model="editForm.email" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<style scoped>
.user-center {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.header {
    background-color: #f0f2f5;
    padding: 24px;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 8px;
    margin: 16px;
}

.avatar {
    margin-right: 24px;
}

.edit-avatar {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    margin-left: 190px;
    margin-bottom: 20px;
}

.edit-form .arco-form-item-label {
    text-align: left;
    /* 标签左对齐 */
}

.edit-form .arco-form-item-control {
    flex: 1;
    /* 输入框占据剩余空间 */
}

.username {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
}

.info-item {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
}

.content {
    padding: 24px;
    background-color: #fff;
}

.post-list {
    margin-top: 16px;
    border-radius: 8px;
}
</style>