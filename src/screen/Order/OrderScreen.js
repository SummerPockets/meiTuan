import React, {PureComponent} from 'react'
import {Text, View, ListView, StyleSheet} from 'react-native'
import RefreshListView from '../../widget/RefreshListView'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'
import DetailCell from '../../widget/DetailCell'
import OrderMenuItem from './OrderMenuItem'
import {RefreshState, SpaceView} from '../../widget'
import api from '../../api'

export default class HomeScreen extends PureComponent {
    listView:ListView

    state:{
        dataSource: ListView.DataSource
    }
    static navigationOptions = ({navigation}) => ({
        title: '订单',
        headerStyle: {backgroundColor: 'white'}
    })

    constructor(props) {
        super(props)
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows([])
        }
    }

    componentDidMount() {
        this.listView.startHeaderRefreshing()
    }

    async requestData() {
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
                        dataSource: this.state.dataSource.cloneWithRows(dataList)
                    })
                    this.listView.endRefreshing(RefreshState.NoMoreData)
                })
        }
        catch (error) {
            this.listView.endRefreshing(RefreshState.Failure)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RefreshListView
                    ref={(e) => this.listView = e}
                    dataSource={this.state.dataSource}
                    renderHeader={()=>this.renderHeader()}
                    renderRow={(rowData) =>
                        <GroupPurchaseCell
                            info={rowData}
                            onPress={()=> {
                                this.props.navigation.navigate('Group', {info: rowData})
                            }}
                        />
                    }
                    onHeaderRefresh={()=>this.requestData()}
                />
            </View>
        )
    }

    renderHeader() {
        return (
            <View style={styles.container}>
                <DetailCell title="我的订单" subtitle="全部订单" style={{height: 38}}/>
                <View style={styles.itemContainer}>
                    <OrderMenuItem title="待付款" icon={require('../../img/Order/order_tab_need_pay@2x.png')}/>
                    <OrderMenuItem title="待使用" icon={require('../../img/Order/order_tab_need_use@2x.png')}/>
                    <OrderMenuItem title="待评价" icon={require('../../img/Order/order_tab_need_review@2x.png')}/>
                    <OrderMenuItem title="退款/售后"
                                   icon={require('../../img/Order/order_tab_needoffer_aftersale@2x.png')}/>
                </View>
                <SpaceView style={{backgroundColor: '#e0e0e0'}}/>
                <DetailCell title="我的收藏" subtitle="查看全部" style={{height: 38}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: 'white'
    }
})
