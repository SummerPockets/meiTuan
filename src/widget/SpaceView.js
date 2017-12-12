import React, {PureComponent} from 'react'
import {
    View,
    StyleSheet
} from 'react-native'

import color from './color'
import screen from './screen'

class SpaceView extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 14,
        width: screen.width,
        borderTopWidth: screen.onePT,
        borderBottomWidth: screen.onePT,
        borderColor: color.border
    }
})
export default SpaceView