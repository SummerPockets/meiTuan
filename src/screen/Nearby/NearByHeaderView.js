import React, {PureComponent} from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import {screen, color} from '../../widget'

class NearByHeaderView extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.titles.map((title, i) => (
                        <TouchableOpacity
                            style={[styles.item, {backgroundColor: this.props.selectedIndex == i ? color.activeRed : '#fff'}]}
                            key={i}
                            onPress={() => this.props.onSelected(i)}>
                            <Text
                                style={[styles.p, {color: this.props.selectedIndex == i ? '#fff' : '#555'}]}>
                                {title}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        width: screen.width / 4 - 10,
        marginLeft: 8,
        marginVertical: 5,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: screen.onePT,
        borderColor: color.border,

    },
    p: {
        fontSize: 13,
        color: '#777777',
        fontWeight: 'bold'
    }
})

export default NearByHeaderView