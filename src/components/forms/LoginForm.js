import React, { Component } from 'react'
import { Button, Form, Message } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../messages/InlineError";
import PropTypes from 'prop-types';

class LoginForm extends Component {

    state = {
        data: { email: '', password: '' },
        loading: false,
        errors: {}
    }

    // handle text change  {  event.target.name &&  event.target.value }
    onChange = (event) => {
        this.setState({
            data: { ...this.state.data, [event.target.name]: event.target.value }
        });
    }

    // handle  on submit form 
    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props.submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
        }

    }

    validate = (data) => {
        const errors = {}

        if (!data.password) errors.password = "can't be blank"
        if (!Validator.isEmail(data.email)) errors.email = "Invalid email"

        return errors;
    }

    render() {

        const { data, errors, loading } = this.state;

        return (
            <Form onSubmit={this.onSubmit} loading={loading}>

                {errors.global &&
                    <Message negative>
                        <Message.Header>
                            Something went wrong
                        </Message.Header>
                        <p>{errors.global}</p>
                    </Message>
                }

                <Form.Field error={!!errors.email}>
                    <label htmlFor="email"> Email </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@example.com"
                        value={data.email}
                        onChange={this.onChange}
                    />
                </Form.Field>
                {errors.email && <InlineError text={errors.email} />}

                <Form.Field error={!!errors.password}>
                    <label htmlFor="password"> Password </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="make it secure"
                        value={data.password}
                        onChange={this.onChange}
                    />
                </Form.Field>
                {errors.password && <InlineError text={errors.password} />}

                <Form.Field>
                    <Button primary>Login</Button>
                </Form.Field>

            </Form>
        )
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
}


export default LoginForm;