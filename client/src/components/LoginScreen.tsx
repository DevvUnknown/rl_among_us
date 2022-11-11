import React, { Component } from 'react'

interface IProps {
    onSubmit: (connectionInfo: IConnectionInfo) => void
}

export interface IConnectionInfo {
    url: string,
    playerName: string
}


class LoginScreen extends Component<IProps, IConnectionInfo> {


    constructor(props: IProps) {
        super(props)
    
        this.state = {
            url: 'http://localhost:5000',
            playerName: ''
        }
        
    }
    
    private handlePlayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ playerName: event.target.value });
    }
    
    private handleURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ url: event.target.value });
    }

    private handleSubmit = (event: React.SyntheticEvent) => {
        console.log("Worked")
        this.props.onSubmit({ url: this.state.url, playerName: this.state.playerName });
        event.preventDefault();
    }

    render() {
        console.log("Rendered")
        return (
            <form id="menu" onSubmit={this.handleSubmit}>
                <div className="group" id="menuitems">
                    <a className="text">URL: </a>
                    <input id="input" type='text' value={this.state.url} onChange={this.handleURLChange} />
                </div>
                <br />
                <div className="group" id="menuitems">
                    <a className="text">Player Name: </a>
                    <input id="input" type='text' value={this.state.playerName} onChange={this.handlePlayerChange}></input>
                    <button id="button" type='submit'>Submit</button>                    
                </div>
                <br />
                
            </form>
        )
    }
}

export default LoginScreen
