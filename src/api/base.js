import service from '../utils/request.js'

export const getApiList = (data) => {
  return service({
    url: '/api/getApiList',
    method: 'post',
    data
  })
}