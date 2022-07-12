const prepareRemoveShowBody = (showid) => {
    return {
        showId: showid,
        isIgnored: true,
    }
}

export { prepareRemoveShowBody }