module.exports = {
  port: process.env.PORT || 3001,
  dbConfig: process.env.DATABASE || {
    user: "root",
    host: "localhost",
    password: "root",
    database: "tododb"
  },
};
