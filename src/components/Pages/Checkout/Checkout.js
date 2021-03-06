import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Checkout extends Component {

  handleClick = (event) => {
    event.preventDefault();
    let orderDetails = {
      customer_name: this.props.customer.name,
      street_address: this.props.customer.address,
      city: this.props.customer.city,
      zip: this.props.customer.zip,
      type: this.props.customer.type,
      total: this.props.cart.total,
      pizzas: this.props.cart.pizzas,
    }
    console.log( 'Got a checkout', orderDetails );
    axios.post( './api/order', orderDetails )
      .then( (result) => {
        console.log( 'Posted to the server' );
        this.props.history.push( '/' );
      })
      .catch( (error) => {
        alert( `Couldn't complete your order. Please try again` );
        console.log( 'Got an error checking out.', error );
      })
  }; //end handle click

  render() {
    return (
      <div>
        <h2>Step 3: Checkout</h2>
        <div className="contactInfo">
          { this.props.customer.name }
          <br />
          { this.props.customer.address }
          <br />
          { this.props.customer.city }
        </div>
        <p className="orderType">{ this.props.customer.type }</p>

        <table className="orderTable">
          <thead>
            <tr>
              <th>Pizza Name</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            { this.props.cart.pizzas.map( ( pizza, index ) => 
                      <tr key={ index }>
                          <td>{ pizza.name }</td>
                          <td>{ pizza.price }</td>
                      </tr>
                  )}
          </tbody>
        </table>
        <p>Total: { this.props.cart.total }</p>
        <button onClick={ (event) => this.handleClick(event) }>CHECKOUT</button>
      </div>
    );
  }
}

const mapStateToProps = (reduxStore) => ({

  customer: reduxStore.customer,
  cart: reduxStore.cart,


})

export default withRouter(connect( mapStateToProps )(Checkout));