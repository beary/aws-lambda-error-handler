# aws-lambda-error-handler

## Usage
```typescript
/* testHandler.js */
import { BaseError, withCatch } from 'aws-lambda-error-handler'

class MyError1 extends BaseError {
  constructor() {
    super('😠')
    this.statusCode = 400
  }
}

class MyError2 extends BaseError {
  constructor() {
    super('💔')
    this.statusCode = 404
  }
}

export const fn = withCatch(
  async (event, context) => {
    const q = event.queryStringParameters
    if (q && q.p === '1')
      throw new MyError1()
    else if (q && q.p === '2')
      throw new MyError2()

    return {
      statusCode: 200,
      body: '{"message":"😄"}'
    }
  }
)
```

```yml
# serverless.yml

# ...
functions:
  test_handler:
    handler: path/to/testHandler.fn
# ...
```
