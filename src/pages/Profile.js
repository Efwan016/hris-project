import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Card, Row, Col } from "react-bootstrap";

const Profile = () => {
  const [show, setShow] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    position: "",
    salary: 0,
    photo: `https://api.dicebear.com/6.x/adventurer/svg?seed=guest`,
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profileData")) || {};
    const auth = JSON.parse(localStorage.getItem("auth")) || {};
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    let userInfo = { username: auth.username, email: auth.email, ...savedProfile };
    const currentEmployee = employees.find(
      (emp) =>
        emp.name === userInfo.username || emp.email === userInfo.email
    );
    if (currentEmployee) {
      userInfo = { ...userInfo, ...currentEmployee };
    }

    const presentDays = attendance.filter(
      (att) =>
        att.userId === currentEmployee?.id && att.status === "present"
    ).length;

    // ⬇ Tambahan ini untuk default avatar kalau photo kosong
    if (!userInfo.photo) {
      userInfo.photo = `https://api.dicebear.com/6.x/adventurer/svg?seed=${userInfo.username || "guest"}`;
    }

    setAttendanceCount(presentDays);
    setProfileData(userInfo);
  }, []);


  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    const updatedEmployees = employees.map(emp => {
      if (emp.id === profileData.id) {
        return {
          ...emp,
          name: profileData.username,
          email: profileData.email,
          position: profileData.position,
          salary: profileData.salary,
          photo: profileData.photo,
        };
      }
      return emp;
    });

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    // Trigger event supaya Employees.js bisa reload data
    window.dispatchEvent(new Event("profileUpdated"));

    setShow(false);

    alert("Profile berhasil diperbarui!");
  };




  return (
    <div className="container mt-5">
      {/* Foto Profil */}
      <div className="container mt-5">
        <Row className="align-items-start">
          <Col md={4} className="text-center p-4 bg-white shadow rounded">
            <img
              src={profileData.photo}
              alt="Foto Profil"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #f1f1f1",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              }}
            />
            <h3 className="mt-3">{profileData.username}</h3>
            <p className="text-muted">{profileData.email}</p>
            <Button variant="primary" onClick={handleShow}>
              ✏️ Edit Profil
            </Button>
          </Col>

          {/* Kolom Kanan */}
          <Col md={8}>
            <Card className="mt-4 shadow-sm">
              <Card.Body>
                <Row>
                  <Col md={6} className="mb-3">
                    <div className="p-3 border rounded bg-light text-center">
                      <h6 className="text-muted">Gaji</h6>
                      <h4 className="text-success">
                        Rp {Number(profileData.salary || 0).toLocaleString()}
                      </h4>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="p-3 border rounded bg-light text-center">
                      <h6 className="text-muted">Kehadiran</h6>
                      <h4 className="text-primary">{attendanceCount} Hari</h4>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>


      {/* Modal Edit */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={profileData.username || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profileData.email || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPosition" className="mt-3">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={profileData.position || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formSalary" className="mt-3">
              <Form.Label>Gaji</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={profileData.salary || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Pilih Avatar</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {[
                  "guest",
                  "cat",
                  "dog",
                  "bear",
                  "fox",
                  "lion"
                ].map((seed) => (
                  <img
                    key={seed}
                    src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${seed}`}
                    alt={seed}
                    onClick={() =>
                      setProfileData({ ...profileData, photo: `https://api.dicebear.com/6.x/adventurer/svg?seed=${seed}` })
                    }
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      border: profileData.photo.includes(seed) ? "3px solid blue" : "2px solid #ccc"
                    }}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group controlId="formUpload" className="mt-3">
              <Form.Label>Upload Gambar</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setProfileData({ ...profileData, photo: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default Profile;
