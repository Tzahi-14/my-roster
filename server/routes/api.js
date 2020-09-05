const express = require('express')
const router = express.Router()
const urllib = require('urllib')

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756",
}

let dreamTeam = []

router.get(`/teams/:teamName`, function (req, res) {
    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (err, playerData) {
        if (err) {
            console.log("error, try again")
            throw err
        }
        let playersArr = []
        let players = JSON.parse(playerData.toString()).league.standard
        let teamIds = teamToIDs[req.params.teamName]
        for (let player of players) {
            if (player.teamId === teamIds & player.isActive) {
                playersArr.push(player)
            }
        }
        res.send(playersArr)
    })
})
router.get(`/playerStats/:last/:first`, function (req, res) {
    let playerFirst = req.params.first
    let playerLast = req.params.last
    urllib.request(`https://nba-players.herokuapp.com/players-stats/${playerLast}/${playerFirst}`, function (err, playerStats) {

        try {
            res.send(JSON.parse(playerStats))
        }
        catch (err) {
            res.status(400).send({
                message: 'This is an error!'
            })
        }
    })
})

router.put('/team', function (req, res) {
    let team2 = req.body
    for (let i in team2) {
        teamToIDs[i] = team2[i]
    }
    res.send(teamToIDs)
})

router.get('/dreamTeam', function (req, res) {
    res.send(dreamTeam)
})

router.post('/roster', function (req, res) {
    let bodyReq = req.body
    if (!dreamTeam.find(a => a.personId === bodyReq.personId) && dreamTeam.length < 5) {
        dreamTeam.push(bodyReq)
    }
    res.send(dreamTeam)
})

router.delete('/removeFromDreamTeam', function (req, res) {
    let removePlayer = req.body
    console.log(removePlayer);
    let playerToremove = dreamTeam.findIndex(player => player.personId == removePlayer.personId)
    dreamTeam.splice(playerToremove, 1)
    console.log(playerToremove)
    res.send(dreamTeam)
})

module.exports = router
