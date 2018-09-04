//路口函数
$(function () {
    var letao = new Letao();
    //调用初始化区域的方法
    letao.initScroll();
    //调用分类请求方法
    letao.getCatetory();
    //调用品牌数据请求方法
    letao.getBrand();
    //默认调用一次品牌数据
    letao.getBrandData(1);

});

var Letao = function () {

};

Letao.prototype = {
    //初始化滚动区域
    initScroll: function () {
        mui('.mui-scroll-wrapper').scroll({
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: true, //是否显示滚动条
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            bounce: true //是否启用回弹
        });
    },
    //获取分类数据
    getCatetory: function () {
        //ajax请求左边分类的API接口
        $.ajax({
            url: '/category/queryTopCategory',
            success: function (data) {
                // console.log(data);
                //调用模板引擎的方法生成模板
                var html = template('catetoryTmp', data);
                //把生成的html放到左侧的ul里面
                $('.catetoryLeft ul').html(html);

            }
        });
    },
    //点击左侧分类,获得分类的品牌数据
    getBrand: function(){

        var that = this;
    
        //给左侧分类添加点击事件 左侧动态 用事件委托方式添加
        $('.catetoryLeft ul').on('tap','li a',function(){
            // console.log(this);
            // 获取当前点击分类id
            var id = $(this).data('id');
            // console.log(id);
            that.getBrandData(id);
            // 给当前点击元素父元素li添加active类,其他兄弟类移除
            $(this).parent().addClass('active').siblings().removeClass('active');       
        });

    },
    //获取品牌数据
    getBrandData: function (id) {
        $.ajax({
            url: '/category/querySecondCategory',
            data: {
                'id': id
            },
            success: function (data) {
                // console.log(data);
                var html = template('brandTmp', data);
                $('.catetoryRight .mui-row').html(html);
            }
        });
    }

}