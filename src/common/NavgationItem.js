import React, {PureComponent} from 'react'
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

export default class NavgationItem extends PureComponent {
    render() {
        let Icon = this.props.icon && <Image source={this.props.icon} style={[styles.icon, this.props.iconStyle]}/>
        let Title = this.props.title && <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
        return (
            <TouchableOpacity style={styles.containner}>
                {Title}
                {Icon}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    containner: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 27,
        height: 27,
        margin: 4
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 4,
        color: '#fff',
    }
})