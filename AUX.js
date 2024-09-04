
const { MongoClient, ServerApiVersion } = require('mongodb');
// inaki
// anS)94pE_MVE@Kx
const uri = "mongodb+srv://inaki:anS)94pE_MVE@Kx@clusterdecontactos.r5jnh.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDeContactos";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




if (condicion1) {
  // Código a ejecutar si condicion1 es verdadera
} else if (condicion2) {
  // Código a ejecutar si condicion2 es verdadera
} else {
  // Código a ejecutar si ninguna condición anterior es verdadera
}
switch (expresion) {
  case valor1:
      // Código a ejecutar si expresion === valor1
      break;
  case valor2:
      // Código a ejecutar si expresion === valor2
      break;
  default:
      // Código a ejecutar si ninguna de las condiciones es verdadera
      break;
}
