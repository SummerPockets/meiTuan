import React, {PureComponent}from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native'
import {color, screen} from '../../widget'

class OrderMenuItem extends PureComponent {
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Image source={this.props.icon} resizeMode='contain' style={styles.icon}/>
                <Text style={{color: '#222', fontSize: 14}}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 4,
        height: screen.width / 5
    },
    icon: {
        width: 30,
        height: 30,
        margin: 5
    }
})

export default OrderMenuItem