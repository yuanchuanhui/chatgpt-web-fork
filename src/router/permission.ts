import type { Router } from 'vue-router'
// import { useAuthStoreWithout } from '@/store/modules/auth'

export function setupPageGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // const authStore = useAuthStoreWithout()
    // if (!authStore.session) {
    //   try {
		// 		console.log('1111',to.path,from,next);
    //     const data = await authStore.getSession()
    //     if (String(data.auth) === 'false' && authStore.token)
    //       authStore.removeToken()
    //     if (to.path === '/500')
    //       next({ name: 'Root' })
    //     else
    //       next()
    //   }
    //   catch (error) {
		// 		console.log('2222',to.path);
    //     if (to.path !== '/500')
    //       next({ name: '500' })
    //     else
    //       next()
    //   }
    // }
    // else {
      next()
    // }
  })
}
