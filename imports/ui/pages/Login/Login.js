import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import OAuthLoginButton from '../../components/OAuthLoginButton/OAuthLoginButton';
import validate from '../../../modules/validate';

import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
        },
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        password: {
          required: 'Need a password here.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;

    Meteor.loginWithPassword(this.emailAddress.value, this.password.value, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Welcome back!', 'success');
        history.push('/documents');
      }
    });
  }

  render() {
    return (<div className="Login">
      <Row>
        <Col xs={12} sm={6} md={5} lg={4}>
          <h4 className="page-header">Log In</h4>
          <Row>
            <Col xs={12}>
              <FormGroup className="OAuthLoginButtons">
                <OAuthLoginButton service="facebook" />
                <OAuthLoginButton service="google" />
                <OAuthLoginButton service="github" />
              </FormGroup>
            </Col>
          </Row>
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            <p className="LoginWithEmail">Log In with an Email Address</p>
            <FormGroup>
              <ControlLabel>Email Address</ControlLabel>
              <input
                type="email"
                name="emailAddress"
                ref={emailAddress => (this.emailAddress = emailAddress)}
                className="form-control"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <input
                type="password"
                name="password"
                ref={password => (this.password = password)}
                className="form-control"
              />
            </FormGroup>
            <Button type="submit" bsStyle="success">Log In</Button>
            <p className="DontHaveAnAccount">
              {'Don\'t have an account?'} <Link to="/signup">Sign Up</Link>.
            </p>
          </form>
        </Col>
      </Row>
    </div>);
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Login;