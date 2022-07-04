import request from '@/utils/request'

export function login(loginForm) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      ...loginForm
    }
  })
}
