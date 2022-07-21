// 时间戳转换
export function dateFilter(timestamp) {
  function zero(time) {
    return time < 10 ? '0' + time : time
  }
  var date = new Date(Number(timestamp) * 1000)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = zero(date.getDate()) + ' '
  const h = zero(date.getHours()) + ':'
  const m = zero(date.getMinutes()) + ':'
  const s = zero(date.getSeconds())
  return Y + M + D + h + m + s
}

// 导出方法
export default { dateFilter }
