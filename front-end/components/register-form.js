import React from 'react'
import axios from "axios";
import {login} from "../utils/auth";

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
  Alert,
} from 'antd'
import Link from "next/link";

import '../assets/login-form.less'

class RegistrationForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      loading: false,
      error: false,
      errorMsg: ""
    }
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.setState({
          loading: true,
          error: false,
          errorMsg: ""
        })
        await this.registerUser(values.first_name, values.last_name, values.username, values.password)
      }
    });
  };
  
  registerUser = async (first, last, username, pwd) => {
    axios.post(process.env.API_URL + '/register',
        {
          first_name: first,
          last_name: last,
          username: username,
          password: pwd
        })
        .then(async response => {
          let {user, token} = await response.data
          user = JSON.stringify(user);
          await login({user, token})
        })
        .catch(error => {
          this.setState({
            loading: false,
            error: true,
            errorMsg: error.response.data
          })
        });
  }
  
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('The two passwords are different!');
    } else {
      callback();
    }
  };
  
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    
    return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className={"register-form"}>
          <Form.Item label="First name" hasFeedback>
            {getFieldDecorator('first_name', {
              rules: [
                {
                  required: true,
                  message: 'Enter your first name!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Last name" hasFeedback>
            {getFieldDecorator('last_name', {
              rules: [
                {
                  required: true,
                  message: 'Enter your last name!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Username" hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Enter your username!',
                  whitespace: false
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Enter your password!',
                },
                {
                  min: 5,
                  message: 'Minimum Length: 5 characters!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label={
            <span>
              Confirmation&nbsp;
              <Tooltip title="Same password as before">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
                     hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Enter a password identical to the previous one!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item className={"confirm-form"}>
            <Button type="primary" htmlType="submit" loading={this.state.loading} className="form-button">
              Registration
            </Button>
            or <Link href="/login"><a href="#">Already registered? Login here!</a></Link>
          </Form.Item>
          {this.state.error &&
          <Alert message={this.state.errorMsg} type="error" showIcon/>
          }
        </Form>
    );
  }
}

const RegisterForm = Form.create({ name: 'register' })(RegistrationForm);

export default RegisterForm
