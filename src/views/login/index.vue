<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import {registerUser, verifyUser} from '@/api/index'
import { useUserStore } from '@/store'
const router = useRouter()
const userStore = useUserStore()
// 获取当前页面的URL
function getQueryParam(url: string, paramName: string) {
  // 从URL中提取查询字符串部分
  const queryString = url.split('?')[1];
  if (!queryString) {
    return null;
  }

  // 使用&符号分割查询字符串
  const params = queryString.split('&');

  // 遍历参数数组
  for (let i = 0; i < params.length; i++) {
    // 使用=符号分割参数名称和参数值
    const pair = params[i].split('=');
    if (pair[0] === paramName) {
      // 如果找到匹配的参数名称，返回解码后的参数值
      return decodeURIComponent(pair[1]);
    }
  }

  // 如果没有找到匹配的参数，返回null
  return null;
}
const formData = ref({
      name: getQueryParam(window.location.href, 'userId'),
      password: getQueryParam(window.location.href, 'password'),
      targetRole:getQueryParam(window.location.href, 'targetRole'),
			email:getQueryParam(window.location.href, 'email')
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
			password:formData.value.password,
      targetRole:formData.value.targetRole
		})
		router.push('/chat')

	}else{
		router.push('/login')
	}
	} catch (error) {
		console.log('接口返回数据处理异常',error)
	}

}

async function register() {
	if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
	  alert("请输入正确的电子邮件")
	  return;
	}
	if (formData.value.password.length < 8) {
	  alert("密码必须为8位以上字符串")
	  return;
	}
	// 获取表单数据
	try {
		const canLogin = await registerUser({
			email:formData.value.email,
			password:formData.value.password
		})

		if(canLogin){
			alert('请前往邮箱激活账号，没收到邮件时请检查下是否被归类为垃圾邮件')
		}else{
			alert('注册失败')
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
	<div class="lg:bg-white lg:w-1/2 lg:p-8 lg:py-16 lg:px-12 space-y-7 marlene-rounded-l-lg shadow-sm w-max p-8 marlene-bg-glass-ex">
		<div class="space-y-3.5">
			<p class="mb-2 text-primary text-4xl">注册</p>
		</div>
		<form class="space-y-8">
			<div class="space-y-6">
				<div class="block ">
					<input
						class="border min-w-full border-gray focus:border-primary rounded-lg appearance-none p-1 pl-2 h-12 focus:outline-none focus:ring-1 focus:ring-primary" placeholder="用户名"
						type="text"
						v-model="formData.email"
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
			<NButton type="primary" @click="register">
				注册
			</NButton>
		</form>
	</div>
</template>
