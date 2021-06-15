/**
 * 错误处理中间件
 */
import { Context, Next } from 'koa'

const onerror = () => async (ctx: Context, next: Next) => {
  try {
    await next()
  } catch (error) {
    console.log('server error', error.message)

    ctx.answer.reject(null, error.message)
  }
}

export default onerror
