// tag function

function tagFilter(){
    let dv = event.currentTarget;
    $(".box").removeClass('clicked');
    event.target.classList.add("clicked");
    let currentTag = dv.getAttribute("data-tag");
    filterByTagName(currentTag);
}

// 선택된 태그에 따라 게시물을 Filtering
function filterByTagName(tagName) {
    if (tagName == "All"){
        // alert("ALL");
        $(".post_li").css("display", "");
    }else{
        $(".post_li").css("display", "none");
        $('img[post-tag='+tagName+']').parents(".post_li").css("display", "");
    }
}
