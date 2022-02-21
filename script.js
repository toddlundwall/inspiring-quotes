console.log('h');


function scramble(str1, str2) {
    const arr1 = str1.split('')
    const arr2 = str2.split('')


    const newArray = arr2.map(el => { 
        if (!arr1.includes(el)) return false
        arr1.splice(`${arr1.indexOf(el)}`, 1)
        return el
        
    })
    console.log(newArray);
    if (newArray.includes(false)) return false
    else return true


}


console.log(scramble('rodlw', 'worrltd'))
console.log('new code'
)