import { Component } from 'react';
import { CiSearch } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInput = e => {
    const { value } = e.target;

    this.setState({
      inputValue: value.trim(),
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { inputValue } = this.state;

    if (inputValue === '') {
      toast.warn('I was trying to find "Nothing". Nothing found');

      this.props.receivingRequest(null);
      return;
    }

    this.props.receivingRequest(inputValue);
  };

  formReset = e => {
    e.currentTarget.parentNode.elements.query.value = '';
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state.inputValue;

    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={s.searchFormButton}>
            <div className={s.searchFormButton__wrapper}>
              <CiSearch
                style={{ width: '20px', height: '20px', strokeWidth: '1px' }}
              />
            </div>
          </button>

          <input
            className={s.searchFormInput}
            type="text"
            autoComplete="off"
            value={inputValue}
            onChange={this.handleInput}
            autoFocus
            name="query"
            placeholder="Search images and photos"
          />

          <button
            type="button"
            className={s.searchFormButton}
            onClick={this.formReset}
          >
            <div className={s.searchFormButton__wrapper}>
              <RxCross2 style={{ width: '20px', height: '20px' }} />
            </div>
          </button>
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  receivingRequest: PropTypes.func.isRequired,
};
