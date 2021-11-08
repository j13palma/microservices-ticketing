import { useState } from 'react';
import axios from 'axios';
import useRequest from '../../hooks/use-request';

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign up</h1>
      <div className='form-group'>
        <label htmlFor='email'>Email address</label>
        <input
          type='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className='form-control'
          id='email'
          aria-describedby='emailHelp'
          placeholder='Enter email'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className='form-control'
          id='password'
          placeholder='Password'
        />
      </div>
      {errors}
      <button type='submit' className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
};

export default signup;
