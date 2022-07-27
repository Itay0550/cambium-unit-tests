const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = 'http://localhost:5000/';
chai.use(chaiHttp);


describe('Users Tests', () => {
    let userId = '', token = '';

    const user = {
        firstName: "itay",
        lastName: "turgeman",
        email: "test@cambium.com",
        password: "1234567"
    }

    //1 . create first test that create the user
    //2 . test that delete the user
    //3 . insert new test that create user with same email - we expect 404 error.
    //4 . login and get the token.
    //5 . add middleware "isAuth" and add it to delete route. now send the token to delete the user. 

    it("Add user", (done) => {
        chai.request(server)
            .post('api/users')
            .send(user)
            .end((err, response) => {
                expect(response.status).to.equal(200);
                expect(response).to.have.property('body');
                expect(response.body).to.have.property("_id");
                expect(response.body).to.have.property("firstName");
                expect(response.body).to.have.property("lastName");
                expect(response.body).to.have.property("email");
                expect(response.body).to.have.property("password");
                userId = response.body._id;
                done();
            });
    });

    it("Add user again expect to get 404", (done) => {
        chai.request(server)
            .post('api/users')
            .send(user)
            .end((err, response) => {
                expect(response.status).to.equal(404);
                expect(response).to.have.property('body');
                expect(response.body).to.have.property("err");
                done();
            });
    });

    it("Login", (done) => {
        chai.request(server)
            .post(`api/users/login`)
            .send({ email: user.email, password: user.password })
            .end((err, response) => {
                expect(response.status).to.equal(200);
                expect(response).to.have.property('body');
                expect(response.body).to.have.property("token");
                token = response.body.token;
                done();
            });
    })

    it("Delete user By Id(user create from first test) without token", (done) => {
        chai.request(server)
            .delete(`api/users/${userId}`)
            .end((err, response) => {
                expect(response.status).to.equal(404);
               
                done();
            });
    });

    it("Delete user By Id(user create from first test", (done) => {
        chai.request(server)
            .delete(`api/users/${userId}`)
            .set({ Authorization: token })
            .end((err, response) => {
                expect(response.status).to.equal(200);
                expect(response).to.have.property('body');
                expect(response.body).to.have.property("success");
                done();
            });
    });



})