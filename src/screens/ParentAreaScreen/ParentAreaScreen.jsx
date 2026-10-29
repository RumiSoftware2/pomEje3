import { useState } from 'react'
import ParentGateScreen from '../ParentGateScreen/ParentGateScreen.jsx'
import ParentSettingsScreen from '../ParentSettingsScreen/ParentSettingsScreen.jsx'

function ParentAreaScreen() {
  const [approved, setApproved] = useState(false)
  return approved
    ? <ParentSettingsScreen />
    : <ParentGateScreen onApprove={() => setApproved(true)} />
}

export default ParentAreaScreen
