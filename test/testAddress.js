const server = require("../server");
const chai = require("chai");
const chaihttp = require("chai-http");
const Address = require("../server/model/addressModel");

chai.should();
chai.use(chaihttp);


describe('Address', () => {
    /*
    * Test the /POST route for add address || invalied route
    */
    describe('/POST Address', () => {
        it('it should not POST a Address without correct route ', (done) => {

            chai.request(server)
                .post('/buyer/addres')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });

        });
        /*
        * Test the /POST route for add address || empty route
        */
        it('it should not POST a Address with empty route ', (done) => {

            chai.request(server)
                .post('')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });

        });
    });

});

