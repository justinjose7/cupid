import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import './css/ProfileSetupComponent.css'
import LocationSearchInput  from './LocationSearchInput'
//import './css/ProfileSetupComponent.css'
const CLOUDINARY_UPLOAD_PRESET = 'uzfhsbl4';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbormtzbg/image/upload';

class ProfileSetupComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadedFileCloudinaryUrl: ''
        };
    }

    onImageDrop(files) {
        this.setState({uploadedFile: files[0]});
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({uploadedFileCloudinaryUrl: response.body.secure_url});
            }
        });
    }
    
    render() {return(
        <div>
        <div className='box-profile-form'>
            <Dropzone
                className='drop-box'
                multiple={false}
                accept="image/*"
                onDrop={this.onImageDrop.bind(this)}>
                <div className="profile-img">
                        <img src={this.state.uploadedFileCloudinaryUrl} alt="Drop an image or click to select a file to upload." onError={(e)=>{e.target.src="https://res.cloudinary.com/dbormtzbg/image/upload/v1524203791/uploadPlaceholder.jpg"}}/>
                </div>
            </Dropzone>
            <textarea className="description-box2" rows="3" cols="38" placeholder="Description of yourself" />
            <LocationSearchInput/>
            <input
                type="number" 
                name="description"
                className="input-box" 
                placeholder="Maximum distance for matches (in miles)"
                //onChange={e => handleChange(e.target.name, e.target.value)}
                //value={password}
            />
            <br/>
            <button className="completeProfileBtn">Profile Complete</button>

        </div>
        <br/>
        <br/>
        <br/>
        </div>
    )}
}

export default ProfileSetupComponent;