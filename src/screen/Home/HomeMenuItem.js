import React, {PureComponent} from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import {screen} from '../../widget'
import {Heading2} from '../../widget/Text'

export default class HomeMenuItem extends PureComponent {
    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.props.onPress}
            >
                <Image
                    source={this.props.icon}
                    resizeMode='contain'
                    style={styles.icon}/>
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 5,
        height: screen.width / 5
    },
    icon: {
        width: screen.width / 10,
        height: screen.width / 10,
        marginVertical: 10,

    },
    title: {
        fontSize: 14,
        color: '#222',
    }
})