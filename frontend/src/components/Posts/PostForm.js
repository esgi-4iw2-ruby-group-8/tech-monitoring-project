import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../store/actions/post';

const PostForm = ({ auth, addPost }) => {
  const [text, setText] = useState('');
  const [name, setName] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Dites nous tout</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost({
            text,
            name,
            user_id: auth.user.id,
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
          placeholder='Créer un article'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='envoyer' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
