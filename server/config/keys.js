
const productionUri = "mongodb://netninja:test1234@ds161764.mlab.com:61764/poem-spot";
const developmentUri = "mongodb://localhost:27017/poem-spot";

// use local database when you run `NODE_ENV=development npm start`
const mongoURI = (process.env.NODE_ENV === "development") ? developmentUri : productionUri;

console.log(`MongDB Connection URL: ${mongoURI}`);

module.exports = {
  mongoURI,
};
