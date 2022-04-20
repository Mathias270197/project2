export const debounce = (fnc, delay) => {
    let time;
  
    return function toBeExecuted(...args) {
        const later = () => {
            clearTimeout(time);
            fnc(...args);
        };
  
        clearTimeout(time);
        time = setTimeout(later, delay);
    };
 };