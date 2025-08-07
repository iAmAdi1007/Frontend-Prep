class AnalyticsSDK{
    #queue;
    #count;
    constructor(){
        this.#queue = [];
        this.#count = 1;
    }

    wait() {
        return new Promise((res, rej) => {
            setTimeout(() => {
                if(this.#count % 5 === 0){
                    rej()
                }else{
                    res();
                }
            }, 1000)
        })
    }

    logEvents(fn){
        this.#queue.push(fn)
    }

    async sendAnalytics(){
        if(this.#queue.length === 0){
            return;
        }

        const event = this.#queue.shift();

        try{
            await this.wait();
            console.log("Analytics Sent", event)
            this.#count++;
        }catch(err){
            console.log('Failed to Sent', event);
            console.log('Retrying again!!');

            this.#count = 1;
            this.#queue.unshift(event);
        }finally{
            this.sendAnalytics();
        }
    }

    async send(){
        this.sendAnalytics();
    }
}

const sdk = new AnalyticsSDK();

sdk.logEvents('Event 1');
sdk.logEvents('Event 2');
sdk.logEvents('Event 3');
sdk.logEvents('Event 4');
sdk.logEvents('Event 5');
sdk.logEvents('Event 6');
sdk.logEvents('Event 7');
sdk.logEvents('Event 8');
sdk.logEvents('Event 9');
sdk.logEvents('Event 10');

sdk.send();
