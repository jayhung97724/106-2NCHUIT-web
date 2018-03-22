let article = {
    "articleName": "[神人]枇杷膏廣告女角",
    "articleDate": " 3/18",
    "articleLink": "https://www.ptt.cc/bbs/Beauty/M.1521305393.A.AD0.html",
    "articleAuthor": "vanillamint",
    "articlePush": 0,
    "articleImages": [
        "https://i.imgur.com/OJWdFT1.jpg",
        "https://i.imgur.com/NZbXl0y.jpg",
        "https://i.imgur.com/OiCnvu8.jpg",
        "https://i.imgur.com/sVkLdNZ.jpg"
    ]
}

let title = article.articleName;
let urls = article.articleImages;
console.log(urls);

let $title = $('.myTitle');
let $content = $('.myContent');
console.log($title.text(), ' + ',$title.siblings('ol').find('.myContent'));

$title.text(title);
li = $content;
urls.forEach((url)=>{
	_li = li.clone();
	console.log(_li);
	_li.text(url);
	$('ol').append(_li);
})
