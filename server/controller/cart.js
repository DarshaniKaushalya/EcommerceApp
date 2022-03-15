const Cart = require('../model/cartModel');

// exports.create = async (req, res, next) => {
//     try {

//         //Create Cart
//         const cart = new Cart({
//             //user: req.user._id,
//             cartItems: req.body.cartItems
//         });

//         await cart.save();
//         res.json(cart);
//     } catch (err) {
//         console.log(err);
//     }
// };

exports.create = (req, res) => {

    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {
            if (error) return res.status(400).json({ error });
            if (cart) {
                res.status(200).json({ message: cart });
            } else {
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: req.body.cartItems
                });
                cart.save((error, cart) => {
                    if (error) return res.status(400).json({ error });
                    if (cart) {
                        return res.status(201).json({ cart });
                    }
                });
            }
        });
}