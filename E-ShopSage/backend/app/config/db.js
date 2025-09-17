const sql = require("mysql2");
const sqlConnect = sql.createConnection({
    host: "localhost",
    user:"root",
    password: "matellio@123",
    database: "react_basic",
    multipleStatements: true
});
sqlConnect.connect((err) => { 
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    } else { 
        console.log("Connected to the database successfully!");
    }
})
module.exports = sqlConnect;