import React, { Component } from 'react';
import logo from './dTwentyIconW.png';
import './css/bootstrap-grid.css';
import './css/bootstrap.css';
import './App.css';
import TableDisplay from './TableDisplay.js';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {atks:1, prof:2, mod:0, misc:0, acs:[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30], dieDam1:2.5, dieNum1:0, dieDam2:2.5, dieNum2:0, dieDam3:2.5, dieNum3:0, miscDam:0};

        this.handleAtkChange = this.handleAtkChange.bind(this);
        this.handleProfChange = this.handleProfChange.bind(this);
        this.handleModChange = this.handleModChange.bind(this);
        this.handleMiscChange = this.handleMiscChange.bind(this);
        this.handleMiscDamChange = this.handleMiscDamChange.bind(this);
        this.handleDam1Change = this.handleDam1Change.bind(this);
        this.handleDam2Change = this.handleDam2Change.bind(this);
        this.handleDam3Change = this.handleDam3Change.bind(this);
        this.handleNum1Change = this.handleNum1Change.bind(this);
        this.handleNum2Change = this.handleNum2Change.bind(this);
        this.handleNum3Change = this.handleNum3Change.bind(this);
    }
    
    FullMod(){ // adds all the variables together to get one modification score.
        let prof = parseInt(this.state.prof),
            mod = parseInt(this.state.mod),
            misc = parseInt(this.state.misc);
        
        return prof + mod + misc;
    }
    
    DamageMin(){
        let num1 = parseInt(this.state.dieNum1),
            num2 = parseInt(this.state.dieNum2),
            num3 = parseInt(this.state.dieNum3),
            mod = parseInt(this.state.mod),
            miscDam = parseInt(this.state.miscDam);
        
        let one = 1 * num1,
            two = 1 * num2,
            three = 1 * num3;
        
        let min = one + two + three + mod + miscDam;
        return min;
    }
    
        DamageAvg(){
        let dam1 = parseFloat(this.state.dieDam1),
            num1 = parseInt(this.state.dieNum1),
            dam2 = parseFloat(this.state.dieDam2),
            num2 = parseInt(this.state.dieNum2),
            dam3 = parseFloat(this.state.dieDam3),
            num3 = parseInt(this.state.dieNum3),
            mod = parseInt(this.state.mod),
            miscDam = parseInt(this.state.miscDam);
        
        let one = dam1 * num1,
            two = dam2 * num2,
            three = dam3 * num3;
        
        let avg = one + two + three + mod + miscDam;
            avg = Math.floor(avg);
        return avg;
    }
    
        DamageMax(){
        let dam1 = parseFloat(this.state.dieDam1),
            num1 = parseInt(this.state.dieNum1),
            dam2 = parseFloat(this.state.dieDam2),
            num2 = parseInt(this.state.dieNum2),
            dam3 = parseFloat(this.state.dieDam3),
            num3 = parseInt(this.state.dieNum3),
            mod = parseInt(this.state.mod),
            miscDam = parseInt(this.state.miscDam);
        
        let one = dam1 - .5;
            one = one * 2;
            one = one * num1;
        let two = dam2 - .5;
            two = two * 2;
            two = two * num2;
        let three = dam3 - .5;
            three = three * 2;
            three = three * num3;
        
        let max = one + two + three + mod + miscDam;
            max = Math.floor(max);
        return max;
    }
    
/*  4 = 2.5 
    6 = 3.5
    8 = 4.5
    10 = 5.5
    12 = 6.5 */
    
    /* display and hide with css */
    
    OneHitCalc(){
        var decimalPercents = [];
            for(let i=0; i<this.state.acs.length; i++){
                let hitChance = 1 + this.FullMod();
                hitChance = this.state.acs[i] - hitChance; // Applying modifier to AC.
                hitChance = 20 - hitChance; // Getting number of rolls attack would hit on.
                hitChance = hitChance/20; // Getting actual percentage after the fact.
                if (hitChance >= .95){ // Handeling crit fails 
                    hitChance = .95;
                }else if(hitChance <= .05){ // Handeling crit success
                    hitChance = .05;
                } 
                decimalPercents.push(hitChance);
            }
        return decimalPercents;
    }
    
    MultiHitCalc(){
        var percents= [];
        let oneHit = this.OneHitCalc();
        for (let i=0; i<oneHit.length; i++){ //running through all the hit chances for one attack
            let hit = oneHit[i];
            let miss = 1 - hit;
            let allMiss = Math.pow(miss, this.state.atks); //missing with all attacks
                allMiss = allMiss * 100;
            let allHit = Math.pow(hit, this.state.atks); //hitting with all attakcs
                allHit = allHit * 100;
            let singlePerc = this.ExactNumberHitChance(hit, miss); //gathering hit chances
            percents.push(this.HitNumberOrGreaterChance(singlePerc, allHit))
        }
        return percents;
    }
    
    HitNumberOrGreaterChance(singleHitArray, allHit){ 
        let addHitArray = [];
        for (let n=0; n < this.state.atks; n++){
            let addHit= 0;
            for (let m=n; m < this.state.atks-1; m++){
                addHit = addHit + singleHitArray[m];
            }
            addHit = addHit + allHit;
            addHit = parseFloat(Math.round(addHit * 100) / 100).toFixed(1);
            addHitArray.push(addHit);
        }
        return addHitArray;
    }
    
    ExactNumberHitChance(hit, miss){// gets hit chances for one of the attacks.
        let dist = this.HitNormDistribution(this.state.atks); 
        let exactArray = []
            for (let n=1; n < this.state.atks; n++){ // putting all the non-all hit or miss values into an array
                let nHit = n;
                    nHit = Math.pow(hit, nHit); //all the hits for a volly of attacks combined
                let nMiss = this.state.atks - n;
                    nMiss = Math.pow(miss, nMiss); //all the misses for a volly of attacks combined
                let nSum = nHit * nMiss; // adding them all up for one variation 
                    nSum = nSum * dist[n-1];// 'n-1' for array indexing. multiplying by number of variations
                exactArray.push(nSum * 100); // making number percents and not decimals 
            }
        return exactArray;
    }
    
    Factorial(n) {
        if (n === 0) {
            return 1;
        }
        return n * this.Factorial(n - 1);
    }
    
    HitNormDistribution(attacks){ // creats an array that has the normal distribution of the number a variations for an attacks hit-miss combination
        let iterations = [];
        for (let k=1; k <= Math.floor(this.state.atks/2); k++){ // Math.floor(this.state.atks/2) - since we opnly need the first half of the curve.
            let factTop = this.Factorial(this.state.atks); 
            let factBottom = this.Factorial(this.state.atks-k);
                let iteration = factTop/factBottom; 
                    iteration = iteration/this.Factorial(k);
                iterations.push(iteration);
        }
        
        // reflecting the first half of the curve created earlier
        if(this.IsOdd(attacks)){
            for (let it=iterations.length-1; it>=0; it--){
                iterations.push(iterations[it]);
            }
        }else{   
            for (let it=iterations.length-2; it>=0; it--){
                iterations.push(iterations[it]);
            }
        }
        
        return iterations;
    }
    
    IsOdd(number){
        if(Number.isInteger(number/2)){
            return false;
        }else{
            return true;
        }
    }
    
    ToggleOpen(){
        if(document.getElementById("die").classList.contains('open')){
            document.getElementById("die").classList.remove('open');
            document.getElementById("icon").classList.remove('open');
        }else{
            document.getElementById("die").classList.add('open');
            document.getElementById("icon").classList.add('open');
        }
    }
                             
    handleAtkChange(event) {
        if(event.target.value > 10){
            this.setState({atks: 10});
        }else{
            this.setState({atks: event.target.value});
        }
    }
    
    handleProfChange(event) {
        this.setState({prof: event.target.value});
    }
    
    handleModChange(event) {
        this.setState({mod: event.target.value});
    }
    
    handleMiscChange(event) {
        this.setState({misc: event.target.value});
    }
    
    handleDam1Change(event) {
        this.setState({dieDam1: event.target.value});
    }
    
    handleDam2Change(event) {
        this.setState({dieDam2: event.target.value});
    }
    
    handleDam3Change(event) {
        this.setState({dieDam3: event.target.value});
    }
    
    handleNum1Change(event) {
        this.setState({dieNum1: event.target.value});
    }
    
    handleNum2Change(event) {
        this.setState({dieNum2: event.target.value});
    }
    
    handleNum3Change(event) {
        this.setState({dieNum3: event.target.value});
    }
    
    handleMiscDamChange(event) {
        this.setState({miscDam: event.target.value});
    }
    
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="imageHolder">
              <img src={logo} className="App-logo" alt="logo" />
              <span className="percentSign">%</span>
          </div>
          <h1 className="App-title">Can I Hit This Shit?</h1>
        </header>
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="atkForm">
                        <form>
                            <label className="atkFormLabel">
                              <span>Number of Attacks</span>
                              <input
                                name="numOfAtks"
                                min="1"
                                max="10"
                                type="tel" 
                                value={this.state.atks}
                                onChange={this.handleAtkChange}/>
                            </label>
                            <label className="atkFormLabel">
                              <span>Proficiency Bonus</span>
                              <input
                                name="profBonus"
                                min="2"
                                max="6"
                                type="tel"
                                value={this.state.prof}
                                onChange={this.handleProfChange}/>
                            </label>
                            <label className="atkFormLabel">
                              <span>Ability Modifier</span>
                              <input
                                name="abilityMod"
                                type="tel"
                                min="-5"
                                max="10"
                                value={this.state.mod}
                                onChange={this.handleModChange}/>
                            </label>
                            <label className="atkFormLabel">
                              <span>Miscellaneous Modifier</span>
                              <input
                                name="miscMod"
                                type="tel"
                                min="-5"
                                max="20"
                                value={this.state.misc}
                                onChange={this.handleMiscChange}/>
                            </label>
                            <label className="atkFormLabel">
                              <span>Miscellaneous Damage Modifier</span>
                              <input
                                name="miscDamMod"
                                type="tel"
                                min="-20"
                                max="20"
                                value={this.state.miscDam}
                                onChange={this.handleMiscDamChange}/>
                            </label>
                            <div className="damDieForm">
                                <a onClick={this.ToggleOpen}><h4>Damage Dice <span className="damageDrop" id="icon">&#x27A4;</span></h4></a>
                                <div className="damDiceContainer" id="die">
                                    <label className="dieField">
                                      <span># of Dice</span>
                                      <input
                                        name="number of dice"
                                        type="tel"
                                        min="0"
                                        max="20"
                                        value={this.state.dieNum1}
                                        onChange={this.handleNum1Change}/>
                                    </label>
                                    <label className="dieField">
                                        <span>Die Type</span>
                                        <select value={this.state.dieDam1} onChange={this.handleDam1Change}>
                                          <option value="2.5">d4</option>
                                          <option value="3.5">d6</option>
                                          <option value="4.5">d8</option>
                                          <option value="5.5">d10</option>
                                          <option value="6.5">d12</option>
                                        </select>
                                    </label>
                                    <label className="dieField">
                                      <span># of Dice</span>
                                      <input
                                        name="number of dice"
                                        type="tel"
                                        min="0"
                                        max="20"
                                        value={this.state.dieNum2}
                                        onChange={this.handleNum2Change}/>
                                    </label>
                                    <label className="dieField">
                                        <span>Die Type</span>
                                        <select value={this.state.dieDam2} onChange={this.handleDam2Change}>
                                          <option value="2.5">d4</option>
                                          <option value="3.5">d6</option>
                                          <option value="4.5">d8</option>
                                          <option value="5.5">d10</option>
                                          <option value="6.5">d12</option>
                                        </select>
                                    </label>
                                    <label className="dieField">
                                      <span># of Dice</span>
                                      <input
                                        name="number of dice"
                                        type="tel"
                                        min="0"
                                        max="20"
                                        value={this.state.dieNum3}
                                        onChange={this.handleNum3Change}/>
                                    </label>
                                    <label className="dieField">
                                        <span>Die Type</span>
                                        <select value={this.state.dieDam3} onChange={this.handleDam3Change}>
                                          <option value="2.5">d4</option>
                                          <option value="3.5">d6</option>
                                          <option value="4.5">d8</option>
                                          <option value="5.5">d10</option>
                                          <option value="6.5">d12</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                        </form>
                        <div className="damageDiceNum">
                            <span>Damage Dice Min.</span>
                            <span>{this.DamageMin()}</span>
                            <span>Damage Dice Avg.</span>
                            <span className="number">{this.DamageAvg()}</span>
                            <span>Damage Dice Max</span>
                            <span>{this.DamageMax()}</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="displayStats">
                            <TableDisplay numOfAtks={this.state.atks} acNumbers={this.state.acs} percents={this.OneHitCalc()}  multiPercents={this.MultiHitCalc()}/>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
} 

export default App;
