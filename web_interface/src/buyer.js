import React from 'react';

class Buyer extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        buyerAddress: '',
        selectedAgent: '',
        price: 0,
        condition: 0,
        warnText: ''
    }

    handleAddressChange = event => {
        this.setState({buyerAddress: event.target.value});
    }

    handleAgentChange = event => {
        this.setState({selectedAgent: event.target.value});
    }

    handleConditionChange = event => {
        this.setState({condition: parseInt(event.target.value)});
    }

    handlePriceChange = event => {
        this.setState({price: parseInt(event.target.value)});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const retVal = await this.props.escrowContract.methods.createTask(this.state.buyerAddress,
                                                                              this.state.selectedAgent,
                                                                              this.state.price,
                                                                              this.state.condition).send({from: this.props.websiteAddr, gas: 3000000});
            console.log(retVal);
            this.setState({warnText: 'Created task successfully'});
        } catch (error) {
            console.log(error.message);
            this.setState({warnText: error.message});
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='buyerAddress'>Address: </label>
                    <input type='text' id='buyerAddress' name='buyerAddress' onChange={this.handleAddressChange}/><br/>
                    <label htmlFor='selectedAgent'>Agent address: </label>
                    <input type='text' id='selectedAgent' name='selectedAgent' onChange={this.handleAgentChange}/><br/>
                    <label htmlFor='price' name='price'>Price: </label>
                    <input type='number' id='price' name='price' onChange={this.handlePriceChange}/><br/>
                    <label htmlFor='condition' name='condition'>Condition: </label>
                    <input type='number' id='condition' name='condition' onChange={this.handleConditionChange}/><br/>
                    <p><button type="submit">Submit</button></p>
                    <p>{this.state.warnText}</p>
                </form>
            </div>
        );
    }
}

export default Buyer;
