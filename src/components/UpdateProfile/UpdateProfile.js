import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import './UpdateProfile.css';
import { API } from '../../config';

const CLOUDINARY_UPLOAD_PRESET = 'InstaSnap';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/sauceknight/image/upload';

class UpdateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            username: '',
            email: '',
            uploaded: 'false'
        };
    }

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

    updateUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    updateEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    uploadImg = async (e) => {


        const image = this.state.image;
        const username = this.state.username;
        const email = this.state.email;
        const userName = window.localStorage.getItem('userName');
        window.localStorage.setItem("userName", username);
        window.history.pushState("", "", `/profile/${username}`);
        const response = await fetch(`${API}/user/${userName}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image, username, email }),
        });

        this.setState({ uploaded: 'true' });
        if (response.ok) {
            const payload = await response.json();
            window.localStorage.setItem("userName", payload.userProfile.userName);
        }

    }

    render() {

        if (this.state.uploaded === 'true') {
            const userName = window.localStorage.getItem('userName');
            return <Redirect to={`/profile/${userName}`} />;
        }

        return (
            <div className='profile_form' id='profile_form'>
                <form className='uploadImage'>
                    <label>
                        <span>Enter New Username</span> <input type='text' placeholder='New Username' onChange={this.updateUsername} />
                    </label>
                    <label value='New Username'>
                        <span>Enter New Email</span> <input type='text' placeholder='New Email' onChange={this.updateEmail} />
                    </label>
                    <span>New Profile Picture</span>
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
                                    <img className='imagePre' src={this.state.image} />
                                </div>}
                        </div>
                    </div>
                    <input type='submit' className='update_button' value='Update' onClick={this.uploadImg} />
                </form>
            </div>
        );
    }
}

export default UpdateProfile;