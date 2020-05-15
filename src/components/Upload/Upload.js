import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import './Upload.css';

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
        e.preventDefault();
        console.log(this.state.image);
        console.log(this.state.caption);


        const image = this.state.image;
        const caption = this.state.caption;
        const userID = parseInt(window.localStorage.getItem('userID'));
        console.log(userID);
        const response = await fetch(`http://localhost:8080/user/upload`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image, caption, userID }),
        });

        this.setState({ uploaded: 'true' });
    }

    render() {

        if (this.state.uploaded === 'true') {
            return <Redirect to="/" />;
        }

        return (
            <form className='uploadImage'>
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
                                        <p className='picSelect'>Click here to select an img file to upload.</p>
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
                                <input type='text' placeholder='Insert caption Here' onChange={this.updateCaption} />
                                <input type='submit' value='Upload' onClick={this.uploadImg} />
                            </div>}
                    </div>
                </div>
            </form>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//         token: state.authentication.post,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         uploadImg: (image, caption) => dispatch(uploadImg(image, caption))
//     };
// };

// Yes, this looks funny, but you will often
// see this kind of indentation in others'
// code when using React and Redux.
export default Upload;