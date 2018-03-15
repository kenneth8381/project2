/*
  Please add all Javascript code to this file.
*/
function Article (image,title,tag,impressions,description,link) {
  this.image = image;
  this.title = title;
  this.tag = tag;
  this.impressions = impressions;
  this.description = description;
  this.link = link;
}
function addArticle(article){
  var template = '<article class="article">' +
    '<section class="featuredImage">' +
      '<img src="'+ article.image +'" />'+
    '</section>' +
    '<section class="articleContent">' +
        '<a href="'+article.link +'"><h3>'+ article.title +'</h3></a>' +
        '<p class= "articleDescription hidden">'+ article.description + '</p>' +
        '<h6>'+ article.tag+ '</h6>' +
    '</section>' +
    '<section class="impressions">' +
      article.impressions +
    '</section>' +
    '<div class="clearfix"></div>' +
  '</article>'
  $('#main').append(template)
}
$('nav li a').on('click',function(e){
  e.preventDefault()
  $('#popUp').removeClass('hidden')
  $('#source').html($(this).html())
  if(($(this).html()) === "Digg"){
    $.get("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json", function(results){
    $('#main').html('')
    for (i=0; i < results.data.feed.length; i++){
      var feed = results.data.feed[i]
      var Article1 = new Article (feed.content.media.images[0].url,feed.content.title,feed.content.tags[0].aliases[0],feed.digg_score,feed.content.description,feed.content.original_url)
    addArticle(Article1)
    }
    $('#popUp').addClass('hidden')
    $('.article .articleContent h3').on('click',function(e){
      e.preventDefault()
      showDescription($(this))
    })
  })
}else if($(this).html() === "Reddit") {
  $.get("https://www.reddit.com/top.json", function(results){
    console.log(results);
  console.log(results.data.children)
  $('#main').html('')
  for (i=0; i < results.data.children.length; i++){
    var children = results.data.children[i]
    var Article1 = new Article (children.data.thumbnail,children.data.title,children.data.post_hint,children.data.score,children.data.author,children.data.url)
  addArticle(Article1)
  }
  $('#popUp').addClass('hidden')
  $('.article .articleContent h3').on('click',function(e){
    e.preventDefault()
    showDescription($(this))
  })
})
}else if($(this).html() === "Rss") {
  $.get("https://accesscontrolalloworiginall.herokuapp.com/https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.twit.tv%2Fbrickhouse.xml", function(results){

  $('#main').html('')
  for (i=0; i < results.items.length; i++){
    var item = results.items[i]
    console.log(item);
    var Article1 = new Article (item.thumbnail, item.title, item.categories[0], item.pubDate, item.title, item.link)
  addArticle(Article1)
  }
  $('#popUp').addClass('hidden')
  $('.article .articleContent h3').on('click',function(e){
    e.preventDefault()
    showDescription($(this))
  })
})
}

})
function showDescription (h3element){

  var title = h3element.html()
  var link = h3element.parent().attr('href')
  var description = h3element.closest('article').find('.articleDescription').html()
  console.log(description);
  console.log(link);
  $('#popUp').find('h1').html(title)
  $('#popUp').find('p').html(description)
  $('#popUp').find('a').attr('href', link)
  $('#popUp').removeClass('hidden loader')
}

$('.closePopUp').on('click', function(e){
  e.preventDefault()
  $('#popUp').addClass('hidden loader')
})
