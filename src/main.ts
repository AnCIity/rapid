import 'reflect-metadata'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import staticFile from 'koa-static'
import { router } from '@router/index'
import onerror from '@middleware/error'
import mountExtend from '@middleware/mount'
import path from 'path'

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
