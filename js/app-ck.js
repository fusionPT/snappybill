$(document).ready(function(){function n(){var e=0,t=Number($(".iva").val())/100,n=Number($(".irpf").val())/100,i,s;$("#invoice-table > tbody > tr.row").each(function(){var t=$(this).find("input.cantidad").val(),n=$(this).find("input.coste").val();price=+n*+t;$(this).find(".precio").text(price);$(this).find(".precio-hidden").val(price);e+=price});i=r(e*t);s=r(e*n);total=e+i+s;$(".subtotal").text(e);$(".totaliva").text(i);$(".totalirpf").text(s);$(".total").text(r(total));$(".subtotal-hidden").val(e);$(".totaliva-hidden").val(i);$(".totalirpf-hidden").val(s);$(".total-hidden").val(r(total))}function r(e){return Math.round(e*100)/100}$("#descargar").click(function(){row_html=$("tbody").html();$(".html-hidden").val(row_html);return!0});var e=1,t=$("#invoice-table > tbody > tr:first").clone();$(".add-row").on("click",function(n){e++;var r=t.clone();$("#invoice-table > tbody > tr.row:last").after(r);n.preventDefault()});$("#invoice-table").on("click",".delete-row",function(t){var r=$(this).closest("tr");if(e>1){e--;r.remove();n()}else alert("You can't delete the only row!");t.preventDefault()});$("#invoice-table").on("input",function(e){e.target.className!=="description"&&n();$("div input").each(function(){$(this).keyup(function(){$(this).attr("value",$(this).val())})})})});