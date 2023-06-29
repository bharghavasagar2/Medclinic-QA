const db = require('../db/db.js');

// Get all doctors
exports.getAllDoctors = (req, res) => {
  const query = 'SELECT * FROM doctors';
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving doctors from the database' });
    } else {
      res.json(rows);
    }
  });
};

// Get a doctor by ID
exports.getDoctorById = (req, res) => {
  const doctorId = req.params.id;
  const query = 'SELECT * FROM doctors WHERE doctor_id = ?';
  db.get(query, [doctorId], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving doctor from the database' });
    } else if (!row) {
      res.status(404).json({ error: 'Doctor not found' });
    } else {
      res.json(row);
    }
  });
};

// Create a new doctor
exports.createDoctor = (req, res) => {
  const { doctor_name, specialization, contact_number, email } = req.body;
  const query = 'INSERT INTO doctors (doctor_name, specialization, contact_number, email) VALUES (?, ?, ?, ?)';
  db.run(query, [doctor_name, specialization, contact_number, email], function (err) {
    if (err) {
      res.status(500).json({ error: 'Error creating doctor' });
    } else {
      res.json({ id: this.lastID });
    }
  });
};

// Update a doctor
exports.updateDoctor = (req, res) => {
  const doctorId = req.params.id;
  const { doctor_name, specialization, contact_number, email } = req.body;
  const query = 'UPDATE doctors SET doctor_name = ?, specialization = ?, contact_number = ?, email = ? WHERE doctor_id = ?';
  db.run(query, [doctor_name, specialization, contact_number, email, doctorId], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error updating doctor' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Doctor not found' });
    } else {
      res.sendStatus(200);
    }
  });
};

// Delete a doctor
exports.deleteDoctor = (req, res) => {
  const doctorId = req.params.id;
  const query = 'DELETE FROM doctors WHERE doctor_id = ?';
  db.run(query, [doctorId], (err) => {
    if (err) {
      res.status(500).json({ error: 'Error deleting doctor' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Doctor not found' });
    } else {
      res.sendStatus(204);
    }
  });
};