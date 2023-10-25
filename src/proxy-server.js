// const express = require("express");
// const axios = require("axios");

// const app = express();
// const port = 3000; // You can use any available port

// app.use(express.json());

// // Define a route that will proxy requests to the target server
// app.get("/proxy", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://indeksonline.net" + req.query.url
//     );
//     res.json(response.data);
//   } catch (error) {
//     res
//       .status(error.response ? error.response.status : 500)
//       .json({ error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Proxy server is running on port ${port}`);
// });
