// const scrapeIt = require("scrape-it");
import axios from "axios";

function Scrape() {
  // ...

  axios
    .get("http://indeksonline.net")
    // Add the specific path you want to request here
    .then((response) => {
      console.log(response.data); // Handle the response data as needed
    })
    .catch((error) => {
      console.error(error);
    });
}

// Call fetchData() whenever you need to make a request

export default Scrape;

//   var xhr = new XMLHttpRequest();

//   xhr.open(
//     "GET",
//     "https://cors-anywhere.herokuapp.com/https://indeksonline.net/",
//     false
//   );

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4) {
//       document.write(xhr.responseText);
//     } else {
//       document.write("nope");
//     }
//   };

//   //   xhr.send();
// }
// export default Go;
