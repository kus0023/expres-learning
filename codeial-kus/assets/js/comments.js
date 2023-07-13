

{
    // console.log($("#comment-forms form"));
    //This will get comment form id of particular post on which we will post the request.
    $("#comment-forms form").submit(function (e) {
        e.preventDefault();
        createComment(e.target.id);
    });

    $("a.comment-delete-link").click(deleteCommentLinkButton);

    //Making ajax call to create the form.
    function createComment(formId){
        let newComment = $("#"+formId);

        $.ajax({
            type: 'POST',
            url: "/comments/create",
            data: newComment.serialize(),
            success: handleSuccessResponse,
            error: function(err){
                console.log(err);
            }
        });
        
    }

    function handleSuccessResponse(data){
        //Add the new form in comment list DOM after successful response
        // console.log(data);

        const post = data.result.updatedPostDoc;
        const comment = data.result.commentDoc;

        let elementComment = $('#comment_grp_'+post._id).append(createElement(post, comment)); //This will append the new child in comment.
        $('#post_comment_btn_badge_'+post._id).html(post.comments.length); //This will update the button badge.
        $('#comment_'+post._id).removeClass("show").addClass("show"); // This will show the comment box.
        $('html, body').scrollTop($('#comment_'+post._id).offset().top); //Scroll to the comment.


        //Setting up click event listener for new link.
        $("a.comment-delete-link").click(deleteCommentLinkButton);
    }

    function deleteCommentLinkButton(e){

        e.preventDefault();
        console.log(e.target.href);
        $.ajax({
            type: 'DELETE',
            url: e.target.href,
            success: function(data){
                //remove deleted comment from DOM.
                $('#comment_item_'+data.result.deleteCommentResult._id).remove();
            },
            error: function(err){
                console.log(err);
            }
        });
    }

    
    function createElement (post, comment){

        let commentElement = `<div class="list-group-item list-group-item-action list-group-item-warning" aria-current="true" id=${"comment_item_"+comment._id} >
                                <div class="d-flex w-100 justify-content-between">
                                <h6 class="mb-1">${ comment.user.name }</h6>
                                <small>${ comment.createdAt }</small>
                                </div>
                                <div class="row justify-content-between">
                                    <p class="mb-1 col-8">${ comment.content }</p>
                                    <div class="text-end col-2">
                                        <a href="/comments/delete?post_id=${ post._id }&comment_id=${ comment._id }" class="btn btn-sm btn-danger comment-delete-link" >Delete</a>  
                                    </div>
                                </div>
                            </div>`

        return commentElement;

    }

}


   