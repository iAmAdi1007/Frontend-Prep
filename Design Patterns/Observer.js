/**
 * Observer Desing Pattern also know as Pub/Sub Design Pattern 
 * Based on Event Driven Programming, as the name suggests, if you are subscribed to a Publisher and if anything is published, the publisher will notify the subscriber
 */

const Publisher = function() {
    this.handlers = [];

    // Subscriber can subscribe to a function
    this.subscribe = function(fn){
        this.handlers.push(fn);
    }

    // Subscriber can unsubscribe to the function
    this.unsubscribe = function(fn){
        this.handlers = this.handlers.filter(el => el !== fn);
    }

    this.fire = function(event, thisObj){
        const thisContext = thisObj ||  global;
        this.handlers.forEach(handler => {
            handler.call(thisContext, event);
        })
    }
}


const click = (item) => {
    console.log(`Clicked item ${item}`)
}

const move = (item) => {
    console.log(`Moved item ${item}`)
}

const subscriber = new Publisher();

subscriber.subscribe(click);

subscriber.fire('#event 1');

subscriber.unsubscribe(click);

subscriber.fire('#event 2');

subscriber.subscribe(click);
subscriber.subscribe(move);

subscriber.fire('#event 3');
