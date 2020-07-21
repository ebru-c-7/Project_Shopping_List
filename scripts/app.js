$(document).ready(function () {
    var isValid = true;

  $("#button-add").click(function () {
    let productName = $("#header-action__name").val();
    let productQ = $("#header-action__quantity").val();
    let productCategory = $("#header-action__category select").val();

    validationHandler(productName, productQ, productCategory);
    if (!isValid) {
      return alert("Please enter valid data!");
    }

    let newRow = $("<tr></tr>");
    newRow.append('<td class="row-checkbox"><input type="checkbox" /></td>');
    newRow.append('<td class="row-category">' + productCategory + "</td>");
    newRow.append('<td class="row-product">' + productName + "</td>");
    newRow.append(
      '<td class="row-quantity"><input type="number" disabled value="' +
        productQ +
        '" /></td>'
    );
    newRow.append(
      '<td class="row-edit"><i class="fa fa-thumbs-down" aria-hidden="true"></i><i class="fa fa-pencil" aria-hidden="true"></i></td>'
    );
    $("tbody").append(newRow);
    empty();

    $(".fa-thumbs-down").click(function () {
      $(this).parent().parent().remove();
    });

    $(".fa-pencil").click(function () {
      let productName = $(this).parent().parent().find(".row-product").text();
      let productQ = $(this)
        .parent()
        .parent()
        .find(".row-quantity input")
        .val();
      let productCategory = $(this)
        .parent()
        .parent()
        .find(".row-category")
        .text();

      $("#header-action__name").val(productName);
      $("#header-action__category select").val(productCategory);
      $("#header-action__quantity").val(productQ);

      $(this).parent().parent().remove();
    });
  });

  function validationHandler(name, q, category) {
    if (name.trim().length === 0) {
      isValid = false;
      return;
    }

    if (q > 9 || q < 1) {
      isValid = false;
      return;
    }

    if (category === null) {
      isValid = false;
      return;
    }

    isValid = true;
    return;
  }

  function empty() {
    $("#header-action__name").val("");
    $("#header-action__category select").val("Select a Category!");
    $("#header-action__quantity").val("1");
    return;
  }
  var categoriesLength = 5;
  $("#header-action__button-category").click(function(){
    $("#new-category-container").slideDown();
    var categories = $("select option");
    if(categories.length>categoriesLength) {
      for(let i = categoriesLength; i<categories.length; i++) {
        let store = $("<li></li>").text(categories[i].text);
        $("#new-category-container ul").append(store);
      }
      categoriesLength = categories.length;
    }
   
  });

  $("#new-category-container__cancelbtn").click(function(){
    $("#new-category-container input").val("");
    $("#new-category-container").slideUp();
  });

  $("#new-category-container__confirmbtn").click(function(){
    var newCategory = $("#new-category-container input").val();
    $("#header-action__category select").append("<option>"+newCategory+"</option>");
    $("#new-category-container input").val("");
    $("#new-category-container").slideUp();
  });

  $("#search").on("keyup", function(){
    var value= $(this).val().toLowerCase();
    $("table tbody tr").filter(function(){
      $(this).toggle($(this).text().toLowerCase().indexOf(value)>-1);
    });
  });

});
