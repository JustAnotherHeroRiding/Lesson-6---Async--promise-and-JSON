
## Idempontentost
- `POST` and `PATCH` are not idempotent
- `GET`, `PUT`, `DELETE`, `HEAD`, `OPTIONS`, and `TRACE` are idempotent
- This means that when multiple requests are sent only one is executed
- Important with payment related requests
- If 5 `POST` requests are sent all 5 will be executed
- If 5 `DELETE` requests are sent, only one will be executed


## Learn firebase
- Create api requests

## Using classes to send get requests
- One class that will handle the requests
- This class will have a `get` method that will handle the request and return a promise
- We can create a new object in a Person class that will send the request needed from the second Person class and we can handle the data there


- Look at the code in discord #DONE 
- Idempotency #DONE 
- What is a promise? #DONE 
- What is an async request? #DONE 
- Does an async request always return a promise? #DONE 
- Why do we need two .then() blocks and a catch() for a fetch request #DONE 
- callback functions #DONE 
## Promise
A JavaScript Promise is an object that represents the eventual completion or failure of an asynchronous operation. Essentially, it's a returned object from an asynchronous operation to which you can attach callbacks, instead of passing callbacks into a function.

Promises can be in one of three states:

1. Pending: The Promise's outcome hasn't yet been determined, because the asynchronous operation that will produce its result hasn't completed yet.
2. Fulfilled: The asynchronous operation has completed, and the Promise has a resulting value.
3. Rejected: The asynchronous operation failed, and the Promise will never be fulfilled. In the rejected state, a Promise has a reason that indicates why the operation failed.
Here is a simple example of creating a new Promise:

`let promise = new Promise((resolve, reject) => {   // Some asynchronous operation });`

The `Promise` constructor takes one argument, a callback with two parameters, `resolve`

```
new Promise((resolve, reject) => {
  console.log("Initial");
  resolve();
})
  .then(() => {
    throw new Error("Something failed");
    console.log("Do this");
  })
  .catch(() => {
    console.error("Do that");
  })
  .then(() => {
    console.log("Do this, no matter what happened before");
  });
```

## Async Requests
In JavaScript, an async request is a way to perform operations asynchronously, i.e., without blocking the execution of the rest of your code. This is particularly useful when you're dealing with operations that may take some time, such as network requests or file system operations, and you don't want to stop the execution of your code while waiting for these operations to complete.

Traditionally, async operations in JavaScript were handled with callbacks or events. However, modern JavaScript has introduced Promises and async/await syntax to make working with async operations easier and more intuitive.

A Promise is an object that represents the eventual completion or failure of an async operation. When the operation completes, the Promise is either fulfilled with a value (if the operation was successful) or rejected with a reason (if the operation failed) [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises).
## Does any async request always return a promise?

The async/await syntax provides a more straightforward way to work with Promises. An async function is a function that implicitly returns a Promise. The await keyword can be used inside an async function to pause the execution of the function until a Promise is fulfilled or rejected [javascript.info](https://javascript.info/async-await).

Here's an example of an async function that uses the await keyword:

```
async function asyncFunction() {   
let promise = new Promise((resolve, reject) => {
setTimeout(() => resolve('Promise fulfilled'), 2000);   }); 
let result = await promise; 
// execution is paused here until the Promise is fulfilled   console.log(result); 
// logs: Promise fulfilled } 
asyncFunction();
```

In this example, the `await` keyword is used to pause the execution of `asyncFunction` until the Promise is fulfilled. Once the Promise is fulfilled, its value is assigned to `result`, and the function continues its execution.

So to answer the question, an async request in JavaScript does not always result in a Promise, but Promises and async/await are commonly used to handle async operations because they provide a more intuitive way to work with async code [dev.to](https://dev.to/losnikitos/three-ways-to-make-an-async-request-in-javascript-xhr-promise-asyncawait-1bff).


## Scenarios where async requests do not return a promise

Async operations in JavaScript do not always have to return a promise. Here are a few examples:

**1. Callbacks:** Before promises and async/await, callbacks were the primary method for handling asynchronous operations in JavaScript. A callback is a function that is passed as an argument to another function and is executed after some operation has been completed. Here's an example of reading a file asynchronously using callbacks:

```
const fs = require('fs');
fs.readFile('/path/to/file', 'utf8', function(err, data) {   
if (err) {     console.error('An error occurred:', err); 
return;   
}   
console.log('File data:', data); });
```


In this example, the `fs.readFile` function is used to read the contents of a file asynchronously. The callback function is executed after the file has been read. If an error occurred, it logs the error; otherwise, it logs the file data [stackoverflow.com](https://nodejs.dev/learn/understanding-javascript-promises).

**2. Event listeners:** Another common scenario where async operations do not return promises is with event listeners. When you add an event listener to an element, you provide a function (the event handler) that will be called whenever the event occurs. Here's an example:

```
document.querySelector('button').addEventListener('click', function(event) {   
console.log('Button was clicked!'); 
});
```

In this example, the `addEventListener` method is used to add a 'click' event listener to a button element. The provided function will be called asynchronously whenever the button is clicked. No promise is returned from the event listener or the event handler function.

**3. Timeouts and intervals:** The `setTimeout` and `setInterval` functions in JavaScript also execute code asynchronously, but they do not return promises. Here's an example of using `setTimeout`:

```
console.log('Before timeout');
setTimeout(function() {   
console.log('Inside timeout'); }, 2000);
console.log('After timeout');
```


## Why do we need 2 .then() blocks?

When using the Fetch API in JavaScript to make asynchronous HTTP requests, the fetch function returns a Promise that resolves to the Response object representing the response to the request. This Response object does not contain the actual data you requested, but it does have methods to retrieve the data in various formats (like JSON, Blob, etc.) [dmitripavlutin.com](https://dmitripavlutin.com/javascript-fetch-async-await/).

Here's an example of using fetch to make a GET request:

```
fetch('https://api.example.com/data')   
.then(response => response.json())   
.then(data => console.log(data))   
.catch(error => console.error('Error:', error));
```

In this example, the first `.then()` block is used to extract the JSON data from the Response object. The `response.json()` method returns another Promise because reading the body of the response is an asynchronous operation. This Promise resolves to the actual data you requested when it's ready.

The second `.then()` block is used to handle the data once it's available. The `data` parameter represents the data extracted from the response in the first `.then()` block.

So, the reason we need two `.then()` blocks in this case is because we're performing two asynchronous operations: first, we're making the HTTP request to get the Response object, and then we're reading the body of the response to get the actual data [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises).

In other words, the first `.then()` is used to handle the Promise returned by `fetch()`, and the second `.then()` is used to handle the Promise returned by `response.json()`.

If you're using async/await, you can handle this in a more straightforward way:

```
async function fetchData() {   
try {     
let response = await fetch('https://api.example.com/data');
let data = await response.json();  
console.log(data);   }
catch (error) {
console.error('Error:', error);   } } fetchData();
```


In this example, the `await` keyword is used to pause the execution of the `fetchData` function until the Promise returned by `fetch()` is fulfilled. Then it does the same for the Promise returned by `response.json()`. This makes the code look synchronous even though it's still performing asynchronous operations [dmitripavlutin.com](https://dmitripavlutin.com/javascript-fetch-async-await/).