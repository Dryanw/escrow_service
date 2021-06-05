import React from 'react';
import Web3 from 'web3';
import './App.css';
import Buyer from './buyer';
import Agent from './agent';
import {ESCROW_ADDRESS, ESCROW_ABI} from './contract';


class App extends React.Component {
    state = {
        chosen: false,
        isBuyer: null,
        escrowContract: null,
        websiteAddr: null
    }

    async componentDidMount() {
        const web3 = new Web3('http://localhost:8545');
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(ESCROW_ABI, ESCROW_ADDRESS);
        console.log('seller address = ', accounts[0]);
        this.setState({escrowContract: contract, websiteAddr: accounts[0]});
    }

    buyer = event => {
        event.preventDefault();
        this.setState({chosen: true, isBuyer: true});
    }

    agent = event => {
        event.preventDefault();
        this.setState({chosen: true, isBuyer: false});
    }

    render() {
        let content;
        if (this.state.chosen) {
            content = (this.state.isBuyer)?
                        <Buyer escrowContract={this.state.escrowContract} websiteAddr={this.state.websiteAddr}/>
                        :<Agent escrowContract={this.state.escrowContract} websiteAddr={this.state.websiteAddr}/>
        } else {
            content = (
            <>
                <span>Are you a buyer or an agent?</span><br/>
                <button onClick={this.buyer}>Buyer</button>
                <button onClick={this.agent}>Agent</button>
            </>);
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default App;
