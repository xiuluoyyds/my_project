function count(obj, target, callback) {
    //防止多次点击使动画加速
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {

        // 动画缓动效果
        // 因为除法可能会出现小数以至于元素到达不了指定地点，所以需要对他取整数
        var bu = (target - obj.offsetLeft) / 10;
        // // 应为往左和往右是不一样的
        bu = bu > 0 ? Math.ceil(bu) : Math.floor(bu);
        // var bu = target - obj.offsetLeft;
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 回调函数
            // if (callback) {
            //             //     // 调用函数
            //             //     callback();
            //             // }
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + bu + 'px';
    }, 10)
}
// function count(obj, target, callback) {
//     // console.log(callback);  callback = function() {}  调用的时候 callback()

//     // 先清除以前的定时器，只保留当前的一个定时器执行
//     clearInterval(obj.timer);
//     obj.timer = setInterval(function () {
//         // 步长值写到定时器的里面
//         // 把我们步长值改为整数 不要出现小数的问题
//         // var step = Math.ceil((target - obj.offsetLeft) / 10);
//         var step = (target - obj.offsetLeft) / 10;
//         step = step > 0 ? Math.ceil(step) : Math.floor(step);
//         if (obj.offsetLeft == target) {
//             // 停止动画 本质是停止定时器
//             clearInterval(obj.timer);
//             // 回调函数写到定时器结束里面
//             // if (callback) {
//             //     // 调用函数
//             //     callback();
//             // }
//             callback && callback();
//         }
//         // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
//         obj.style.left = obj.offsetLeft + step + 'px';

//     }, 15);
// }
