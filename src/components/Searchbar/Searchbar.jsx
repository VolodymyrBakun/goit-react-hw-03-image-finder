import { Component } from "react";

export class Searchbar extends Component {
  state = {
    toSearch: "",
  }

  handleChange = event => {
    this.setState({
      toSearch: event.target.value
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.toSearch)

  }

    render() {
        return (
          <header className="Searchbar">
            <form className="SearchForm" onSubmit={this.handleFormSubmit}>
              <button type="submit" className="SearchForm-button">
                <span className="SearchForm-button-label">Search</span>
              </button>

              <input
                className="SearchForm-input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={this.state.toSearch}
                onChange={this.handleChange}
              />
            </form>
          </header>
        );
    }
}