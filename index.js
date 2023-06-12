function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(array) {
  return array.map((element) => {
    return createEmployeeRecord(element);
  });
}

function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  });
  return this;
}

function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  });
  return this;
}

function hoursWorkedOnDate(dateStamp) {
  const timeIn = this.timeInEvents.find((element) => {
    return element.date === dateStamp;
  });

  const timeOut = this.timeOutEvents.find((element) => {
    return element.date === dateStamp;
  });

  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(dateStamp) {
  const hoursWorked = hoursWorkedOnDate.call(this, dateStamp);
  return hoursWorked * this.payPerHour;
}

function findEmployeeByFirstName(arrayOfEmployee, firstName) {
  return arrayOfEmployee.find((element) => {
    return element.firstName === firstName;
  });
}

function calculatePayroll(arrayOfEmployee) {
  const totalPayroll = arrayOfEmployee.reduce((total, employeeRecord) => {
    return total + allWagesFor.call(employeeRecord);
  }, 0);
  return totalPayroll;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
