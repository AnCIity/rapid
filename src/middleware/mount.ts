/**
 * 扩展挂载 Context 中间件
 */

import { Context, Next } from 'koa'
import { RESPONSE_STATUS } from '../constants/route'

declare module 'koa' {
  interface DefaultContext {
    answer: {
      /**
       * 成功
       */
      resolve: (data?: any, message?: string | null) => void
      /**
       * 失败
       */
      reject: (data?: any, message?: string | null) => void
      /**
       * 断言
       */
      affirm: (value: any, message: string, status?: number) => void
    }

    params: { [key: string]: any }
    query: { [key: string]: any }
    body: { [key: string]: any }
  }
}

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
