/**
 * 校验中间件
 */

import { Context, Next } from 'koa'
import { ValidatorRuleDict } from '../../typings/verify'
import { Verify } from './'

const verify = (ruleDict: ValidatorRuleDict) => (ctx: Context, next: Next) => {
  const params = ctx.params
  const query = ctx.query
  const body = ctx.request.body

  const gather = { query, body, params }

  for (const field in ruleDict) {
    const rules = ruleDict[field]

    // location and default
    if (!gather[rules.location][field] && rules.default) gather[rules.location][field] = rules.default
    const value = gather[rules.location][field]

    const [success, message] = new Verify(field, value, rules).validating()

    if (!success) {
      ctx.answer.reject(null, message)

      return
    }
  }

  return next()
}

export default verify
