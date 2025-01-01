import {defineStore} from 'pinia'
import {ref} from 'vue'
import { loginAPI } from '@/apis/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const isLogin = ref(false)
  const getUserInfo = async ({username, password}) => {
    const res = await loginAPI({username, password})
    userInfo.value = res.data.data
    localStorage.setItem('token', res.data.data.token)
    isLogin.value = true
    return res.data
  }
  const clearUserInfo = () => {
    isLogin.value = false
    userInfo.value = {}
    localStorage.removeItem('token')
  }
  return {
    userInfo,
    getUserInfo,
    clearUserInfo,
    isLogin
  }
}, {
  // 配置pinia持久化插件
  persist: true,
})