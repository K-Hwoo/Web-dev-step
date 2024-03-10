// const job = {
//   title: "Student",
//   location: "Seoul",
//   salary: 0,
// };

// console.log(job.grade);
// console.log(new Date().toISOString());

class Job {
  constructor(title, location, salary) {
    this.title = title;
    this.location = location;
    this.salary = salary;
  }

  describe() {
    console.log(
      `I'm a ${this.title}, I work in ${this.location} and I earn ${this.salary}.`
    );
  }
}

const developer = new Job("Developer", "New York", 50000);
const student = new Job("Student", "Seoul", 0);

console.log(developer);
console.log(student);

developer.describe();
