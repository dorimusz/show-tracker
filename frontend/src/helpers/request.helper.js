const prepareRequestBody = (title, comment) => {
    return {
        title: title,
        comment: comment,
    }
}

export { prepareRequestBody }