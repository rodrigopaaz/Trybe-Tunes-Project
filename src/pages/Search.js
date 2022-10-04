import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
      checkLength: true,
    };
  }

  async componentDidMount() {
    const { user } = this.state;
    const usuario = await this.fetchGetUser();
    this.setState({ user: usuario });
    console.log(user);
    this.setState({ loading: false });
  }

  checkLogin = (event) => {
    const { target } = event;
    this.setState({ user: target.value });
    return target.value.length >= Number('2')
      ? this.setState({ checkLength: false })
      : this.setState({ checkLength: true });
  };

  fetchGetUser = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    return user;
  };

  render() {
    const { loading, user, checkLength } = this.state;
    return (
      <div className="main" data-testid="page-search">
        <Header />
        {loading && <h4>Carregando...</h4>}
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.checkLogin }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ checkLength }
          >
            Pesquisar
          </button>
          <p data-testid="header-user-name">
            { user.name }
          </p>
        </div>

      </div>
    );
  }
}

export default Search;
