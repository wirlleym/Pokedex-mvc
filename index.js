import express from "express";
import path from "path";
const __dirname = path.resolve(path.dirname(''));
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


//  <<Servidor>>
// Para rodar servidor >>> terminal: npm run dev

// const port = 3000 || "https://"
const port = process.env.PORT || 3000;

app.listen(port, () => {  // rota
  console.log(`Servidor rodando na porta ${port}`)
});

// app.listen(3000);


const pokedex = [
  {
    id: 1,
    name: "Mewtwo",
    type: "Psychic",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png",
    description: "Its DNA is almost the same as Mew’s. However, its size and disposition are vastly different.",
    height: "2,0 m",
    weight: "122,0 kg",
    category: "Genetic",
    abilities: "Pressure"
  },
  {
    id: 2,
    name: "Slaking",
    type: "Normal",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/289.png",
    description: "Slaking spends all day lying down and lolling about. It eats grass growing within its reach. If it eats all the grass it can reach, this Pokémon reluctantly moves to another spot.",
    height: "2,0 m",
    weight: "130,5 kg",
    category: "Lazy",
    abilities: "Truant"
  },
  {
    id: 3,
    name: "Dragonite",
    type: "Dragon",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/149.png",
    description: "It’s a kindhearted Pokémon. If it spots a drowning person or Pokémon, Dragonite simply must help them.",
    height: "2,2 m",
    weight: "210,0 kg",
    category: "Dragon",
    abilities: "Inner Focus"
  }
]


// app.get("/", function (req, res) { 
//   res.send("Hello World");  //Testando Servidor
// });  

app.get("/", (req, res) => {
  res.render("index", { pokedex });
});

app.get('/details/:id', (req,res) => {
	let id = +req.params.id;
	const element = pokedex.find(pokedex => pokedex.id === id)
	res.render ('detalhes', {element});
});

app.get('/cadastro', (req, res) => {
  res.render('cadastro');
})
  app.post("/cadastro", (req, res) => {
    let i = pokedex[pokedex.length - 1].id + 1
    const { name, type, image, description, height, weight, category, abilities } = req.body
    pokedex.push({ id: i, name, type, image, description, height, weight, category, abilities })
    console.log(pokedex)
    res.redirect("/")
  });