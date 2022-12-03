import React, { Component } from 'react';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class HeaderProfile extends Component {
  constructor() {
    super();
    this.state = {
      loading: '',
      usuario: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({ usuario: user });
    this.setState({ loading: false });
  };

  render() {
    const { usuario, loading } = this.state;
    if (loading) { return (<Carregando />); }
    return (
      <div className="HeaderProfile">
        <img src={ usuario.image } alt="" srcSet="" />
        <p>{usuario.name}</p>
        <p>{usuario.email}</p>
      </div>
    );
  }
}

export default HeaderProfile;
