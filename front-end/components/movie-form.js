import React from 'react'
import Router from 'next/router'
import axios from 'axios'
import moment from 'moment';
import PropTypes from 'prop-types'
import { getAuthToken } from '../utils/auth'

import { Form, Select, InputNumber, Button, Upload, Icon, Modal, Input, DatePicker, message } from 'antd';
import { error } from 'next/dist/build/output/log'
const TextArea = Input.TextArea;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class MovieForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            loadingUpload: false,
            posterUrl : '',
            posterFile: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUploadSingleChange = this.handleUploadSingleChange.bind(this)
    }
    
    addMovieRequest = async (values) => {
        let uploadURL = "";
        if(this.state.posterFile !== null) {
            uploadURL = await this.uploadPoster();
            console.log(uploadURL)
        }
        const movie = {
            title: values.title,
            release_date: values.release_date,
            directors: values.directors,
            plot: values.plot,
            poster: uploadURL,
            genres: values.genres,
            runtime: values.runtime,
        }
        const token = getAuthToken();
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
    
    updateMovieRequest = async (values) => {
        let uploadURL = this.props.movie.poster;
        if(this.state.posterFile !== null) {
            uploadURL = await this.uploadPoster();
        }
        const token = getAuthToken();
        const movie = {
            title: values.title,
            release_date: values.release_date,
            directors: values.directors,
            plot: values.plot,
            poster: uploadURL,
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
    
    uploadPoster = async () => {
        const data = new FormData();
        data.append('poster', this.state.posterFile.originFileObj);
        return await axios.post(process.env.API_URL + '/upload',
            data, {
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=ebf9f03029db4c2799ae16b5428b06bd'
                }
            })
            .then((res) => {
                return res.data;
            })
            .catch(error => {
                console.error(error)
                message.error("An error occured during poster upload.")
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
    
    handleUploadSingleChange = async info => {
        if (info.file.status === "uploading") {
            this.setState({ loadingUpload: true });
            return;
        }
        if (info.file.status === "done") {
            getBase64(info.file.originFileObj, posterUrl  =>
                this.setState({
                    posterUrl ,
                    posterFile: {...info.file} ,
                    loadingUpload: false,
                }),
            );
        }
    };
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loadingUpload ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { posterUrl  } = this.state;
        const hasPoster = (this.props.movie !== null && this.props.movie.poster && this.props.movie.poster !== "N/A")
        const defaultValues = {
            title: (this.props.movie !== null) ? this.props.movie.title : "",
            release_date: (this.props.movie !== null) ? moment(this.props.movie.release_date, 'YYYY/MM/DD') : "",
            directors: (this.props.movie !== null) ? this.props.movie.directors : [],
            genres: (this.props.movie !== null) ? this.props.movie.genres : [],
            plot: (this.props.movie !== null) ? this.props.movie.plot : "",
            runtime: (this.props.movie !== null) ? this.props.movie.runtime : 60,
            poster: (this.props.movie !== null && hasPoster) ? (
                (this.props.movie.poster.startsWith("http")) ? this.props.movie.poster : process.env.API_URL + this.props.movie.poster
            ) : "",
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
                            name="poster"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleUploadSingleChange}
                        >
                            {posterUrl  ? <img src={posterUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
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
