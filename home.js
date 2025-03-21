const inputbox = document.getElementById("entertextbox");
const listcontainer = document.getElementById("listcontainer");
const addButton = document.getElementById("addButton");

// הוספת מאזין לאירוע לחיצה על הכפתור
addButton.addEventListener("click", addtask);

function addtask() {
    // אם שדה הקלט ריק, הצג אזהרה
    if (inputbox.value === '') {
        alert("Enter a Task");
    } else {
        // יצירת אלמנט li חדש
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;  // הגדרת הטקסט של ה-li

        // יצירת כפתור מחיקה
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";  // הצגת סימן המחיקה '×'
        li.appendChild(span);

        // יצירת כפתור עריכה
        let spanEdit = document.createElement("span");  // יצירת כפתור עריכה בצורה נכונה
        spanEdit.innerHTML = "✎";  // הצגת סימן העריכה
        li.appendChild(spanEdit);  // הוספת כפתור עריכה ל-li

        // הוספת ה-li עם כפתורי מחיקה ועריכה לרשימה
        listcontainer.appendChild(li);

        // מאזין לאירוע לחיצה על אלמנטים בתיבת המשימות
        listcontainer.addEventListener("click", function(e) {
            if (e.target.tagName === "LI") {
                e.target.classList.toggle("check");
                savedata();
            } else if (e.target.tagName === "SPAN" && e.target.innerHTML === "\u00d7") {
                // אם לוחצים על כפתור המחיקה
                e.target.parentElement.remove();
                savedata();
            } else if (e.target.tagName === "SPAN" && e.target.innerHTML === "✎") {
                // אם לוחצים על כפתור העריכה
                inputbox.value = e.target.parentElement.firstChild.textContent;  // מעביר את הטקסט לשדה הקלט
                e.target.parentElement.remove();  // מוחק את המשימה הישנה מהרשימה
                savedata();
            }
        });

        // נקה את שדה הקלט אחרי הוספת משימה
        inputbox.value = "";
    }
}

function savedata() {
    localStorage.setItem("data", listcontainer.innerHTML);  // שומר את רשימת המשימות
}

function showtask() {
    listcontainer.innerHTML = localStorage.getItem("data");  // טוען את הרשימה מה-localStorage
}
showtask();
