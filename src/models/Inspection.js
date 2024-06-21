export default class Inspection {
    constructor({ id, location, date, type, details }) {
      this.id = id;
      this.location = location;
      this.date = new Date(date);
      this.type = type;
      this.details = details;
    }
}