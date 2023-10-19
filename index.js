// Your code here
let employeeRecord

function createEmployeeRecord ([firstName, familyName, title, hourlyPay]){
    employeeRecord = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: hourlyPay,
        timeInEvents: [],
        timeOutEvents: []
    }

    return employeeRecord//=
}

function createEmployeeRecords(employeeRecords){
    return employeeRecords.map(createEmployeeRecord)
}

function createTimeInEvent(bpRecord, dateStamp) {
   
    const currentYear = dateStamp.slice(0, 4)
    const currentDay = dateStamp.slice(5, 7)
    const currentMonth = dateStamp.slice(8, 10)
    const currentHour = Number(dateStamp.slice(11, 15))

    let newTimeInEvent = {
        type: 'TimeIn',
        hour: currentHour,
        date: `${currentYear}-${currentDay}-${currentMonth}`
    }

    let timeInArea = bpRecord.timeInEvents //=

    timeInArea.push(newTimeInEvent)
    
    return bpRecord;
    }

function createTimeOutEvent(bpRecord, dateStamp) {
   
    const currentYear = dateStamp.slice(0, 4)
    const currentDay = dateStamp.slice(5, 7)
    const currentMonth = dateStamp.slice(8, 10)
    const currentHour = Number(dateStamp.slice(11, 15))

    let newTimeOutEvent = {
        type: 'TimeOut',
        hour: currentHour,
        date: `${currentYear}-${currentDay}-${currentMonth}`
    }

    let timeInArea = bpRecord.timeOutEvents

    timeInArea.push(newTimeOutEvent)
    
    return bpRecord;
}

function hoursWorkedOnDate (employeeRecord, date){

    let timeInHour = employeeRecord.timeInEvents.find((obj) => obj.date === date).hour; //=

    let timeOutHour = employeeRecord.timeOutEvents.find((obj) => obj.date === date).hour;//=

    if (timeOutHour && timeInHour) {
       let hoursWorked = (timeOutHour - timeInHour)
        return hoursWorked / 100;
    } return 0
}

function wagesEarnedOnDate (employeeRecord, date) {
    return Number(hoursWorkedOnDate(employeeRecord, date)) * Number(employeeRecord.payPerHour) //=
}

function allWagesFor(employee){
    let wages = []
    
    employee.timeInEvents.forEach(timeRecord => {
         
       let totalWage = wagesEarnedOnDate(employee, timeRecord.date)
       wages.push(totalWage) //=
    })
    return wages.reduce ((a ,b) => a +b ,0) //=
}

function calculatePayroll (employees) {
    let totalPayroll = [];
    let totalWages;

    employees.map(employee => {
        totalWages = allWagesFor(employee)
        totalPayroll.push(totalWages) //=
    })

    return Number(totalPayroll.reduce ((a ,b) => a +b ,0));
    
   
}
    
   
        


let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

let sTimeData = [
    ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
    ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
]

let rTimeData = [
    ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
    ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
]

sTimeData.forEach(function (d) {
    let [dIn, dOut] = d
    sRecord = createTimeInEvent(sRecord, dIn)
    sRecord = createTimeOutEvent(sRecord, dOut)
})

rTimeData.forEach(function (d, i) {
    let [dIn, dOut] = d
    rRecord = createTimeInEvent(rRecord, dIn)
    rRecord = createTimeOutEvent(rRecord, dOut)
})

let employees = [sRecord, rRecord]
let grandTotalOwed = employees.reduce((m, e) => m + allWagesFor(e), 0)


calculatePayroll(employees) //=