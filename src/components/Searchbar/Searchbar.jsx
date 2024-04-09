import { Component, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';

export default function Searchbar({ receivingRequest }) {
  const [inputValue, setInputValue] = useState('');

  const handleInput = e => {
    const { value } = e.target;

    setInputValue(value.trim());
  };

  const onSubmit = e => {
    e.preventDefault();

    if (inputValue === '') {
      toast.warn('I was trying to find "Nothing". Nothing found');

      receivingRequest(null);
      return;
    }

    receivingRequest(inputValue);
  };

  const formReset = e => {
    e.currentTarget.parentNode.elements.query.value = '';

    setInputValue('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={onSubmit}>
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
          onChange={handleInput}
          autoFocus
          name="query"
          placeholder="Search images and photos"
        />

        <button
          type="button"
          className={s.searchFormButton}
          onClick={formReset}
        >
          <div className={s.searchFormButton__wrapper}>
            <RxCross2 style={{ width: '20px', height: '20px' }} />
          </div>
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  receivingRequest: PropTypes.func.isRequired,
};
