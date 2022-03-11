    /*
* Test the /POST route Order Status
*/
    // describe('/POST OrderStatus', () => {
    //     it('it should POST a order Status ', (done) => {
    //         let status = {
    //             orderId: "622057bdabda9901ef8472fc",
    //             type: "packed"
    //         }
    //         chai.request(server)
    //             .post('/order/status')
    //             .send(status)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('message').eql('Status successfully added!');
    //                 res.body.book.should.have.property('orderId');
    //                 res.body.book.should.have.property('type');
    //                 done();
    //             });
    //     });

    // });