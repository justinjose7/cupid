import React from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types' //enable type check

class AvatarSelector extends React.Component{
    static PropTypes = {
      selectAvatar: PropTypes.func.isRequired
    }
    constructor(props) {
      super(props)
      this.state={}
    }
    render(){
      const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                                                .split(',')
                                                .map(v=>({
                                                    icon:require(`../img/${v}.png`),
                                                    text:v
                                                }))

      const gridHeader = this.state.icon  //have we choose a avatar or not
                        ? (<div>
                                                     <span>avatar selected</span>
                                                     <img style={{width:20}} src={this.state.icon} alt=""/>
                                                     </div>)
                                                : 'plz select avatarList'
      return (
        <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={elm=>{
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}
                    />
                </List>
              </div>
    )
    }
}

export default AvatarSelector
