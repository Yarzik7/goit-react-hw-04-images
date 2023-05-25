import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { SearchBar, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleQueryChange = ({ currentTarget: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.query.trim()) {
      toast.error('Введіть тему картинок');
      return;
    }

    this.props.onSubmit(this.state.query);

    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            className="input"
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleQueryChange}
            value={query}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}

export { Searchbar };