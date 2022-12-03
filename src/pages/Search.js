import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

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
    if (loading) { return (<Carregando />); }
    return (
      <div className="main" data-testid="page-search">
        <Header />
        <div className="search__content">
          <div className="search">
            <ion-icon name="logo-facebook" />
            <input
              type="text"
              data-testid="search-artist-input"
              value={ albumName }
              onChange={ this.checkLogin }
              placeholder="DIGITE SUA PESQUISA"
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ checkLength }
              onClick={ this.fetchAlbum }
            >
              Pesquisar
            </button>
          </div>
          <div className="search__result">
            {showAlbum
          && <p className="result">{`Resultado de álbuns de: ${user}`}</p>}
            { album.length >= 1
              ? album.map((element, key) => (
                <div key={ key }>
                  <Link to={ `./album/${element.collectionId}` }>
                    <img
                      src={ element.artworkUrl100 }
                      alt="imagem"
                      srcSet=""
                      className="artist_image"
                    />
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
                  </Link>
                </div>
              ))
              : <p />}

          </div>
        </div>

      </div>
    );
  }
}

export default Search;
