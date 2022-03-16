   /*
* Test the /GET route
*/
    // describe('/GET orders', () => {
    //     it('it should GET all the orders', (done) => {
    //         chai.request(server)
    //             .get('/orders')
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('array');
    //                 res.body.length.should.be.eql(0);
    //                 done();
    //             });
    //     });

/*
* Test the /GET/:id route
*/
    // describe('/GET/:id order', () => {
    //     it('it should GET a product by the given id', (done) => {
    //         let order = new Orders({
    //             id: "62218e0b8e5d0a3d7ac1fa7a",
    //             user: "622074253e4c49007c6fdea1",
    //             addressId: "622074e8ea7975d304cdf081",
    //             totalAmount: "5000",
    //             items: [
    //                 {
    //                     productId: "621dcbe59b37e671485a9914",
    //                     payablePrice: "5000",
    //                     purchasedQty: 5,
    //                     id: "62218e0b8e5d0a3d7ac1fa7b"
    //                 }
    //             ],


    //         });
    //         order.save((err, order) => {
    //             chai.request(server)
    //                 .get('/order/' + order.id)
    //                 .send(order)
    //                 .end((err, res) => {
    //                     res.should.have.status(200);
    //                     res.body.should.be.a('object');
    //                     res.body.should.have.property('user');
    //                     res.body.should.have.property('addressId');
    //                     res.body.should.have.property('totalAmount');
    //                     res.body.should.have.property('items');
    //                     res.body.should.have.property('id').eql(order.id);
    //                     done();
    //                 });
    //         });

    //     });
    // });

// });
