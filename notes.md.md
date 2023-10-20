
## Idempontentost
- POST is not idempotent
- PUT is idempotent
- This means that when multiple requests are sent only one is executed
- Important with payment related requests
- If 5 POST requests are sent all 5 will be executed



## Learn firebase
- Create api requests

## Using classes to send get requests
- One class that will handle the requests
- This class will have a `get` method that will handle the request and return a promise
- We can create a new object in a Person class that will send the request needed from the second Person class and we can handle the data there


- Look at the code in discord
- What is a promise?
- What is an async request?
- Does an async request always return a promise?
- Why do we need two .then() blocks and a catch() for a fetch request
- callback functions