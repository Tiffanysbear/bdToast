/**
 * @file: toast.js
 * @author: TiffanysBear
 * @description: update from wetoast
 * @tips: 手百小程序通用自定义toast
 */
/* global getCurrentPages swan */
/* eslint-disable */
function BdToastClass() {

    // 构造函数
    function BdToast() {
        let pages = getCurrentPages();
        let curPage = pages[pages.length - 1];
        this._page = curPage;
        this._timeout = null;

        // 附加到page上，方便访问
        curPage.bdtoast = this;

        return this;
    }

    // 切换显示/隐藏
    BdToast.prototype.toast = function (data) {
        try {
            if (!data) {
                this.hide();
            }
            else {
                this.show(data);
            }
        }
        catch (err) {
            console.error(err);

            // fail callback
            data && typeof data.fail === 'function' && data.fail(data);
        }
        finally {
            // complete callback
            data && typeof data.complete === 'function' && data.complete(data);
        }
    };

    // 显示
    BdToast.prototype.show = function (data) {
        let page = this._page;

        clearTimeout(this._timeout);

        // display需要先设置为block之后，才能执行动画
        page.setData({
            ['bdtoast.reveal']: true
        });
        setTimeout(() => {
            let animation = swan.createAnimation();
            animation.opacity(1).step();
            data.animationData = animation.export();
            data.reveal = true;
            page.setData({
                bdtoast: data
            });
        }, 30);

        if (data.duration === 0) {
            // success callback after toast showed
            setTimeout(() => {
                typeof data.success === 'function' && data.success(data);
            }, 430);
        }
        else {
            this._timeout = setTimeout(() => {
                this.toast();

                // success callback
                typeof data.success === 'function' && data.success(data);
            }, (data.duration || 1500) + 400);
        }

    };

    // 隐藏
    BdToast.prototype.hide = function () {
        let page = this._page;

        clearTimeout(this._timeout);

        if (!page.data.bdtoast.reveal) {
            return;
        }

        let animation = swan.createAnimation();
        animation.opacity(0).step();
        page.setData({
            'bdtoast.animationData': animation.export()
        });

        setTimeout(() => {
            page.setData({
                bdtoast: {
                    'reveal': false
                }
            });
        }, 400);
    };

    return new BdToast();
}

module.exports = {
    BdToast: BdToastClass
};
/* eslint-enable */
