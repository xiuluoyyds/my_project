window.addEventListener('load', function () {
    var box = document.querySelector('.box');
    var left = box.querySelector('.left');
    var right = box.querySelector('.right');

    box.addEventListener('mouseenter', function () {
        // 当鼠标经过图片时，显示左右滑动按钮
        left.style.display = 'block';
        right.style.display = 'block';
        clearInterval(timer);
    })
    box.addEventListener('mouseleave', function () {
        // 当鼠标离开图片时，隐藏左右滑动按钮
        left.style.display = 'none';
        right.style.display = 'none';
        var timer = this.setInterval(function () {
            right.click();
        }, 2000)

    })
    var btn = box.querySelector('.button');
    // var divs = btn.document.querySelector('div');
    var ul = box.querySelector('ul');
    var boxwidth = box.offsetWidth;
    // var li = ul.querySelector('li');
    for (var i = 0; i < ul.children.length; i++) {
        // 根据图片数量来设置圆点数量
        var div = this.document.createElement('div');
        // 给圆点设置自定义属性，方便给动画设置移动距离
        div.setAttribute('index', i);
        btn.appendChild(div);
        div.addEventListener('click', function () {
            for (var i = 0; i < btn.children.length; i++) {
                btn.children[i].className = '';
            }
            this.className = 'current';

            console.log(boxwidth);
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            count(ul, -index * boxwidth);
        })
    }
    btn.children[0].className = 'current';
    // 复制第一张图片，放到最后，实现第一个图片和最后一张图片切换
    var first = ul.children[0].cloneNode(true);
    var circle = 0;
    // 设置节流阀变量 用来控制点击按钮时防止图片切换速率过快
    var flag = true;
    ul.appendChild(first);
    var num = 0;
    // 右侧按钮
    right.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            count(ul, -num * boxwidth, function () {
                flag = true;
            });
            circle++;
            // 如果小圆圈来到了最后一个，就要返回到第一个
            if (circle == btn.children.length)
                circle = 0;
            for (var i = 0; i < btn.children.length; i++) {
                btn.children[i].className = '';
            }
            btn.children[circle].className = 'current';
        }
    });
    // 左侧按钮
    left.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * boxwidth + 'px';
            }
            num--;
            count(ul, -num * boxwidth, function () {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = btn.children.length - 1;
            }

            for (var i = 0; i < btn.children.length; i++) {
                btn.children[i].className = '';
            }
            btn.children[circle].className = 'current';

        }
    });
    // 自动播放
    var timer = this.setInterval(function () {
        right.click();
    }, 2000)

})