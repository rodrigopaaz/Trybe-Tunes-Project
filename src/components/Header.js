import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div className="main" data-testid="header-component">
        <h1>teste</h1>
        <nav>
          <Link
            to="../search"
            data-testid="link-to-search"
          />
          <Link
            to="../favorites"
            data-testid="link-to-favorites"
          />
          <Link
            to="../profile"
            data-testid="link-to-profile"
          />
        </nav>
      </div>
    );
  }
}

export default Header;
