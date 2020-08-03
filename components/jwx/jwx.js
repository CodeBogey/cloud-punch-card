var href = "https://wechat.ip885.cn/tvyun/?m=act&a=airShow2020&sa=wxJsSdkWithShare&rand="+(new Date()).valueOf()
	+"&reffer=" +encodeURIComponent(window.location.href);
var head= document.getElementsByTagName('head')[0];
var script= document.createElement('script');
script.type= 'text/javascript';
script.src= href;
head.appendChild(script);