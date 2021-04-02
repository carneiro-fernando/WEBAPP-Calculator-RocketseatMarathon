const { json } = require("express");
const express = require("express");
const routes = express.Router()
const views = __dirname + "/views/"

const Profile = {
    data: {
        name: "Fernando Carneiro    ",
        avatar: "https://github.com/carneiro-fernando.png",
        "monthly-budget": 3000,
        "days-per-week": 3,
        "hours-per-day": 8,
        "vacation-per-year": 4,
        "hours-value": 75
    },

    controllers: {
        index(req, res) {
            return res.render(views + "profile", { profile: Profile.data })
        },

        update(req,res) {
            //req.body para pegar os dados
            const data = req.body
            //Semanas no ano
            const weeksPerYear = 52
            //remover as férias do ano e pegar média de semanas no mês
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
            //total de horas trabalhadas na semana
            weekWorkedHours = data["hours-per-day"] * data["days-per-week"]
            //horas trabalhadas no mês
            const monthlyWorkedHours = weekWorkedHours * weeksPerMonth
            //valor da hora 
            const valueHour = data["monthly-budget"] / monthlyWorkedHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                avatar: Profile.data.avatar,
                "hours-value": valueHour
            }
            return res.redirect('/profile')
        }
    }
}


const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria ",
            "daily-hours": 2,
            "total-hours": 2,
            createdAt: Date.now()
        },
        {
            id: 2,
            name: "Project ",
            "daily-hours": 2,
            "total-hours": 10,
            createdAt: Date.now()
        }
    ],

    controllers: {
        index(req, res) {
            //Criação de array novo que adiciona campos ao array jobs
            const updatedJobs = Job.data.map((job) => {

                const remaining = Job.services.remainingDays(job);
                const newStatus = remaining <= 0 ? true : false;
                const status = newStatus;

                return {
                    ...job, //spread da array job 
                    remaining, //dias restantes
                    status, //status da job
                    budget: Profile.data["hours-value"] * job["total-hours"] //valor da hora
                }
            })
            return res.render(views + "index", { jobs: updatedJobs })
        },

        create(req, res) {
            return res.render(views + "job")
        },

        save(req, res) {

            //Criando identificardor do job
            const jobLast = Job.data.length - 1?.id || 1 //constante do tamanho do array job

            //empurrando dados da requisição para a constante. (Jobs.push(req.body + createdAt) - A maneira que pensei em fazer)
            Job.data.push({
                id: jobLast + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                createdAt: Date.now()
            })

            //retornando os dados para a página inicial
            return res.redirect('/')

        }
    },

    services: {
        remainingDays(job) {

            const createdDate = new Date(job.createdAt)
            const termlength = (job['total-hours'] / job['daily-hours']).toFixed()
            const deadline = createdDate.setDate(createdDate.getDate() + Number(termlength))
            const remainingDays = Math.floor((deadline - Date.now()) / (8.64 * Math.pow(10, 7)))

            return remainingDays
        }
    }
}

// Constantes
const createdAt = Date.now() //constante que define a data atual



//Rotas GET
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

//Rotas POST
routes.post('/job', Job.controllers.save)


module.exports = routes;