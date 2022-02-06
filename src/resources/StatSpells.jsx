const factorial = (n) => n === 0 ? 1 : n * factorial(n - 1);

const normalDistribution = (numberOfAttacks) => {
    let distribution = [];
    for(let n=1; n <= Math.floor(numberOfAttacks/2); n++){
        const standardDeviation = (factorial(numberOfAttacks)/factorial(numberOfAttacks - n))/factorial(n);
        distribution.push(standardDeviation);
    }

    Number.isInteger(numberOfAttacks/2) ?
        distribution = distribution.concat(distribution.slice(0, distribution.length - 1).reverse()) :
        distribution = distribution.concat(distribution.slice().reverse());

    return distribution
};

const oneHitCalc = (acRange, toHitMod) => {
    let ac = acRange[0];
    const decimalPercents = [];
    
    while(ac <= parseInt(acRange[1], 10)){
        const hitChance = ((20 - ac) + toHitMod + 1)/20;
        hitChance > .95 ? decimalPercents.push(.95) :
            hitChance < .05 ? decimalPercents.push(.05) : decimalPercents.push(hitChance);
        ac++;
    }
    return decimalPercents;
};

const exactHitChance = (hit, miss, numberOfAttacks) => { // i.e. odds that in 7 attacks it'll hit exactly 5 times no more or less, but all.
    const exactHitChances = [];
    for (let n=1; n < numberOfAttacks; n++){
        const hits = Math.pow(hit, n);
        const misses = Math.pow(miss, numberOfAttacks - n);
        const exactHitChance = (hits * misses) * normalDistribution(numberOfAttacks)[n-1];

        exactHitChances.push(exactHitChance * 100);
    }
    return exactHitChances;
};

const hitChanceOrGreater = (exactHitChanceForAc, allHitChance, numberOfAttacks) => {
    const greaterHitChance = [];
    for (let n=0; n < numberOfAttacks; n++){
        let addHit = 0;
        for (let m=n; m < numberOfAttacks - 1; m++) {
            addHit = addHit + exactHitChanceForAc[m];
        }
        addHit = addHit + allHitChance;
        greaterHitChance.push(parseFloat(Math.round(addHit * 100)/100).toFixed(1))
    }
    
    return greaterHitChance;
};

export const toHitCalculation = (acRange, numberOfAttacks, toHitMod) => {
    const percents = [];
    for (let n=0; n < oneHitCalc(acRange, toHitMod).length; n++) {
        const hit = oneHitCalc(acRange, toHitMod)[n];
        const miss = 1 - hit;
        const allHit = (Math.pow(hit, numberOfAttacks)) * 100;

        const singleRowPercents = exactHitChance(hit, miss, numberOfAttacks);
        percents.push(hitChanceOrGreater(singleRowPercents, allHit, numberOfAttacks));
        
    }
    
    return percents;
};