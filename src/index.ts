import 'reflect-metadata'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import staticFile from 'koa-static'
import path from 'path'
import onerror from './middleware/error'
import mountExtend from './middleware/mount'
// TODO: 优先暴露后运行 将路由放在初始化中加载
// TODO: 静态资源 desc 处理

export { Controller, Post, Patch, Put, Delete, Options, Get, Comment } from './libs/route/decorator'

export { Body, Params, Query } from './libs/verify/decorator'

import { router } from './router'

class Rapid {
  private app: Koa<Koa.DefaultState, Koa.DefaultContext>

  constructor() {
    const app = new Koa()

    // 指定 public目录为静态资源目录，用来存放 js css images 等
    app.use(staticFile(path.resolve(__dirname, './public')))

    app.use(bodyParser()).use(logger()).use(onerror()).use(mountExtend())

    app.use(router.routes()).use(router.allowedMethods())

    this.app = app
  }

  use(
    middleware: Koa.Middleware<Koa.DefaultState, Koa.DefaultContext, any>
  ): Koa<Koa.DefaultState, Koa.DefaultContext> {
    return this.app.use(middleware)
  }

  listen(port = 4000, callback = () => null) {
    this.app.listen(port, callback)
  }
}

export default Rapid
