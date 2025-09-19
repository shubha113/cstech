import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDistributedLists } from "../redux/listSlice";
import "../styles/FileUpload.css";

const DistributedLists = () => {
  const dispatch = useDispatch();
  const { distributedLists, loading, error } = useSelector(
    (state) => state.list
  );

  useEffect(() => {
    dispatch(getDistributedLists());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="dashboard-card">
        <div className="loading">Loading distributed lists...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-card">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <h2 className="card-title">View Distributed Lists</h2>
      {distributedLists.length === 0 ? (
        <div className="no-lists">
          No lists have been distributed yet. Upload a file to get started.
        </div>
      ) : (
        <div className="distributed-lists">
          {distributedLists.map((list) => (
            <div key={list._id} className="list-card">
              <div className="list-header">
                <span className="agent-name-header">
                  {list.agentId.name || "N/A"}
                </span>
                <span className="items-count">
                  {list.items.length} Items
                </span>
              </div>
              <div className="list-items">
                <table className="list-table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Phone</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.firstName}</td>
                        <td>{item.phone}</td>
                        <td>{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DistributedLists;