import foo from '@emmm/foo'
import Bar from '@emmm/bar'
import Button from '@emmm/bar/Button'
import 'bootstrap/dist/css/bootstrap.css'
export default () => (
  <div>
    Imported moduless from another workspaces xxx:
    sasasa
    <pre>{foo}</pre>
    <Bar />
    <hr />
    <Button bsStyle="warning" onClick={_ => alert('boom')}>Test</Button>
  </div>
)
