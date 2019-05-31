const crypto = require('crypto');

module.exports = {
	/**
	 * @sha1加密模块 (加密固定,不可逆)
	 * @param str string 要加密的字符串
	 * @retrun string 加密后的字符串
	 * */
	getSha1 (str) {
		const sha1 = crypto.createHash("sha1");
    sha1.update(str);
    var res = sha1.digest("hex");  //加密后的值d
    return res;
	}
}
