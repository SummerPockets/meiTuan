import React, {PureComponent} from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    ListView,
    Button,
    StyleSheet,
    InteractionManager
} from 'react-native'
import {color, RefreshState, screen} from '../../widget'
import NavgationItem from '../../common/NavgationItem'
import RefreshListView from '../../widget/RefreshListView'
import GroupPurchaseCell from './GroupPurchaseCell'
import GroupPurchaseDetail from './GroupPurchaseDetail'
import SpaceView from '../../widget/SpaceView'
import api, {recommendUrlWithId} from '../../api'


class GroupPurchaseScreen extends PureComponent {
    listView:ListView
    state:{
        info: Object,
        dataSource: ListView.DataSource
    }
    static navigationOptions = ({navigation}) => ({
        headerTitle: '团购详情',
        headerStyle: {backgroundColor: color.focus},
        headerBackTitle: null,
        headerTintColor: '#fff',
        headerRight: (
            <NavgationItem
                icon={require('../../img/Public/icon_navigationItem_share@2x.png')}
                iconStyle={{tintColor: '#fff'}}
            />
        )
    })

    constructor(props) {
        super(props)
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            info: {},
            dataSource: ds.cloneWithRows([])
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.listView.startHeaderRefreshing()
        })
    }

    render() {
        return (
            <View>
                <RefreshListView
                    ref={(listView) => this.listView = listView}
                    dataSource={this.state.dataSource}
                    renderHeader={()=> this.renderHeader()}
                    renderRow={(rowData) => (
                        <GroupPurchaseCell
                            info={rowData}
                            onPress={() => this.props.navigation.navigate('Group', {info: rowData})}
                        />)}
                    onHeaderRefresh={() => this.requestData()}
                />

            </View>
        )
    }

    requestData() {
        this.requestDetail()
        this.requestRecommend()
    }

    requestDetail() {
        //  详情借口抓包没有抓到,暂时去上一级info去获取 如果能抓到包直接通过id api网址去请求
    }

    requestRecommend() {
        try {
            let info = this.props.navigation.state.params.info
            fetch(recommendUrlWithId(info.id))
                .then((response) => response.json())
                .then((json) => {
                    let datalist = json.data.deals.map((info) => {
                        return {
                            id: info.id,
                            image: info.imgurl,
                            title: info.brandname,
                            mtitle: info.digestion,
                            subtitle: `[${info.range}]${info.title}`,
                            price: info.price,
                            solds: info.solds,
                            value: info.value
                        }
                    })
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(datalist)
                    })
                    this.listView.endRefreshing(RefreshState.NoMoreData)
                })

        } catch (error) {
            this.listView.endRefreshing(RefreshState.Failure)
        }
    }

    renderHeader() {
        let info = this.props.navigation.state.params.info;
        return (
            <View>
                <View>
                    <Image
                        style={styles.banner}
                        source={{uri: info.image.replace('w.h', '480.0')}}
                        resizeMode="stretch"
                    />
                    <View style={styles.title}>
                        <Text style={[styles.colorWhite, {fontSize: 20}]}>{info.title}</Text>
                        <Text style={[styles.colorWhite, {fontSize: 14}]}>{info.mtitle}</Text>
                    </View>
                </View>
                <View style={styles.topContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={{color: color.focus, fontWeight: 'bold', fontSize: 30}}>{info.price}</Text>
                        <Text style={{color: color.focus}}>元 </Text>
                        <Text style={{color: '#777'}}>门市价:{info.value}元</Text>
                    </View>
                    <TouchableOpacity style={styles.buyButton}>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                            立即抢购
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <GroupPurchaseDetail
                        color={color.focus}
                        image={require('../../img/Home/icon_deal_anytime_refund.png')}
                        detail='支持随时退款'
                    />
                    <GroupPurchaseDetail
                        color={color.focus}
                        image={require('../../img/Home/icon_deal_anytime_refund.png')}
                        detail='支持过期自动退'
                    />
                    <GroupPurchaseDetail
                        color='#000'
                        image={require('../../img/tabbar/pfb_tabbar_mine@2x.png')}
                        detail={`已售${info.solds}`}
                    />
                </View>
                <SpaceView/>
                <View style={styles.tipHeader}>
                    <Text style={{fontSize: 20, color: '#777', fontWeight: 'bold'}}>看了本团购的用户还看了</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    colorWhite: {
        color: 'white',
        fontWeight: 'bold'
    },
    banner: {
        width: screen.width,
        height: screen.width * 0.5
    },
    title: {
        justifyContent: 'flex-end',
        width: screen.width,
        height: screen.width * 0.25,
        backgroundColor: 'rgba(7,17,27,0.5)',
        marginTop: -screen.width * 0.25,
        paddingTop: 30,
        paddingLeft: 10,
        paddingBottom: 10
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    buyButton: {
        backgroundColor: '#fc9e28',
        width: 116,
        height: 36,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tipHeader: {
        height: 35,
        padding: 10,
    }
})

export default GroupPurchaseScreen