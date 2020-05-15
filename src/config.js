module.exports = {
    API: process.env.NODE_ENV === "development" ? 'http://localhost:8080' : 'https://insta-snap.herokuapp.com'
}