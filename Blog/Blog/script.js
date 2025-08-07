document.addEventListener('DOMContentLoaded', function() {
    const addPostBtn = document.getElementById('add-post-btn');
    const postTitle = document.getElementById('post-title');
    const postContent = document.getElementById('post-content');
    const navHome = document.getElementById('nav-home');
    const navAllPosts = document.getElementById('nav-all-posts');
    const newPostSection = document.getElementById('new-post');
    const allPostsSection = document.getElementById('all-posts-section');
    const allPostsList = document.getElementById('all-posts-list');

    function createPostElement(title, content) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'post-title';
        titleDiv.textContent = title;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'post-content';
        contentDiv.textContent = content;

        // Like button and count
        const likeContainer = document.createElement('div');
        likeContainer.className = 'like-container';
        const likeBtn = document.createElement('button');
        likeBtn.className = 'like-btn';
        likeBtn.textContent = 'Like';
        const likeCount = document.createElement('span');
        likeCount.className = 'like-count';
        likeCount.textContent = '0';
        likeBtn.onclick = function() {
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
        };
        likeContainer.appendChild(likeBtn);
        likeContainer.appendChild(likeCount);

        // Comment section
        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';
        const commentList = document.createElement('div');
        commentList.className = 'comment-list';
        const commentInput = document.createElement('input');
        commentInput.className = 'comment-input';
        commentInput.type = 'text';
        commentInput.placeholder = 'Add a comment...';
        const commentBtn = document.createElement('button');
        commentBtn.className = 'comment-btn';
        commentBtn.textContent = 'Comment';
        commentBtn.onclick = function() {
            const commentText = commentInput.value.trim();
            if (commentText) {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';

                const commentTextDiv = document.createElement('span');
                commentTextDiv.className = 'comment-text';
                commentTextDiv.textContent = commentText;

                // Edit button
                const editCommentBtn = document.createElement('button');
                editCommentBtn.className = 'edit-comment-btn';
                editCommentBtn.textContent = 'Edit';
                editCommentBtn.onclick = function() {
                    if (editCommentBtn.textContent === 'Edit') {
                        const editInput = document.createElement('input');
                        editInput.type = 'text';
                        editInput.value = commentTextDiv.textContent;
                        commentDiv.insertBefore(editInput, commentTextDiv);
                        commentDiv.removeChild(commentTextDiv);
                        editCommentBtn.textContent = 'Save';
                        editInput.focus();
                        editInput.onkeydown = function(e) {
                            if (e.key === 'Enter') editCommentBtn.click();
                        };
                    } else {
                        const newText = commentDiv.querySelector('input').value.trim();
                        if (newText) {
                            commentTextDiv.textContent = newText;
                            commentDiv.insertBefore(commentTextDiv, commentDiv.querySelector('input'));
                            commentDiv.removeChild(commentDiv.querySelector('input'));
                            editCommentBtn.textContent = 'Edit';
                        }
                    }
                };

                // Delete button
                const deleteCommentBtn = document.createElement('button');
                deleteCommentBtn.className = 'delete-comment-btn';
                deleteCommentBtn.textContent = 'Delete';
                deleteCommentBtn.onclick = function() {
                    commentDiv.remove();
                };

                commentDiv.appendChild(commentTextDiv);
                commentDiv.appendChild(editCommentBtn);
                commentDiv.appendChild(deleteCommentBtn);
                commentList.appendChild(commentDiv);
                commentInput.value = '';
            }
        };
        commentSection.appendChild(commentList);
        commentSection.appendChild(commentInput);
        commentSection.appendChild(commentBtn);

        // Share button
        const shareBtn = document.createElement('button');
        shareBtn.className = 'share-btn';
        shareBtn.textContent = 'Share';
        shareBtn.onclick = function() {
            const shareText = `${title}\n${content}`;
            if (navigator.share) {
                navigator.share({ title: title, text: content, url: window.location.href });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(shareText + '\n' + window.location.href);
                alert('Post link copied to clipboard!');
            }
        };

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() {
            postDiv.remove();
        };

        // Assemble post
        postDiv.appendChild(titleDiv);
        postDiv.appendChild(contentDiv);
        postDiv.appendChild(likeContainer);
        postDiv.appendChild(shareBtn);
        postDiv.appendChild(deleteBtn);
        postDiv.appendChild(commentSection);
        return postDiv;
    }

    addPostBtn.addEventListener('click', function() {
        const title = postTitle.value.trim();
        const content = postContent.value.trim();
        if (title && content) {
            const post = createPostElement(title, content);
            allPostsList.prepend(post);
            postTitle.value = '';
            postContent.value = '';
        } else {
            alert('Please enter both a title and content for the post.');
        }
    });

    navHome.addEventListener('click', function(e) {
        e.preventDefault();
        navHome.classList.add('active');
        navAllPosts.classList.remove('active');
        newPostSection.style.display = '';
        allPostsSection.style.display = 'none';
    });

    navAllPosts.addEventListener('click', function(e) {
        e.preventDefault();
        navHome.classList.remove('active');
        navAllPosts.classList.add('active');
        newPostSection.style.display = 'none';
        allPostsSection.style.display = '';
    });
});
