import React, { useState } from 'react';
import { useEffect } from 'react';

export default function BasicCRUD() {
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [fruit, setFruit] = useState([]);
    const [name, setName] = useState('')
    const [color, setColor] = useState('')
    const [editname, seteditName] = useState('')
    const [editcolor, seteditColor] = useState('')
    const [editID, seteditID] = useState('')
    const api = 'http://localhost:8080/api/user'
    
    useEffect(() => {
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                setFruit(data);
            })
    }, [])

    async function handleSubmit(event) {
        event.preventDefault() //prevent refresh
        // e.preventDefault();
        await fetch(api, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                color: color
            })
        })
    }

    async function handleEdit(e) {
        e.preventDefault();

        await fetch(`${ api }/${editID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: editname,
                color: editcolor
            })
        })
    }

    async function handleDelete(id) {
        await fetch(`${ api }/${id}`, {
          method: 'DELETE'
        })
    }
    function openEditModal(user) {
        setIsEditModalOpen(true);
        seteditName(user.name);
        seteditColor((user.color));
        seteditID(user.id);
    }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Fruit Management</h2>

      {/* 1. INSERT FORM */}
      <div className="card mb-4">
        <div className="card-header fw-bold">Add New Entry</div>
        <div className="card-body">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-5">
              <label className="form-label">Fruit Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter name"
                onChange={(e)=>setName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-5">
              <label className="form-label">Fruit Color</label>
              <input
                type="text"
                className="form-control"
                name="color"
                placeholder="Enter color"
                onChange={(e)=>setColor(e.target.value)}
                required
              />
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
                <th>Fruit Name</th>
                <th>Fruit Color</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
                {
                    fruit.map((fruits) => (
                        <tr>
                            <td>{ fruits.id}</td>
                            <td>{fruits.name}</td>
                            <td>{ fruits.color}</td>
                            <td className="text-center">
                            <button className="btn btn-sm btn-warning me-2" type='button' onClick={()=> openEditModal(fruits)}>
                                Edit
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(fruits.id)}>Delete</button>
                            </td>
                        </tr>      
                    ))             
                }
                  <tr>
                    <td>1</td>
                    <td>Hedrian</td>
                    <td>Instructor</td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-warning me-2" type='button' onClick={()=> openEditModal()}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
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
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsEditModalOpen(false)}
                  ></button>
                </div>
                <form onSubmit={handleEdit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={editname}
                        onChange={(e)=>seteditName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Role</label>
                      <input
                        type="text"
                        className="form-control"
                        name="role"
                        value={editcolor}
                        onChange={(e)=>seteditColor(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsEditModalOpen(false)}
                    >
                      Cancel
                    </button>
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
