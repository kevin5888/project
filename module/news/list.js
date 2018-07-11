var ctx2 = 'http://huiyi.dworld.net.cn/dwcms';
$(function(){

	
	// 1.加载主导航
	initCategory();
	// 2.加载栏目文章列表
	initArticleList(getParams('key1'));
	console.log(ctx2)
});
//获取传参的?后的id方法
function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};

//主导航
function initCategory(){
	$.ajax({
		type:"post",
		data:{},
		url: ctx2 +'/portal/categoryList.jhtml',
		dataType:'jsonp',
		success:function(data){
			var html = '';
			for(var i=0;i<data.data.length;i++){
				if(data.data[i].inMenu=="1"){
					if(data.data[i].href)
						html += `<li id="cat${data.data[i].id}"><a href="../../${data.data[i].href}" title="网站首页"><span class="${data.data[i].iconcls}" aria-hidden="true"></span>${data.data[i].name}</a></li>`
					else
						html += `<li id="cat${data.data[i].id}"><a href="news_list.html?key1=${data.data[i].id}" title="网站首页"><span class="${data.data[i].iconcls}" aria-hidden="true"></span>${data.data[i].name}</a></li>`
				}
			}
			$(".nav").html(html);
			$('#cat'+getParams('key1')).addClass('nav-li-current').find('a').css('color','#fff');
		}
	});
}

//渲染内容页及分页按钮
function initArticleList(categoryid) {
	
	var o = {
		url: ctx2 + '/'+categoryid + '/articleList.jhtml',
		method:'post',
		dataType:'jsonp',
		pagination:true,
		sidePagination:"server",
		pageSize:20,
		pageList:[10,20,30],
		queryParams:function(params){
			params.pageSize = this.pageSize;
			params.pageNo = this.pageNumber;
			return params;
		},
		responseHandler:function(ret){
			$("#infoopen").html(ret.category.name)
			
			console.log(ret);
			if(ret.page) {
				ret.total = ret.page.count;
				ret.rows = ret.page.list;
			}
			return ret;
		},
	    columns: [{
	        field: 'id',
	        title: 'ID',
	        visible:false
	    }, {
	        field: 'title',
	        title: '文档标题',
	        formatter:function(value,row){
	        		return '<a href="news_detail.html?val1='+categoryid+'&val2='+row.id+'">'+value+'</a>';
	        }
	    }, {
	        field: 'createDate',
	        title: '发布时间'
	    }, ]
	};
	var $table = $("#table").bootstrapTable(o);
	
}

