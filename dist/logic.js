class Logic {
    constructor() {
        this.data = []
    }

    fetchTeam(teamName) {
        return $.get(`/teams/${teamName}`).then(d => this.data = d)
    }
    playerStats(firstAndLast) {
        return $.get(`playerStats/${firstAndLast}`)
    }
    dreamTeam() {
        return $.get(`/dreamTeam`)
    }
    addPlayerTodreamTeam(newPlayerAdded) {
        return $.post(`/roster`, newPlayerAdded)
    }
    deletePlayerFromdreamTeam(RemovePlayer) {
        return $.ajax({
            method: "DELETE",
            url: `/removeFromDreamTeam`,
            data: RemovePlayer,
            success: (player) => {
                this.data.player = player
            },
            error: function (xhr, text, error) {
                console.log(text)
            }
        })

    }
}