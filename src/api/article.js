import request from '@/utils/request'

export function getArticleList(req) {
  return request({
    url: '/admin/article/getArticleList',
    method: 'post',
    params: {
      ...req
    }
  })
}

export function getArticleDetail(id) {
  return request({
    url: '/admin/article/getArticle',
    method: 'post',
    params: {
      id
    }
  })
}

export function createArticle(param) {
  return request({
    url: '/admin/article/create',
    method: 'post',
    data: param
  })
}

export function deleteArticle(id) {
  return request({
    url: '/admin/article/delete',
    method: 'post',
    params: {
      id
    }
  })
}

export function updateArticle(param) {
  return request({
    url: '/admin/article/update',
    method: 'post',
    data: param
  })
}
