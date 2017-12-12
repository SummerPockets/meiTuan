import React, {PureComponent} from 'react'
import {Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, RefreshControl} from 'react-native'
import NavgationItem from '../../common/NavgationItem'
import DetailCell from '../../widget/DetailCell'
import {color, SpaceView} from '../../widget'

export default class HomeScreen extends PureComponent {

    static navigationOptions = ({navigation}) => ({
        headerStyle: {display: 'none'},
    })

    state:{
        isRefreshing: boolean
    }

    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false
        }
    }

    onHeaderRefresh() {
        this.setState({isRefreshing: true})
        //模拟网络请求
        setTimeout(() => {
            this.setState({isRefreshing: false})
        }, 2000)
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <View style={{flexDirection: 'row', height: 44, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <TouchableOpacity
                        style={{marginRight: 10}}
                        onPress={() => {
                        }}>
                        <Image source={require('../../img/Mine/icon_navigationItem_set_white@2x.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{marginRight: 10}}
                        onPress={() => {
                        }}>
                        <Image source={require('../../img/Mine/icon_navigationItem_message_white@2x.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.userContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                            style={styles.avatar}
                            source={require('../../img/Mine/icon_userreview_defaultavatar.png')}
                            resizeMode="contain"
                        />
                        <View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>哈哈哈</Text>
                                <Image style={{marginLeft: 4}}
                                       source={require('../../img/Mine/beauty_technician_v15@2x.png')}/>
                            </View>
                            <Text style={{color: '#51d3c6', fontSize: 12, marginTop: 5, fontWeight: 'bold'}}>广州</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.rating}>
                        <Text style={{color: '#fff'}}>点评></Text>
                    </TouchableOpacity>
                </View>
            </View>)
    }

    renderCell() {
        let cells = []
        let datalist = this.getDataList()
        for (let i = 0; i < datalist.length; i++) {
            let sublist = datalist[i]
            for (let j = 0; j < sublist.length; j++) {
                let data = sublist[j]
                let cell = <DetailCell
                    image={data.image}
                    title={data.title}
                    subtitle={data.subtitle}
                    key={data.title}
                />
                cells.push(cell)
            }
            cells.push(<SpaceView key={i}/>)
        }
        return (
            <View style={{flex: 1}}>
                {cells}
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: color.background}}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={()=>this.onHeaderRefresh()}
                        tintColor='gray'
                        style={{backgroundColor: color.focus}}
                    />
                }>
                    {this.renderHeader()}
                    <SpaceView />
                    {this.renderCell()}
                </ScrollView>
            </View>
        )

    }

    getDataList() {
        return (
            [
                [
                    {title: '我的钱包', subtitle: '办信用卡', image: require('../../img/Mine/icon_mine_wallet@2x.png')},
                    {
                        title: '余额',
                        subtitle: '¥100,000,000.00',
                        image: require('../../img/Mine/icon_mine_comment@2x.png')
                    },
                    {title: '抵用券', subtitle: '99', image: require('../../img/Mine/icon_mine_voucher@2x.png')},
                    {title: '会员卡', subtitle: '7', image: require('../../img/Mine/icon_mine_membercard@2x.png')}
                ],
                [
                    {title: '好友去哪', subtitle: '', image: require('../../img/Mine/icon_mine_friends@2x.png')},
                    {title: '我的评价', subtitle: '', image: require('../../img/Mine/icon_mine_balance@2x.png')},
                    {title: '我的收藏', subtitle: '99', image: require('../../img/Mine/icon_mine_collection@2x.png')},
                    {title: '会员中心', subtitle: 'v15', image: require('../../img/Mine/icon_mine_membercenter@2x.png')},
                    {title: '积分商城', subtitle: '好礼已上线', image: require('../../img/Mine/icon_mine_member@2x.png')}
                ],
                [
                    {title: '客服中心', subtitle: '', image: require('../../img/Mine/icon_mine_customerService@2x.png')},
                    {title: '关于我们', subtitle: '我要合作', image: require('../../img/Mine/icon_mine_aboutmeituan@2x.png')},
                ]
            ]
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: color.focus,
        paddingBottom: 20,
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingLeft: 20,
    },
    avatar: {
        backgroundColor: 'white',
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#51d3c6'
    },
    rating: {
        backgroundColor: '#51d3c6',
        paddingLeft: 10,
        height: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    }
})