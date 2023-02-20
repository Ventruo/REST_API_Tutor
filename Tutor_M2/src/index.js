const express = require("express");
const app = express();
const port = 3000;
const userRouter = require('./routes/user');
const w2Database = require('./databases/w2Connection')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRouter)

const initApp = async () => { 
    console.log("Testing database connection");
    try {
        await w2Database.authenticate();
        console.log("Successfully connected!");
        app.listen(port, () =>
            console.log(`App listening on port ${port}!`)
        );
    } catch (error) {
        console.error("Failure database connection : ", error.original);
    }
 }

 initApp()
