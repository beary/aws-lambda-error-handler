import { APIGatewayEvent, Context, APIGatewayProxyResult } from 'aws-lambda'

type AsyncHandler = (event: APIGatewayEvent, context: Context) => Promise<APIGatewayProxyResult>

export class BaseError extends Error {
  public statusCode: number
  constructor(message?: string) {
    super(message)
    this.statusCode = 400 // default statusCode
  }
}

export const withCatch = (fn: AsyncHandler) =>
  async (event: APIGatewayEvent, context: Context) => {
    let res: APIGatewayProxyResult
    try {
      res = await fn(event, context)
    } catch (error) {
      res = {
        body: `{"message":"${error.message}"}`,
        statusCode: error instanceof BaseError ? error.statusCode : 500
      }
    }
    return res
  }
