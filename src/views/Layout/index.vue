<script setup>
import LayoutHeader from './components/LayoutHeader.vue';
//import LayoutFixed from './components/LayoutFixed.vue';
import LayoutFooter from './components/LayoutFooter.vue';
</script>
<template>
    <LayoutHeader />
    <!-- <LayoutFixed /> -->
    <div class="main-container">
        <RouterView />
    </div>
    <LayoutFooter />
</template>
<style>
    /* 全局居中布局 */
    .main-container {
    margin: 0 auto; /* 水平居中 */
    padding: 0 90px; /* 两侧留白 */
    }

    /* 其他全局样式 */
    body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    }
</style>
