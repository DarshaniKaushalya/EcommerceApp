const server = require("../server");
const chai = require("chai");
const chaihttp = require("chai-http");
const Address = require("../server/model/addressModel");

chai.should();
chai.use(chaihttp);


describe('OrderStatus', () => {

    it('it should Not POST order status:Check route', (done) => {
        chai.request(server)
            .post('/ord/status')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it('it should Not POST order status:The method passing something went wrong', (done) => {
        chai.request(server)
            .get('/ord/status')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

});
