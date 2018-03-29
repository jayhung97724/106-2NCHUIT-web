let Beauties =[]
let $accordion = $('.accordion')
$.getJSON("./HotBeauties.json", (file) => {
    Beauties = file;
    console.log(Beauties);
    Beauties.forEach((b) => {
        let templateString = $('#articleTemplate').html();
        let template = $(templateString);
        title = template.siblings('.title');
        content = template.siblings('.content');
        span = title.find('span');
        span.text(b.articleName);
        boxTag = content.find('.imgBox');
        imgTag = content.find('img');
        b.articleImages.forEach(lnk => {
            _imgTag = imgTag.clone();
            _imgTag.attr('src', lnk);
            boxTag.append(_imgTag);
        });
        imgTag.remove();
        // console.log(title);
        // console.log(content);
        $accordion.append(title);
        $accordion.append(content);
    })
});

$('.accordion').accordion();