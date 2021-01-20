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
      WHERE LOWER(articles.headline) LIKE LOWER('%sec%') 
      OR LOWER(articles.content) LIKE LOWER('%sec%')`;
      const response = await this.run(query);
      return response.rows;
    } else {
      const query = `SELECT * FROM ${this.name} WHERE id=${parseInt(id)}`;
      const response = await this.run(query);
      return response.rows;
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

  async findOne(search) {
    if (
      !search ||
      (Object.values(search).length === 0 && this.name !== "articles")
    ) {
      //BASIC GET ALL
      console.log("1");
      const query = `SELECT * FROM ${this.name}`;
      const response = await this.run(query);
      return response.rows;
    } else if (!search.query && this.name !== "articles") {
      console.log("2");
      const entries = Object.entries(search);
      const query = `SELECT * FROM ${this.name} WHERE ${entries
        .map((entry) => `${entry[0]}='${entry[1]}'`)
        .join(" AND ")}`;
      const response = await this.run(query);
      return response.rows;
    } else if (Object.values(search).length >= 1 && !search.query) {
      console.log("3");
      const entries = Object.entries(search);
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
      WHERE ${entries.map((entry) => `${entry[0]}='${entry[1]}'`).join(" AND ")}
      `;
      const response = await this.run(query);
      return response.rows;
    } else if (Object.values(search).length >= 1 && search.query) {
      console.log("4");
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
      WHERE LOWER(articles.headline) LIKE LOWER('%${search.query}%') 
      OR LOWER(articles.content) LIKE LOWER('%${search.query}%')
      `;
      const response = await this.run(query);
      return response.rows;
    } else {
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
      
      `;
      const response = await this.run(query);
      return response.rows;
    }
  }

  async countedCategories() {
    const query = `SELECT
    categories.id,
    categories.name,
    COUNT(articles.categoriesid) AS total_articles
    FROM categories
    INNER JOIN articles ON categories.id = articles.categoriesid
    GROUP BY (categories.id)`
    const response = await this.run(query);
    return response;
  }
}

module.exports = Model;