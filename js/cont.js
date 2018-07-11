var ctx = 'http://huiyi.dworld.net.cn/dwcms';   //全局变量

$(function(){
	//加载主导航
	navigation();
	//轮播图
	figure();
	//banner图
	banner();
	//研究院内容
	Institute();
	//食品内容
	food();
	//科技部咨询按钮渲染
	kjb();
	//云课堂
	study();
	// 
	imgcon();
})

var aid = '';
var id = 'fd38eaab6a874f7fa28e6a1258dff83b';
var InformationContent = '';
var xinContent = '';
function titleList(obj){
		aid = $(obj).attr('dataid');
		if(aid){
			$("#duo a").attr("href","module/news/news_list.html?key1="+aid);
		}
	};
//主导航内容
function navigation(){
	$.ajax({
		type:"post",
		data:{},
		dataType: 'jsonp',
		url: ctx + "/portal/categoryList.jhtml",
		success : function(data){
			console.log(data);
		    var html = '';
		    var news = '';
		    var bot = '';
		    var lik = '';
		    var food = '';
		    var Information = '';
		    var xin = '';
		    var dili = '';
		    aid = data.data[2].id
	        for(var i=0;i<data.data.length;i++){
		        if(data.data[i].inMenu=="1"){
					if(data.data[i].href)
		        		html += `<li><a href="${data.data[i].href}" title=""><span class="${data.data[i].iconcls}" aria-hidden="true"></span>${data.data[i].name}</a ></li>`;
					else
						html += `<li><a href="module/news/news_list.html?key1=${data.data[i].id}" title=""><span class="${data.data[i].iconcls}" aria-hidden="true"></span>${data.data[i].name}</a ></li>`
		        }else if(data.data[i].sort=="5"||data.data[i].sort=="6"||data.data[i].sort=="7"){
					news += `<li class="titleList" onclick="titleList(this)" role="presentation" dataId=${data.data[i].id}><a href="#kjkx" dataId=${data.data[i].id} aria-controls="kjkx" role="tab" data-toggle="tab">${data.data[i].name}</a></li>`
		       	}else if(data.data[i].sort=="8"||data.data[i].sort=="9"){
		       		bot += `<li dataId=${data.data[i].id} role="presentation"><a href="#kjbzx" dataId=${data.data[i].id} aria-controls="kjbzx" role="tab" data-toggle="tab">${data.data[i].name}</a></li>`
		       	}else if(data.data[i].parentId== "c6a1eb7b6ca44731927dc6f1a3f9067e"){
		       		lik += `<li role="presentation"><a href="module/news/news_list.html?key1=${data.data[i].id}" aria-controls="nyzt">${data.data[i].name}</a></li>`
		       	}else if(data.data[i].sort =="10"){
		       		food = data.data[i].name;
		       	}else if(data.data[i].sort =="11"){
		       		Information = data.data[i].name;
		       		InformationId = data.data[i].id;
		       	}else if(data.data[i].sort =="12"){
		       		xin = data.data[i].name;
		       		xinId = data.data[i].id;
		       	}else if(data.data[i].sort =="13"){
		       		dili = data.data[i].name; 
		       	}
	      	};
	      	//单独渲染网站首页	      	
			news += `<span class="more pull-right" id="duo"><a href="module/news/news_list.html?key1=${aid}" title="更多">更多></a></span>`;
		    $(".nav").html(html);
		    $("#yaowen").html(news);
		    $("#bot").html(bot);
		    $("#lik").html(lik);
		    $("#food").html(food);
		    $("#Information").html(Information);
		    $("#Information").attr("Informationid",InformationId)
		    $("#xin").html(xin);
		    $("#xin").attr("xinid",xinId);
		    $("#dili").html(dili);
		    //设置第一个li为选中状态
		    $("#yaowen li:first").attr("class","active");
		    $("#bot li:first").attr("class","active");
		    showId($("#Information").attr("Informationid"),"Information",InformationContent,1);
		    showId($("#xin").attr("xinid"),"xin",InformationContent,0);
			//执行默认为选中状态
			active();
   		}
	});	
}

//信息公开
function showId(id,Information,InformationContent,number){
   	$.ajax({
		type:"post",
		data:{},
		dataType: 'jsonp',
		url: ctx + "/"+id+"/articleList.jhtml",
		success : function(data){
			data.page.list.length = data.page.list.length>6?6:data.page.list.length;
			for(var i=0;i<data.page.list.length;i++){
				if(number){
					InformationContent+=`<li class="xxgk01"><a href="module/news/news_detail.html?key=${data.page.list[i].id}&val1=${data.page.list[i].category.id}&val2=${data.page.list[i].id}/" target="_blank">${data.page.list[i].description}</a></li>`;	
				}else{
					InformationContent+=`<li ><a href="module/news/news_detail.html?key=${data.page.list[i].id}&val1=${data.page.list[i].category.id}&val2=${data.page.list[i].id}/" target="_blank">${data.page.list[i].description}</a></li>`;
				}
				
//				xinContent += `<li ><a href="" target="_blank">${data.page.list[i].description}</a></li>`
			}
			$("#"+Information).next().html(InformationContent);
		}
	});
};
//轮播图旁边的内容
function imgcon(){
	var cont = '';
	$.ajax({
		type:"post",
		url:ctx + '/' + id + '/articleList.jhtml',
		dataType:'jsonp',
		success:function(data){
			for(var i=0;i<data.page.list.length;i++){
				cont = `<h4 style='height:58px'><a href="module/news/news_detail.html?key=${data.page.list[i].id}&val1=${data.page.list[i].category.id}&val2=${data.page.list[i].id}/" target="_blank" title="">${data.page.list[i].title}</a></h4>`
			}
			$(".headline").html(cont)
		}
	});
}
//轮播图
function figure(){
	var images = '';
	$.ajax({
		type:'post',
		data:{},
		dataType:'jsonp',
		url: ctx +'/portal/positionArticleList.jhtml?posid=1',
		success:function(data){
			for(var i=0;i<data.data.list.length;i++){
				images += `<div class="swiper-slide"><img src="http://huiyi.dworld.net.cn${data.data.list[i].image.replace(/_thumbs\//,'')}" alt="" style="width: 100%;height: 100%"><p>${data.data.list[i].title}</p></div>`
			}
			$(".images").html(images);
			var mySwiper = new Swiper('.lunbo', {
			
				parallax:true,
			    loop: true,
			    effect:"fade",
			    disableOnInteraction:false,
				autoplay: {
				    delay: 5000,//1秒切换一次
				},
			    // 如果需要分页器
			    pagination: {
			        el: '.lunbo-pagination',
			        clickable:true,
			        dynamicBullets:true
			    }
			});
		}
	})
}
//banner图
function banner(){
	var id = "b427c5debf444321acb31bdd3d7f6f4d";
	var banner = '';
	$.ajax({
		type:'post',
		data:{},
		dataType:'jsonp',
		url: ctx +'/'+ id + '/articleList.jhtml',
		success:function(data){
			for(var i=0;i<data.page.list.length;i++){
				banner += `<img src="http://huiyi.dworld.net.cn${data.page.list[i].image.replace(/_thumbs\//,'')}" style="height:100px">`
			}
			$(".ztbd").html(banner)
		}
	})
}
//研究院
function Institute(){
	var id = "dde69938f9e24633bbac36c4b99bd472";
	var yjy = '';
	$.ajax({
		type:'post',
		data:{},
		dataType:'jsonp',
		url: ctx +'/'+ id + '/articleList.jhtml',
		success:function(data){
			data.page.list.length = data.page.list.length>6?6:data.page.list.length;
			
			for(var i=0;i<data.page.list.length;i++){
				yjy+= `<dl><a href="module/news/news_detail.html?key=${id}&val1=${data.page.list[i].category.id}&val2=${data.page.list[i].id}/" target="_blank"><dt><img src="http://huiyi.dworld.net.cn${data.page.list[i].image}" alt=""></dt><dd>${data.page.list[i].title}</dd></a></dl>`
			}
			$("#yjy").html(yjy)
		}
	})
}
//食品内容
function food(){
	$.ajax({
		type:"post",
		data:{},
		dataType: 'jsonp',
		url: ctx + "/9c3618a40d2c40ea85653acb7c4a4ae9/articleList.jhtml",
		success : function(data){
			$.ajax({
				type:"post",
				url: ctx +"/9c3618a40d2c40ea85653acb7c4a4ae9/"+data.page.list[0].id+"/view.jhtml",
				dataType:'jsonp',
				success:function(data){
					console.log(data)
					$("#xiangqing").attr('href','module/news/news_detail.html?'+'val1='+data.article.category.id+'&val2='+data.article.id);
				}
			});
			$("#footimage").attr('src','http://huiyi.dworld.net.cn'+ data.category.image.replace(/_thumbs\//,''));
			$("#foodcon").html(data.page.list[0].description);
		}
	});
//渲染内容部分
	$('#duo').parent().removeAttr('onclick');
	//点击要闻按钮渲染相应的页面
	$('#yaowen').click(function(e) {
		id = $(e.target).attr('dataId');
		htmlShow();
	})
	var html = '';
	//默认先渲染首页内容，调用函数
	htmlShow();
	function htmlShow() {
		$.ajax({
			type: 'post',
			data: {},
			async: false,
			dataType: 'jsonp',
			url: ctx + '/' + id + '/articleList.jhtml',
			success: function(data) {
				data.page.list.length = data.page.list.length>6?6:data.page.list.length;
				for(var i = 0; i < data.page.list.length; i++) {
					html += `<li><a class="list-group-item" href="module/news/news_detail.html?key=${id}&val1=${data.page.list[i].category.id}&val2=${data.page.list[i].id}/" target="_blank"><span class="badge">${data.page.list[i].createDate.slice(0,10)}</span><p class="list-group-item-text">${data.page.list[i].title}</p ></a ></li>`
				}
				$(".yaowen").html(html);
				html = '';
			}
		})
	}
}
//科技部咨询按钮渲染内容
function kjb(){
	var botid = 'f1672b355be04b71a8df8e7ebac4e8fe';
//点击要闻按钮渲染相应的页面
	$('#bot').click(function(e) {
		botid = $(e.target).attr('dataid');
		console.log(botid)
		htmlBot();
	})
	var cont = '';
	htmlBot();
	function htmlBot() {
		$.ajax({
			type: 'post',
			data: {},
			async: false,
			dataType: 'jsonp',
			url: ctx + '/' + botid + '/articleList.jhtml',
			success: function(data){
			data.page.list.length = data.page.list.length>6?6:data.page.list.length;
				for(var i = 0; i < data.page.list.length; i++) {
					cont += `<li><a class="list-group-item" href="module/news/news_detail.html?key=${id}&val1=${data.page.list[i].category.id}&val2=${data.page.list[i].id}/" target="_blank"><span class="badge">${data.page.list[i].createDate.slice(0,10)}</span><p class="list-group-item-text">${data.page.list[i].title}</p></a></li>`
				}
				$('.bothtml').html(cont);
				cont = '';
			}
		})
	}
}
//云课堂内容
function study(){
	var id = 'b870171821414ba89877b0ae71702fa8';
	var botim = '';
	$.ajax({
		type:'post',
		data:{},
		dataType:'jsonp',
		url: ctx +'/'+ id + '/articleList.jhtml',
		success:function(data){
			for(var i=0;i<data.page.list.length;i++){
				botim += `<div class="swiper-slide" style="width: 204px; margin-right: 30px;"><a href="module/news/news_detail.html?key=${id}&val1=${data.page.list[i].category.id}&val2=${data.page.list[i].id}/" target="_blank"><img src="http://huiyi.dworld.net.cn${data.page.list[i].image.replace(/_thumbs\//,'')}" alt="" style="height:114px"><p title="${data.page.list[i].title}">${data.page.list[i].title}</p></a></div>`
			}
			$("#botim").html(botim);
			var mySwiper2 = new Swiper ('.dlykt-container', {
			    disableOnInteraction:false,
			    autoplay: {
				    delay: 5000,//1秒切换一次
				},
			    // 如果需要前进后退按钮
			    navigation: {
			      nextEl: '.dlykt-button-next',
			      prevEl: '.dlykt-button-prev',
			    },
			    
			   	slidesPerView: 5,
	      		spaceBetween: 30,
	      		breakpoints: {
			        1024: {
			          slidesPerView: 4,
			          spaceBetween: 30,
			        },
			        768: {
			          slidesPerView: 3,
			          spaceBetween: 30,
			        },
			        640: {
			          slidesPerView: 2,
			          spaceBetween: 20,
			        },
			        320: {
			          slidesPerView: 1,
			          spaceBetween: 10,
			        }
			    }
			});
		}
	})
}
//默认为选中状态
function active(){
 $(".nav li a").first().css({
  "backgroundColor":"#25659c",
  "color":"#fff"
 });
}