const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "..", "data", "restaurant.json");
// 파일경로를 모든 함수에서 접근할 수 있도록

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants;
}

function storeRestaurant(restaurants) {
  fs.writeFileSync(filePath, JSON.stringify(restaurants));
}

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurant: storeRestaurant,
};
