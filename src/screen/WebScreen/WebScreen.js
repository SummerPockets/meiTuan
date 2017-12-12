import React, {PureComponent}from 'react';
import {View, StyleSheet, Text, WebView, InteractionManager} from 'react-native'
import {color} from '../../widget'


class WebScreen extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerStyle: {backgroundColor: color.focus},
        title: navigation.state.params.title,
        headerTintColor: '#fff',
    })
    state:{
        source: Object
    }

    constructor(props) {
        super(props)
        this.state = {
            source: {}
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(()=> {
            this.props.navigation.setParams({title: '加载中...'})
            this.setState({source: {url: this.props.navigation.state.params.url}})
        })
    }

    onLoad(e) {
        const script = "document.getElementsByTagName('header')[0].style.display = 'none'"
        if (this.webView) {
            this.webView.injectJavaScript(script);
        }
    }

    onLoadEnd(e) {
        if (e.nativeEvent.title.length > 0) {
            this.props.navigation.setParams({title: e.nativeEvent.title})
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    ref={(webView) => {
                        this.webView = webView
                    }}
                    allowsInlineMediaPlayback={false}
                    source={this.state.source}
                    style={styles.webView}
                    onLoadEnd={(e) => this.onLoadEnd(e)}
                    onLoad={(e) => this.onLoad(e)}
                    scalesPageToFit
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50'
    },
    webView: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default WebScreen