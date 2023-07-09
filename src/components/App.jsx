import React from 'react';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fechImg } from 'services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './Button/Button';

export class App extends Component {
  state = {
    toSearch: '',
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    totalHits: 0
  };

  handleSubmit = toSearch => {
    this.setState({ toSearch, page: 1 , totalHits: 0});
  };

  handleLoadMoreBtn = async () => {
    // console.log(this.state.images);
    try {
      const response = await fechImg(this.state.toSearch, this.state.page + 1);
      console.log(response);
      this.setState({
        images: [...this.state.images, ...response.data.hits],
        page: this.state.page + 1,
      });
    } catch (error) {
    } finally {
    }
  };

  async componentDidUpdate(_, prevState) {
    if (this.state.toSearch !== prevState.toSearch) {
      try {
        const response = await fechImg(this.state.toSearch);
        // console.log(response);
        this.setState({
          images: response.data.hits,
          totalHits: response.data.totalHits,
        });
      } catch (error) {
      } finally {
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.images.length > 0 ? (
          <ImageGallery imgData={this.state.images} />
        ) : null}
        {(this.state.images.length > 0 && (this.state.totalHits / 12 > this.state.page)) ? (
          <LoadMoreButton loadMore={this.handleLoadMoreBtn} />
        ) : null}
      </div>
    );
  }
}
