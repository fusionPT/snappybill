$(document).ready(function(){function t(){return w?!0:!1}function e(){$("#invoice-table tr.added_tax").remove()}function n(){C=1,$("#invoice").find("input[type=text], textarea").val(""),$("#invoice-title").val("Factura"),$("#invoice-date").val($("#invoice-date").attr("placeholder")),e(),$("#invoice-table .cantidad").val(0),$("#invoice-table .coste").val(0),$("#invoice-table tr.row:not(:first)").remove(),d()}function a(){var t=0,e=Object.keys(y.invoices);for(i in e)console.log(Math.round(e[i].replace("invoice",""))),Math.round(e[i].replace("invoice",""))>=t&&(t=Math.round(e[i].replace("invoice","")));return t}function o(t){$("#inv").val(t)}function c(t){C++,"undefined"==typeof t&&(t={coste:"0",cantidad:"0",description:""});var e="<tr class='row'><td class='article'><input class='description' type='text' name='description-value' size='40' placeholder='ej. Página web' value='{DESCRIPTION}'/><input class='hidden-description' type='hidden' value=''/></td><td><input class='cantidad' type='text' name='cost' placeholder='Cant.' size='2' value='{CANTIDAD}'/></td><td><input class='coste' type='text' name='qty' placeholder='Coste' size='2' value='{COSTE}'/></td><td class='value'><span class='precio'>0</span><input class='precio-hidden' type='hidden' name='price' value='0'/></td><td class='insert'><a class='delete-row' href='#'>Delete Row</a></td></tr>";e=e.replace("{COSTE}",t.coste.replace("'","\\'")),e=e.replace("{CANTIDAD}",t.cantidad.replace("'","\\'")),e=e.replace("{DESCRIPTION}",t.description.replace("'","\\'")),$("#invoice-table > tbody > tr.row:last").after(e)}function l(t){"undefined"==typeof t&&(t={name:"Tax",value:"0"}),template='<tr class=\'added_tax\'><td class="noborder">&nbsp;</td><td class="tax"><a class="delete-tax">Delete</a></td><td><span class="tax"><input class="tax_name" style="width:30px;" type="text" name="tax_names[]" placeholder="Tax" value="{TAX_NAME}" size="3"></span><input class="tax_value iva" type="text" name="tax_values[]" placeholder="0" value="{TAX_VALUE}" size="3"></td><td class="tax_total">0</td><input class="tax_total-hidden" type="hidden" name="tax_total[]" value="0"></tr>',template=template.replace("{TAX_NAME}",t.name.replace("'","\\'")),template=template.replace("{TAX_VALUE}",t.value.replace("'","\\'")),$("#invoice-table tr.add_tax_tr").before(template)}function d(){var t=0;$("#invoice-table > tbody > tr.row").each(function(){T=$(this).find("input.cantidad").val(),D=$(this).find("input.coste").val(),I=+D*+T,$(this).find(".precio").text(I),$(this).find(".precio-hidden").val(I),t+=I});var e=0;$(".added_tax").each(function(i,n){var a=r($("input.tax_value").eq(i).val()/100*t);e+=a,$(".tax_total-hidden").eq(i).val(a),$(".tax_total").eq(i).html(a)}),total=t+e,$(".subtotal").text(t),$(".total").text(S+r(total)),$(".subtotal-hidden").val(t),$(".total-hidden").val(r(total))}function r(t){return Math.round(100*t)/100}function s(){localStorage.setItem("Invoices_DS",JSON.stringify(y))}function v(){var t={},e=[];return t.title=$("#invoice-title").val(),t.date=$("#invoice-date").val(),t.invoice_num=$("#inv").val(),t.th_number=$("input[name='hidden-number']").val(),t.th_date=$("input[name='hidden-date']").val(),t.language=$("#language").val(),t.invoice_total=$("td.total").text(),t.invoice_currency=S,t.th_description=$("th.description").text(),t.th_qty=$("th.qty").text(),t.th_cost=$("th.cost").text(),t.th_price=$("th.price").text(),t.btn_addrow=$(".add-row").text(),t.btn_addtax=$(".add_tax").text(),t.notes=$("#pay h3").text(),t.invoice_num?(t.client={},t.client.name=$("#cname").val(),t.client.email=$("#cemail").val(),t.client.tel=$("#ctel").val(),t.client.to=$("#billto h3").text(),t.user={},t.user.name=$("#name").val(),t.user.email=$("#email").val(),t.user.tel=$("#tel").val(),t.user.from=$("#from h3").text(),t.taxes=[],$(".added_tax").each(function(e,i){t.taxes.push({name:$("input.tax_name").eq(e).val(),value:$("input.tax_value").eq(e).val()})}),t.notas=$("#invoice-notas").val(),$(".row").each(function(t,i){e[t]={description:$("input.description").eq(t).val(),cantidad:$(".cantidad").eq(t).val(),coste:$(".coste").eq(t).val()}}),t.items=e,"[object Object]"!==Object.prototype.toString.call(y.invoices)&&(y.invoices={}),void(("undefined"==typeof y.invoices["invoice"+t.invoice_num]||confirm("Want to replace invoice "+t.invoice_num+"?"))&&(y.invoices["invoice"+t.invoice_num]=t,s(),x(),w=!1))):(p("You have to add an invoice number"),!1)}function u(e){$("#invoice").fadeOut(N,function(){if(t()&&!confirm("Continue without saving?"))return!1;if(n(),"undefined"==typeof y.invoices["invoice"+e])return p("There no such invoice"),!1;var a=y.invoices["invoice"+e];$("#name").val(a.user.name),$("#email").val(a.user.email),$("#tel").val(a.user.tel),$("#from h3").text(a.user.from),$("input[name='hidden-number']").val(a.th_number),$("input[name='hidden-date']").val(a.th_date),$("#cname").val(a.client.name),$("#cemail").val(a.client.email),$("#ctel").val(a.client.tel),$("#billto h3").text(a.client.to),$("#inv").val(a.invoice_num),$("#invoice-notas").val(a.notas),$("#invoice-title").val(a.title),$("td.total").text(a.invoice_total),$("th.description").text(a.th_description),$("th.qty").text(a.th_qty),$("th.cost").text(a.th_cost),$("th.price").text(a.th_price),$(".add-row").text(a.btn_addrow),$(".add_tax").text(a.btn_addtax),$("#pay h3").text(a.notes),$('#language option[value="'+a.language+'"]').prop("selected",!0);var o=Object.keys(a.items);for(i in o)c(a.items[o[i]]);if(o.length&&$("#invoice-table tr.row:first").remove(),$("#invoice-table tr.added_tax").remove(),a.taxes.length)for(i in a.taxes)l(a.taxes[i]);d(),S=a.invoice_currency,$("td.total").text(a.invoice_total)}).fadeIn(N)}function p(t){var e=$("<div class='alert'><div class='container'><p>"+t+"</p><a class='remove-alert'>Remove</a></div></div>").fadeIn("fast");$(".container").before(e),$(".remove-alert").on("click",function(t){$(".alert").slideUp("fast",function(){$(this).remove()})})}function h(t){return"undefined"==typeof y.invoices["invoice"+t]?(p("That invoice doesn't exist."),!1):void(confirm("Do you want to delete "+t+"?")&&(delete y.invoices["invoice"+t],s(),x()))}function f(){y=JSON.parse(localStorage.getItem("Invoices_DS")),"[object Object]"!==Object.prototype.toString.call(y)&&(y={},y.invoices={},s())}function m(t){var e="<ul>";E=[];for(var i in t)E.push(i);E.reverse();for(var i in E)console.log(E[i]),e+="<li data-invoice-num='"+t[E[i]].invoice_num+"'><span class='inv_title'>"+t[E[i]].invoice_num+"</span><span class='inv_total'>"+t[E[i]].invoice_total+"</span><br/><span class='inv_date'>"+t[E[i]].date+"</span><br/><span class='inv_delete delete-row'>Delete</span></li>";return e+="</ul>"}function x(){var t=m(y.invoices);E.length>=1?$("#invoices").hide().html(t).fadeIn("fast"):$("#invoices").hide().html("<p class='blank'>There are no saved invoices. Create one now!</p>").fadeIn("fast")}function _(t){$.ajax({type:"GET",url:t,dataType:"xml",success:function(t){$(t).find("info").each(function(){var t=$(this).find("invoice-title").text(),e=$(this).find("number").text(),i=$(this).find("from-title").text(),n=$(this).find("to-title").text(),a=$(this).find("from").text(),o=$(this).find("to").text(),c=$(this).find("description").text(),l=$(this).find("tag").text(),d=$(this).find("number-title").text(),r=$(this).find("date-title").text();$("input[name='invoice-title']").val(t),$("input[name='invoice-number']").attr("placeholder",e),$("#from h3").text(i),$("#billto h3").text(n),$("input[name='name']").attr("placeholder",a),$("input[name='cname']").attr("placeholder",o),$(".top h2").text(l),$("input[name='hidden-number']").val(d),$("input[name='hidden-date']").val(r)}),$(t).find("items").each(function(){var t=$(this).find("description").text(),e=$(this).find("qty").text(),i=$(this).find("cost").text(),n=$(this).find("price").text(),a=$(this).find("row").text(),o=$(this).find("add").text(),c=$(this).find("addtax").text(),l=$(this).find("notes").text();$("#invoice-table th.description").text(t),$("#invoice-table th.qty").text(e),$("#invoice-table th.cost").text(i),$("#invoice-table th.price").text(n),$("input.description").attr("placeholder",a),$(".add-row").text(o),$(".add_tax").text(c),$("#pay h3").text(l)}),$(t).find("sidebar").each(function(){var t=$(this).find("new").text(),e=$(this).find("download").text(),i=$(this).find("save").text();$("#create_new").val(t),$("#descargar").val(e),$("#guardar").val(i)})}})}function b(){q=$("#language").val()+".xml",$("#invoice").fadeOut(N,function(){g(),_(q)}).delay(500).fadeIn(N)}function g(){"english.xml"==q&&(S=A[0]),"englishUK.xml"==q&&(S=A[2]),"espanol.xml"==q&&(S=A[1]),"portugues.xml"==q&&(S=A[1]),d()}var y={},w=!1,q="",T=0,D=0,I=0,O=0,k=0,A=["$","€","£"],S=A[1],N=100,j={};$("#invoice").hide(),$("#descargar").click(function(){return row_html=$("#invoice-table tbody").html(),from_hidden=$("#from h3").text(),to_hidden=$("#billto h3").text(),description_hidden=$("th.description").text(),qty_hidden=$("th.qty").text(),cost_hidden=$("th.cost").text(),price_hidden=$("th.price").text(),total_hidden=$("td.total").text(),notes_hidden=$("#pay h3").text(),$(".html-hidden").val(row_html),$("input[name='hidden-from']").val(from_hidden),$("input[name='hidden-to']").val(to_hidden),$("input[name='hidden-description']").val(description_hidden),$("input[name='hidden-qty']").val(qty_hidden),$("input[name='hidden-cost']").val(cost_hidden),$("input[name='hidden-price']").val(price_hidden),$("input[name='hidden-notes']").val(notes_hidden),$("input[name='total-hidden']").val(total_hidden),!0}),$("#guardar").click(function(t){return v(),!1}),$("#create_new").click(function(e){return(!t()||confirm("There are unsaved changes, do you want to proceed?"))&&$("#invoice").fadeOut(N,function(){n(),o(a()+1),_(q)}).fadeIn(N),!1}),$(document).on("click","#invoices ul li .inv_title",function(t){u($(this).parent().attr("data-invoice-num"))}),$(document).on("click","#invoices ul li .inv_delete",function(t){h($(this).parent().attr("data-invoice-num"))});var C=1;$("#invoice-table").on("click",".delete-tax",function(t){var e=$(this).closest("tr");e.remove(),d(),t.preventDefault()}),$(".add_tax").on("click",function(t){l(),t.preventDefault()}),$(".add-row").on("click",function(t){c(),t.preventDefault()}),$("#invoice-table").on("click",".delete-row",function(t){var e=$(this).closest("tr");C>1?(C--,e.remove(),d(),console.log("Rows: "+C)):p("No puedes borrar la unica linea"),t.preventDefault()}),$(document).on("change","div input",function(t){w=!0,"description"!==t.target.className&&d()}),$(document).on("keyup","div input",function(t){var e=$("html").find("input:text");$.each(e,function(){$(this).attr("value",$(this).val())}),w=!0,"description"!==t.target.className&&d()});var E,M=navigator.language||navigator.userLanguage;q=$("#language").val(),$('#language option[value="'+q+'"]').prop("selected",!0),$("select").change(b),b(),f(),n(),x(),_(q),g()});