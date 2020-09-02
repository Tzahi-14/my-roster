const render = new Render
const logic = new Logic


$("#team-btn").on("click", function () {
    const inputTeamName = $("#team-input").val()
    logic.fetchTeam(inputTeamName).then((data) => { render.renderAll(data) })
})

$(".container").on("click", "#img", function () {
    const firstAndLast = $(this).closest("div").data().id
    const playerStatsDivId = render.getStatsDivId(firstAndLast)
    const getPlayer = document.getElementById(playerStatsDivId)
    if (!getPlayer) {
        logic.playerStats(firstAndLast).then((stats) => { render.renderStats(stats, this) }).catch((error) => {
            alert("This player doesn't have stats")
        })
    }
})
$("#dreamTeam-btn").on("click", function () {
    logic.dreamTeam().then((team) => { render.renderDreamTeam(team) })
})

$(".container").on("click", "#addPlayer-btn", function () {
    console.log("hello")
    const newPlayerAdded = $(this).closest("#player").data().player
    console.log(newPlayerAdded)
    const player = logic.data.find(p => p.personId == newPlayerAdded)
    logic.addPlayerTodreamTeam(player).then((newplayer) => { render.renderAddPlayerToDreamTeam(newplayer) })
})

$(".container").on("click", "#removePlayer-btn", function () {
    console.log("delete")
    const deletePlayer = $(this).closest("#player").data().player
    const playerToRemove = logic.data.find(p => p.personId == deletePlayer)
    logic.deletePlayerFromdreamTeam(playerToRemove).then((deletePlayer) => {
        render.renderDreamTeam(deletePlayer)
    })
})

