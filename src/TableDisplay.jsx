import React, { Component } from 'react';
import './css/TableDisplay.css';

class TableDisplay extends Component {
    render() {
        const {
            attacks,
            acStart,
            hitChances
        } = this.props;

        if (attacks > 0) {
            let tableHeader = [<th>AC|Attacks:</th>];
            for(let n=1; n <= attacks; n++){
                attacks === 1 ? tableHeader.push(<th><div>{n}</div></th>) :
                    n < attacks ? tableHeader.push(<th>{n} or more</th>) : tableHeader.push(<th> All {n} </th>)
            }
            return(
                <table className='table'>
                    <thead>
                        <tr className='table-header'>{tableHeader}</tr>
                    </thead>
                    <tbody>
                    {
                        hitChances.map((row, index) =>
                            <tr>
                                <td>{`${acStart + index}`}</td>
                                {row.map(percent =>
                                    percent === '100.0' || percent === '0.0' ?
                                    <td>~{percent}%</td> : <td>{percent}%</td>
                                )}
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            )
        } else {
            return(
                <div className='no-attacks'>You can't miss if you don't attack.</div>
            );
        }
    }
}

export default TableDisplay;
