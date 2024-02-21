function updateClock() {
  const date = new Date();
  let hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  let session = "AM";

  if (hour == 0) {
    hour = 12;
  } else if (hour > 12) {
    hour -= 12;
    session = "PM";
  }

  hour = hour < 10 ? "0" + hour : hour;
  const formattedMinute = minute < 10 ? "0" + minute : minute;
  const formattedSecond = second < 10 ? "0" + second : second;

  const time = `${hour}:${formattedMinute}:${formattedSecond} ${session}`;

  const clockDisplay = document.getElementById("MyClockDisplay");
  clockDisplay.innerText = time;
  clockDisplay.textContent = time;
}

function startClock() {
  updateClock();

  setInterval(updateClock, 1000);
}

startClock();

const alarm = document.querySelector(".alarm");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");
let alarmTime;
let isAlarmSet;
const ringtone = new Audio("./files/ringtone.mp3");

function populateOptions(select, values) {
  values.forEach((value) => {
    let option = `<option value="${value}">${value}</option>`;
    select.firstElementChild.insertAdjacentHTML("afterend", option);
  });
}

populateOptions(
  selectMenu[0],
  Array.from({ length: 12 }, (_, i) => (i + 1 < 10 ? `0${i + 1}` : `${i + 1}`))
);
populateOptions(
  selectMenu[1],
  Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : `${i}`))
);
populateOptions(selectMenu[2], ["AM", "PM"]);

function getCurrentTime() {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let ampm = h >= 12 ? "PM" : "AM";
  h = h === 0 ? 12 : h > 12 ? h - 12 : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  return `${h}:${m} ${ampm}`;
}

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    alarm.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    isAlarmSet = false;
    return;
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    alert("Please, select a valid time to set Alarm!");
    return;
  }

  alarmTime = time;
  isAlarmSet = true;
  alarm.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";
}

function checkAlarm() {
  const currentTime = getCurrentTime();
  if (alarmTime && currentTime === alarmTime) {
    ringtone.play();
    ringtone.loop = true;
  }
}

setInterval(checkAlarm, 1000);
setAlarmBtn.addEventListener("click", setAlarm);
