
const str = "How can mirrors be real if our eyes aren't real";
function convertToJadenCase(str){
    return str.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
}

console.log(convertToJadenCase(str));