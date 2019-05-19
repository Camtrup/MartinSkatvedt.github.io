async function load(path) {
  const response = await fetch(path);
  let json = await response.json();
  return json;
}


load("./file.json")
.then (json => console.log(json))
.catch(err => console.error(err));
