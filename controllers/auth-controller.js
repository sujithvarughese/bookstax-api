import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const authenticateUser = async (req, res) => {
	const { email, password, mode } = req.body
	try {
		const response = await axios.post(
			`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${process.env.FB_API_KEY}`,
			{ email, password, returnSecureToken: true }
		)
		const { kind, idToken, refreshToken, expiresIn, localId } = response.data
		console.log(response.data)
		res.status(200).json({ token: idToken })

	} catch (error) {
		throw new Error(error)
	}
}

const authenticateAsGuest = async (req, res) => {
	const email = process.env.GUEST_EMAIL
	const password = process.env.GUEST_PASSWORD
	console.log(password)
	try {
		const response = await axios.post(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FB_API_KEY}`,
			{ email, password, returnSecureToken: true }
		)
		const { kind, idToken, refreshToken, expiresIn, localId } = response.data
		console.log(response.data)
		console.log(idToken)
		res.status(200).json({ token: idToken })
	} catch (error) {
		throw new Error(error)
	}
}

const connectDB = async (req, res) => {
	const dbRef = ref(getDatabase())
	console.log("...working")
	try {
		const usersSnapshot = await get(child(dbRef, "users"))
		res.status(200).json({ usersSnapshot })
	} catch (error) {
	}
}


export { authenticateUser, authenticateAsGuest, connectDB }