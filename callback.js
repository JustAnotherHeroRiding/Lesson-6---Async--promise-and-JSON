const callBackLoader = (state) => {
  loader = new Loader();
  //loader.show()

  /* This state will be passed from the 4 request states, 4 means it is completed */
  if (state !== 4) {
    loader.show();
  } else {
    /* Once the state is completed, the loader will be hidden  */
    loader.hide();
  }
};

class Loader {
  constructor() {
    this.loader = document.querySelector(".loader");
  }
  // Class to select the loader and define the show and hide methods
  show() {
    document.body.appendChild(this.loader);
  }

  hide() {
    this.loader.remove();
  }
}

class BetterLoader extends Loader {}

class HttpRequest {
  GET = "GET";

  /* To make the request reusable we need to pass in a url when initiating it */
  constructor(url) {
    this.url = url;
    this.http = new XMLHttpRequest();
  }

  /* The callback argument has ready state status if status = 4 your request is finished */
  get(callback) {
    //After opening the request with this.http.open(this.GET, this.url, true);,
    //it returns an object containing a promise. This promise is resolved when the HTTP request
    //is done and the status is 200 (OK).
    // Opening the request only prepares it to be sent but it will not be sent until http.send() is called
    this.http.open(this.GET, this.url, true);
    return {
      // we return the promise so that the caller can wait for the response
      promise: new Promise((resolve) => {
        // Here the request is actuall sent
        this.http.send();
        // A listener to see when the request is complete
        this.http.onreadystatechange = () => {
          callback(this.http.readyState);
          if (
            this.http.status === 200 &&
            this.http.readyState === XMLHttpRequest.DONE
          ) {
            // Finally it is resolved and returns the data parsed as a JSON
            resolve(JSON.parse(this.http.response).results[0]);
          }
        };
      }),
    };
    // return callback;
  }
}

class Person {
    // Person class with a method to return a random user
  constructor() {
    this.http = new HttpRequest("https://randomuser.me/api/");
  }
  // Here we use the http object we created above with a url we passed
  // We also pass the callback loader function declared on top
  // A callback function is a parameter of the get method of the http class
  getRandomPerson() {
    const request = this.http.get(callBackLoader);
    // The promise was resolved already in the returned object
    // Here we just need to handle the second .then call to get the data
    request.promise.then((response) => console.log(response));
  }
}

const person = new Person();
person.getRandomPerson();
