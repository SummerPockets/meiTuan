import React, {PureComponent} from 'react'
import {Image} from 'react-native'

export default class TabbarItem extends PureComponent {
    render() {
        let selectedImg = this.props.selectImage ? this.props.selectImage : this.props.normalImage;
        return (
            <Image
                source={this.props.focused ? selectedImg : this.props.normalImage}
                style={{tintColor: this.props.tintColor, width: 26, height: 26}}
            />
        )
    }
}