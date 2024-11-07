export default class PersonServices {
  constructor() {
    this.arrPerson = [];
  }
  addNewPerson(newPerson) {
    this.arrPerson.push(newPerson);
  }

  delPerson(id) {
    let indexDel = this.arrPerson.findIndex((person) => {
      return person.id === id;
    });

    this.arrPerson.splice(indexDel, 1);
  }
  getDetail(id) {
    let personDetail = this.arrPerson.find((person) => {
      return person.id === id;
    });
    return personDetail;
  }
  updatePerson(person) {
    let indexUpdate = this.arrPerson.findIndex((item) => {
      return item.id === person.id;
    });

    this.arrPerson[indexUpdate] = person;
  }
}
