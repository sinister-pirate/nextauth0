import React, { useEffect, useState } from 'react'
import foo from '@emmm/foo'
import Bar from '@emmm/bar'
import Button from '@emmm/bar/Button'
import 'bootstrap/dist/css/bootstrap.css'
import '../style/app.css'
export default () => {
  const [date, setDate] = useState(null)
  const [profile, setProfile] = useState({})
  useEffect(() => {
    async function getDate() {
      const res = await fetch('/api/date');
      const newDate = await res.json()
      console.log('>>>', newDate);
      setDate(newDate.date)
    }
    getDate()
  }, [])
  useEffect(_ => {
    async function getProfile() {
      const res = await fetch('/api/profile');
      const profile = await res.json()

      setProfile(profile)
    }
    getProfile()
  }, [])
  return (
    <div>s
      Imported moduless from another workspaces xxx:
      sasasa
      <div><a href='/api/login'>Login</a></div>
      <h3>{date}</h3>
      <div><a href='/api/logout'>Logout</a></div>
      <pre>{foo}</pre>
      <div className="profile">
        {profile.picture && <img src={profile.picture} className="avatar" alt="avatar" />}
        <pre>{profile && JSON.stringify(profile, null, 2)}</pre>
      </div>
      <Bar />
      <hr />
      <Button bsStyle="warning" onClick={_ => alert('boom')}>Tesst</Button>
    </div>
  )
}
