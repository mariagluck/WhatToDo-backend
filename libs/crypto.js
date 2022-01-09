import bcrypt from "bcrypt";

/**
 * This function hashes the input string
 *
 * @param {string} password - to be hashed
 * @param {number} - number of salt rounds to make the hash more secure
 * @returns {Promise<string>} - the hashed password
 */
function hash(password) {
	return bcrypt.hash(password, 10);
}

/**
 * This function compares an incoming password to a hash saved in the database
 *
 * @param {string} incomingPassword - comes from login req.body
 * @param {string} savedHash - saved hash of that user
 * @returns {Promise<boolean>} true, if incoming password matches saved hash
 */

function compareHashes(incomingPassword, savedHash) {
	if (!incomingPassword) {
		return false;
	}
	return bcrypt.compare(incomingPassword, savedHash);
}

export { hash, compareHashes };
