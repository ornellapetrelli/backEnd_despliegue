export const getPingController = (req, res) => {
    try {
        if (!req.user) {
            throw new Error('User not authenticated');
        }
        console.log(req.user);
        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage('Success')
            .setPayload({
                message: 'Pong'
            })
            .build();

        res.status(200).json(response);
    } catch (error) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage('Internal server error')
            .setPayload({
                detail: error.message
            })
            .build();
        res.status(500).json(response);
    }
};
