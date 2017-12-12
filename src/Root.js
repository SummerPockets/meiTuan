import React, {PureComponent} from 'react'
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'
import TabbarItem from './common/TabbarItem'

import HomeScreen from './screen/Home/HomeScreen'
import DiscoverScreen from './screen/Discover/DiscoverScreen'
import MineScreen from './screen/Mine/MineScreen'
import OrderScreen from './screen/Order/OrderScreen'
import NearbyScreen from './screen/Nearby/NearbyScreen'

import WebScreen from './screen/WebScreen/WebScreen'
import GroupPurchaseScreen from './screen/GroupPurchase/GroupPurchaseScreen'

import color from './widget/color'





const Tab = TabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({focused, tintColor}) => (
                <TabbarItem
                    focused={focused}
                    tintColor={tintColor}
                    selectImage={require('./img/tabbar/pfb_tabbar_homepage_selected@2x.png')}
                    normalImage={require('./img/tabbar/pfb_tabbar_homepage@2x.png')}
                />
            )
        }
    },
    Nearby: {
        screen: NearbyScreen,
        navigationOptions: {
            tabBarLabel: '附近',
            tabBarIcon: ({focused, tintColor}) => (
                <TabbarItem
                    focused={focused}
                    tintColor={tintColor}
                    selectImage={require('./img/tabbar/pfb_tabbar_merchant_selected@2x.png')}
                    normalImage={require('./img/tabbar/pfb_tabbar_merchant@2x.png')}
                />
            )

        }
    },
    Discover: {
        screen: DiscoverScreen,
        navigationOptions: {
            tabBarLabel: '逛一逛',
            tabBarIcon: ({focused, tintColor}) => (
                <TabbarItem
                    focused={focused}
                    tintColor={tintColor}
                    selectImage={require('./img/tabbar/pfb_tabbar_discover_selected@2x.png')}
                    normalImage={require('./img/tabbar/pfb_tabbar_discover@2x.png')}
                />
            )

        }
    },
    Order: {
        screen: OrderScreen,
        navigationOptions: {
            tabBarLabel: '订单',
            tabBarIcon: ({focused, tintColor}) => (
                <TabbarItem
                    focused={focused}
                    tintColor={tintColor}
                    selectImage={require('./img/tabbar/pfb_tabbar_order_selected@2x.png')}
                    normalImage={require('./img/tabbar/pfb_tabbar_order@2x.png')}
                />
            )

        }
    },
    Mine: {
        screen: MineScreen,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor}) => (
                <TabbarItem
                    focused={focused}
                    tintColor={tintColor}
                    selectImage={require('./img/tabbar/pfb_tabbar_mine_selected@2x.png')}
                    normalImage={require('./img/tabbar/pfb_tabbar_mine@2x.png')}
                />
            )
        }
    },
}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
        activeTintColor: color.focus,
        inactiveTintColor: color.inactive,
        style: {backgroundColor: '#fff'}
    }
})

const HomeNavigator = StackNavigator({
    Tab: {screen: Tab},
    Web: {screen: WebScreen},
    Group: {screen: GroupPurchaseScreen}
},{
    headerMode:'screen'
})


export default class RootView extends PureComponent {

    render() {
        return (<HomeNavigator/>)
    }
}
