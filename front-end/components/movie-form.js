import React from 'react'
import Router from 'next/router'
import axios from 'axios'
import moment from 'moment';
import PropTypes from 'prop-types'
import { getBase64 } from "../utils/img";
import { getAuthToken } from '../utils/auth'

import { Form, Select, InputNumber, Button, Upload, Icon, Modal, Input, DatePicker, message } from 'antd';
const TextArea = Input.TextArea;

class MovieForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUploadCancel = this.handleUploadCancel.bind(this)
        this.handleUploadPreview = this.handleUploadPreview.bind(this)
        this.handleUploadChange = this.handleUploadChange.bind(this)
    }
    
    addMovieRequest = (values) => {
        const token = getAuthToken();
        const movie = {
            title: values.title,
            release_date: values.release_date,
            directors: values.directors,
            plot: values.plot,
            poster: "",
            genres: values.genres,
            runtime: values.runtime,
        }
        axios.post(
            process.env.API_URL + '/movie',
            movie,
            { headers: {"Authorization" : token} }
        )
            .then(async response => {
                message.success('Successfully added to your movie list.')
                Router.push("/movies")
            })
            .catch(error => {
                console.error(error);
                message.error('An error occurred!');
            });
    }
    
    updateMovieRequest = (values) => {
        const token = getAuthToken();
        const movie = {
            title: values.title,
            release_date: values.release_date,
            directors: values.directors,
            plot: values.plot,
            poster: "",
            genres: values.genres,
            runtime: values.runtime,
        }
        axios.put(
            process.env.API_URL + '/movie/' + this.props.movie._id,
            movie,
            { headers: {"Authorization" : token} }
        )
            .then(async response => {
                message.success('Successfully edited!')
                this.props.handleMovieEdit(response.data)
            })
            .catch(error => {
                console.error(error);
                message.error('An error occurred!');
            });
    }
    
    changeLoadingState = (enable) => {
        this.setState({loading: enable})
    }
    
    handleSubmit = async e => {
        e.preventDefault();
        this.changeLoadingState(true);
        await this.props.form.validateFields(async (err, values) => {
            if (!err) {
                if (this.props.movie === null) {
                    await this.addMovieRequest(values)
                } else {
                    await this.updateMovieRequest(values)
                }
            }
            this.changeLoadingState(false);
        });
    };
    
    handleUploadCancel = () => this.setState({ previewVisible: false });
    
    handleUploadPreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    
    handleUploadChange = ({ fileList }) => this.setState({ fileList });
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const hasPoster = (this.props.movie !== null && this.props.movie.poster && this.props.movie.poster !== "N/A")
        const defaultValues = {
            title: (this.props.movie !== null) ? this.props.movie.title : "",
            release_date: (this.props.movie !== null) ? moment(this.props.movie.release_date, 'YYYY/MM/DD') : "",
            directors: (this.props.movie !== null) ? this.props.movie.directors : [],
            genres: (this.props.movie !== null) ? this.props.movie.genres : [],
            plot: (this.props.movie !== null) ? this.props.movie.plot : "",
            runtime: (this.props.movie !== null) ? this.props.movie.runtime : 60,
            poster: (this.props.movie !== null && hasPoster) ? this.props.movie.poster : "",
        }
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Title" hasFeedback>
                    {getFieldDecorator('title', {
                        initialValue: defaultValues.title,
                        rules: [{ required: true, message: 'This field is required' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="Release date" hasFeedback>
                    {getFieldDecorator('release_date', {
                        initialValue: defaultValues.release_date,
                        rules: [{ required: true, message: 'This field is required' }],
                    })(
                        <DatePicker format={'YYYY/MM/DD'} placeholder={"format : YYY/MM/DD"}/>
                    )}
                </Form.Item>
                <Form.Item label="Directors" hasFeedback>
                    {getFieldDecorator('directors', {
                        initialValue: defaultValues.directors,
                        rules: [{ required: true, message: 'This field is required' }],
                    })(
                        <Select mode="tags" style={{ width: '100%' }} />
                    )}
                </Form.Item>
                <Form.Item label="Genres" hasFeedback>
                    {getFieldDecorator('genres', {
                        initialValue: defaultValues.genres,
                        rules: [{ required: true, message: 'This field is required' }],
                    })(
                        <Select mode="tags" style={{ width: '100%' }} />
                    )}
                </Form.Item>
                <Form.Item label="Plot" hasFeedback>
                    {getFieldDecorator('plot', {
                        initialValue: defaultValues.plot,
                        rules: [{ required: true, message: 'This field is required' }],
                    })(
                        <TextArea rows={4} />
                    )}
                </Form.Item>
                <Form.Item label="Runtime (in minutes)" hasFeedback>
                    {getFieldDecorator('runtime', {
                        initialValue: defaultValues.runtime,
                        rules: [{ required: true, message: 'This field is required' }],
                    })(
                        <InputNumber min={1} />
                    )}
                </Form.Item>
                <Form.Item label="Poster" hasFeedback>
                    <div className="clearfix">
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handleUploadPreview}
                            onChange={this.handleUploadChange}
                        >
                            {fileList.length > 0 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleUploadCancel}>
                            <img alt="poster upload preview" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                </Form.Item>
                {defaultValues.poster !== "" &&
                    <Form.Item label="Current poster">
                        <img src={defaultValues.poster} alt="current poster" style={{maxHeight: 200}}/>
                    </Form.Item>
                }
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit" loading={this.state.loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const MovieFormAntd = Form.create({ name: 'validate_other' })(MovieForm);

MovieForm.propTypes = {
    movie: PropTypes.object,
    handleMovieEdit: PropTypes.func
}
MovieForm.defaultProps = {
    movie: null,
    handleMovieEdit: () => {console.log("default handleMovieEdit function")}
}
export default MovieFormAntd
