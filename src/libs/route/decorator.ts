import { REQUEST_METHOD, ROUTE_REFLECT } from '@constants/route'

/**
 * 控制器装饰器
 * TODO: 第二个参数
 * 组件库开发 封装同步进行 技术选型
 */
export const Controller = (path: string): ClassDecorator => target =>
  Reflect.defineMetadata(ROUTE_REFLECT.PREFIX, path, target)

/**
 * 创建请求方法装饰器
 */
const createMappingDecorator = (method: string) => (path?: string): MethodDecorator => (target: any, key: any) => {
  Reflect.defineMetadata(ROUTE_REFLECT.PREFIX, typeof path === 'string' ? path : `/${key}`, target[key])
  Reflect.defineMetadata(ROUTE_REFLECT.METHOD, method, target[key])
  Reflect.defineMetadata(ROUTE_REFLECT.HANDLER, target[key], target[key])
  Reflect.defineMetadata(ROUTE_REFLECT.CONSTRUCTOR, target.constructor, target[key])
}

/* 请求方法装饰器 start */

export const Get = createMappingDecorator(REQUEST_METHOD.GET)

export const Post = createMappingDecorator(REQUEST_METHOD.POST)

export const Put = createMappingDecorator(REQUEST_METHOD.PUT)

export const Delete = createMappingDecorator(REQUEST_METHOD.DELETE)

export const Options = createMappingDecorator(REQUEST_METHOD.OPTIONS)

export const Patch = createMappingDecorator(REQUEST_METHOD.PATCH)

/* 请求方法装饰器 end */

/**
 * 注释
 */
export const Comment = (comment: string): MethodDecorator => (target: any, key: any) => {
  Reflect.defineMetadata(ROUTE_REFLECT.COMMENT, comment, target[key])
}
