$("#addProduct").submit(function (event) {
    alert("Student Inserted Successfully");

})
//delete product
if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:5000/products/${id}`,
            "method": "DELETE"
        }
        if (confirm("Do You Really want to delete this student's record?")) {
            $.ajax(request).done(function (response) {
                alert("Student Deleted Successfully");
                location.reload()
            })
        }

    })
}