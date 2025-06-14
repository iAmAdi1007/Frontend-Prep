function baseConverter(num, base){
    const str = '0123456789ABCDEF';
    let result = '';
    while(num > 0){
        let rem = Math.floor(num % base);
        result = str[rem] + result;
        num = Math.floor(num / base); 
    }

    return result;
}

console.log(baseConverter(16, 8));

/* Can be implemented using stack as well 
    1. Push remainders until number is greater than 0
    2. Pop till the stack is empty and use the same "str" string for values
*/