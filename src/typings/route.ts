import { RESPONSE_STATUS } from '../constants/route'
import { ValidatorRuleDict } from './verify'

/**
 * 响应参数
 */
export interface ResponseParams {
  // 状态
  status: boolean
  // 代码
  code: RESPONSE_STATUS
  // 信息
  message: string
  // 数据
  data: any
  // 当前时间
  time: string
}

/**
 * 路由映射数据
 */
export interface IRouteMap {
  url: string
  name: string
  ruleDict: ValidatorRuleDict
  method: 'get' | 'post'
  handle: () => void
  // isAuth: boolean
}

/**
 * 路由映射数据列表
 */
export type IRouteMapList = IRouteMap[]
