import React, {PureComponent} from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native'
import {screen, color} from '../../widget'
import HomeMenuItem from './HomeMenuItem'
import PageControl from '../../widget/PageControl'


export default class HomeMenuView extends PureComponent {
    state:{
        currentPage: number
    }

    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0
        }
        this.onPageIndicatorPress = this.onPageIndicatorPress.bind(this)
    }

    onPageIndicatorPress(index:number) {
        if (index === this.state.currentPage) {
            return
        }
        let offsetX = index * screen.width
        this.scrollView.scrollTo({x: offsetX})
        this.setState({
            currentPage: index
        })
    }

    onScroll(e) {
        let x = e.nativeEvent.contentOffset.x
        let currentPage = Math.round(x / screen.width)
        if (this.state.currentPage !== currentPage) {
            this.setState({
                currentPage: currentPage
            })
        }
    }

    render() {
        let {menuInfos, onMenuSelect} = this.props
        let menuItems = menuInfos.map(
            (info, i) => (
                <HomeMenuItem
                    title={info.title}
                    icon={info.icon}
                    key={i}
                    onPress={() => {
                        if (info.path && onMenuSelect) {
                            onMenuSelect(info.path)
                        }
                    }}
                />)
        )
        let menuViews = []
        let pageCount = Math.ceil(menuItems.length / 10)

        for (let i = 0; i < pageCount; i++) {
            let length = menuItems.length < (i + 1) * 10 ? menuItems.length - (i * 10) : 10
            let items = menuItems.slice(i * 10, i * 10 + length)
            let menuView = (<View style={styles.itemsView} key={i}>{items}</View>)
            menuViews.push(menuView)
        }
        return (
            <View style={styles.contaniner}>
                <ScrollView
                    ref={(scrollView) => {
                        this.scrollView = scrollView
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={(e) => this.onScroll(e)}

                >
                    <View style={styles.menuContainer}>
                        {menuViews}
                    </View>
                </ScrollView>
                <PageControl
                    style={styles.pageControl}
                    numberOfPages={pageCount}
                    hidesForSinglePage
                    currentPage={this.state.currentPage}
                    pageIndicatorTintColor="gray"
                    currentPageIndicatorTintColor={color.focus}
                    indicatorSize={{width: 8, height: 8}}
                    onPageIndicatorPress={this.onPageIndicatorPress}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    contaniner: {
        backgroundColor: '#fff'
    },
    menuContainer: {
        flexDirection: 'row'
    },
    itemsView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: screen.width
    },
    icon: {
        width: screen.width / 5,
        height: screen.width / 5,
    },
    pageControl: {
        margin: 10
    }

})