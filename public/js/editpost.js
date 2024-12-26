const token = localStorage.getItem("token");
const editPostForm = document.getElementById("edit-post-form");

editPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title,
            content,
        }),
    });

    if (response.ok) {
        window.location.href = `/post/${postId}`;
    } else {
        const data = await response.json();
        alert(data.message);
    }
});