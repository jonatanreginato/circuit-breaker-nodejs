const {delayedFunction} = require('./delayedFunction');
const circuitBreaker = require('opossum');

function setupCircuitBreaker() {
    const circuitBreakerOptions = {
        errorThresholdPercentage: 50, timeout: 10000, resetTimeout: 30000
    };
    const circuit = new circuitBreaker(delayedFunction, circuitBreakerOptions);
    circuit.fallback((error) => {
        if (error) {
            console.log(error.message);
            return error.message;
        }
    });
    circuit.on('halfOpen', () => {
        console.log('Circuit breaker is halfOpen');
    });
    circuit.on('open', () => {
        console.log('Circuit breaker is open');
    });
    circuit.on('close', () => {
        console.log('Circuit breaker is closed');
    });
    circuit.on('fallback', () => {
        console.log('Fallback called');
    });

    return circuit;
}

exports.setupCircuitBreaker = setupCircuitBreaker;
