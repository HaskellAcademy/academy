const {createRecord} = require('../model');

const UserRecord = createRecord({
}, (constants) => ({
  // Fields that are undefined are REQUIRED to be sent from the API
  id: undefined,
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  dateJoined: undefined,
  photo: undefined,
  phone: undefined,
  about: undefined,
  jobTitle: undefined,
  department: undefined,
  company: undefined,
  homeOffice: undefined,
  office: undefined,
  manager: undefined,
}));

class User extends UserRecord {
}

module.exports = User;
