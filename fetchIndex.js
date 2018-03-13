const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
let HotBoardsJson = [];
let url = 'https://www.ptt.cc'
request(url + '/bbs/index.html', (error, response, body) => {
	console.log('error: ', error);
	console.log('sratusCode: ', response && response.statusCode);
	// console.log('body: ', body);

	var $ = cheerio.load(body);
	boardArr = $('a.board');

	for (var i = 0; i < boardArr.length; i++) {
		boardName = $($(boardArr[i]).find('.board-name')).text();
		boardClass = $($(boardArr[i]).find('.board-class')).text();
		boardLink = url + $(boardArr[i]).attr('href');

		HotBoardsJson.push({ boardName: boardName, boardClass: boardClass, boardLink: boardLink })
		console.log(`${boardName}\n>> ${boardLink}\n>> 分類：${boardClass}\n`);
	}
	fs.writeFile('HotBoards.json', JSON.stringify(HotBoardsJson), function (err) {
		if (err)
			console.log(err);
		else
			console.log('File ' + 'HotBoards.json' + ' written!');
	})
	console.log('共 ' + HotBoardsJson.length + ' 篇\n');
});