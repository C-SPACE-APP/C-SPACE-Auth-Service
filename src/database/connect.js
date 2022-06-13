require('dotenv').config()

module.exports = async (database) => {
    try {
        await database.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.URL}${process.env.QUERY}`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        console.log(`Connected to Database`);
    } catch(err) {
        console.log(`Error connecting to Database: ${err}`);
    }
}