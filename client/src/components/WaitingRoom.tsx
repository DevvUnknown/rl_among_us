import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import ConnectionHandler from '../logic/ConnectionHandler';
import { GameManager } from "../logic/GameManager";


interface IProps {
};
interface IState {
    playerList: ILightPlayer[]
    color: string
}

interface ILightPlayer {
    name: string,
    color: string,
    isHost: boolean
}

export class PlayerList extends Component<IProps, IState> {

    

    
    constructor(props: IProps) {
        super(props)
        this.state = {
            playerList: [],
            color: '#000'
        }
    }
    


    componentDidMount() {
        ConnectionHandler.activeConnection.io.on('updateRoster', this.handleUpdateRoster);
    }

    handleUpdateRoster = (roster: ILightPlayer[]) => {
        this.setState({ playerList: roster });
    }
    
    handleColorChange = (color: any) => {
        this.setState({ color: color.hex });
        ConnectionHandler.activeConnection.io.emit('setColor', color.hex);
        console.log(`Set local color to ${color.hex}`);
    }

    handleStartGame = (event: React.MouseEvent) => {
        event.preventDefault();
        ConnectionHandler.activeConnection.io.emit('startGame');
    }


    
    render() {

        
    let { playerList } = this.state;
    let listItems = playerList.map(
        (player) => <li key={player.name} style={{ color: player.color }}>{player.name}</li>
    ); 
    let button;


    button = <button id="buttonstart" onClick={this.handleStartGame}>Start Game</button>;
    if (playerList) {
        return (
            <div>
                <ul>
                   {listItems} 
                </ul>
                <CirclePicker
                colors={["#C51211", "#132ED1", "#13802C", "#EC54BB", "#3E474E", "#71491D", "#39FEDD", "#4EEF38", "#F17D0C", "#6C2FBC", "#D6DFF1", "#F6F657"]}
                onChange={this.handleColorChange}/>
                {button}
            </div>
        )
    }


}
}

export default PlayerList

