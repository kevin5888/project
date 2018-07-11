var ctx3 = 'http://huiyi.dworld.net.cn/dwcms';

function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};

$(function(){
	//渲染头部
	$.ajax({
		type:"post",
		data:{},
		url: ctx3 +'/portal/categoryList.jhtml',
		dataType:'jsonp',
		success:function(data){
			var html = '';
			for(var i=0;i<data.data.length;i++){
				if(data.data[i].inMenu=="1"){
					if(data.data[i].href)
						html += `<li id="cat${data.data[i].id}"><a href="../../${data.data[i].href}" title="网站首页"><span class="${data.data[i].iconcls}" aria-hidden="true"></span>${data.data[i].name}</a></li>`;
					else
						html += `<li id="cat${data.data[i].id}"><a href="news_list.html?key1=${data.data[i].id}" title="网站首页"><span class="${data.data[i].iconcls}" aria-hidden="true"></span>${data.data[i].name}</a></li>`;
				}
			}
			$(".nav").html(html);
			$('#cat'+getParams('val1')).addClass('nav-li-current').find('a').css('color','#fff');
		}
	});

	$.ajax({
		type:"post",
		url: ctx3 +"/"+ getParams('val1')+"/"+getParams('val2')+"/view.jhtml",
		dataType:'jsonp',
		success:function(data){
			// console.log(data);
			$("#xinxi").html(data.category.name);
			$("#xinxi").attr('href','news_list.html?key1='+data.category.id);
			$('#tit').html(data.article.title);
			$('#times').html('发文时间：&nbsp' + data.article.createDate);
			$("#source").html('来源：&nbsp' + (data.article.articleData.copyfrom||''));
			$('.content').html(data.article.articleData.content||'');
		}

		
	});

});