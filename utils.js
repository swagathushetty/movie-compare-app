//debounce function
//has a guard that prevents certain things
const debounce = (func, delay) => {
    let timeoutID;
    return (...args) => {
        if (timeoutID) {
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout(() => {
            func.apply(null, args)
        }, delay)
    }
}