import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <div className="main" data-testid="page-album">
        <Header />
      </div>
    );
  }
}

export default Album;
