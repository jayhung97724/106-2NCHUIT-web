const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
let HotArticles = [];
let url = 'https://www.ptt.cc'
request(url + '/bbs/Beauty/index.html', (error, response, body) => {
	console.log('error: ', error);
	console.log('sratusCode: ', response && response.statusCode);
	// console.log('body: ', body);

	var $ = cheerio.load(body);
	articleArr = $('div.r-ent');
    // console.log(articleArr[0]);
	for (var i = 0; i < articleArr.length - 5; i++) {
		articleName = $(articleArr[i]).find('.title').find('a').text();
        articlePush = $(articleArr[i]).find('.nrec').find('.f2').text();
        articleDate = $(articleArr[i]).find('.meta').find('.date').text();
        articleAuthor = $(articleArr[i]).find('.meta').find('.author').text();
        articleLink = url + $(articleArr[i]).find('.title').find('a').attr('href');
        
        // https://www.ptt.cc/bbs/Beauty/M.1520378107.A.181.html
        if (articleLink.indexOf("undefined") == -1) {
            HotArticles.push({ 
                articleName: articleName, 
                articleDate: articleDate, 
                articleLink: articleLink, 
                articleAuthor: articleAuthor, 
                articlePush: (articlePush == "") ? 0 : parseInt(articlePush)
            });
            console.log(`${articleName}\n>> ${articleLink}\n>> 日期：${articleDate}\n>> 作者：${articleAuthor}\n>> 推數：${articlePush}\n`);
        }
	}
	fs.writeFile('HotArticles.json', JSON.stringify(HotArticles), function (err) {
		if (err)
			console.log(err);
		else
            console.log('File ' + 'HotArticles.json' + ' written!');
	})
	console.log('共 ' + HotArticles.length + ' 篇\n');
});