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
    clickShowToast(e) {
        switch (+e.target.dataset.id) {
            case 1:
                this.bdtoast.toast({
                    title: '仅显示标题'
                });
                break;
            case 2:
                this.bdtoast.toast({
                    title: '设置图片+文字',
                    iconSrc: '../../images/loading.gif'
                });
                break;
            case 3:
                this.bdtoast.toast({
                    title: '设置时间',
                    duration: 1000
                });
                break;
            case 4:
                this.bdtoast.toast({
                    title: '设置标题',
                    iconType: 1,
                    subTitle: '副标题'
                });
                break;
        }
    }
});

