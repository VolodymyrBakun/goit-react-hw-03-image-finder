import React from 'react';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fechImg } from 'services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './Button/Button';
import { Loader } from './Loader/Loader';
import Notiflix from 'notiflix';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    toSearch: '',
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    totalHits: 0,
    selectedImgId: null,
    selectedImg: null,
  };

  handleSubmit = toSearch => {
    this.setState({ toSearch, page: 1, totalHits: 0, error: null });
  };

  handleLoadMoreBtn = async () => {
    try {
      this.setState({ isLoading: true });

      const response = await fechImg(this.state.toSearch, this.state.page + 1);
      this.setState({
        images: [...this.state.images, ...response.data.hits],
        page: this.state.page + 1,
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }

    if (this.state.totalHits - 12 <= this.state.images.length) {
      Notiflix.Notify.info('Thats all we have');
    }
  };

  onSelectImg = selectedImgId => {
    const selectedImg = this.state.images.find(img => img.id === selectedImgId);
    this.setState({ selectedImgId, selectedImg });
  };

  handleModalClose = () => {
    this.setState({
      selectedImgId: null,
      selectedImg: null,
    });
  };

  async componentDidUpdate(_, prevState) {
    if (this.state.toSearch !== prevState.toSearch) {
      try {
        this.setState({ isLoading: true });
        const response = await fechImg(this.state.toSearch);
        if (response.data.totalHits === 0) {
          Notiflix.Notify.warning('Nothing found, please try something else!');
        }
        this.setState({
          images: response.data.hits,
          totalHits: response.data.totalHits,
        });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (prevState.selectedImgId !== this.state.selectedImgId) {
    }
  }

  render() {
    return (
      <div className="App">
        {/* Searchbar */}
        <Searchbar onSubmit={this.handleSubmit} />

        {/* Error */}
        {this.state.error !== null && <p>{this.state.error}</p>}

        {/* Gallery */}
        {this.state.images.length > 0 ? (
          <ImageGallery
            imgData={this.state.images}
            selectImg={this.onSelectImg}
          />
        ) : null}

        {/* Loader */}
        {this.state.isLoading && <Loader />}

        {/* Button */}
        {this.state.images.length > 0 &&
        this.state.totalHits / 12 > this.state.page ? (
          <LoadMoreButton loadMore={this.handleLoadMoreBtn} />
        ) : null}

        {/* Modal */}
        {this.state.selectedImgId && (
          <Modal
            src={this.state.selectedImg}
            handleModalClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}
