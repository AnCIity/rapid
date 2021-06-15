import { REQUEST_TYPE } from '@constants/route'

export declare type RequiredType = boolean | [boolean, string]

export declare type ValidatorFunction = (value: unknown) => boolean | Promise<boolean>

export interface ValidatorOptions {
  validator: ValidatorFunction
  message?: string
}

export declare type Validator = ValidatorFunction | RegExp | ValidatorOptions | ValidatorOptions[]

export type Type = 'string' | 'number'

export interface ValidatorRules {
  required?: RequiredType
  enum?: string[]
  default?: any
  type: Type
  location: REQUEST_TYPE
  // validate?: Validator | Validator[]
}

export interface ValidatorProps {
  required?: RequiredType
  enum?: string[]
  default?: any
  type: Type
  // validate?: Validator | Validator[]
}

export interface ValidatorRuleDict {
  [key: string]: ValidatorRules
}

// export interface NumberValidateOptions {
//   min?: number | [number, string]
//   max?: number | [number, string]
// }

// export interface StringValidateOptions {
//   match?: RegExp | [RegExp, string]
//   enum?: string[]
//   minLength?: number | [number, string]
//   maxLength?: number | [number, string]
// }

// export interface StringTransformOptions {
//   lowercase?: boolean
//   uppercase?: boolean
//   trim?: boolean
// }
