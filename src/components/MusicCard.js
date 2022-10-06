import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
    };
  }

  async componentDidMount() {
    await this.checkFavorite();
    this.setState({ loading: false });
  }

  checkFavorite = async () => {
    const { trackId } = this.props;
    this.setState({ loading: true });
    const favorite = await getFavoriteSongs();
    return favorite.find((element) => element.trackId === (trackId))
      ? this.setState({ check: true })
      : this.setState({ check: false });
  };

  addFavorite = async (target) => {
    await
    addSong(JSON.parse(target.value));
  };

  removeFavorite = async (target) => {
    await
    removeSong(JSON.parse(target.value));
  };

  favoriteUpdate = () => {
    const { fetchSongs } = this.props;
    this.setState({ loading: true });
    fetchSongs();
    this.setState({ loading: false });
  };

  favorite = async (event) => {
    const { isFavorite } = this.props;
    const { check } = this.state;
    const { target } = event;
    if (!isFavorite) { this.setState({ check: !check }); }
    this.setState({ loading: true });
    if (await target.checked) {
      this.addFavorite(target);
    } else { this.removeFavorite(target); }
    this.setState({ loading: false });
    this.favoriteUpdate();
  };

  render() {
    const { previewUrl, songName, trackId, element } = this.props;
    const { loading, check } = this.state;
    if (loading) { return <Carregando />; }
    return (
      <div className="main">
        <p>{ songName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `fav-${trackId}` }>
          Favorita
          <input
            type="checkBox"
            id={ `fav-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.favorite }
            checked={ check }
            value={ JSON.stringify(element) }

          />
        </label>
        {loading && <p>Carregando...</p>}
      </div>
    );
  }
}
MusicCard.defaultProps = {
  name: 'Rahul',
  eyeColor: 'deepblue',
  age: '45',
};

MusicCard.propTypes = ({
  previewUrl: PropTypes.string,
  songName: PropTypes.string,
  trackId: PropTypes.number,
  element: PropTypes.object,
}).isRequired;
export default MusicCard;
