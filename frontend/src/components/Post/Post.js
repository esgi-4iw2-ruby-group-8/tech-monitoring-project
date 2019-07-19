import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../Posts/PostItem';
import CommentForm from '../Post/CommentForm';
import CommentItem from '../Post/CommentItem';
import { getPost } from '../../store/actions/post';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  console.log(post);

  return loading || post === null ? (
    <Spinner />
  ) : (
      <Fragment>
        <Link to='/posts' className='btn'>
          Retour
      </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post.id} />
        <div className='comments'>
          {post.comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} postId={post.id} />
          ))}
        </div>
      </Fragment>
    );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
