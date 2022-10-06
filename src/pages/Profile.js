import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
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
      <div className="main" data-testid="page-profile">
        <Header />
        <div>
          <Link
            to="../profile/edit"
          >
            Editar perfil
          </Link>
        </div>
        <div>
          <span>
            <img data-testid="profile-image" src={ usuario.image } alt="user" />
          </span>
          <span>
            <h3>Name</h3>
            <p>{usuario.name}</p>
          </span>
          <span>
            <h4>Name</h4>
            <p>{usuario.name}</p>
          </span>
          <span>
            <h4>E-mail</h4>
            <p>{usuario.email}</p>
          </span>
          <span>
            <h4>Description</h4>
            <p>{usuario.description}</p>
          </span>
        </div>
      </div>
    );
  }
}

export default Profile;
