import request from '@/utils/request'

export function getArticleList() {
  return request({
    url: '/articleList',
    method: 'get'
  })
}

export function getArticleDetail(id) {
  return request({
    url: '/articleDetail',
    method: 'get',
    params: {
      id
    }
  })
}

export function createArticle(param) {
  return request({
    url: '/articleCreate',
    method: 'post',
    data: param
  })
}
