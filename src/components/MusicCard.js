import React from 'react';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      check: false,
      favorites: [],
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const { favorites } = this.state;
    this.setState({ loading: true });
    const favorite = await getFavoriteSongs();
    console.log(favorite);
    favorite.find((element) => element.trackId === (trackId))
      ? this.setState({ check: true })
      : this.setState({ check: false });
    this.setState({ loading: false });
  }

  favorite = async (event) => {
    const { loading, check } = this.state;
    const { target } = event;
    this.setState({ check: !check });
    this.setState({ loading: true });
    target.checked
      ? await addSong(JSON.parse(target.value))
      : await removeSong(JSON.parse(target.value));
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

export default MusicCard;
