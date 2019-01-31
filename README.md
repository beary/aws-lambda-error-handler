# aws-lambda-error-handler

## Usage
```typescript
/* testHandler.js */
import { withCatch, BaseError } from 'aws-lambda-error-handler'

class UserNameConflictError extends BaseError {
  constructor() {
    super('Username already exists')
    this.statusCode = 400
  }
}

export const fn = withCatch(
  async (event, context) => {
    throw new UserNameConflictError()
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'ok'
      })
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
