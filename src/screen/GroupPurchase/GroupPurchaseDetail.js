import React, {PureComponent} from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import {screen, color} from '../../widget'

class GroupPurchaseDetail extends PureComponent {

    render() {
        return (
            <View style={styles.container}>
                <Image style={{tintColor: this.props.color, width: 16, height: 16}} source={this.props.image}/>
                <Text style={{color: this.props.color,}}>{this.props.detail}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: screen.width * 0.4,
        height: 16,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    }
})

export default GroupPurchaseDetail