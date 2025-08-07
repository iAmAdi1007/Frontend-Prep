type FunctionToExecute = (...args: any[]) => void

const circuitBreaker = (fn: FunctionToExecute, failureCount: number, timeThreshold: number) => {
    let failures = 0;
    let timeSinceLastFailure = 0;
    let isClosed = false;

    return function(...args: any[]){
        if(isClosed){
            const diff = Date.now() - timeSinceLastFailure;
            if(diff > timeThreshold){
                isClosed = false;
            }else{
                throw new Error('Server Unavailable');
            }
        }
        try{
            const res = fn(args);
            failures = 0;
            timeSinceLastFailure = 0;
            return res;
        }catch(err){
            failures++;
            timeSinceLastFailure = Date.now();
            if(failures >= failureCount){
                isClosed = true;
            }
        }
    }
}