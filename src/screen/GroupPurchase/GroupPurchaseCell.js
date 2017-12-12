import React, {PureComponent} from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import {screen, color} from '../../widget'

class GroupPurchaseCell extends PureComponent {
    render() {
        let {info} = this.props
        let imageUrl = info.image.replace('w.h', '160.0')
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
                <Image source={{uri: imageUrl}} style={styles.icon}/>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{info.title}</Text>
                    <Text style={styles.subtitle}>{info.subtitle}</Text>
                    <View style={styles.desc}>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.price}>{info.price}</Text>
                            <View style={[styles.priceWrapper, {marginBottom: 2}]}>
                                <Text style={{fontSize: 14, color: color.focus}}>元 </Text>
                                <Text style={styles.smallFont}>门市价:{info.value}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{fontSize: 13, color: '#777', marginBottom: 5}}>已售{info.solds}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: screen.onePT,
        borderColor: color.border,
        backgroundColor: 'white'
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 5
    },
    rightContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    title: {
        fontSize: 16,
        color: '#222'
    },
    subtitle: {
        fontSize: 13,
        color: '#aaa',
        marginTop: 5,

    },
    desc: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    priceWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: color.focus
    },
    smallFont: {
        fontSize: 13,
        color: '#aaa',
    }
})


export default GroupPurchaseCell