import React from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete, Alert,
} from 'antd'
import Link from "next/link";

import '../assets/login-form.less'
import axios from "axios";
import {login} from "../utils/auth";

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
          console.log(response);
          let {user, token} = await response.data
          user = JSON.stringify(user);
          console.log(user)
          await login({user, token})
        })
        .catch(error => {
          console.log(error);
          this.setState({
            loading: false,
            error: true,
            errorMsg: error.message
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
      callback('Les deux mots de passe sont différents');
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
          <Form.Item label="Prénom" hasFeedback>
            {getFieldDecorator('first_name', {
              rules: [
                {
                  required: true,
                  message: 'Entrez votre prénom!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Nom" hasFeedback>
            {getFieldDecorator('last_name', {
              rules: [
                {
                  required: true,
                  message: 'Entrez votre nom!',
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Nom d'utilisateur" hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Entrez un nom d\'utilisateur!',
                  whitespace: false
                }
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Mot de passe" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Entrez un mot de passe!',
                },
                {
                  min: 5,
                  message: 'Longueur minimum : 5 caractères!',
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
              <Tooltip title="Même mot de passe que précédemment">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
                     hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Entrez un mot de passe  identique au précédent!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item className={"confirm-form"}>
            <Button type="primary" htmlType="submit" loading={this.state.loading} className="form-button">
              Inscription
            </Button>
            ou <Link href="/login"><a href="#">Déjà inscrit ? Connectez-vous !</a></Link>
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
