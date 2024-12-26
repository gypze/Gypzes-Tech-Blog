const deleteBtns = document.querySelectorAll('#delete-btn');
deleteBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const postId = e.target.getAttribute('data-postid');
        try {
            const res = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.ok) {
                window.location.reload();
            } else {
                throw new Error('Failed to delete post');
            }
        } catch (err) {
            console.error(err);
        }
    });
});