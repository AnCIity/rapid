import Router from 'koa-router'
import { documents, getRouteMapList } from '../libs/route'
import verify from '../libs/verify/middleware'

const router = new Router({ prefix: '/api' })

getRouteMapList().forEach(({ url, method, ruleDict, handle }) => {
  console.log(method, '==>', url)

  // 路由中间件
  router[method](url, verify(ruleDict), handle)
})

/**
 * 文档路由
 */
router.get('/docs', ctx => {
  ctx.body = documents
})

export { router }
