export const notFound = async (req, res, next) => {
    console.log('not found path ', req.path);
    console.log('not found path ', req.originalUrl);
    return res.status(404).json({ message: `Not found: ${req.originalUrl}` })
}


export const errorHandler = async (err, req, res, next) => {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
}