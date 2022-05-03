
// tag function
function tagFilter(){
    let dv = event.currentTarget;
    let class_name = dv.className;
    if (class_name.indexOf("clicked") > 0){
        $(".post_li").css("display", "");
        $(".box").removeClass('clicked');
    } else {
        event.target.classList.add("clicked");
        let currentTag = dv.getAttribute("data-tag");
        filterByTagName(currentTag);
    }
}

// 선택된 태그에 따라 게시물을 Filtering
function filterByTagName(tagName) {
    if (tagName == "All"){
        $(".post_li").css("display", "");
    }else{
        $(".post_li").css("display", "none");
        $('img[post-tag='+tagName+']').parents(".post_li").css("display", "");
    }
}
