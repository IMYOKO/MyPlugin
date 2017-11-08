/*
 * name: 轮播图插件
 * author： YOKO
 * defaults = {
		images: [],   必填   传入一个对象数组  对象两个属性  图片链接：imgLink 和  图片地址：imgName
		controller: {   可填   对象    三个类名(图片容器,按钮,小圆点)
			view: '.banner-view',
			btn: '.banner-btn',
			num: '.banner-number',
		},
		size: {},  必填     容器图片大小
		autoPlay: true,   可填    是否自动播放,默认自动
		speed: 1000     可填   换图的时间,默认1000毫秒
	}
 */

;(function($, window, document, undefind) {
	//构造函数BannerPulgin
	function BannerPulgin(ele, opt) {
		this.$element = ele,
		this.defaults = {
			images: [],
			controller: {
				view: '.banner-view',
				btn: '.banner-btn',
				num: '.banner-number',
			},
			size: {
				width: '',
				height: ''
			},
			autoPlay: true,
			speed: 1000
		},
		this.options =  $.extend({}, this.defaults, opt),
		
		this.index = 0,
		this.timer = null,
		this.imgLenght = this.options.images.length;
		
		this.$bannerView = $(this.options.controller.view),
		this.$bannerBtn = $(this.options.controller.btn),
		this.$bannerNum = $(this.options.controller.num),
		
		this.init(this.options.autoPlay)
	}
	
	//原型扩展方法
	BannerPulgin.prototype = {
		//初始化
		init: function(b) {
			var _this = this;
			this.creatElements();
			this.clickBtn();
			this.hoverFun();
			if(b) {
				this.auto();
				this.$element.mouseenter(function() {
					clearInterval(_this.timer);
				});
				this.$element.mouseleave(function() {
					_this.auto();
				});
			}
			this.$element.hover(function() {
				_this.$bannerBtn.animate({
					'filter': 'alpha(opacity = 100)',
				    '-moz-opacity': 1,
				    '-khtml-opacity': 1,
				    'opacity': 1
				},300);
			},function() {
				_this.$bannerBtn.animate({
					'filter': 'alpha(opacity = 0)',
				    '-moz-opacity': 0,
				    '-khtml-opacity': 0,
				    'opacity': 0
				},300);
			})
		},
		
		//创建节点
		creatElements: function() {
			var viewHtml = '',
				btnHtml = '',
				numHtml = '';
			
			for(var i = 0; i < this.imgLenght; i++ ){
				viewHtml += '<li><a href="' + this.options.images[i].imgLink + '">' +
								'<img src="' + this.options.images[i].imgName + '"/>' +
						'</a></li>';
				numHtml += 	'<span></span>';
			}
			btnHtml = '<span>&lt;</span><span>&gt;</span>';
			
			this.$bannerView.append(viewHtml);
			this.$bannerBtn.append(btnHtml);
			this.$bannerNum.append(numHtml);
			
			this.$bannerView.find('li').eq(0).addClass('active');
			this.$bannerNum.find('span').eq(0).addClass('on');
			this.$element.css(this.options.size);
		},
		
		//自动播放
		auto: function() {
			var _this = this;
			this.timer = setInterval(function() {
				_this.change(function() {
					_this.index ++;
					_this.index %= _this.imgLenght;
				})
			}, _this.options.speed)
		},
		
		//切换图片
		change: function(fn) {
			this.$bannerView.find('li').eq(this.index).fadeOut();
			this.$bannerNum.find('span').eq(this.index).removeClass('on');
			fn&&fn();
			this.$bannerView.find('li').eq(this.index).fadeIn();
			this.$bannerNum.find('span').eq(this.index).addClass('on');
		},
		
		//点击按钮
		clickBtn: function() {
			var _this = this;
			this.$bannerBtn.find('span').each(function(){
				$(this).click(function(){
					var btnIdex = $(this).index();
					if(!btnIdex){
						_this.change(function(){
							_this.index --;
							if(_this.index < 0){
								_this.index = _this.imgLenght - 1;
							}
						})
					}else{
						_this.change(function(){
							_this.index ++;
							_this.index %= _this.imgLenght;
						})
					}
				});
			})
		},
		
		//鼠标放小圆点
		hoverFun: function() {
			var _this = this;
			this.$bannerNum.find('span').each(function(){
				$(this).mouseover(function(){
					var index = $(this).index();
					_this.$bannerView.find('li').eq(_this.index).fadeOut();
					_this.$bannerView.find('li').eq(index).fadeIn();
					$(this).siblings().removeClass('on');
					$(this).addClass('on');
					_this.index = index;
				});
			});
		}
	}
	
	//扩展到jQuery
	$.fn.bannerPlugin = function(option){
		var bannerPulgin = new BannerPulgin(this, option);
	}
})(jQuery, window, document);