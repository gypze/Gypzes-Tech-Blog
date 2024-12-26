document.querySelector('#comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const comment = document.querySelector('#comment').value;
    const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_text: comment }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to create comment');
    }
});

const deleteButtons = document.querySelectorAll('.delete-comment');
deleteButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        const commentId = e.target.getAttribute('data-commentid');
        try {
            const res = await fetch(`/api/posts/comment/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.ok) {
                window.location.reload();
            } else {
                throw new Error('Failed to delete comment');
            }
        } catch (err) {
            console.error(err);
        }
    });
});