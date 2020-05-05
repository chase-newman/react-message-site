import React, { Component } from 'react';
import axios from 'axios'


class Bitcoin extends Component {
    state = {
        time: null,
        price: null
    }
    
    componentDidMount () {
        axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then(response => {
            console.log(response);
            console.log(response.data.time.updated)
            console.log(response.data.bpi.USD.rate)
            this.setState({
                time: response.data.time.updated,
                price: response.data.bpi.USD.rate
            })
        });
    }
    
    render () {
        return (
            <div>
                <p>{this.state.time}</p>
                <p>{this.state.price}</p>
            </div>
        );
    };
};

export default Bitcoin;