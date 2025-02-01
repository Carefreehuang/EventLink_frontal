import {defineStore} from 'pinia'
import {ref} from 'vue'
import { loginAPI, fetchUserInfo } from '@/apis/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const isLogin = ref(false)

  const getUserInfo = async ({username, password}) => {
    const res = await loginAPI({username, password})
    userInfo.value = res.data.data
    localStorage.setItem('token', res.data.data.token)
    console.log('token',res.data.data.token)
    isLogin.value = true
    return res.data
  }

  const clearUserInfo = () => {
    isLogin.value = false
    userInfo.value = {}
    localStorage.removeItem('token')
  }

  const getNewUserInfo = async (id) => {
    console.log('id',id)
    const res = await fetchUserInfo(id)
    console.log('res',res)
    userInfo.value = res.data.data
    console.log('userInfo',userInfo.value)
  }

  return {
    userInfo,
    getUserInfo,
    clearUserInfo,
    getNewUserInfo,
    isLogin
  }
}, {
  // 配置pinia持久化插件
  persist: true,
})