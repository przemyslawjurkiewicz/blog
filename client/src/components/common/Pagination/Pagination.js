import React from 'react';
import ProtoTypes from 'prop-types';

import './Pagination.scss';

class Pagination extends React.Component {
  state = {
    presentPage: this.props.initialPage || 1
  };

  changePage = newPage => {
    const {onPageChange} = this.props;
    this.setState({presentPage: newPage});
    onPageChange(newPage);
  };

  render() {
    const {pages} = this.props;
    const {presentPage} = this.state;
    const {changePage} = this;
    return (
      <div className='pagination'>
        <ul className='pagination__list'>
          {[...Array(pages)].map((el, page) => (
            <li
              key={++page}
              onClick={() => {
                changePage(page);
              }}
              className={`pagination__list__item${
                page === presentPage ? ' pagination__list__item--active' : ''
              }`}
            >
              {page}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Pagination.ProtoTypes = {
  pages: ProtoTypes.number.isRequired,
  initialPpage: ProtoTypes.number,
  onPageChange: ProtoTypes.func.isRequired
};

export default Pagination;
