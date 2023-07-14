{
    $("form#post-create-form").submit(function(e){
        e.preventDefault();

        const postCreateFormElem = $("form#post-create-form");

        $.ajax({
            type: 'POST',
            url: '/posts/create',
            data: postCreateFormElem.serialize(),
            success: handleSuccess,
            error: function(err){
                console.log(err);
            }
        })
    });

    //handle link click of delete post: TODO
    $(" .post-delete-link").click(deletePost);

    function handleSuccess(data){
        const post = data.result.postDoc;
        let newPostElement = createElement(post);

        //add the new post in post list 
        $("#posts-list").prepend(newPostElement);

        //Comment form initialization
        $("#comment-forms form").submit(function (e) {
            e.preventDefault();
            createComment(e.target.id); //See ==> /assests/js/comment.js
        });

        //Delete link initialization for post and comment.:TODO

        $( " .post-delete-link").unbind( "click" );
        $(" .post-delete-link").click(deletePost);
    }

    function deletePost(e){
        //TODO
        e.preventDefault();

        console.log("Dletig the post", e.target.href);

        $.ajax({
            type: 'DELETE',
            url: e.target.href,
            success: function(data){
                // console.log(data);
                let post = data.result.postDoc;

                //remove deleted post from DOM.
                $('#post_item_'+post._id).remove();
            },
            error: function(err){
                console.log(err);
            }
        });

    }


    function createElement(post){

        let postElement = 
        `<div class="card mt-4 border-success shadow" id=${'post_item_'+post._id}>
            <div class="card-header">                
                <ul class="nav card-header-pills float-end">
                    <li class="nav-item">
                        <a href="/posts/delete?post_id=${ post._id }" class="btn btn-danger float-end post-delete-link">Delete</a>
                    </li>
                </ul>            
                <h5>            
                    <span class="badge bg-secondary">You</span>
                    ${ post.user.name } 
                </h5>
                <span class="text-muted col-8">${ post.createdAt }</span>
            </div>

            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>${ post.content }</p>
                </blockquote>
            </div>

            <div class="container">
                <div class="card-footer row comment-btn-no-outline" >
                    <button type="button" class="btn btn-light btn-lg col-4"><span class="badge bg-success">4</span> Like </button>

                    <button type="button" class="btn btn-light btn-lg col-4" data-bs-toggle="collapse" data-bs-target="#${ 'comment_'+post._id}" 
                    aria-expanded="false" aria-controls="${ 'comment_'+post._id}">
                    <span class="badge bg-info" id=${ "post_comment_btn_badge_"+post._id }>${ post.comments.length }</span> Comments</button>
                    
                    <button type="button" class="btn btn-light btn-lg col-4" data-bs-toggle="collapse" data-bs-target="#${ 'post_'+post._id}" 
                    aria-expanded="false" aria-controls="${ 'post_'+post._id}">Reply</button>
                </div>
            </div>

            <div class="collapse" id="${ 'post_'+post._id}">
                <div class="card card-body" id="comment-forms">
                    <form id="${'comment_form_'+post._id  }" onsubmit=createComment>
                    <div class="input-group mb-3">
                        <!-- Hidden Input will be used to send comment for specific post and user -->
                        <input type="hidden" name="post_id" value="${ post._id }" >
                        <input name="content" type="text" class="form-control" placeholder="Reply..." aria-label="Comment" aria-describedby="button-comment" required>
                        <button class="btn btn-outline-secondary" type="submit" id="button-comment">Comment</button>
                    </div>
                    </form>
                </div>
            </div>

            <div class="collapse" id="${ 'comment_'+post._id}" id="comments-list">
                <div class="list-group" id="${ 'comment_grp_'+post._id}">
                
                </div>
            </div>
        
      </div>`

      return postElement;

    }
}