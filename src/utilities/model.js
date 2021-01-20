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
      throw new Error("You did not include an id, you nincompoop");
    }
    if (this.name === "articles") {
      const query = `SELECT 
      articles.id, 
      articles.headline, 
      articles.subhead, 
      articles.content, 
      articles.cover, 
      authors.id AS authors_id,
      authors.name AS author_name, 
      authors.lastname AS author_lastname, 
      authors.imgurl AS author_img,
      categoriesid AS categories_id,
      categories.name AS category,
      categories.img_url AS category_img
      FROM articles
      INNER JOIN authors ON articles.authorid=authors.id
      INNER JOIN categories ON articles.categoriesid=categories.id
       WHERE articles.id=${parseInt(id)}`;
      const response = await this.run(query);
      return response;
    } else {
      const query = `SELECT * FROM ${this.name} WHERE id=${parseInt(id)}`;
      const response = await this.run(query);
      return response;
    }
  }

  async findByIdAndUpdate(id, body) {
    if (!id) {
      throw new Error("id missing");
    }
    const entries = Object.entries(body);
    const query = `UPDATE ${this.name} SET ${entries.map(
      (entry) => `${entry[0]}='${entry[1]}'`
    )}  WHERE id=${parseInt(id)}`;
    const response = await this.run(query);
    return response;
  }

  async save(body) {
    if (!body) {
      throw new Error("article missing");
    }
    const entries = Object.entries(body);
    const query = `INSERT INTO ${this.name} (${entries.map(
      (entry) => entry[0]
    )}) VALUES(${entries.map((entry) => `'${entry[1]}'`)})`;
    const response = await this.run(query);
    return response;
  }

  async findByIdAndDelete(id) {
    if (!id) {
      throw new Error("Hey you did not provided id!");
    }
    const query = `DELETE  FROM ${this.name} WHERE id=${parseInt(id)}`;
    const response = await this.run(query);
    return response;
  }

  async findOne(fields) {
    if (!fields || Object.values(fields).length === 0) {
      const query = `SELECT * FROM ${this.name}`;
      const response = await this.run(query);
      return response;
    } else {
      const entries = Object.entries(fields);
      const whereClause = `${entries
        .map(([key, value]) => `${key}='${value}'`)
        .join(" AND ")}`;
      const query = `SELECT * FROM ${this.name} WHERE  ${whereClause};`;
      const response = await this.run(query);
      return response;
    }
  }
}

module.exports = Model;