import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { previewUrl, songName } = this.props;
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
      </div>
    );
  }
}

export default MusicCard;
