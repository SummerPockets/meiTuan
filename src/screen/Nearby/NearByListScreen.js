import React, {PureComponent} from 'react'
import {
    Text,
    View,
    ScrollView,
    ListView,
    StyleSheet
} from 'react-native'
import RefreshListView from '../../widget/RefreshListView'
import NearByHeaderView from './NearByHeaderView'
import GroupPurchaseCell from  '../GroupPurchase/GroupPurchaseCell'
import {RefreshState} from '../../widget'
import api from '../../api'

class NearByListScreen extends PureComponent {
    listView:ListView

    state:{
        dataSource: ListView.DataSource,
        typeIndex: number
    }

    constructor(props) {
        super(props)
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows([]),
            typeIndex: 0,
            url: this.props.url
        }
    }

    componentDidMount() {
        this.listView.startHeaderRefreshing()
    }

    async requestData() {
        try {
            fetch(this.state.url)
                .then((response) => response.json())
                .then(
                    (json) => {
                        let dataList = json.data.map((info)=> {
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
                        })
                        // 因为接口问题 我们只抓到了recommend 为了模拟出点击不同分类展示不同商品的效果 随机打乱
                        dataList.sort(()=> {
                            return 0.5 - Math.random()
                        })

                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(dataList)
                        })

                        this.listView.endRefreshing(RefreshState.NoMoreData)
                    }
                )
        } catch (error) {
                this.listView.endRefreshing(RefreshState.NoMoreData)
        }
    }


    render() {
        return (
            <RefreshListView
                ref={(listView) => this.listView = listView}
                dataSource={this.state.dataSource}
                renderHeader={() => (
                    <NearByHeaderView
                        titles={this.props.types}
                        selectedIndex={this.state.typeIndex}
                        onSelected={(index) => {
                            if (index !== this.state.typeIndex) {
                                this.setState({typeIndex: index})
                                this.listView.startHeaderRefreshing()
                            }
                        }}
                    />)}
                renderRow={(rowData) => (
                    <GroupPurchaseCell
                        info={rowData}
                        onPress={() => this.props.navigation.navigate('Group', {info: rowData})}
                    />)}
                onHeaderRefresh={()=>this.requestData()}
            />
        )
    }
}
export default NearByListScreen