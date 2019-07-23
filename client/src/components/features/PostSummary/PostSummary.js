import React from 'react';
import {PropTypes} from 'prop-types';
import {NavLink} from 'react-router-dom';

import Button from '../../common/Button/Button';
import SmallTitle from '../../common/SmallTitle/SmallTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import cutText from '../../../utils/cutText';
import './PostSummary.scss';

const PostSummary = ({id, title, content}) => (
  <article className='post-summary'>
    <SmallTitle>{title}</SmallTitle>
    <HtmlBox>{cutText(content, 250)}</HtmlBox>
    <NavLink exact to={'/posts/' + id}>
      <Button variant='primary'>Read more</Button>
    </NavLink>
  </article>
);

PostSummary.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string
};

export default PostSummary;
