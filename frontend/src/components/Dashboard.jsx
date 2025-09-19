import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/authSlice'
import { getAllAgents } from '../redux/agentSlice'
import { getDistributedLists } from '../redux/listSlice'
import AgentForm from './AgentForm'
import AgentList from './AgentList'
import FileUpload from './FileUpload'
import DistributedLists from './DistributedLists'
import '../styles/Dashboard.css'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('agents')
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { agents } = useSelector((state) => state.agent)
  const { distributedLists } = useSelector((state) => state.list)

  useEffect(() => {
    dispatch(getAllAgents())
    dispatch(getDistributedLists())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'agents':
        return (
          <>
            <AgentForm />
            <AgentList />
          </>
        )
      case 'upload':
        return <FileUpload />
      case 'lists':
        return <DistributedLists />
      default:
        return null
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.name || user?.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-nav">
        <div className="nav-buttons">
          <button
            onClick={() => setActiveTab('agents')}
            className={`nav-btn ${activeTab === 'agents' ? 'active' : ''}`}
          >
            Manage Agents
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`nav-btn ${activeTab === 'upload' ? 'active' : ''}`}
          >
            Upload & Distribute
          </button>
          <button
            onClick={() => setActiveTab('lists')}
            className={`nav-btn ${activeTab === 'lists' ? 'active' : ''}`}
          >
            View Distributed Lists
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">{agents.length}</div>
            <div className="stat-label">Total Agents</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{distributedLists.length}</div>
            <div className="stat-label">Distributed Lists</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {distributedLists.reduce((total, list) => total + list.items.length, 0)}
            </div>
            <div className="stat-label">Total Items</div>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  )
}

export default Dashboard