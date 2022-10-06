import React from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from './Carregando';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      usuario: {},
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

  handleChange = (event) => {
    const { name, value } = event.target;
    const { usuario } = this.state;
    usuario[name] = value;
    this.setState({
      usuario,
    });
  };

  validMail = (value) => {
    const check = /\S+@\S+\.\S+/;
    return check.test(value);
  };

  checkData = () => {
    const { usuario } = this.state;
    const { email, name, description, image } = usuario;
    const validName = name.length > 0;
    const validEmail = this.validMail(email);
    const validDescription = description.length > 0;
    const validImage = image.length > 0;
    return validName && validEmail && validDescription && validImage;
  };

  updateUser = async () => {
    const { history } = this.props;
    const { usuario } = this.state;
    this.setState({ loading: true });
    await updateUser(usuario);
    this.setState({ loading: false });
    history.push('/profile');
  };

  render() {
    const { usuario, loading } = this.state;
    console.log(usuario);
    if (loading) { return (<Carregando />); }
    return (
      <div className="main" data-testid="page-profile-edit">
        <Header />
        <div>
          <label htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              type="text"
              data-testid="edit-input-name"
              value={ usuario.name }
              onChange={ this.handleChange }

            />
          </label>
          <label
            htmlFor="email"
          >
            Email:
            <input
              id="email"
              name="email"
              type="text"
              value={ usuario.email }
              onChange={ this.handleChange }
              data-testid="edit-input-email"

            />
          </label>
          <label
            htmlFor="description"
          >
            Description:
            <input
              name="description"
              type="text"
              data-testid="edit-input-description"
              value={ usuario.description }
              onChange={ this.handleChange }
            />
          </label>
          <label
            htmlFor="image"
          >
            Imagem:
            <input
              id="image"
              name="image"
              type="text"
              data-testid="edit-input-image"
              value={ usuario.image }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ !this.checkData() }
            onClick={ this.updateUser }
          >
            Save

          </button>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}).isRequired;

export default ProfileEdit;
