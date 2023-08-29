const chai = require("chai");
const chaiHttp = require("chai-http");
const fs = require("fs");
const app = require("../index");

chai.use(chaiHttp);
const expect = chai.expect;

describe("CRUD de animes", () => {
  it("Debería devolver un mensaje de bienvenida", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal("¡Bienvenidos a nuestros tests!");
        done();
      });
  });
});
