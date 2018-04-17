import React from 'react';

export class TheseusBoard extends React.Component {

	onClick(id){
		if(this.isActive(id)){
			this.props.moves.clickCell(id);
			this.props.events.endTurn();
		}
	}
	
	isActive(id) {
		if(!this.props.isActive) return false;
		return true;
	}
	
	render() {
		let winner = ''
		if(this.props.ctx.gameover !== null) {
			winner = <div>Winner: {this.props.ctx.gameover}</div>
		}
		
		const cellStyle = {
			border: '1px solid #555',
			width: '50px',
			height: '50px',
			lineHeight: '50px',
			textAlign: 'center',
		};
		
		let tbody =[];
		for (let i = 0; i < 5; i++) {
			let cells=[]
			for(let j=0;j<5;j++) {
				const id = 5 * i + j;
				cells.push(
					<td style={cellStyle} key={id} onClick={() => this.onClick(id)}>
						{this.props.G.cells[id]}
					</td>
				);
			}
			tbody.push(<tr key={i}>{cells}</tr>);
		}
		
		return(
			<div>
				<table id="board">
					<tbody>{tbody}</tbody>
				</table>
				{winner}
			</div>
		);
		
	}

};
