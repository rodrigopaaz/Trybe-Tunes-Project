import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
      checkLength: true,
      showAlbum: false,
      album: [],
    };
  }

  async componentDidMount() {
    const { user, album } = this.state;
    const usuario = await this.fetchGetUser();
    this.setState({ user: usuario });
    console.log(user);
    this.setState({ loading: false });
    album.map((artist) => this.setState((prev) => ({ album: [...prev.album, artist] })));
  }

  /*   findAlbum = () => {
    const { user, album } = this.state;
    album.map((artist, index) => {
      console.log(artist);
      this.setState((prev) => ({ album: [...prev.album, artist] }));
    });
  } */

  checkLogin = (event) => {
    const { target } = event;
    this.setState({ user: target.value });
    return target.value.length >= Number('2')
      ? this.setState({ checkLength: false })
      : this.setState({ checkLength: true });
  };

  fetchAlbum = async () => {
    const { user } = this.state;
    const albuns = await searchAlbumsAPI(user);
    this.setState({ album: albuns });
    this.setState({ showAlbum: true });
    this.setState({ albumName: '' });
  };

  fetchGetUser = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    return user;
  };

  render() {
    const { loading, user, checkLength, showAlbum, albumName, album } = this.state;
    const { history } = this.props;
    return (
      <div className="main" data-testid="page-search">
        <Header />
        {loading && <h4>Carregando...</h4>}
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ albumName }
            onChange={ this.checkLogin }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ checkLength }
            onClick={ this.fetchAlbum }
          >
            Pesquisar
          </button>
          <p data-testid="header-user-name">
            { user.name }
          </p>
          {showAlbum
          && <p>{`Resultado de álbuns de: ${user}`}</p>}
        </div>
        <div>
          { album.length >= 1
            ? album.map((element, key) => (
              <div key={ key }>
                <p>
                  Álbum
                  {' '}
                  {element.collectionName}
                </p>
                <p>
                  Artista
                  {' '}
                  {element.artistName}
                </p>
                <Link
                  data-testid={ `link-to-album-${element.collectionId}` }
                  to={ `./album/${element.collectionId}` }
                >
                  Link

                </Link>

              </div>
            ))
            : <p>Nenhum álbum foi encontrado</p>}

        </div>

      </div>
    );
  }
}

export default Search;
