const dbName = process.env.DB;

const username = process.env.ATLAS_USERNAME;

const pw = process.env.ATLAS_PASSWORD;

const uri = `mongodb+srv://${username}:${pw}mongodb+srv://chaker703_db_user:<db_password>@cluster0.8o4djz2.mongodb.net/?appName=Cluster0/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri)

    .then(() => console.log("Established a connection to the database"))

    .catch(err => console.log("Something went wrong when connecting to the database", err));