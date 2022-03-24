import './sass/style.scss';
import React from 'react';
import SearchDropdown from './components/searchDropdown';

const DropdownWrapper = () => {
  return (
    <section className='dropdown-app'>
        <header>
            <h1>Dropdown Search</h1>
        </header>
        <main className='dropdown-body'>
          <SearchDropdown />
        </main>
      </section>
  );
}

export default DropdownWrapper;
