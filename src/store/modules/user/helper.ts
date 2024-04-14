import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'
import image from '@/assets/avarar.jpg';

export interface UserInfo {
  avatar: string
  name: string
  description: string
	password: string
	gptModel: string,
  targetRole: string
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: image,
      name: '某某人',
      description: '暂无介绍',
			password:'123456',
			gptModel:'gpt-3.5-turbo-0125',
      targetRole: '哈利波特'
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
