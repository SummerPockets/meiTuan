import React, {PureComponent} from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native'

import NavgationItem from '../../common/NavgationItem'
import HomeMenuView from './HomeMenuView'
import HomeGridView from './HomeGridView'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'

import {color, screen, SpaceView} from '../../widget'
import api from '../../api'


export default class HomeScreen extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: (
            <TouchableOpacity style={styles.searchBar}>
                <Image source={require('../../img/Home/icon_homepage_search.png')}
                       style={styles.searchIcon}
                />
                <Text style={styles.searchText}>输入商家/品类/商圈</Text>
            </TouchableOpacity>
        ),
        headerBackTitle: null,

        headerRight: (<NavgationItem icon={require('../../img/Home/icon_homepage_map_old.png')}
                                     iconStyle={{width: 44}}
        />),
        headerLeft: (<NavgationItem title="广州"
                                    icon={require('../../img/Home/icon_homepage_downArrow@2x.png')}
                                    iconStyle={{width: 10, height: 10}}
        />),
        headerStyle: {backgroundColor: color.focus}

    })

    constructor(props) {
        super(props)
        this.state = {
            discounts: [],
            datalist: [],
            refreshing: false,
        }
        this.onMenuSelect = this.onMenuSelect.bind(this)
        this.requestData = this.requestData.bind(this)

        this.renderHeader = this.renderHeader.bind(this)
        this.renderCell = this.renderCell.bind(this)

        this.onMenuSelect = this.onMenuSelect.bind(this)
        this.onGridSelected = this.onGridSelected.bind(this)

        this.keyExtractor = this.keyExtractor.bind(this)
        this.onCellSelected = this.onCellSelected.bind(this)
    }

    componentDidMount() {
        this.requestData()
    }

    requestData() {
        this.setState({refreshing: true})
        this.requestRecommend()
        this.requestDiscounts()
    }

    async requestRecommend() {
        try {
            fetch(api.recommend)
                .then((response) => response.json())
                .then((json)=> {
                    let dataList = json.data.map(
                        (info) => {
                            return {
                                id: info.id,
                                image: info.imgurl,
                                title: info.mname,
                                mtitle: info.mtitle,
                                subtitle: `[${info.range}]${info.title}`,
                                price: info.price,
                                solds: info.solds,
                                value: info.value
                            }
                        }
                    )
                    this.setState({
                        refreshing: false,
                        datalist: dataList
                    })
                })
            // let response = await fetch(api.recommend)
            // let json = await response.json()
        }
        catch (error) {
            alert(error)
            this.setState({refreshing: false})
        }
    }

    async requestDiscounts() {
        try {
            let response = await fetch(api.discount)
            let json = await response.json()
            this.setState({discounts: json.data})
        }
        catch (error) {
            alert(error)
        }
    }


    onMenuSelect(url) {
        this.props.navigation.navigate('Web', url)
    }

    onGridSelected(index:number) {
        let discount = this.state.discounts[index];
        if (discount.type === 1) {
            let location = discount.tplurl.indexOf('http')
            let url = discount.tplurl.slice(location)
            // 因为某些网址进行过字符串url编码将https://转码成https%3a%2f%2f
            // 所以需要decodeURIComponent解编码
            url = decodeURIComponent(url)
            this.props.navigation.navigate('Web', {url: url})
        }
    }

    renderHeader() {
        return (
            <View>
                <HomeMenuView menuInfos={api.menuInfo} onMenuSelect={this.onMenuSelect}/>
                <SpaceView/>
                <HomeGridView infos={this.state.discounts} onGridSelected={this.onGridSelected}/>
                <SpaceView/>
                <View style={styles.recommendHeader}>
                    <Text style={{fontSize: 17}}>猜你喜欢</Text>
                </View>
            </View>
        )
    }

    keyExtractor(item, index) {
        return item.id
    }

    renderCell(info) {
        return (
            <GroupPurchaseCell
                info={info.item}
                onPress={this.onCellSelected}
            />
        )
    }

    onCellSelected(info) {
        this.props.navigation.navigate('Group', {info: info})
    }

    // 在原生ios开发中 http协议已经被禁止只能使用https协议 但是如果依然想使用http需要在ios工程文件info pilst文件下添加键值对
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.datalist}
                    keyExtractor={this.keyExtractor}
                    onRefresh={this.requestData}
                    refreshing={this.state.refreshing}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderCell}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background
    },
    searchBar: {
        width: screen.width * 0.7,
        height: 30,
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: color.darkGreen
    },
    searchIcon: {
        width: 16,
        height: 16,
        marginVertical: 7,
        marginHorizontal: 10
    },
    searchText: {
        flex: 1,
        fontWeight: 'bold',
        color: color.focus,
        fontSize: 14,
        height: 30,
        lineHeight: 30
    },
    recommendHeader: {
        height: 40,
        padding: 10,
        borderColor: color.border,
        borderBottomWidth: screen.onePT,
        backgroundColor:'white'
    }
})