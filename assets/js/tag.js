// tag function

function tmp(e){
    let dv = event.currentTarget;
    currentTag = dv.getAttribute("data-tag");
    alert(dv);
    var tmp = $(".post_li").getAttribute("post-jekyll");
    alert(tmp);
    // filterByTagName(currentTag);
}

$("[data-tag]").click((e) => {
  // currentTag = e.target.dataset.tag;
  window.alert(currentTag);
  filterByTagName(currentTag);
})

function filterByTagName(tagName) {
  $('.hidden').removeClass('hidden');
  $('.post_li').each((index, elem) => {
    if (!elem.childNodes.hasAttribute(`data-${tagName}`)) {
      $(elem).addClass('hidden');
    }
  });
  $(`.tag`).removeClass('selected');
  $(`.tag[data-tag=${tagName}]`).addClass('selected');
}
