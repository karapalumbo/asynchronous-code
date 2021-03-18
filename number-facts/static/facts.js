const BASE_URL = "http://numbersapi.com";
const numRes = document.getElementById("num-facts");

async function processForm(evt) {
  evt.preventDefault();

  const req = await axios.get(`${BASE_URL}/11..14?json`).then((res) => {
    return res.data;
  });

  const res = await axios.post("/api/get-fave-num", {
    data: JSON.stringify(req),
  });

  handleResponse(res);
}

function handleResponse(resp) {
  for (let num of Object.values(resp.data)) {
    let p = document.createElement("P");
    p.innerHTML = `<p>${num}</p>`;
    numRes.append(p);
  }
}

$("#num-form").on("submit", processForm);
