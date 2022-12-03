import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
    return (
      <div className="main__songs">
        {loading && <Carregando />}
        <div className="song">
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
            { `fav-${trackId}` }
            <Checkbox
              sx={ {
                color: 'red',
                '&.Mui-checked': {
                  color: 'red',
                },
              } }
              onChange={ this.favorite }
              id={ `fav-${trackId}` }
              checked={ check }
              value={ JSON.stringify(element) }
              { ...label }
              icon={ <FavoriteBorder /> }
              checkedIcon={ <Favorite /> }
              name={ `fav-${trackId}` }
            />
          </label>
        </div>
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
  isFavorite: PropTypes.bool,
  fetchSongs: PropTypes.func,
}).isRequired;
export default MusicCard;
