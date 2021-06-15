/**
 * 响应状态码
 */
export enum RESPONSE_STATUS {
  // 成功
  SUCCESS = 0,
  // 失败
  FAIL = 1,
  // 无认证
  NO_AUTH = 2
}

/**
 * 路由元数据反射
 */
export enum ROUTE_REFLECT {
  PREFIX = 'prefix',
  URL = 'url',
  METHOD = 'method',
  RULE_DICT = 'ruleDict',
  HANDLER = 'handler',
  CONSTRUCTOR = 'constructor',
  IS_AUTH = 'isAuth',
  COMMENT = 'comment'
}

/**
 * 请求方法
 */
export enum REQUEST_METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  OPTIONS = 'options',
  PATCH = 'patch'
}

/**
 * 请求参数类型
 */
export enum REQUEST_TYPE {
  PARAMS = 'params',
  QUERY = 'query',
  BODY = 'body'
}
