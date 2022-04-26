// tag function

function tagFilter(){
    let dv = event.currentTarget;
    let currentTag = dv.getAttribute("data-tag");
    // alert("currentTag : " + currentTag);
    // $("img[post-tag=currentTag]").parents(".post_li").css("display", "none");
    filterByTagName(currentTag);
}

function filterByTagName(tagName) {
    if (tagName == "All"){
        // alert("ALL");
        $(".post_li").css("display", "");
    }else{
        $(".post_li").css("display", "none");
        $('img[post-tag='+tagName+']').parents(".post_li").css("display", "");
    }

}
