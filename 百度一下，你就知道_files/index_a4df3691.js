F.addLog("mantpl:news",{newsShow:"0200100000",recomWordShow:"1100000000",newsClick:"0200100001",hotsugClick:"0200200001",dustbinClick:"page-card-tpl-item",recomWordClick:"page-card-tpl-item",newsBanner:"0200300001",topNewsImageClick:"0200100002",topNewsTextClick:"0200100003"});F.module("mantpl:news/index_view",function(e,g,h){var c=e("superui:util/dot");function a(j){var k=this;k.perCount=16;k.passNum=16;k.curRound=1;k.topDom=j;k.ranDom=$(".s-news-rank-content",k.topDom);k.curImgNum=0;k.hotWrap=$(".new-image-pool");k.hotCtrlNum=$(".carousel-ctrl-item",k.topDom).length;k.hotCtrlWid=$(".new-image-pool .img-item",k.topDom).width();k.ctrlWrap=$(".carousel-ctrl")}a.prototype={renderHot:function(r,t,o){var p="";var l=0;var j="";var k=this;k.curRound=t;$(".news-meta-item").removeClass("news-viewed");for(var l=0;l<k.perCount;l++){var n=r[(l+k.passNum)%r.length];var s=n.title;var q=decodeURIComponent(n.url);var o=n.count;var m=k.ranDom.find('[data-index="'+l+'"]');m.removeClass("news-artist").find(".news-title .title-link .title-content").html(s).attr("href",q).end().find(".news-count").html(o).attr("title","搜索指数"+o);k.ranDom.find(".v-detail").remove();if(n.isViewed==1){m.addClass("news-viewed")}if(n.isNew==1){m.addClass("news-artist")}}k.passNum+=k.perCount},longHot:function(j){var k=this;k.perCount=12;k.passNum-=8;$(".s-news-rank-content",k.topDom).addClass("s-news-rank-long");k.renderHot(j,k.curRound)},flashImg:function(k,l){var j=this;if(!j.imgRef){j.imgRef=$(".s-news-img",j.topDom).eq(0);j.imgHeight=j.imgRef.height();j.imgWidth=j.imgRef.width()}if(l==="mouseenter"){$(".s-news-img:animated").stop().css({"margin-top":"0","margin-left":"0",width:j.imgWidth,height:j.imgHeight});k.animate({"margin-top":"-10px","margin-left":"-10px",width:j.imgWidth+20,height:j.imgHeight+20})}else{k.animate({"margin-top":"0","margin-left":"0",width:j.imgWidth,height:j.imgHeight})}},switchHotImg:function(n,m,l){var k=this;if(k.stopSwitch&&!l){return}if(!!m){var j=parseInt(k.curImgNum,10)+n;j=j<0?(j+k.hotCtrlNum):j;k.curImgNum=j%k.hotCtrlNum}else{if(n){k.curImgNum=n}else{k.curImgNum=(parseInt(k.curImgNum,10)+1)%k.hotCtrlNum}}clearTimeout(k.cTimmer);k.ctrlWrap.find(".carousel-ctrl-cur").removeClass("carousel-ctrl-cur").end().find('[data-index="'+k.curImgNum+'"]').addClass("carousel-ctrl-cur");k.hotWrap.stop().animate({left:(-1*k.curImgNum*k.hotCtrlWid)+"px"},function(){k.carousel()})},carousel:function(){var j=this;j.cTimmer=setInterval(function(){j.switchHotImg(1,true)},5000)},createRecom:function(j,k){_ctx=this;$.ajaxpost(s_domain.baseuri+"/news/data/newrelatewords",{title:$.trim($(j).find("h2 .s-yahei").text()),rid:$(j).attr("data-rid")},function(n){var l=n.errNo,q=n.data;if(l=="0"){var p=_ctx.topDom.find(".c-recommend");if(p){p.remove()}var r="";for(var o=0;o<q.length;o++){r=r+'<a href="'+decodeURIComponent(q[o].recomHref)+'" target="_blank" class="recom-link">'+q[o].recomTitle+"</a>"}var m='<div class="c-recommend"><i class="c-icon"></i><span class="c-gray">为您推荐：</span>'+r+"</div>";$(j).find(".from").after(m);k&&k(j)}else{if(l=="501"){}}})},getRecomWords:function(k){var m=[],l=$(k).find(".c-recommend a");for(var j=0;j<l.length;j++){m.push('"'+$.trim($(l[j]).text())+'"')}return m},getHotWords:function(){var l=[],k=this.ranDom.find(".title-content");for(var j=0;j<k.length;j++){l.push('"'+$.trim($(k[j]).text())+'"')}return l},waitView:function(l,j,m){var k=this;if(l.type==="mouseenter"){k.ranDom.find(".v-detail").hide();clearTimeout(k.onTimer);clearTimeout(k.offTimer);k.onTimer=setTimeout(function(){k.showDetail(j,m);j.parents(".news-meta-item");d()},500)}else{if(l.type==="mouseleave"){clearTimeout(k.onTimer);k.hideDetail(j)}}},viewDetail:function(j,o){var m=$.trim($(".title-content",j).html()),k=this;for(var l in o){if(o[l].title===m){o[l].isNew=0;o[l].isViewed=1;break}}var n=$(".s-news-rank-list .one-item",k.topDom).length;$.ajaxget("/home/news/data/mannewssug?word="+m,function(p){if(p.data.length<1){return}var t=j.offset().top-$(".s-news-rank-content",k.topDom).offset().top+20;var r=parseInt(j.closest("[data-index]").attr("data-index"));if(r>7){t-=130}if($.browser.firefox){t+=10}else{if($.isIE==6){t-=3}}var q=f(p.data,t,(r>7),+r%2);if(!!q){var s=$(q);j.append(s);if($.isIE===6){setTimeout(function(){s.css({zoom:1})},200)}}})},showDetail:function(k,l){var j=k.find(".v-detail");k.parents(".s-news-rank-content").find(".v-detail").hide();if(j[0]){j.show()}else{this.viewDetail(k,l)}return true},hideDetail:function(j){j.find(".v-detail").hide()}};function f(m,n,o,l){var k='<div class="v-detail#{down}#{right}" style="top:#{top}px;"><div class="detail-content">#{content}<div class="v-arrow"><em></em></div></div></div>';if(!m||!m.length){return false}var j=b(m[0])+i(m[0])+b(m[1]);return $.formatString(k,{content:j,top:n,down:o?" v-down":"",right:l?" v-right":" v-left"})}function b(k){if(!k){return""}k.url=decodeURIComponent(k.url);var j='<div class="hot-words-item"><span class="dot"></span><a class="word-title" href="#{url}" target="_blank" title="#{realtitle}">#{title}</a></div>';return $.decodeHTML($.formatString(j,k))}function i(k){var j='<div class="hot-words-summary">#{summary}</div>';return $.decodeHTML($.formatString(j,k))}function d(){h.fire("hotsugClick",{clickType:"layerShow",newsType:"words"})}return a});F.module("mantpl:news/index",function(c,g,n){var a=c("superui:util/dot");var l=$.parseJSON($("#news_hot_data").html());var o=$.parseJSON($("#news_banner_data").html());var e=c("mantpl:news/index_view");var i=$("#s_xmancard_news");var f=$(".s-news-banner-wrap");var h=new e(i);var k=2;var m=c("superui:component/tips");var d=new m({target:$("#head"),identity:"ExceedTipsNews",content:"今天召唤我太多次啦，</br>明天再来调教小度吧！`(*∩_∩*)′",timing:2000,autoShow:false,theme:"exceedtipnews"});var j=0;function b(){this.onTimer=null;this.offTimer=null;this.hotRound=1}b.prototype={constructor:b,init:function(){this.blockName="news";this.addEvent();this.fix();var p=this.stringify(h.getHotWords());n.fire("newsShow",{showType:"hotword",words:p,pagenum:"0"});$(".s-news-rank-wrapper .s-rank-title").addClass("s-opacity-border1-bottom");this.itemNum=$(".s-news-item").length},stringify:function(p){return"["+p.join(",")+"]"},setTopDom:function(p){i=p},fix:function(){i.find(".s-news-item:eq(0)").addClass("first")},showLayer:function(r,q){var s,p=this;if($.isIE6){s=$(window).height()/2+$(window).scrollTop()}else{s="50%"}F.use("superui:component/dialog",function(t){p.DelPannel=new t({identity:"newsDel",content:'<div class="pannel-content">确定不感兴趣吗？</br>以后这类信息会少出现哒！(=￣ω￣=)✧</div>',hasClose:true,theme:p.blockName+"-pannel",autoShow:true,width:400,top:s,dus:q,buttons:[function(u){p.sendTip(u);p.delNew(q);n.fire("dustbinClick",{nodename:"ok"})},function(){n.fire("dustbinClick",{nodename:"cancel"})}]});if($.isIE===6){$("#sui-dialog-mask").height($(document.body).height())}});$(".sui-dialog-footer").prepend('<a href="javascript:;" onclick="return false;" class="noremind"><i class="checkbox"></i>不再提示</a>');if(r=="1"||r=="2"){$(".checkbox").addClass("checkboxbk")}$(".sui-dialog-news-pannel").delegate(".noremind","click",function(t){$(".checkbox").toggleClass("checkboxbk");n.fire("dustbinClick",{nodename:"noremind"});t.stopPropagation()})},sendTip:function(q){var p=q.target.prev().find(".checkbox");if(p.hasClass("checkboxbk")){F.use("superman:common/user_attr",function(r){r.setAttr("delrecLayer","1")})}else{F.use("superman:common/user_attr",function(r){r.setAttr("delrecLayer","0")})}},delNew:function(p){_ctx=this;$.ajaxpost(s_domain.baseuri+"/news/submit/mannewsoperation",{cmd:"remove",id:$(p).parents(".s-news-item").attr("data-rid")},function(r){var q=r.errNo;if(q=="0"){var s=$(p).parents(".s-news-item");var t=s.parents(".s-news-list-wrapper");s.remove();if(t.children().length==0){t.remove()}$(".s-news-list-wrapper .s-news-item:first").addClass("first");_ctx.itemNum--;if(_ctx.itemNum<7){F.call("mancard:skeleton/presenter","judgeFire")}}else{if(q=="501"){d.show();if($.isIE6){d.tips.css({top:$(window).height()/2+$(window).scrollTop()})}else{d.tips.css({top:"50%"})}}}})},addEvent:function(){var p=this;var s=$(".s-news-list-wrapper",i);var r;i.delegate(".s-news-item","mouseenter",function(t){if($.isIE===6){$(".dustbin",this).css("display","block")}t.stopPropagation()}).delegate(".s-news-item","mouseleave",function(t){if($.isIE===6){$(".dustbin",this).css("display","none")}t.stopPropagation()}).delegate(".dustbin","click",function(t){_ctxdus=this;$.ajaxget(s_domain.baseuri+"/other/data/mancardlayer?tabid="+window.s_session.curmod,function(v){var u=v;if(u.showFloat=="0"){p.delNew(_ctxdus)}else{p.showLayer(u.noremind,_ctxdus)}});r&&r.close();t.stopPropagation()}).delegate(".dustbin","mouseenter",function(t){_ctxdus=$(this);r=new m({target:_ctxdus,identity:"noInterestTipsNews",content:"不感兴趣",autoShow:true,arrowUp:false,arrowLeft:"center",align:"center",theme:"nointeresttipnews"});$(".sui-tips-nointeresttipnews").css({top:"+=2"});t.stopPropagation()}).delegate(".dustbin","mouseleave",function(t){r&&r.close();t.stopPropagation()}).delegate(".s-news-item a[href]","click",function(u){if(!$(this).attr("data-src")){var t=$(this).parents(".s-news-item");t.addClass("news-viewed");if(s_session.sid.indexOf("18836")>-1&&t.attr("data-relatewords")&&$(this).find(".from")){h.createRecom(t,function(w){var v=p.stringify(h.getRecomWords(w));n.fire("recomWordShow",{opType:"recomshow",rid:w.attr("data-rid"),words:v})});p.sendRecomLog(t)}}u.stopPropagation()}).delegate(".s-news-rank-wrapper .hot-refresh","click",function(u){h.renderHot(l.banner,p.hotRound++);n.fire("newsClick",{clickType:"wordsChange"});j++;var t=p.stringify(h.getHotWords());n.fire("newsShow",{showType:"hotword",words:t,pagenum:j})}).delegate(".news-title .title-link","mouseenter mouseleave",function(t){h.waitView(t,$(this),l.banner);t.stopPropagation()}).delegate(".news-title .title-link a","click",function(v){$(this).parents(".news-meta-item").removeClass("news-viewed").removeClass("news-artist").addClass("news-viewed");var u=$.trim($(this).html());$.ajaxpost("/home/news/submit/mannewsview",{title:u});for(var t in l.banner){if(l.banner[t].title==$.decodeHTML($.trim($(this).html()))){l.banner[t].isViewed=1;l.banner[t].isNew="0"}}}).delegate(".title-content","click",function(u){var t=$(this);n.fire("newsClick",{clickType:"wordTopic",newsType:"words",url:$(this).attr("href"),title:$(this).text(),pagenum:j,newsindex:$(this).closest(".news-meta-item").attr("data-index")});u.stopPropagation()}).delegate(".word-title","click",function(u){var t=$(this);n.fire("hotsugClick",{clickType:"wordTopic",newsType:"words",url:$(this).attr("href")});u.stopPropagation()}).delegate(".title-text a","click",function(t){n.fire("hotsugClick",{clickType:"wordTopic",newsType:"topLink",url:$(this).attr("href")})}).delegate("s_news_banner","click",function(t){n.fire("hotbannerClick",{clickType:"",newsType:"topLink",url:$(this).attr("href")})}).delegate(".s-news-banner-wrap","click",function(){n.fire("newsBanner",{clickType:"click",url:o.url,title:o.title,bannerId:o.bannerId})}).delegate(".s-text-banner [data-click]","click",function(t){n.fire("topNewsTextClick",{clickType:$(this).attr("data-click"),url:$(this).attr("href")||$(this).parent().attr("href")});t.stopPropagation()}).delegate(".s-image-banner [data-click]","click",function(t){n.fire("topNewsImageClick",{clickType:$(this).attr("data-click"),url:$(this).attr("href")||$(this).parent().attr("href")});t.stopPropagation()});if($.isIE!==6){p.browserFollow()}else{p.ieFollow()}var q=false;n.listen("mancard:skeleton/card","cardloaded",function(v){if(+v.cardId===+k){i.removeClass("s-news-split")}if(v.cardId==k&&h.perCount!=12&&v.loadData.isEnd=="0"){p.itemNum+=5;if(!q){q=true;if(o&&!!(+o.isViewed)){var u=$.url.escapeSSL(decodeURIComponent(o.img));f.css("background","url("+u+") no-repeat");f.removeClass("news-banner-hidden");n.fire("newsBanner",{clickType:"show",title:o.title,bannerId:o.bannerId})}}else{h.renderHot(l.banner,p.hotRound++);var t=p.stringify(h.getHotWords());j++;n.fire("newsShow",{showType:"hotword",words:t,pagenum:j})}i.attr("data-waterpara","version="+v.loadData.version+";"+v.loadData.waterpara)}});n.listen("superui:component/dialog","dialogHide",function(v){var u=v.obj.options("dus");if($.isIE===6){var t=$(u).parents(".item-wrapper");$(u).css("display","none");$(".subscribe",t).css("display","none");$(".img-click",t).css("display","block")}})},roller:function(q,p,t,v){if(!this.nWrap){this.nWrap=$(".s-news-wrapper",i);this.nOffset=this.nWrap.offset()}var x=this.nWrap;var u=q.offset();var w=q.height();var s=i.width();var r=this.nOffset;if(x.offset().top-(u.top+w)<v&&t&&i.is(":visible")){p.css({position:"fixed",top:Math.min(w+v,x.height()+r.top-$(window).scrollTop()-p.outerHeight(true)),right:($(window).width()-(r.left+s)-20+$(window).scrollLeft())})}else{p.css({position:"absolute",top:0,right:"5px"})}},browserFollow:function(){var t=$(".s-news-rank-wrapper",i);var s=$("#s_top_wrap");var q=this;var r=false;function p(u){if(!s.find("#s_menu_gurd")[0]){q.roller(s,t,r,15)}else{q.roller(s,t,r,30)}}n.listen("superman:page/scroll","outMenu",function(u){if(u.out===true){r=true;$(window).bind("scroll",p);$(window).bind("resize",p)}else{r=false;$(window).unbind("scroll",p);$(window).unbind("resize",p);t.removeAttr("style")}});$(window).bind("resize",function(){if(!q.nWrap){q.nWrap=$(".s-news-wrapper",i)}q.nOffset=q.nWrap.offset()});n.listen("mancard:skeleton/presenter","switchCard",function(u){if(+u.toCard===k){if(!q.nWrap){q.nWrap=$(".s-news-wrapper",i)}q.nOffset=q.nWrap.offset()}})},ieFollow:function(){var t=$(".s-news-rank-wrapper",i);var q=$("#s_ctner_contents");var p=0;var r=t.height();function s(){if($(this).scrollTop()>p){_top=Math.min(Math.max($(this).scrollTop()-322,0),Math.abs(q.height()-r-100))}else{_top=Math.min(Math.max($(this).scrollTop()-290,0),Math.abs(q.height()-r-100))}t.stop().animate({top:_top});p=$(this).scrollTop()}$(window).bind("scroll",s)},sendRecomLog:function(q){var p=this;q.delegate(".recom-link","click",function(){var r=p.stringify(h.getRecomWords(q));n.fire("recomWordClick",{nodename:"recomLink",url:$(this).attr("href")||"",title:$.trim($(this).text())||"",rid:q.attr("data-rid"),words:r})})}};return new b()});F.use("mantpl:news/index",function(a){a.init()});