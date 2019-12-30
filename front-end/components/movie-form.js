import React from 'react'
import {
    Form,
    Select,
    InputNumber,
    Button,
    Upload,
    Icon,
    Modal,
    Input,
    DatePicker,
} from 'antd';
import {getBase64} from "../utils/img";

const Option = Select.Option;
const TextArea = Input.TextArea;

class MovieForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: []
        }
    }
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });
    
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
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Title">
                    <Input />
                </Form.Item>
                <Form.Item label="Release date">
                    <DatePicker format={'YYYY/MM/DD'} />
                </Form.Item>
                <Form.Item label="Directors" hasFeedback>
                    <span className="ant-form-text">China</span>
                </Form.Item>
                <Form.Item label="Genres" hasFeedback>
                    <span className="ant-form-text">China</span>
                </Form.Item>
                <Form.Item label="Plot" hasFeedback>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Runtime (in minutes)" hasFeedback>
                    <InputNumber min={1} defaultValue={60} />
                </Form.Item>
                <Form.Item label="Poster" hasFeedback>
                    <div className="clearfix">
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {fileList.length > 0 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="poster upload preview" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const MovieFormAntd = Form.create({ name: 'validate_other' })(MovieForm);

export default MovieFormAntd
