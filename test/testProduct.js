const chai = require("chai");
const chaihttp = require("chai-http");
const { response } = require("../server");
const server = require("../server");


chai.should();
chai.use(chaihttp);

describe("Product Api", () => {
    //Test Get
    describe("GET All Products", () => {
        it("It should return all products", (done) => {
            chai.request(server)
                .get("/products")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name');
                    response.body.should.have.property('price');
                    response.body.should.have.property('description');
                    response.body.should.have.property('quantity');
                    response.body.should.have.property('image');
                    response.body.should.have.property('cloudinaryId');
                    done();
                })
        })
    })
})
