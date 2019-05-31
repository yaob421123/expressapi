module.exports = {
	isPhoneNo (phone) {
	  var pattern = /^1[3456789]\d{9}$/;
	  return pattern.test(phone);
	}
}
