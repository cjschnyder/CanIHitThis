import React, { Component } from 'react';

class TableDisplay extends Component {
    
    OneHitDisplay(){
        var deciPercents = this.props.percents;
        var percents = [];
        for(let i=0; i<deciPercents.length; i++){
            let tempPercent = Math.floor(deciPercents[i]*100); // Converting to actual percent.
            percents.push(tempPercent);
        }
        return percents;
    }
    
    render (){
        if(this.props.numOfAtks == 1){
            let displayAtkNums = [<tr><th>AC|Attacks:</th><th>1</th></tr>];             
            for(let i=0; i<this.props.acNumbers.length; i++){          
                displayAtkNums.push(<tr><th>{this.props.acNumbers[i]}</th><th>{this.OneHitDisplay()[i]}%</th></tr>);
            }
            return (
                <table className="acTable">
                    <tbody>
                    <tr>
                        {displayAtkNums}
                    </tr>
                    </tbody>
                </table>
            );
        }else if(this.props.numOfAtks >= 2){
            let atkNums = [<th>AC|Attacks:</th>];     
            for(let i=1;i<=this.props.numOfAtks;i++){
                if(i<this.props.numOfAtks){
                    atkNums.push(<th>{i} or more</th>);
                }else{
                    atkNums.push(<th>All {i}</th>);        
                }
            }
            let displayAtkNums = <tr>{atkNums}</tr>;
            let displayRow = [];
            for (let n=0; n<this.props.acNumbers.length; n++){
                let thisRow = [<th>{this.props.acNumbers[n]}</th>];
                let tempPrecArray = this.props.multiPercents[n];
                for (let m=0; m<this.props.numOfAtks; m++){
                    if(tempPrecArray[m]==100.0 || tempPrecArray[m]==0.0){
                        thisRow.push(<th>~{tempPrecArray[m]}%</th>);
                    }else{
                        thisRow.push(<th> {tempPrecArray[m]}%</th>);
                    }
                }
                displayRow.push(<tr>{thisRow}</tr>);
            }
            return (
                <table className="acTable">
                    <tbody>
                        <tr>
                            {displayAtkNums}
                            {displayRow}
                        </tr>
                    </tbody>
                </table>
            );
        }else{
            return (
                <table className="acTable">
                    <tbody>
                        <tr>
                            <th>You can't miss if you don't attack.</th>
                        </tr>
                    </tbody>
                </table>
            );
        }
    }
}

export default TableDisplay;