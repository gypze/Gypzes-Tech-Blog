document.getElementById('logout').addEventListener('click', async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        window.location.replace('/');
    } else {
        alert('Failed to log out');
    }
});