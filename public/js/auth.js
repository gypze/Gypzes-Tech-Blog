document.getElementById('login_form').addEventListener('submit', function (event) {
    event.preventDefault();
    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: event.currentTarget.username.value,
            password: event.currentTarget.password.value,
        }),
    })
        .then((response) => {
            if (response.ok) {
                location.replace('/');
            }

            else {
                alert('Failed to log in');
            }
        }
        );
});


document.getElementById('signup_form').addEventListener('submit', function (event) {
    event.preventDefault();
    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: event.currentTarget.username.value,
            password: event.currentTarget.password.value,
        }),
    })
        .then((response) => {
            if (response.ok) {
                location.replace('/');
            }
            else {
                alert('Failed to sign up');
            }
        }
        );
});

