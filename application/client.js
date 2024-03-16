window.onload = function () {
  var getbutton = document.getElementById("get");
  var addbutton = document.getElementById("add");
  var updatebutton = document.getElementById("update");
  var deletebutton = document.getElementById("delete");

  if (getbutton) {
    getbutton.addEventListener("click", get);
  }
  if (addbutton) {
    addbutton.addEventListener("click", add);
  }
  if (updatebutton) {
    updatebutton.addEventListener("click", update);
  }
  if (deletebutton) {
    deletebutton.addEventListener("click", delet);
  }

  async function get() {
    const response = await post("/get", {});
    const body = await response.json();
    console.log(body);
    alert("output get to console");
  }

  // async function get() {
  //   const response = await post("/get", {})
  //     .then((res) => res.json())
  //     .then((rows) => rows);
  //   console.log(response);
  // }

  function add() {
    var addfirst = document.getElementById("addfirst");
    addfirst = addfirst.value;

    var addlast = document.getElementById("addlast");
    addlast = addlast.value;

    var addemail = document.getElementById("addemail");
    addemail = addemail.value;

    var addenrollment = document.getElementById("addenrollmentdate");
    addenrollment = addenrollment.value;

    post("/add", {
      first: addfirst,
      last: addlast,
      email: addemail,
      enrollment: addenrollment,
    });
    alert("add request sent");
  }

  function update() {
    var updateid = document.getElementById("updateid");
    updateid = updateid.value;

    var updateemail = document.getElementById("updateemail");
    updateemail = updateemail.value;

    post("/update", { id: updateid, email: updateemail });
    alert("update request sent");
  }

  function delet() {
    var deleteid = document.getElementById("deleteid");
    deleteid = deleteid.value;

    post("/delete", { id: deleteid });
    alert("delete request sent");
  }

  window.post = function (url, data) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  // ...
};
