import React from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
    };
  }

  favorite = async (object) => {
    const { loading, check } = this.state;
    const { target } = object;
    this.setState({ check: !check });
    this.setState({ loading: true });
    const favoriteSong = await addSong(target.id);
    const unFavoriteSong = await removeSong(target.id);
    this.setState({ loading: false });
    console.log(unFavoriteSong);
  };

  render() {
    const { previewUrl, songName, trackId } = this.props;
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
            onClick={ this.favorite }
            checked={ check }

          />
        </label>
        {loading && <p>Carregando...</p>}
      </div>
    );
  }
}

export default MusicCard;
