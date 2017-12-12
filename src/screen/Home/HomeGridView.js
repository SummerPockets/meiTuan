import React, {PureComponent} from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import HomeGridItem from './HomeGridItem'
import {screen, color} from '../../widget'

class HomeGridView extends PureComponent {
    static defaultProps = {
        infos: []
    }

    render() {
        return (<View style={styles.container}>
            {
                this.props.infos.map((info, index) => (
                    <HomeGridItem
                        info={info}
                        key={index}
                        onPress={() => this.props.onGridSelected(index)}
                    />
                ))
            }
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    }
})

export default HomeGridView