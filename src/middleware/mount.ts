/**
 * 扩展挂载 Context 中间件
 */

import { Context, Next } from 'koa'
import { RESPONSE_STATUS } from '../constants/route'

const mountExtend = () => (ctx: Context, next: Next) => {
  ctx.answer = {
    resolve: (data = null, message = null) => {
      ctx.body = {
        status: true,
        code: RESPONSE_STATUS.SUCCESS,
        message,
        data,
        time: new Date().getTime()
      }
    },
    reject: (data = null, message = null) => {
      ctx.body = {
        status: false,
        code: RESPONSE_STATUS.FAIL,
        message,
        data,
        time: new Date().getTime()
      }
    },
    affirm: (value: any, message: string, status = 200) => {
      ctx.assert(value, status, message)
    }
  }

  return next()
}

export default mountExtend
