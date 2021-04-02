const BASE_URL = "http://numbersapi.com";
// const numRes = document.getElementById("num-facts");

async function getFavNum() {
  let res = await axios.get(`${BASE_URL}/11?json`);
  //   console.log(res.data);
}

getFavNum();

async function getMultNums() {
  let res = await axios.get(`${BASE_URL}/11..14?json`);
  //   console.log(res.data);
}

getMultNums();

async function fourFacts() {
  let res = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${BASE_URL}/11?json`))
  );
  res.forEach((data) => {
    $("body").append(`<p>${data.text}</p>`);
  });
}

fourFacts();
