import React from 'react';

class Agent extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleCheckFund = this.handleCheckFund.bind(this);
    }

    state = {
        registered: false,
        registerWarnText: '',
        agentAddr: '',
        status : 0,
        statusText: '',
        checkFundText: '',
        releaseText: ''
    }

    handleAgentAddr = event => {
        this.setState({agentAddr: event.target.value});
    }

    async handleRegister(event) {
        event.preventDefault();
        try {
            const retVal = await this.props.escrowContract.methods.register(this.state.agentAddr).send({from: this.props.websiteAddr});
            console.log('Registered');
            this.setState({registered: true});
        } catch (error) {
            if (error.message.endsWith('account already has role')){
                console.log('Address already registered');
                this.setState({registered: true});
            } else {
                console.log(error.message);
                this.setState({registerWarnText: error.message});
            }

        }
    }

    changeAddress = event => {
        event.preventDefault();
        this.setState({agentAddr: '', registered: false});
    }

    handleStatusChange = event => {
        this.setState({status: event.target.value});
    }

    async handleCheck(event) {
        event.preventDefault();
        try {
            const retVal = await this.props.escrowContract.methods.checkCondition(this.state.status).call({from: this.state.agentAddr});
            this.setState({statusText: retVal.toString()});
        } catch (error) {
            console.log(error.message);
            this.setState({statusText: error.message});
        } finally {}
    }

    async handleCheckFund(event) {
        event.preventDefault();
        try {
            const retVal = await this.props.escrowContract.methods.isFundReceived().call({from: this.state.agentAddr});
            this.setState({checkFundText: retVal.toString()});
        } catch (error){
            console.log(error.message);
            this.setState({checkFundText: error.message});
        }
    }

    async handleRelease(decision) {
        try {
            const retVal = await this.props.escrowContract.methods.release(decision).send({from: this.state.agentAddr});
            this.setState({releaseText: 'Released fund to receiver'})
        } catch (error) {
            console.log(error.message);
            this.setState({releaseText: error.message});
        }
    }

    render() {
        let registerComponent;
        if (!this.state.registered){
            registerComponent = (<form onSubmit={this.handleRegister}>
                                     <label htmlFor='agentAddr'>Agent Address: </label>
                                     <input type='text' name='agentAddr' id='agentAddr' onChange={this.handleAgentAddr}/>
                                     <button type='submit'>Register</button>
                                     <span>{this.state.registerWarnText}</span>
                                 </form>);
        } else {
            registerComponent = (<>
                                 <span>Agent Address: {this.state.agentAddr}</span>
                                 <button onClick={this.changeAddress}>Change Address</button>
                                 </>);
        }

        return (
            <div>
                {registerComponent}
                <form onSubmit={this.handleCheck}>
                    <label htmlFor='status'> Status: </label>
                    <input type='number' name='status' id='status' onChange={this.handleStatusChange}/>
                    <button type='submit'>Check Status</button>
                    <span>{this.state.statusText}</span>
                </form>
                <button onClick={this.handleCheckFund}>Check fund </button>
                <span>{this.state.checkFundText}</span><br/>
                <button onClick={() => this.handleRelease(true)}> Release to seller </button>
                <button onClick={() => this.handleRelease(false)}> Release to buyer </button>
                <span>{this.state.releaseText}</span>
            </div>
        );
    }
}

export default Agent;
