import Koa from 'koa'

export declare module 'koa' {
  export interface ExtendableContext {
    answer: {
      /**
       * 成功
       */
      resolve: (data?: any, message?: string | null) => void
      /**
       * 失败
       */
      reject: (data?: any, message?: string | null) => void
      /**
       * 断言
       */
      affirm: (value: any, message: string, status?: number) => void
    }

    params: { [key: string]: any }
    query: { [key: string]: any }
    body: { [key: string]: any }

    assert: (value: any, status?: number | undefined, msg?: string | undefined, opts?: {} | undefined) => void
  }
}
