import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
    };
  }

  async componentDidMount() {
    await this.musicFilter();
  }

  musicFilter = async () => {
    const { match: { params } } = this.props;
    const musics = await getMusics(params.id);
    this.setState({ artist: musics[0] });
  };

  render() {
    const { artist } = this.state;
    console.log(artist.artistName);
    return (
      <div className="main" data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{artist.artistName }</h2>
        <h2 data-testid="album-name">{artist.collectionName }</h2>

      </div>
    );
  }
}

export default Album;
