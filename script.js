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
