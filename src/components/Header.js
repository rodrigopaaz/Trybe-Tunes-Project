import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineStar } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { getUser } from '../services/userAPI';
import logo from '../logo.png';
import HeaderProfile from './HeaderProfile';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      usuario: {},
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({ usuario: user });
  };

  render() {
    const { usuario } = this.state;
    return (
      <div className="main__header" data-testid="header-component">
        <img src={ logo } alt="" srcSet="" className="logo" />
        <nav>
          <div className="nav__search">
            <AiOutlineSearch />
            <Link
              to="../search"
              data-testid="link-to-search"
            >
              Search
            </Link>
          </div>
          <div className="nav__search">
            <AiOutlineStar />
            <Link
              to="../favorites"
              data-testid="link-to-favorites"
            >

              Favorites
            </Link>
          </div>
          <div className="nav__search">
            <CgProfile />
            <Link
              to="../profile"
              data-testid="link-to-profile"
            >

              Profile
            </Link>
          </div>
        </nav>
        <HeaderProfile />
        {usuario ? <p>{usuario.user}</p> : null}
      </div>

    );
  }
}

export default Header;
