/**
 * @file index.js
 * @author swan
 */
const app = getApp();


Page({
    data: {},
    onLoad() {
        new app.BdToast();
    },
    clickShowToast() {
        this.bdtoast.toast({
            iconType: 0,
            iconSrc: '',
            title: '测试Toast演示效果'
        });
    }
});

