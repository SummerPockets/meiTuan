import {Dimensions, PixelRatio} from 'react-native'

export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    onePT: 1/PixelRatio.get()
}