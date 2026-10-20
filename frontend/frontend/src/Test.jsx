import React, { useState, useEffect } from 'react';

export default function Test() {
    
    const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
  const [user, setUser] = useState([]);
  const [name, setName] = useState([]);
  const [role, setRole] = useState([]);
  const API_URL = 'http://localhost:8080/api/user';

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        role:role
      })
    })
  }

    function openEditModal() {
        setIsEditModalOpen(true);
    }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Management</h2>

      {/* 1. INSERT FORM */}
      <div className="card mb-4">
        <div className="card-header fw-bold">Add New Entry</div>
        <div className="card-body">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-5">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name="name" placeholder="Enter name" onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className="col-md-5">
              <label className="form-label">Email</label>
              <input type="text" className="form-control" name="email" placeholder="Enter role"  onChange={(e) => setRole(e.target.value)} required/>
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                Add Entry
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 2. DATA TABLE */}
      <div className="card">
        <div className="card-header fw-bold">Data List</div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                user.map((users) => (
                  <tr>
                    <td>{ users.id }</td>
                    <td>{ users.name }</td>
                    <td>{ users.role }</td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-warning me-2" type='button' onClick={()=> openEditModal()}>Edit</button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                ))
                }
                  
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. EDIT MODAL (React-controlled overlay) */}
      {isEditModalOpen && (
        <>
          {/* Modal Backdrop */}
          <div className="modal-backdrop fade show"></div>

          {/* Modal Content */}
          <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Entry</h5>
                  <button type="button" className="btn-close" onClick={() => setIsEditModalOpen(false)}></button>
                </div>
                <form>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" name="name" required/>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Role</label>
                      <input type="text" className="form-control" name="role" required/>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                    <button type="submit" className="btn btn-success">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};