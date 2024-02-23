const {default: axios} = require('axios');

function newsArticlesPromise(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then((res) => {
            return resolve(res.data);
        }).catch(err => {
            return reject(err);
        });
    })
}

module.exports = { newsArticlesPromise }