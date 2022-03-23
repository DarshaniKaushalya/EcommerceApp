const axios = require('axios');

exports.homeRoutes = (req, res) => {
    //create a get request to /products
    axios.get('http://localhost:5000/products')
        .then(function (response) {
            res.render('index', { products: response.data });
        })
        .catch(err => {
            res.send(err);
        })
}
//create a get request to add product
exports.addProduct = (req, res) => {
    res.render('addProduct');

}
// //create a get request to update product
// exports.update_user = (req, res) => {
//     axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
//         .then(function (userdata) {
//             res.render("update_user", { user: userdata.data })
//         })
//         .catch(err => {
//             res.send(err);
//         })

// }