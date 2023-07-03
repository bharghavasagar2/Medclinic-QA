const createDBTables = (db) => {
  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Patients'", (err, row) => {
    if (err) {
      console.error(err.message);
    } else if (!row) {
      db.run(`CREATE TABLE Patients (
        patient_id INTEGER PRIMARY KEY,
        patient_name TEXT,
        patient_age INTEGER,
        patient_gender TEXT,
        contact_number TEXT,
        address TEXT,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES AuthenticationUsers(user_id)
      )`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Patients table created.');
        }
      });
    }
  });

  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Doctors'", (err, row) => {
    if (err) {
      console.error(err.message);
    } else if (!row) {
      db.run(`CREATE TABLE Doctors (
        doctor_id INTEGER PRIMARY KEY,
        doctor_name TEXT,
        specialization TEXT,
        contact_number TEXT,
        email TEXT,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES AuthenticationUsers(user_id)
      )`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Doctors table created.');
        }
      });
    }
  });

  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Appointments'", (err, row) => {
    if (err) {
      console.error(err.message);
    } else if (!row) {
      db.run(`CREATE TABLE Appointments (
        appointment_id INTEGER PRIMARY KEY,
        patient_id INTEGER,
        doctor_id INTEGER,
        appointment_date TEXT,
        appointment_time TEXT,
        appointment_status TEXT,      
        FOREIGN KEY (patient_id) REFERENCES Patients(patient_id),
        FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id)
      )`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Appointments table created.');
        }
      });
    }
  });

  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Prescriptions'", (err, row) => {
    if (err) {
      console.error(err.message);
    } else if (!row) {
      db.run(`CREATE TABLE Prescriptions (
        prescription_id INTEGER PRIMARY KEY,
        patient_id INTEGER,
        doctor_id INTEGER,
        prescription_date TEXT,
        prescription_details TEXT,      
        FOREIGN KEY (patient_id) REFERENCES Patients(patient_id),
        FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id)
      )`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Prescriptions table created.');
        }
      });
    }
  });

  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Payments'", (err, row) => {
    if (err) {
      console.error(err.message);
    } else if (!row) {
      db.run(`CREATE TABLE Payments (
        payment_id INTEGER PRIMARY KEY,
        patient_id INTEGER,
        appointment_id INTEGER,
        payment_date TEXT,
        payment_amount REAL,
        payment_status TEXT,       
        FOREIGN KEY (patient_id) REFERENCES Patients(patient_id),
        FOREIGN KEY (appointment_id) REFERENCES Appointments(appointment_id)
      )`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Payments table created.');
        }
      });
    }
  });

  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='VideoConsultations'", (err, row) => {
    if (err) {
      console.error(err.message);
    } else if (!row) {
      db.run(`CREATE TABLE VideoConsultations (
        consultation_id INTEGER PRIMARY KEY,
        patient_id INTEGER,
        doctor_id INTEGER,
        consultation_date TEXT,
        consultation_duration TEXT,
        consultation_status TEXT,       
        FOREIGN KEY (patient_id) REFERENCES Patients(patient_id),
        FOREIGN KEY (doctor_id) REFERENCES Doctors(doctor_id)
      )`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('VideoConsultations table created.');
        }
      });
    }
  });

  //When adding a user we must need to link it with respective table

  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='AuthenticationUsers'", (err, row) => {
    if (err) {
      console.error(err.message);
    } else if (!row) {
      db.run(`CREATE TABLE AuthenticationUsers (
        user_id INTEGER PRIMARY KEY,
        username TEXT,
        password TEXT,
        role TEXT
      )`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('AuthenticationUsers table created.');
        }
      });
    }
  });
};

module.exports = { createDBTables };
