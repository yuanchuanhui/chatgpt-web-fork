<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import {verifyUser} from '@/api/index'
import { useUserStore } from '@/store'
const router = useRouter()
const userStore = useUserStore()
const formData = ref({
      name: '',
      password: ''
    });

async function goHome() {
	// 获取表单数据
	try {
		const canLogin = await verifyUser({
			name:formData.value.name,
			password:formData.value.password
		})

	if(canLogin){
		userStore.updateUserInfo({
			name:formData.value.name,
			password:formData.value.password
		})
		router.push('/chat')

	}else{
		router.push('/login')
	}
	} catch (error) {
		console.log('接口返回数据处理异常',error)
	}

}

</script>

<template>
    <div class="lg:bg-white lg:w-1/2 lg:p-8 lg:py-16 lg:px-12 space-y-7 marlene-rounded-l-lg shadow-sm w-max p-8 marlene-bg-glass-ex">
      <div class="space-y-3.5">
        <p class="mb-2 text-primary text-4xl">登录</p>
        <p class="text-blue-gray">每一次登录都是与你の邂逅。</p>
      </div>
      <form class="space-y-8">
        <div class="space-y-6">
          <div class="block ">
            <input
                class="border min-w-full border-gray focus:border-primary rounded-lg appearance-none p-1 pl-2 h-12 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="用户名"
                type="text"
								v-model="formData.name"
						>
          </div>
          <div class="block ">
            <input
                class="border min-w-full border-gray focus:border-primary rounded-lg appearance-none p-1 pl-2 h-12 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="密码"
                type="password"
								v-model="formData.password"
						>
          </div>
        </div>
        <NButton type="primary" @click="goHome">
        			登录
      		</NButton>
      </form>
    </div>
</template>
