import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
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

  addFavorite = async (target) => (await target.checked
    ? addSong(JSON.parse(target.value))
    : removeSong(JSON.parse(target.value)));

  favorite = async (event) => {
    const { check } = this.state;
    const { target } = event;
    this.setState({ check: !check });
    this.setState({ loading: true });
    await this.addFavorite(target);
    this.setState({ loading: false });
  };

  render() {
    const { previewUrl, songName, trackId, element } = this.props;
    const { loading, check } = this.state;
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
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkBox"
            id={ trackId }
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

MusicCard.propTypes = ({
  previewUrl: PropTypes.string,
  songName: PropTypes.string,
  trackId: PropTypes.number,
  element: PropTypes.object,
}).isRequired;
export default MusicCard;
