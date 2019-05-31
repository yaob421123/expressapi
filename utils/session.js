module.exports = {
	setSession (req, id) {
		req.session.USER_ID = id;
	},
	isSession (req, id=null) {
		if (req.session.USER_ID) {
			return req.session.USER_ID;
		} else {
			return false;
		}
	}
}
