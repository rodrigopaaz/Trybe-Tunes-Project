import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      song: [],
      isFavorite: true,
    };
  }

  componentDidMount() {
    this.fetchSongs();
  }

  fetchSongs = async () => {
    const { song } = this.state;
    this.setState({ loading: true });
    console.log(`primeiro ${song}`);
    const songs = await getFavoriteSongs();
    console.log(`segundo ${songs}`);
    this.setState({ song: songs });
    this.setState({ loading: false });
  };

  render() {
    const { loading, song, isFavorite } = this.state;
    if (loading) { return <Carregando />; }
    const music = (
      <div className="search__content">
        <div className="search"><h1>Favoritas</h1></div>
        <div className="favorites__result">
          {
            song.map((element, key) => (
              <div className="song__name" key={ key }>
                <MusicCard
                  previewUrl={ element.previewUrl }
                  songName={ element.trackName }
                  trackId={ element.trackId }
                  element={ element }
                  isFavorite={ isFavorite }
                  fetchSongs={ this.fetchSongs }
                />
              </div>
            ))
          }
        </div>
      </div>);
    return (
      <div className="main" data-testid="page-favorites">
        <Header />
        {loading ? <Carregando /> : music}

      </div>
    );
  }
}

export default Favorites;
