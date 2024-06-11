import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post, get } from '@/utils/request'
import { useSettingStore,useUserStore,useChatStore } from '@/store'
// import  getLocalState from '../store/modules/user'

import {verifyLogin,chatcompletion} from './constant'
// 调用后端接口

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/config',
  })
}
// 聊天内容进程
export function fetchChatAPIProcess<T = any>(
  params: {
    prompt: string // 当前用户发的消息
    targetRole: string // 目标角色
    historyMessage: { message: string; role: string; }[]
    options?: { conversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {

  const settingStore = useSettingStore()
  // const authStore = useAuthStore()
	const userStore = useUserStore()
	const chatStore = useChatStore()
	const uuid= chatStore.getChatHistoryByCurrentActive?.uuid
  let data: Record<string, any> = {
    message: params.prompt,
    historyMessage: params.historyMessage,
    targetRole: userStore.userInfo.targetRole,
    options: params.options,
		userId: userStore.userInfo.name, //|| "489107738",
		password:userStore.userInfo.password, //|| "123123",
		model:userStore.userInfo.gptModel,
		sceneId:uuid
  }

  if (true) {
    data = {
      ...data,
      systemMessage: settingStore.systemMessage,
      temperature: settingStore.temperature,
      top_p: settingStore.top_p,
    }
  }

  return post<T>({
    url: chatcompletion+`?userId=${data.userId}&targetRole=${data.targetRole}&password=${data.password}`,
    data,
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  })
}

export function fetchSession<T>() {
  return post<T>({
    url: '/session',
  })
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: '/verify',
    data: { token },
  })
}

// 验证sever接口
export async function  verifyUser<T = any>(
	userInfo: {name:string,password:string}
	){
	const {name:userId,password} = userInfo;
	// console.log('cwj',userId,password);
	try {
		return get<T>({
			url: verifyLogin,
			data:{userId,password}
		})
	} catch (error) {
			console.log('登陆报错，接口有问题',error)
	}

}
