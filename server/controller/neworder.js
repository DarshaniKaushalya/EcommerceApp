const { json } = require("express/lib/response");
const newOrder = require("../model/newOrderModel");
const Order = require("../model/orderModel");
const findOrder = require('../model/newOrderModel');


exports.addOrder = (req, res) => {

    Order.deleteOne({ user: req.user._id }).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
            req.body.user = req.user._id;
            req.body.orderStatus = [
                {
                    type: "ordered",
                    date: new Date(),
                    isCompleted: true,

                },
                {
                    type: "packed",
                    isCompleted: false,

                },
                {
                    type: "shipped",
                    isCompleted: false,

                },
                {
                    type: "delivered",
                    isCompleted: false,

                },
            ];
            const order = new newOrder(req.body);
            order.save((error, order) => {
                if (error) return res.status(400).json({ error });
                if (order) {
                    res.status(201).json({ order });
                }
            });
        }
    });
};

// exports.addOrder = (req, res) => {

//     //res.json({ message: 'order' })

//     req.body.user = req.user._id;
//     const order = new newOrder(req.body);
//     order.save((error, order) => {
//         if (error) return res.status(400).json({ error });
//         if (order) {
//             res.status(201).json({ order });
//         }
//     });
// };

exports.getOrders = (req, res) => {
    newOrder.find({ user: req.user._id })
        .select("_id paymentStatus items")
        .populate("items.productId", "_id name image")
        .exec((error, orders) => {
            if (error) return res.status(400).json({ error });
            if (orders) {
                res.status(200).json({ orders });
            }
        });
};

//Not working
// exports.getOrder = (req, res) => {
//     // res.json({ message: 'orderfind' })
//     Order.findOne({ _id: req.body.orderId })
//         .populate("items.productId", "_id name image")
//         .lean()
//         .exec((error, order) => {
//             if (error) return res.status(400).json({ error });
//             if (order) {
//                 user: req.user._id,
//                     Address.findOne({
//                         user: req.user._id,
//                     }).exec((error, address) => {
//                         if (error) return res.status(400).json({ error });
//                         order.address = address.address.find(
//                             (adr) => adr._id.toString() == order.addressId.toString()
//                         );
//                         res.status(200).json({
//                             order,
//                         });
//                     });
//             }
//         });
// };

/**
 * Find order
 * @params{String} id - The order id
 */
exports.findOrder = async (req, res) => {

    if (req.params.id) {
        const id = req.params.id;
        try {
            const response = await findOrder.findById(id);
            res.send(response);
        } catch (err) {
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation"
            })
        }
    } else {
        try {
            const response = await findOrder.find();
            res.send(response);
        } catch (err) {
            res.status(500).send({
                message: err.message || "Error Occurred while retriving product information"
            })
        }
    }
};

/**
 * Delete order
 * @params{String} id - The order id
 */
exports.deleteOrder = async (req, res) => {
    //res.json({ message: 'deleteorder' })
    try {
        //Find product by id
        let findorder = await findOrder.findById(req.params.id);
        //Delete product from db
        await findorder.remove();
        res.json(findorder);
    } catch (err) {
        console.log(err);
    }

};