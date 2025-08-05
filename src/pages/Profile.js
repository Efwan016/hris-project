import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Profile = () => {
  const [show, setShow] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "efwan_dev",
    email: "efwan@example.com",
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Simulasi simpan (nanti bisa connect ke API)
    console.log("Data disimpan:", profileData);
    handleClose();
  };

  return (
    <div className="container mt-5">
      <h2>Profil Pengguna</h2>
      <p><strong>Username:</strong> {profileData.username}</p>
      <p><strong>Email:</strong> {profileData.email}</p>
      <Button variant="primary" onClick={handleShow}>
        Edit Profile
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                name="username"
                value={profileData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                value={profileData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Batal</Button>
          <Button variant="primary" onClick={handleSave}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
