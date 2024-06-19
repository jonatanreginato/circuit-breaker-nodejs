const baseline = 20;
let delay = baseline;
let timeErrorOccurred = null;

function delayedFunction() {
    return new Promise((resolve, reject) => {
        if (timeErrorOccurred) {
            let millisecondsPassed = new Date().getTime() - timeErrorOccurred;
            if (millisecondsPassed > 5000) {
                delay = baseline;
                timeErrorOccurred = null;
            }
        }
        if (delay > 1000) {
            timeErrorOccurred = new Date().getTime();
            return reject(new Error('Service failing'));
        }
        setTimeout(() => {
            msg = `Service is responding in ${delay} ms`;
            console.log(msg);
            resolve(msg);
            delay = delay * 2;
        }, delay);
    });
}

exports.delayedFunction = delayedFunction;
