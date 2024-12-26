module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString();
    },
    eq: function (a, b) {
        return a === b;
    }
}

