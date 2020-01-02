import React from 'react'
import Link from "next/link";
import { login } from '../utils/auth'
import axios from 'axios';

import {Form, Icon, Input, Button, Alert} from 'antd';

import '../assets/login-form.less'

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            error: false,
        }
    }
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({
                    loading: true,
                    error: false
                })
                await this.authUser(values.username, values.password)
            }
        });
    };
    
    authUser = async (username, pwd) => {
        axios.post(process.env.API_URL + '/login',
            {
                username: username,
                password: pwd
            })
            .then(async response => {
                let {user, token} = await response.data
                user = JSON.stringify(user);
                await login({user, token})
            })
            .catch(error => {
                console.error(error);
                this.setState({
                    loading: false,
                    error: true
                })
            });
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Enter your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Enter your password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={this.state.loading} className="form-button">
                        Login
                    </Button>
                    or <Link href="/register"><a href="#">register now!</a></Link>
                </Form.Item>
                {this.state.error &&
                <Alert message="Invalid credentials" type="error" showIcon/>
                }
            </Form>
        );
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default LoginForm
