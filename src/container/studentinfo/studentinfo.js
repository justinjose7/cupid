import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
import { Toast } from 'antd-mobile'

import Dropzone from 'react-dropzone';
import request from 'superagent';
import '../../css/profile-setup.css'
import LocationSearchInput  from '../../component/location-search-input/location-search-input'
const CLOUDINARY_UPLOAD_PRESET = 'uzfhsbl4';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbormtzbg/image/upload';

@connect(
  state=>state.user,
	{update}
)
class StudentInfo extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        avatar: '',
        title:'',
        desc:'',
        uri: '',
        Department:'',
        number:'',
        maxdist:'',
        latLng: '',
      }
    }

    onImageDrop(files) {
        this.setState({uploadedFile: files[0]});
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);
        Toast.loading('',0)

        upload.end((err, response) => {
            setTimeout(() => {
              Toast.hide()
              }, 500)
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({avatar: response.body.secure_url});
            }
        });
    }
    
    handleChange(key,val){
  		this.setState({
  			[key]:val
  		})
      console.log(key, val)
	   }

     handleLatLngVal = (val) => {
        this.setState({'latLng': val });
        console.log(this.state.latLng)
    }

    render(){
      const path = this.props.location.pathname
      const redirect = this.props.redirectTo
      return (
        <div>
          {redirect && redirect!== path ? <Redirect to={this.props.redirectTo}></Redirect> :null}
            <div className='box-profile-form'>
                <Dropzone
                    className='drop-box'
                    multiple={false}
                    accept="image/*"
                    onDrop={this.onImageDrop.bind(this)}>
                    <div className="profile-img">
                            <img src={this.state.avatar} onError={(e)=>{e.target.src="http://res.cloudinary.com/dbormtzbg/image/upload/v1524204692/uploadPlaceholder.jpg"}}/>
                    </div>
                </Dropzone>
                <textarea 
                  className="description-box2" 
                  rows="3" cols="38" 
                  onChange={(e) => this.handleChange('desc', e.target.value)} 
                  placeholder="Description of yourself" />
                <LocationSearchInput callBackGetLatLng={ this.handleLatLngVal }/>
                <input
                    type="number" 
                    name="description"
                    className="input-box" 
                    placeholder="Maximum distance for matches (in miles)"
                    onChange={e => this.handleChange('maxdist', e.target.value)}
                />
                <br/>
                <button className="completeProfileBtn" onClick={() => {this.props.update(this.state)}}>Profile Complete</button>

            </div>
          <br/>
          <br/>
          <br/>
        </div>
        )
    }
}

export default StudentInfo
