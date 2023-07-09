import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.handleModalClose();
    }
  };

  handleClickOnOverlay = event => {
    if (event.target === event.currentTarget) {
      this.props.handleModalClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div className="Overlay" onClick={this.handleClickOnOverlay}>
        <div className="Modal">
          <img src={this.props.src.largeImageURL} alt={this.props.src.tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.object.isRequired,
  handleModalClose: PropTypes.func.isRequired,
};
