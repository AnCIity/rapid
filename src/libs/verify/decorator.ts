import { REQUEST_TYPE, ROUTE_REFLECT } from '@constants/route'
import { ValidatorRuleDict, ValidatorProps } from '@typings/verify'

// TODO: 将 函数装饰器 改为 参数装饰器

/**
 * 入参校验
 */
export const createMappingDecorator = (location: REQUEST_TYPE) => (
  field: string,
  rules: ValidatorProps
): MethodDecorator => (target: any, key: any) => {
  const ruleDict: ValidatorRuleDict = Reflect.getMetadata(ROUTE_REFLECT.RULE_DICT, target[key]) || {}

  ruleDict[field] = { ...rules, location }

  Reflect.defineMetadata(ROUTE_REFLECT.RULE_DICT, ruleDict, target[key])
}

/**
 * 路由参数校验
 */
export const Params = createMappingDecorator(REQUEST_TYPE.PARAMS)

/**
 * 查询参数校验
 */
export const Query = createMappingDecorator(REQUEST_TYPE.QUERY)

/**
 * 主体参数校验
 */
export const Body = createMappingDecorator(REQUEST_TYPE.BODY)
