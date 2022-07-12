const prepareShowBody = (showid, show, episodes) => {
    return {
        showId: showid,
        name: show.name,
        genres: show.genres,
        status: show.status,
        runtime: show.runtime,
        network: show.network.name,
        image: show.image.medium,
        rating: show.rating.average,
        seasons: episodes.map(episode => mapEpisode(episode))
    }
}
const mapEpisode = (episode) => {
    return {
        name: episode.name,
        season: episode.season,
        epNumber: episode.number,
        airdate: episode.airdate,
    }
}

export { prepareShowBody }