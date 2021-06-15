import { ValidatorRules } from '@typings/verify'

export class Verify {
  constructor(private field: string, private value: any, private rules: ValidatorRules) {}

  validating(): [boolean, string] | [boolean] {
    for (const key in this.rules) {
      const [success = true, message = `${this.field} error occurred, when validating ${key}`] =
        this[key as keyof ValidatorRules]() || []

      if (!success) return [false, message as string]
    }

    return [true]
  }

  location = () => [true]

  default = () => [true]

  required = () => [!!this.value, `${this.field} is required`]

  enum = () => [this.rules.enum?.includes(this.value), `${this.field} must be in ${this.rules.enum}`]
}
