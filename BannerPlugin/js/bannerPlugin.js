;(function($, window, document, undefind) {
	function BannerPulgin(ele, opt) {
		this.$element = ele,
		this.defaults = {
			images : [],
			controller : {
				view : '.banner-view',
				btn : '.banner-btn',
				num : '.banner-number',
			},
			size : {},
			auto : true,
			fnTime : 1000
		},
		this.options =  $.extend({}, this.defaults, opt),
		this.imgWidth = this.options.size.width,
		this.imgHegiht = this.options.size.height,
		this.imgLenght = this.options.images.length;
		
		this.$bannerView = $(this.options.controller.view),
		this.$bannerBtn = $(this.options.controller.btn),
		this.$bannerNum = $(this.options.controller.num),
		
		this.init()
	}
	BannerPulgin.prototype = {
		init: function() {
			this.creatElements();
			this.clickBtn();
		},
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
			
			this.$element.css({
				width: this.imgWidth,
				height: this.imgHegiht
			});
		},
		clickBtn: function(btn) {
			var _this = this;
			this.$bannerBtn.find('span').each(function(){
				var index = _this.$bannerView.find('li').index();
				$(this).click(function(){
					var btnIdex = $(this).index();
					if(!btnIdex){
						index--;
						if(index<0){
							index = _this.imgLenght - 1
						}
						_this.$bannerView.find('li').hide();
						_this.$bannerView.find('li').eq(index).show();
					}else{
						index++;
						if(index>=_this.imgLenght){
							index = 0;
						}
						_this.$bannerView.find('li').hide();
						_this.$bannerView.find('li').eq(index).show();
					}
				});
			})
		}
		
	}
	$.fn.bannerPlugin = function(option){
		var bannerPulgin = new BannerPulgin(this, option);
	}
})(jQuery, window, document);