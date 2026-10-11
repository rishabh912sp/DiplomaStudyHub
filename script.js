/* =====================================================
   DIPLOMA STUDY HUB - JAVASCRIPT
   ===================================================== */


/* ================= SUBJECT TOPICS ================= */

var subjectTopics = {

    "Engineering Graphics": [
        "Lines and Angles",
        "Geometrical Constructions",
        "Orthographic Projection",
        "Isometric Projection",
        "Engineering Curves"
    ],

    "Engineering Mathematics": [
        "Matrices",
        "Determinants",
        "Trigonometry",
        "Partial Fractions",
        "Differentiation"
    ],

    "Programming": [
        "Variables",
        "Data Types",
        "Operators",
        "Conditional Statements",
        "Loops",
        "Arrays",
        "Functions",
        "Algorithms"
    ],

    "Web Development": [
        "HTML Tags",
        "HTML Forms",
        "HTML Tables",
        "CSS Properties",
        "CSS Layout",
        "Basic JavaScript"
    ],

    "Basic Electrical Engineering": [
        "Basic Electrical Quantities",
        "Ohm's Law",
        "Kirchhoff's Laws",
        "Series and Parallel Circuits",
        "AC and DC"
    ],

    "Applied Science": [
        "Units and Measurements",
        "Properties of Matter",
        "Heat and Temperature",
        "Basic Physics",
        "Basic Chemistry"
    ],

    "Communication Skills": [
        "Communication Process",
        "Types of Communication",
        "Non-Verbal Communication",
        "Presentation Skills",
        "Group Discussion"
    ],

    "Engineering Basics": [
        "Introduction to Engineering",
        "Engineering Materials",
        "Safety Basics",
        "Engineering Applications",
        "Problem Solving"
    ]

};


/* =====================================================
   SUBJECT TOPICS MODAL
   ===================================================== */

function openTopics(subjectName) {

    var modal = document.getElementById("topicsModal");

    var title = document.getElementById("modalTitle");

    var list = document.getElementById("modalTopics");


    title.textContent = subjectName;

    list.innerHTML = "";


    var topics = subjectTopics[subjectName];


    for (var i = 0; i < topics.length; i++) {

        var listItem = document.createElement("li");

        listItem.textContent = topics[i];

        list.appendChild(listItem);

    }


    modal.style.display = "block";
}


/* CLOSE MODAL */

function closeTopics() {

    document.getElementById("topicsModal").style.display = "none";

}


/* CLOSE MODAL WHEN CLICKING OUTSIDE */

window.onclick = function(event) {

    var modal = document.getElementById("topicsModal");

    if (event.target === modal) {

        modal.style.display = "none";

    }

};


/* =====================================================
   CHECKLIST
   ===================================================== */

function loadChecklist() {

    var subjectSelect = document.getElementById("subjectSelect");

    var currentSubject = subjectSelect.value;

    var title = document.getElementById("checklistTitle");

    var checklist = document.getElementById("checklistItems");


    title.textContent = currentSubject;

    checklist.innerHTML = "";


    var topics = subjectTopics[currentSubject];


    /*
        Get saved checklist data from localStorage.
    */

    var savedData = localStorage.getItem(
        "checklist_" + currentSubject
    );


    var completedTopics = [];


    if (savedData) {

        completedTopics = JSON.parse(savedData);

    }


    /*
        Create checkbox for every topic.
    */

    for (var i = 0; i < topics.length; i++) {

        var topic = topics[i];


        var container = document.createElement("div");

        container.className = "check-item";


        var checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.id = "topic_" + i;


        /*
            Check whether this topic was previously completed.
        */

        checkbox.checked =
            completedTopics.indexOf(topic) !== -1;


        var label = document.createElement("label");

        label.htmlFor = "topic_" + i;

        label.textContent = topic;


        /*
            Save the checklist whenever the checkbox changes.
        */

        checkbox.addEventListener(
            "change",
            function() {

                saveChecklist(currentSubject);

            }
        );


        container.appendChild(checkbox);

        container.appendChild(label);

        checklist.appendChild(container);

    }


    updateProgress();

}


/* =====================================================
   SAVE CHECKLIST
   ===================================================== */

function saveChecklist(subject) {

    var checkboxes = document.querySelectorAll(
        "#checklistItems input[type='checkbox']"
    );


    var topics = subjectTopics[subject];

    var completedTopics = [];


    for (var i = 0; i < checkboxes.length; i++) {

        if (checkboxes[i].checked) {

            completedTopics.push(topics[i]);

        }

    }


    /*
        Save completed topics to browser localStorage.
    */

    localStorage.setItem(
        "checklist_" + subject,
        JSON.stringify(completedTopics)
    );


    updateProgress();

}


/* =====================================================
   UPDATE PROGRESS TEXT
   ===================================================== */

function updateProgress() {

    var checkboxes = document.querySelectorAll(
        "#checklistItems input[type='checkbox']"
    );


    var completed = 0;


    for (var i = 0; i < checkboxes.length; i++) {

        if (checkboxes[i].checked) {

            completed++;

        }

    }


    var total = checkboxes.length;

    var percentage = 0;


    if (total > 0) {

        percentage = Math.round(
            (completed / total) * 100
        );

    }


    document.getElementById("progressText").textContent =
        completed +
        " of " +
        total +
        " topics completed (" +
        percentage +
        "%)";

}


/* =====================================================
   CLEAR CURRENT SUBJECT CHECKLIST
   ===================================================== */

function clearChecklist() {

    var subject =
        document.getElementById("subjectSelect").value;


    var confirmClear = confirm(
        "Are you sure you want to clear this checklist?"
    );


    if (confirmClear) {

        localStorage.removeItem(
            "checklist_" + subject
        );


        loadChecklist();

    }

}


/* =====================================================
   STUDY TIP
   ===================================================== */

function showTip() {

    var tips = [

        "Study for a short time every day instead of studying everything at the last moment.",

        "Make small notes while studying important topics.",

        "Practice diagrams and numerical problems regularly.",

        "Revise what you studied before starting a new topic.",

        "Take short breaks while studying to stay focused.",

        "Try to complete at least one small topic every day."

    ];


    var randomNumber = Math.floor(
        Math.random() * tips.length
    );


    document.getElementById("tip").textContent =
        tips[randomNumber];

}


/* =====================================================
   CONTACT FORM
   ===================================================== */

document.getElementById("contactForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        alert(
            "Thank you for your feedback!"
        );


        this.reset();

    }
);


/* =====================================================
   LOAD CHECKLIST WHEN PAGE OPENS
   ===================================================== */

window.addEventListener(
    "load",
    function() {

        loadChecklist();

    }
);