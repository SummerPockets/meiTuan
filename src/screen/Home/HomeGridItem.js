import React, {PureComponent} from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import {screen, color} from '../../widget'
class HomeGridItem extends PureComponent {
    render() {
        let info = this.props.info
        let title = info.maintitle
        let color = info.deputy_typeface_color
        let subTitle = info.deputytitle
        let imageUrl = info.imageurl.replace('w.h', '120.0')
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View>
                    <Text style={{marginTop: 5, color: color, fontSize: 16, fontWeight: 'bold'}}>{title}</Text>
                    <Text style={{fontSize: 13, marginTop: 10}}>{subTitle}</Text>
                </View>
                <Image source={{uri: imageUrl}} style={styles.icon}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 4 - screen.onePT,
        borderRightWidth: screen.onePT,
        borderColor: color.border
    },
    icon: {
        width: screen.width / 5,
        height: screen.width / 5,
        marginTop: 5
    }
})

export default HomeGridItem