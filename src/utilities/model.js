/** @format */

const database = require("./database");

class Model {
    constructor(name) {
        this.name = name;
    }
    async run(query) {
        try {
            const response = await database.query(query);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async findById(id) {
        if (!id) {
            throw new Error("id missing");
        }
        const query = `SELECT * FROM ${this.name} WHERE id = ${parseInt(id)}`;
        const response = await this.run(query);
        return response;
    }

    async findByIdAndUpdate(id, body) {
        if (!id) {
            throw new Error("id missing");
        }
        const entries = Object.entries(body);
        const query = `UPDATE ${this.name} SET ${entries.map(
            (entry) => `${entry[0]}='${entry[1]}'`
        )}  WHERE id=${parseInt(id)}`;
        const response = await this.run(query)
        return response;
    }

    async save(body) {
        if (!body) {
            throw new Error("article missing");
        }
        const entries = Object.entries(body)
        const query = `INSERT INTO ${this.name} (${entries.map(
            (entry) => entry[0]
        )}) VALUES(${entries.map((entry) => `'${entry[1]}'`)})`
        const response = await this.run(query)
        return response;
    }
}

module.exports = Model;
