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
    page: null,
    totalHits: 0,
    selectedImgId: null,
    selectedImg: null,
  };

  handleSubmit = toSearch => {
    this.setState({ toSearch, page: 1, totalHits: 0, error: null, images: [] });
  };

  handleLoadMoreBtn = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleFech = async () => {
    try {
      this.setState({ isLoading: true });
      const response = await fechImg(this.state.toSearch, this.state.page);
       this.setState(prevState => {
        return {
          images: [...prevState.images, ...response.data.hits],
          totalHits: response.data.totalHits,
        };
       });
       if (response.data.totalHits === 0) {
         Notiflix.Notify.warning('Nothing found, please try something else!');
         return
       };
      if (response.data.hits.length < 12) {
        Notiflix.Notify.info('Thats all we have');
      };
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
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
    if (this.state.toSearch !== prevState.toSearch || 
      this.state.page !== prevState.page) {
      this.handleFech();
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
