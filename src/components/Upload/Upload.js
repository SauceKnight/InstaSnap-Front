import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import './Upload.css';
import { API } from '../../config';

const CLOUDINARY_UPLOAD_PRESET = 'InstaSnap';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/sauceknight/image/upload';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            caption: '',
            uploaded: 'false'
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // async handleSubmit(e) {
    //     e.preventDefault();
    //     // this.props.login(this.state.username, this.state.password);
    // }

    onImageDrop = files => {
        this.setState({ uploadedFile: files[0] });
        this.handleImageUpload(files[0]);
    }

    handleImageUpload = file => {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    image: response.body.secure_url
                });
            }
        });
    }

    updateCaption = (e) => {
        this.setState({ caption: e.target.value });
    }

    uploadImg = async (e) => {
        console.log(this.state.image);
        console.log(this.state.caption);


        const image = this.state.image;
        const caption = this.state.caption;
        const userID = parseInt(window.localStorage.getItem('userID'));
        console.log(userID);
        const response = await fetch(`${API}/user/upload`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image, caption, userID }),
        });

        this.setState({ uploaded: 'true' });
        const back = document.querySelector('.all_posts');
        back.classList.remove('blur');


    }

    render() {

        if (this.state.uploaded === 'true') {
            return <Redirect to="/home" />;
        }

        return (
            <div className='image_form' id='image_form'>
                <form className='upload_image'>
                    <div className='imageDrop'>
                        <Dropzone
                            onDrop={this.onImageDrop.bind(this)}
                            accept="image/*"
                            multiple={false}>
                            {({ getRootProps, getInputProps }) => {
                                return (
                                    <div
                                        {...getRootProps()}
                                    >
                                        <input {...getInputProps()} />
                                        {
                                            <p className='picSelect'>Click here to select image</p>
                                        }
                                    </div>
                                )
                            }}
                        </Dropzone>
                    </div>
                    <div>
                        <div>
                            {this.state.image === '' ? null :
                                <div className='preview' >
                                    <img className='imagepre_upload' src={this.state.image} />
                                    <input type='text' className='caption_context' placeholder='Insert caption Here' onChange={this.updateCaption} />
                                    <input type='submit' className='upload_button' value='Upload' onClick={this.uploadImg} />
                                </div>}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Upload;