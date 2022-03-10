const server = require("../server");
const chai = require("chai");
const chaihttp = require("chai-http");
const Product = require("../server/model/productModel");

chai.should();
chai.use(chaihttp);


describe('Product', () => {
    /*
      * Test the /GET route
      */
    describe('/GET products', () => {
        it('it should GET all the products', (done) => {
            chai.request(server)
                .get('/products')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    // res.body.length.should.be.eql(2);
                    done();
                });
        });

        it('it should Not GET all the products', (done) => {
            chai.request(server)
                .get('/product')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    /*
    * Test the /GET/:id route
    */
    describe('/GET/:id product', () => {
        it('it should GET a product by the given id', (done) => {
            let product = new Product({
                id: "622a259a1b2b89a03d97ea45",
                name: "Frock",
                price: "5000",
                cloudinaryId: "dx5ibohuddsothkvnvuu",

            });
            product.save((err, product) => {
                chai.request(server)
                    .get('/products/' + product.id)
                    .send(product)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('price');
                        res.body.should.have.property('cloudinaryId');
                        res.body.should.have.property('id').eql(product.id);
                        done();
                    });
            });

        });
    });

});

/*
* Test the /POST route
*/
        // describe('/POST Product', () => {
        //     it('it should not POST a Product without pages field', (done) => {
        //         let product = {
        //             price: "4000"
        //         }
        //         chai.request(server)
        //             .post('/products')
        //             .send(product)
        //             .end((err, res) => {
        //                 res.should.have.status(200);
        //                 res.body.should.be.a('object');
        //                 res.body.should.have.property('errors');
        //                 res.body.errors.should.have.property('name');
        //                 res.body.errors.pages.should.have.property('kind').eql('required');
        //                 done();
        //             });
        //     });

        // });




// });

// describe('Product APIs', () => {

//     /**
//      * Test the /GET a route of Products
//      */
//     describe("Product GET route /products", () => {
//         it("It should return all tasks", (done) => {
//             chai.request(server)
//                 .get("/products")
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     response.body.should.be.a('array');
//                     response.body.length.should.not.be.eq(0);
//                     done();
//                 });
//         });

//     });

//     /*
//     * Test the /POST route of  Products
//     */
//     describe('/POST product', () => {
//         it('it should not POST a product without name and price', (done) => {
//             let product = {
//                 // _id: "62189a9be1cf385996681798",
//                 name: "Frock",
//                 price: "4000",
//                 image: "girl.png",
//                 // cloudinaryId: "stbnqs9yqfg4oj26cnef"
//             }
//             chai.request(server)
//                 .post('/products')
//                 .send(product)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     // res.body.should.have.property('_id').eq("62189a9be1cf385996681798");
//                     res.body.should.have.property('name').eq(Frock);
//                     res.body.errors.should.have.property('price').eq(4000);
//                     res.body.errors.should.have.property('image');
//                     // res.body.should.have.property('cloudinaryId').eq("stbnqs9yqfg4oj26cnef");

//                     done();
//                 });
//         });

//     });

//     //     //Start
//     //     // describe("Product API", () => {
//     //     //     //Test Get
//     //     //     describe("GET All Products", () => {
//     //     //         it("It should return all products", (done) => {
//     //     //             chai.request(server)
//     //     //                 .get("/products")
//     //     //                 .end((err, response) => {
//     //     //                     response.should.have.status(200);
//     //     //                     response.body.should.be.a('object');
//     //     //                     response.body.should.have.property('name');
//     //     //                     response.body.should.have.property('price');
//     //     //                     response.body.should.have.property('description');
//     //     //                     response.body.should.have.property('quantity');
//     //     //                     response.body.should.have.property('image');
//     //     //                     response.body.should.have.property('cloudinaryId');
//     //     //                     done();
//     //     //                 })
//     //     //         })
//     //     //     })
//     //     // });

//     //     // describe("Get /orders", () => {
//     //     //     it("It should get orders", (done) => {
//     //     //         chai.request(server)
//     //     //             .get("/orders")
//     //     //             .end((err, res) => {
//     //     //                 res.should.have.status(200)
//     //     //                 done();
//     //     //             });
//     //     //     });
//     //     //End

// });
