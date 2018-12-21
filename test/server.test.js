// https://www.npmjs.com/package/chai
const chai = require('chai');
// http://www.chaijs.com/plugins/chai-http/
const chaiHttp = require('chai-http');

const {
    HTTP_STATUS_CODES
} = require('../app/config');
const {
    startServer,
    stopServer,
    app
} = require('../app/server.js');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Integration tests for: /', function() {
    before(function() {

        return startServer(true);
    });

    after(function() {

        return stopServer();
    });

    it('Should return index.html', function() {
        chai.request(app)
            .get('/')
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.html;
                expect(res.text).to.have.string('<!DOCTYPE html>');
            });
    });
});