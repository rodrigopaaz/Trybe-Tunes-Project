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

  async componentDidMount() {
    this.fetchSongs();
  }

  /*   async componentDidUpdate() {
    await this.fetchSongs();
  } */

  fetchSongs = async () => {
    const songs = await getFavoriteSongs();
    this.setState({ song: songs });
    this.setState({ loading: false });
  };

  render() {
    const { loading, song, isFavorite } = this.state;
    if (loading) { return <Carregando />; }
    const music = (<div>
      {
        song.map((element, key) => (
          key >= 0 ? <MusicCard
            key={ key }
            previewUrl={ element.previewUrl }
            songName={ element.trackName }
            trackId={ element.trackId }
            element={ element }
            isFavorite={ isFavorite }
            fetchSongs={ this.fetchSongs }
          />
            : null
        ))
      }
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
