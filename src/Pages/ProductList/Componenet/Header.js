import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div>
        <div className='category'>
          <div className='categoryBox'>
            <div className='categoryData'>
              <div className='miceKeyboardMice'>
                <a className='miceKeyboard'>Mice + Keyboards </a> / Mice
              </div>
              <h1>MICE</h1>
              <h6>Logitech Mice</h6>
            </div>
            <div className='mouseImage'>
              <img
                alt='mouseImage'
                src='https://www.logitech.com/assets/64464/mice.png'
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
