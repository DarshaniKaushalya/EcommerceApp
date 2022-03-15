// const server = require("../server");
// const chai = require("chai");
// const chaihttp = require("chai-http");
// const Admin = require("../server/model/userModel");

// chai.should();
// chai.use(chaihttp);


// describe('Product', () => {
//     /*
//     * Test the /POST route
//     */
//     describe('/POST admin', () => {
//         it('it should not POST a admin without email', (done) => {
//             let admin = {
//                 firstName: "Darshani",
//                 lastName: "Kaushalya",
//                 email: "kau@gmail.com",
//                 password: "kau888",

//             }
//             chai.request(server)
//                 .post('/admin/signup')
//                 .send(admin)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property('firstName');
//                     res.body.should.have.property('lastName');
//                     res.body.should.have.property('email');
//                     res.body.should.have.property('password');

//                     done();
//                 });
//         });

//     });
// });
