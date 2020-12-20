import React, { Component } from 'react';

export default class Product extends Component {
  render() {
    return (
      <div className='container'>
        <ul className='miceList'>
          {this.props.products?.map((product, index) => {
            if (index !== 2 && product.product_details !== '') {
              return (
                <li className='List' key={index}>
                  <div className='productContainer'>
                    <div className='productImage'>
                      <img
                        alt={product.product_title}
                        src={`${product.thumbnail_url}`}
                        id={product.id}
                        onClick={this.props.goToDetail}
                      />
                    </div>
                    <div className='productInfo'>
                      <p className='infoTitle'>{product.product_title}</p>
                      <p className='infoDetail'>{product.product_details}</p>
                      <p>{product.product_price}</p>
                    </div>
                  </div>
                </li>
              );
            } else {
              return (
                <li className='List' key={index}>
                  <div
                    className='productContainer'
                    onMouseOver={this.handleMouseOver}
                  >
                    <div className='productImage'>
                      <div className='check'>
                        <input type='checkbox' className='checkbox' />
                        <label for='checkbox'>
                          <span></span>Compare
                        </label>
                      </div>
                      <img
                        alt={product.product_title}
                        src={`${product.thumbnail_url}`}
                      />
                    </div>
                    <div className='productInfo'>
                      <p className='infoTitle'>{product.product_title}</p>
                      <p>{product.price}</p>
                    </div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }
}
