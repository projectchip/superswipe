import { NextApiRequest, NextApiResponse } from "next";

const generateToken = () => {
	const tokenLength = 32; // Set the desired length of the token
	const expirationTime = 7 * 24 * 60 * 60 * 1000; // Set the expiration time (e.g., 7 days)

	const tokenCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let token = '';

	for (let i = 0; i < tokenLength; i++) {
		const randomIndex = Math.floor(Math.random() * tokenCharacters.length);
		token += tokenCharacters.charAt(randomIndex);
	}

	const expirationDate = new Date(Date.now() + expirationTime);
	return {
		token,
		expirationDate,
	};
};


const siteAccess = async (req: NextApiRequest, res: NextApiResponse) => {
	const {ACCESS_PW} = process.env;
	if (req.method !== 'POST') {
		res.status(400).json({message: 'invalid Reqeust Method'})
		return;
	}
	try {
		const {password} = req.body;
		if (password === ACCESS_PW) {
			const {token, expirationDate} = generateToken();
			const accessToken = {
				token: token,
				expiry: expirationDate
			}
			res.status(200).json(accessToken)
		} else {
			res.status(401).json({message: 'Invalid password, Please contact the site owner'})
		}
	} catch (err) {
		res.status(500).json({message: err})
	}
}

export default siteAccess;