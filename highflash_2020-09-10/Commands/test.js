const randomPuppy = require("random-puppy");

const subReddits = ["pic", "analog"];
const random = subReddits[Math.floor(Math.random() * subReddits.length)];  

const imgaddr = async function(a, b) {
       randomPuppy(random).then(url => {
       console.log(url);
      });
}; // закрывай скобку!
imgaddr();
