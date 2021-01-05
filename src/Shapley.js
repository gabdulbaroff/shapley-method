let Combinatorics=require("js-combinatorics");

export let Shapley = (length, obj) => {
    let lengthOfMembers = Number(length)
    let costsObj = {}
    Object.keys(obj).map(elem => costsObj[elem] = Number(obj[elem]))
    let len = Object.keys(costsObj).length
    let lastIndex = Object.keys(costsObj)[len-1]
    let costsIndices = []
    
    for(let i in costsObj) {
        if(i <= lengthOfMembers){
        costsIndices.push(i)
        }
    }

    let c = new Combinatorics.Permutation(`${lastIndex}`);
    let indeces  = []
    for(let i=0; i < c.length; i++) {
        indeces.push(c.nth(i))
    }
    return shapleyVector(indeces, costsObj)
}


let shapleyVector = (indeces, costsObj) => {
    let firstSum;
    let sums = []
    let prevSum;
    for(let i = 0; i < indeces.length; i++) {
        let iToJ = `${indeces[i][0]}`
        firstSum = costsObj[iToJ]
        let currSum = [firstSum]
        prevSum = firstSum
        for(let j = 1; j < indeces[i].length; j++) {
            iToJ = iToJ + indeces[i][j]
            let iToJArr = new Combinatorics.Permutation(iToJ);
            if(iToJArr.length > 1){for(let k=0; k < iToJArr.length; k++) {
                if(costsObj[iToJArr.nth(k).join("")] !== undefined) {
                    currSum.push(costsObj[iToJArr.nth(k).join("")] - prevSum)
                    prevSum = costsObj[iToJArr.nth(k).join("")]
                }
            }} 
        }
        let sortedCurrSum = sortByIndices(currSum, indeces[i]) 
        sums.push(sortedCurrSum)
    }
    return averageElemsVector(sums)
}

let sortByIndices = (currSum, indices) => {
    let resArr = currSum
     for(let i=0; i< indices.length - 1; i++) {
        for(let j=0; j< indices.length - 1; j++) {
            if(indices[j] > indices[j+1]) {
                let swap = indices[j]
                indices[j] = indices[j+1]
                indices[j+1] = swap

                swap = resArr[j]
                resArr[j] = resArr[j+1]
                resArr[j+1] = swap
            }
        }
     }
     return resArr
}

let averageElemsVector = (sums) => {
    let n_factorial = factorial(sums[0].length)
    let elemsVector = new Array(sums[0].length).fill(0);
    for(let i = 0;i < sums.length; i++) {
        for(let j = 0; j < sums[0].length; j++) {
            elemsVector[j] = elemsVector[j] + sums[i][j] 
        }
    }
    elemsVector = elemsVector.map((elem) => elem/n_factorial)
    return elemsVector
}

let factorial = (n) => {
    if(n=== 0) {
        return 1
    }
    if (n < 0) {
        return 0
    }
    return n * factorial(n-1); 
}