import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../store/actions/post';

const CommentForm = ({ auth, postId, addComment }) => {
  const [text, setText] = useState('');
  const [name, setName] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Laisser un commentaire</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, {
            text,
            name,
            user_id: auth.user.id,
            post_id: postId
           });
          setText('');
        }}
      >
        <input
          type="text"
          placeholder='Titre'
          value={name}
          onChange={
            e => setName(e.target.value)
          }
          required
        />
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Créer un commentaire '
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Envoyer' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
