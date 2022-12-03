import React from 'react';
import LoadingIcons from 'react-loading-icons';

class Carregando extends React.Component {
  render() {
    return (
      <div className="main" data-testid="page-album">
        <div className="carregando">
          <LoadingIcons.Audio className="loading" style={ { color: 'black' } } />
          <h5>
            Carregando...
          </h5>
        </div>
      </div>
    );
  }
}

export default Carregando;
