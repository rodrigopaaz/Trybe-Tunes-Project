import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
    };
  }

  async componentDidMount() {
    const { user } = this.state;
    const usuario = await this.fetchGetUser();
    this.setState({ user: usuario });
    console.log(user);
    this.setState({ loading: false });
  }

  fetchGetUser = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    return user;
  };

  render() {
    const { loading, user } = this.state;
    return (
      <div className="main" data-testid="page-search">
        <Header />
        {loading && <h4>Carregando...</h4>}
        <p data-testid="header-user-name">
          { user.name }
        </p>

      </div>
    );
  }
}

export default Search;
