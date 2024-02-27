const subjects = ["Bangla", "English", "Physics", "Chemistry"];
const show = [];
for (let i = 0; i < subjects.length; i++) {
  if (i == subjects.length - 1) {
    show.push(subjects[i]);
  } else {
    show.push(subjects[i] + " |");
  }
}
console.log(show);
