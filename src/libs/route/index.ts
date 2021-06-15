import fs from 'fs'
import path from 'path'
import loadDir from '@utils/loadDir'
import { IRouteMap, IRouteMapList } from '@typings/route'
import { ROUTE_REFLECT } from '@constants/route'

export const documents = []

/**
 * 获取类控制器上的所有路由
 */
export const getRouteForClass = (instance: any) => {
  const prototype = Object.getPrototypeOf(instance)

  // 获取类方法名称
  const names = Object.getOwnPropertyNames(prototype).filter(
    item => item !== 'constructor' && typeof prototype[item] === 'function'
  )

  return names.map(name => {
    const handle = prototype[name]

    const constructor = Reflect.getMetadata(ROUTE_REFLECT.CONSTRUCTOR, handle)

    // 取出定义的 metadata
    const prefix = Reflect.getMetadata(ROUTE_REFLECT.PREFIX, constructor)
    const url = `${prefix}${Reflect.getMetadata(ROUTE_REFLECT.PREFIX, handle)}`
    const method = Reflect.getMetadata(ROUTE_REFLECT.METHOD, handle)
    const ruleDict = Reflect.getMetadata(ROUTE_REFLECT.RULE_DICT, handle) || {}
    const isAuth = Reflect.getMetadata(ROUTE_REFLECT.IS_AUTH, handle) || false
    const comment = Reflect.getMetadata(ROUTE_REFLECT.COMMENT, handle) || ''

    const params = {
      prefix: constructor.name,
      url,
      method,
      handle: handle.bind(instance),
      name,
      ruleDict,
      isAuth,
      comment
    }

    generateDocument(params)

    return params
  })
}

/**
 * 生成接口文档
 */
const generateDocument = (params: IRouteMap) => {
  documents.push(params)
}

// 获取所有控制器
const controllers: any = loadDir(path.join(__dirname, '../../controller/'))

/**
 * 获取路由映射数据列表
 */
export const getRouteMapList = (): IRouteMapList =>
  fs
    .readdirSync(path.join(__dirname, '../../controller/'))
    .map(filename => getRouteForClass(new controllers[path.basename(filename, '.js')]()))
    .flat()
