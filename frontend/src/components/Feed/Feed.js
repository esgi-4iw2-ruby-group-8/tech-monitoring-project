import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../Posts/PostItem';
// import PostForm from './PostForm';
import { getPostsAll } from '../../store/actions/post';

const Posts = ({ getPostsAll, post: { posts, loading } }) => {
  useEffect(() => {
    getPostsAll();
  }, [getPostsAll]);

  return loading ? (
    <Spinner />
  ) : (
      <Fragment>
        <h1 className='large text-primary'>Article</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Bienvenue sur notre plateforme d'entraide
      </p>
        {/* <PostForm /> */}
        <div className='posts'>
          {posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </Fragment>
    );
};

Posts.propTypes = {
  getPostsAll: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPostsAll }
)(Posts);
