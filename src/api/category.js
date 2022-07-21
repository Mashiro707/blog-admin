import request from '@/utils/request'

export function createCategory(categoryFrom) {
  return request({
    url: '/admin/category/create',
    method: 'post',
    data: {
      ...categoryFrom
    }
  })
}

export function getCategoryList(req) {
  return request({
    url: '/admin/category/getCategoryList',
    method: 'post',
    params: {
      ...req
    }
  })
}

export function deleteCategory(id) {
  return request({
    url: '/admin/category/delete',
    method: 'post',
    params: {
      id
    }
  })
}

export function updateCategory(categoryFrom) {
  return request({
    url: '/admin/category/update',
    method: 'post',
    data: {
      ...categoryFrom
    }
  })
}
