import React, { Component, Fragment } from 'react';

import Logo from '../Logo/Logo';

class Navbar extends Component {
  render() {
    return (
      <Fragment>
        <header className="Navbar">
          <div>
             <Logo/>
          </div>
          <div className="Title">
            <span>Hacker News</span>
            <span>top</span> | <span>new</span>
          </div>
          <div className="Login">
            <span>Login</span>
          </div>
        </header>
      </Fragment>
    );
  }
}

export default Navbar;
