const createApplication = require('express/lib/express');
const Order = require('../model/orderModel');


/**
  * Create Order  
  */
exports.create = async (req, res, next) => {

    Order.findOne({ user: req.user._id })
        .exec((error, order) => {
            if (error) return res.status(400).json({ error });
            if (order) {
                //if order already exists then update order by quatity

                const product = req.body.orderItems.product;
                const item = order.orderItems.find(or => or.product == product);

                if (item) {
                    Order.findOneAndUpdate({ "user": req.user._id, "orderItems.product": product }, {
                        "$set": {
                            "orderItems.$": {
                                ...req.body.orderItems,
                                quantity: item.quantity + req.body.orderItems.quantity
                            }
                        }
                    })
                        .exec((error, _order) => {
                            if (error) return res.status(400).json({ error });
                            if (_order) {
                                return res.status(201).json({ order: _order });
                            }
                        })

                }
                else {
                    Order.findOneAndUpdate({ user: req.user._id }, {
                        "$push": {
                            "orderItems": req.body.orderItems
                        }
                    })
                        .exec((error, _order) => {
                            if (error) return res.status(400).json({ error });
                            if (_order) {
                                return res.status(201).json({ order: _order });
                            }
                        })

                }



                //res.status(200).json({ message: order });
            } else {
                //if order not exists then create  a new order
                const order = new Order({
                    user: req.user._id,
                    orderItems: [req.body.orderItems]
                });

                order.save((error, order) => {
                    if (error) return res.status(400).json({ error });
                    if (order) {
                        return res.status(201).json({ order });
                    }
                });
            }
        });



    //res.json({ message: 'order' })
};

