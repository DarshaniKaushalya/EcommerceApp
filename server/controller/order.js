const { json } = require("express/lib/response");
const newOrder = require("../model/orderModel");
const Order = require("../../TestFiles/cartModel");
const findOrder = require('../model/orderModel');
const nodemailer = require("nodemailer");

/**
 * Add orders updation
 */
exports.addOrder = async (req, res) => {
    try {
        await newOrder.deleteOne({ user: req.user._id }).exec((error, result) => {
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

                        const totalAmount = order.totalAmount;
                        const items = order.items;

                        res.status(201).json({ order });

                        //order summary
                        const transport = nodemailer.createTransport({
                            host: process.env.MAIL_HOST,
                            port: process.env.MAIL_PORT,
                            auth: {
                                user: process.env.MAIL_USER,
                                pass: process.env.MAIL_PASS
                            }
                        })


                        const itemsContent = getItemsDetails(items);

                        transport.sendMail({
                            from: process.env.MAIL_FROM,
                            to: "darshani@gapstars.net",
                            subject: "Test Email",
                            html: `<div className = "email" style="
                                    border:1px soild black;
                                    padding:20px;
                                    font-family:sans-serif;
                                    line-height:2;
                                    font-size:20px;">

                                    <h2>Order Summary</h2>
                                    <p>Total Amount: ${totalAmount}</p>
                                    ${itemsContent}
                        
                                    <p><i>Thank you for your order!!!</i></p>
                                    </div>`
                        })

                        function getItemsDetails(items) {
                            // foreach loop
                            let finalContent = '';
                            items.forEach(item => {
                                finalContent += `
            <p>Item ID: ${item.productId}<br> Item payablePrice: ${item.payablePrice} <br> Item purchasedQty: ${item.purchasedQty}</p>
        `;
                            });

                            return finalContent;
                        }

                    }
                });
            }
        });
    }
    catch (err) {
        res.status(500).send({ err })
    }
};

/**
 * Get orders
 */
exports.getOrders = async (req, res) => {

    try {
        await newOrder.find({ user: req.user._id })
            .select("_id paymentStatus items")
            .populate("items.productId", "_id name image")
            .exec((error, orders) => {
                if (error) return res.status(400).json({ error });
                if (orders) {
                    res.status(200).json({ orders });
                }
            });
    }
    catch (err) {
        console.log(err);
    }

};

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