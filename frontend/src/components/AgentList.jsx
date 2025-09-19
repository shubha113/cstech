import { useSelector } from 'react-redux'
import '../styles/Agent.css'

const AgentList = () => {
  const { agents, loading } = useSelector((state) => state.agent)

  if (loading) {
    return (
      <div className="dashboard-card">
        <div className="loading">Loading agents...</div>
      </div>
    )
  }

  return (
    <div className="dashboard-card">
      <h2 className="card-title">All Agents ({agents.length})</h2>
      
      {agents.length === 0 ? (
        <div className="no-agents">
          No agents found. Create your first agent above.
        </div>
      ) : (
        <div className="agents-table">
          <table className="agents-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent._id}>
                  <td>{agent.name}</td>
                  <td>{agent.email}</td>
                  <td>{agent.mobile}</td>
                  <td>{new Date(agent.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AgentList