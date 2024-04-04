import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:4000/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const { token } = response;
          localStorage.setItem('token', token);
          window.location.href='/bookget'
        
        } else {
          const errorResponse = JSON.parse(xhr.responseText);
          this.setState({ error: errorResponse.error });
        }
      }
    };
    xhr.send(JSON.stringify({ email, password }));
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="email" name="email" value={email} onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={password} onChange={this.handleChange} />
          </label>
          {error && <div className="error">{error}</div>}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
