import React, { Component } from 'react';
import logo from './dTwentyIconWPerc.png';
import TableDisplay from './TableDisplay';
import './css/DiceStats.css';

class DiceStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attacks: 1,
            proficiency: 2,
            abilityMod: 0,
            miscToHit: 0,
            miscDamage: 0,
            addScoreToDamage: true,
            acRange: [6,25],
            dice: [[0, 2.5]]
        };
    }

    render() {
        const {
            attacks,
            proficiency,
            abilityMod,
            miscToHit,
            miscDamage,
            addScoreToDamage,
            acRange,
            dice
        } = this.state;

        const fullMod = (parseInt(proficiency, 10) || 2) + (parseInt(abilityMod, 10) || 0) + (parseInt(miscToHit, 10) || 0);
        const factorial = (n) => n === 0 ? 1 : n * factorial(n - 1);

        const normalDistribution = () => {
            let distribution = [];
            for(let n=1; n <= Math.floor(attacks/2); n++){
                const standardDeviation = (factorial(attacks)/factorial(attacks - n))/factorial(n);
                distribution.push(standardDeviation);
            }

            Number.isInteger(attacks/2) ?
                distribution = distribution.concat(distribution.slice(0, distribution.length - 1).reverse()) :
                distribution = distribution.concat(distribution.slice().reverse());

            return distribution
        };

        const exactHitChance = (hit, miss) => { // i.e. odds that in 7 attacks it'll hit exactly 5 times no more or less, but all.
            const exactHitChances = [];
            for (let n=1; n < attacks; n++){
                const hits = Math.pow(hit, n);
                const misses = Math.pow(miss, attacks - n);
                const exactHitChance = (hits * misses) * normalDistribution()[n-1];

                exactHitChances.push(exactHitChance * 100);
            }
            return exactHitChances;
        };

        const hitChanceOrGreater = (exactHitChanceForAc, allHitChance) => {
            const greaterHitChance = [];
            for (let n=0; n < attacks; n++){
                let addHit = 0;
                for (let m=n; m < attacks - 1; m++) {
                    addHit = addHit + exactHitChanceForAc[m];
                }
                addHit = addHit + allHitChance;
                greaterHitChance.push(parseFloat(Math.round(addHit * 100)/100).toFixed(1))
            }
            return greaterHitChance;
        };

        const oneHitCalc = () => {
            let ac = acRange[0];
            const decimalPercents = [];
            while(ac <= parseInt(acRange[1], 10)){
                const hitChance = ((20 - ac) + fullMod + 1)/20;
                hitChance > .95 ? decimalPercents.push(.95) :
                    hitChance < .05 ? decimalPercents.push(.05) : decimalPercents.push(hitChance);
                ac++;
            }
            return decimalPercents;
        };

        const multiHitCalc = () => {
            const percents = [];
            for (let n=0; n < oneHitCalc().length; n++) {
                const hit = oneHitCalc()[n];
                const miss = 1 - hit;
                const allHit = (Math.pow(hit, attacks)) * 100;

                const singleRowPercents = exactHitChance(hit, miss);
                percents.push(hitChanceOrGreater(singleRowPercents, allHit));
            }
            return percents;
        };
        
        const minDam = () =>{
            let total = 0;
            const rDam = parseInt(miscDamage, 10) || 0,
                  mod = parseInt(abilityMod, 10) || 0;
            dice.map(die => {
                total = total + parseInt(die[0], 10) || 0;
            })
            addScoreToDamage ? total = total+mod+rDam : total=total+rDam;
            return total;
        }
        
        const avgDam = () =>{
            let total = 0;
            const rDam = parseInt(miscDamage, 10) || 0,
                  mod = parseInt(abilityMod, 10) || 0;
            dice.map(die => {
                const numOf = parseInt(die[0], 10) || 0,
                dieSize = parseFloat(die[1]) || 0;
                total = total + (dieSize * numOf);
            })
            addScoreToDamage ? total = total+mod+rDam : total=total+rDam;
            return Math.floor(total);
        }
        
        const maxDam = () =>{
            let total = 0;
            const rDam = parseInt(miscDamage, 10) || 0,
                  mod = parseInt(abilityMod, 10) || 0;
            dice.map(die => {
                const numOf = parseInt(die[0], 10) || 0,
                dieSize = (parseFloat(die[1]) - 0.5) * 2 || 0;
                total = total + (dieSize * numOf);
            })
            addScoreToDamage ? total = total+mod+rDam : total=total+rDam;
            return total;
        }

        return (
            <div className='dice-stats'>
                <header>
                    <div className="logo-container">
                        <img src={logo} className="dice-logo" alt="dice logo" />
                    </div>
                    <h1 className="title">Can I Hit This?</h1>
                </header>
                <div className='wrapper'>
                    <div className='input-and-damage'>
                        <div className='inputs'>
                            <span>Number of Attacks</span>
                            <input value={attacks} onChange={
                                (e) => {
                                    e.target.value > 10 ?
                                        this.setState({attacks: 10}) :
                                        this.setState({attacks: e.target.value})
                                }}
                        />
                        </div>
                        <div className='inputs'>
                            <span>Proficiency Bonus</span>
                            <input value={proficiency} onChange={(e) => {this.setState({proficiency: e.target.value})}}/>
                        </div>
                        <div className='inputs'>
                            <span>Ability Score Modifier</span>
                            <input value={abilityMod} onChange={(e) => {
                                    e.target.value > 50 ?
                                        this.setState({abilityMod: 50}) :
                                        this.setState({abilityMod: e.target.value});
                            }}/>
                        </div>
                        <div className='inputs'>
                            <span>Misc. Modifier</span>
                            <input value={miscToHit} onChange={(e) => {this.setState({miscToHit: e.target.value})}}/>
                        </div>
                        <div className='inputs'>
                            <span>Misc. Damage Modifier</span>
                            <input value={miscDamage} onChange={(e) => {
                                    e.target.value > 100 ?
                                        this.setState({miscDamage: 100}) :
                                        this.setState({miscDamage: e.target.value});
                            }}/>
                        </div>
                        <div className='ac-input'>
                            <span>AC Range</span>
                            <input className='ac-start' value={acRange[0]} onChange={(e) => {
                                    e.target.value < 0 ?
                                        this.setState({acRange: [0, acRange[1]]}) :
                                        this.setState({acRange: [e.target.value, acRange[1]]})
                                }}
                            />
                            <input className='ac-end'value={acRange[1]} onChange={(e) => {
                                    e.target.value > 100 ?
                                        this.setState({acRange: [acRange[0], 100]}) :
                                        this.setState({acRange: [acRange[0], e.target.value]})
                                }}
                            />
                        </div>
                        <h2>Damage Dice</h2>
                        <input 
                            type="checkbox" 
                            checked={addScoreToDamage}
                            onChange={() => {this.setState({addScoreToDamage: !addScoreToDamage})}}
                        />
                        <span>Add ability score to damage</span>
                        {dice.map((die, index) =>
                            <div className='dice-inputs'>
                                <div className="die-field">
                                    <span># of Dice</span>
                                    <input 
                                        value={die[0]}
                                        onChange={(e) => {
                                            let updatedDice = dice;
                                            const newNum = e.target.value > 100 ?
                                                [100, die[1]] :
                                                [e.target.value, die[1]];
                                            updatedDice[index] = newNum;
                                            this.setState({dice: updatedDice})
                                        }}
                                    />
                                </div>
                                <div className="die-field">
                                    <span>Die Type</span>
                                    <select 
                                        value={die[1]}
                                        onChange={(e) => {
                                            let updatedDice = dice;
                                            const newDie = [die[0], e.target.value];
                                            updatedDice[index] = newDie;
                                            this.setState({dice: updatedDice})
                                        }}
                                    >
                                        <option value="2.5">d4</option>
                                        <option value="3.5">d6</option>
                                        <option value="4.5">d8</option>
                                        <option value="5.5">d10</option>
                                        <option value="6.5">d12</option>
                                    </select>
                                </div>
                                <div 
                                    className="subtract-die"
                                    onClick={() => {
                                        const subDie = dice;
                                        subDie.splice(index, 1);
                                        this.setState({dice: subDie});
                                      }
                                    }
                                >
                                    X
                                </div>
                            </div>
                        )}
                        <div 
                            className="add-die"
                            onClick={() => {
                                const addDie = dice;
                                addDie.length >= 5 ? null : addDie.push([0, 2.5]);
                                this.setState({dice: addDie});
                            }}
                        >
                            + Add a Die
                        </div>
                        <div className="damage-numbers">
                            <div>
                                <span>Damage Min.</span>
                                <span>{minDam()}</span>
                            </div>
                            <div>
                                <span>Damage Avg.</span>
                                <span className="damage-average">{avgDam()}</span>
                            </div>
                            <div>
                                <span>Damage Max</span>
                                <span>{maxDam()}</span>
                            </div>
                        </div>
                    </div>
                    <div className='data-table'>
                        <TableDisplay attacks={attacks} acStart={parseInt(acRange[0], 10) || 0} hitChances={multiHitCalc()}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default DiceStats;