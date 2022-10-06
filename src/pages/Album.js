import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      loading: false,
      songs: [],
    };
  }

  async componentDidMount() {
    await this.musicFilter();
  }

  musicFilter = async () => {
    const { match: { params } } = this.props;
    this.setState({ loading: true });
    const musics = await getMusics(params.id);
    this.setState({ loading: false });
    this.setState({ artist: musics[0] });
    this.setState({ songs: musics });
  };

  fetchSongs = () => console.log('fetch');

  render() {
    const { artist, loading, songs } = this.state;
    console.log(songs);
    return (
      <div className="main" data-testid="page-album">
        <Header />
        {loading && <p>Carregando...</p>}
        {!loading
          && <p data-testid="artist-name">{artist.artistName }</p>}
        { songs.map((element, key) => (
          key >= 1 ? <MusicCard
            key={ key }
            previewUrl={ element.previewUrl }
            songName={ element.trackName }
            trackId={ element.trackId }
            element={ element }
            fetchSongs={ this.fetchSongs }
          />
            : null
        ))}
        {!loading
          && <p data-testid="album-name">{artist.collectionName }</p>}

      </div>
    );
  }
}

Album.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
});

export default Album;
