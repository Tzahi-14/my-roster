class Render {
    constructor() {

    }
    renderAll(data) {
        $(".container").empty()
        const source = $("#players-template").html()
        const template = Handlebars.compile(source)
        const newHtml = template({ data })
        $(".container").append(newHtml)
    }
    
    getStatsDivId (firstAndLast){
        return firstAndLast + "_stats"
    }
    renderStats(stats, player){
        const firstAndLast = $(player).closest("div").data().id
        const playerStatsDivId = this.getStatsDivId(firstAndLast)
        if(stats){
            $(player).parent().append(`<div id=${playerStatsDivId}> points per game :${stats.points_per_game}  assists_per_game :${stats.assists_per_game} rebounds_per_game: ${stats.rebounds_per_game}</div>`)
        }
        console.log(stats)
    }

    renderDreamTeam(team){
        $(".container").empty()
        this.renderAll(team)
      
    }
    renderAddPlayerToDreamTeam(playerdata){
        const newPlayerAdded = $(this).closest("#player").data().player
        if(playerdata.personId===newPlayerAdded){
            alert("player exist in dream team")
        }
        alert ("player added to dream team")
    }
}
