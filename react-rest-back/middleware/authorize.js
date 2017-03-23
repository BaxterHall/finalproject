const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
	let token = req.body.token || req.params.token || req.headers['authorization'];
    // console.log('were in the middleware or something')
	// console.log(req.headers);
	if (token) {
		// console.log(token)
		jwt.verify(token,'usernamekey', function(error, decoded){
			if(error){
				return res.status(403).json({success: false, message: "who the fuck do you think you are trying to get into this secured data?"});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({
			success: false,
			message: 'theres no goddamn token, you idiot.'
		});
	}
} 