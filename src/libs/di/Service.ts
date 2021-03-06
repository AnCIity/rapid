import 'reflect-metadata'
import Container from './Container'

interface ConstructableFunction extends Function {
  new (): any
}

type ServiceDecorator = (target: ConstructableFunction) => void

// 自定义 id 初始化
export function Service(id: string): ServiceDecorator

// 作为单例初始化
export function Service(singleton: boolean): ServiceDecorator

// 自定义 id 并作为单例初始化
export function Service(id: string, singleton: boolean): ServiceDecorator

export function Service(idOrSingleton?: string | boolean, singleton?: boolean): ServiceDecorator {
  return (target: ConstructableFunction) => {
    let _id: any
    let _singleton: boolean
    let _singleInstance: any

    if (typeof idOrSingleton === 'boolean') {
      _singleton = true
      _id = Symbol(target.name)
    } else {
      // 判断如果设置 id，id 是否唯一
      if (idOrSingleton && Container.has(idOrSingleton)) {
        throw new Error(`Service：此标识符（${idOrSingleton}）已被注册.`)
      }

      _id = idOrSingleton || Symbol(target.name)
      _singleton = singleton
    }

    Reflect.defineMetadata('cus:id', _id, target)

    if (_singleton) {
      _singleInstance = new target()
    }

    Container.set(_id, _singleInstance || target)
  }
}
