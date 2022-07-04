import request from '@/utils/request'

export function getCategoryList() {
  return request({
    url: '/categoryList',
    method: 'get'
  })
}

export function getCategoryDetail(id) {
  return request({
    url: '/categoryDetail',
    method: 'get',
    params: {
      id
    }
  })
}

export function deleteCategory(id) {
  return request({
    url: '/categoryDelete',
    method: 'get',
    params: {
      id
    }
  })
}
