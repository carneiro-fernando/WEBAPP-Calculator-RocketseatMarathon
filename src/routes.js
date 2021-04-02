const express = require("express");
const routes = express.Router()
const views = __dirname + "/views/"

//constantes
var createdAt = Date.now()

const profile = {
    name: "Fernando Carneiro    ",
    avatar: "https://github.com/carneiro-fernando.png",
    "monthly-budget": 3000,
    "days-per-week": 3,
    "hours-per-day": 8,
    "vacation-per-year": 4
}

//constante que recebe array de jobs
const jobs = [
    {
        name: "Pizzaria idiota",
        "daily-hours": 2,
        "total-hours": 60,
        createdAt:Date.now()
    },
    {
        name: "Project otario",
        "daily-hours": 4,
        "total-hours": 47,
        createdAt:Date.now()
    }
]

//Rotas GET
routes.get('/', (req, res) => res.render(views + "index", {jobs}))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))

//Rotas POST
routes.post('/job', (req, res) => {

    const jobId = + jobs.length

    //empurrando dados da requisição para a constante. (Jobs.push(req.body + createdAt) - A maneira que pensei em fazer)
    jobs.push({
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        createdAt:Date.now()
    })
    console.log(createdAt)
    //retornando os dados para a página inicial
    return res.redirect('/')

})


module.exports = routes;