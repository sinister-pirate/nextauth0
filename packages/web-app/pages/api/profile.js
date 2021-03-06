import auth0 from '../../auth0';

export default async function profile(req, res) {
  try {
    await auth0.handleProfile(req, res);
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}