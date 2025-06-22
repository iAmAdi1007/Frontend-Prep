/** Q. Convert string to JadenCase. 
 * 
 * JadenCase: Every first letter of each word in the string should be uppercase
 */
const str = "How can mirrors be real if our eyes aren't real";
function convertToJadenCase(str){
    return str.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
}

console.log(convertToJadenCase(str));