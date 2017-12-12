import React, {PureComponent} from 'react'
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {screen, color} from './index'

class DetailCell extends PureComponent {
    render() {
        let icon = this.props.image && <Image style={styles.icon} source={this.props.image}/>
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <View style={styles.content}>
                        {icon}
                        <Text style={{color: '#222', fontSize: 14}}>{this.props.title}</Text>
                        <View style={styles.rightContent}>
                            <Text style={{color: '#999'}}>{this.props.subtitle}</Text>
                            <Image style={styles.arrow} source={require('../img/Public/cell_arrow.png')}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderBottomWidth: screen.onePT,
        borderColor: color.border
    },
    content: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10
    },
    rightContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    arrow: {
        width: 14,
        height: 14,
        marginLeft: 5
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10
    }
})

export default DetailCell