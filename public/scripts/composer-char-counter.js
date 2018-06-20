$(document).ready(function () {
      $("#input-field").keyup(function () {
          let max = 140;
          let charNum = $(this).val().length;
          let counter = $(this).parent().find(".counter")
          if (charNum > max) {
            $(counter).css("color", "red")
            $(counter).html(max - charNum);
          } else {
            $(counter).css("color", "")
            $(counter).html(max - charNum);
          }
        })
      });