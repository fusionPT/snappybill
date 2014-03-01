

(function(d){d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(f,e){d.fx.step[e]=function(g){if(!g.colorInit){g.start=c(g.elem,e);g.end=b(g.end);g.colorInit=true}g.elem.style[e]="rgb("+[Math.max(Math.min(parseInt((g.pos*(g.end[0]-g.start[0]))+g.start[0]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[1]-g.start[1]))+g.start[1]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[2]-g.start[2]))+g.start[2]),255),0)].join(",")+")"}});function b(f){var e;if(f&&f.constructor==Array&&f.length==3){return f}if(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)){return[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])]}if(e=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)){return[parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55]}if(e=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}if(e=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}if(e=/rgba\(0, 0, 0, 0\)/.exec(f)){return a.transparent}return a[d.trim(f).toLowerCase()]}function c(g,e){var f;do{f=d.curCSS(g,e);if(f!=""&&f!="transparent"||d.nodeName(g,"body")){break}e="backgroundColor"}while(g=g.parentNode);return b(f)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]}})(jQuery);


// http://www.unwrongest.com/projects/elastic/
(function(jQuery){jQuery.fn.extend({elastic:function(){var mimics=['paddingTop','paddingRight','paddingBottom','paddingLeft','fontSize','lineHeight','fontFamily','width','fontWeight'];return this.each(function(){if(this.type!='textarea'){return false;}
var $textarea=jQuery(this),$twin=jQuery('<div />').css({'position':'absolute','display':'none','word-wrap':'break-word'}),lineHeight=parseInt($textarea.css('line-height'),10)||parseInt($textarea.css('font-size'),'10'),minheight=parseInt($textarea.css('height'),10)||lineHeight*3,maxheight=parseInt($textarea.css('max-height'),10)||Number.MAX_VALUE,goalheight=0,i=0;if(maxheight<0){maxheight=Number.MAX_VALUE;}
$twin.appendTo($textarea.parent());var i=mimics.length;while(i--){$twin.css(mimics[i].toString(),$textarea.css(mimics[i].toString()));}
function setHeightAndOverflow(height,overflow){curratedHeight=Math.floor(parseInt(height,10));if($textarea.height()!=curratedHeight){$textarea.css({'height':curratedHeight+'px','overflow':overflow});}}
function update(){var textareaContent=$textarea.val().replace(/&/g,'&amp;').replace(/  /g,'&nbsp;').replace(/<|>/g,'&gt;').replace(/\n/g,'<br />');var twinContent=$twin.html();if(textareaContent+'&nbsp;'!=twinContent){$twin.html(textareaContent+'&nbsp;');if(Math.abs($twin.height()+lineHeight-$textarea.height())>3){var goalheight=$twin.height()+lineHeight;if(goalheight>=maxheight){setHeightAndOverflow(maxheight,'auto');}else if(goalheight<=minheight){setHeightAndOverflow(minheight,'hidden');}else{setHeightAndOverflow(goalheight,'hidden');}}}}
$textarea.css({'overflow':'hidden'});$textarea.keyup(function(){update();});$textarea.live('input paste',function(e){setTimeout(update,250);});update();});}});})(jQuery);


// http://github.com/marcuswestin/store.js/blob/master/store.js
var store=(function(){var api={},win=window,doc=win.document,localStorageName='localStorage',globalStorageName='globalStorage',storage
api.set=function(key,value){}
api.get=function(key){}
api.remove=function(key){}
api.clear=function(){}
api.transact=function(key,transactionFn){var val=api.get(key)
if(typeof val=='undefined'){val={}}
transactionFn(val)
store.set(key,val)}
function serialize(value){return JSON.stringify(value)}
function deserialize(value){if(typeof value!='string'){return undefined}
return JSON.parse(value)}
if(localStorageName in win&&win[localStorageName]){storage=win[localStorageName]
api.set=function(key,val){storage.setItem(key,serialize(val))}
api.get=function(key){return deserialize(storage.getItem(key))}
api.remove=function(key){storage.removeItem(key)}
api.clear=function(){storage.clear()}}else if(globalStorageName in win&&win[globalStorageName]){storage=win[globalStorageName][win.location.hostname]
api.set=function(key,val){storage[key]=serialize(val)}
api.get=function(key){return deserialize(storage[key]&&storage[key].value)}
api.remove=function(key){delete storage[key]}
api.clear=function(){for(var key in storage){delete storage[key]}}}else if(doc.documentElement.addBehavior){var storage=doc.createElement('div')
function withIEStorage(storeFunction){return function(){var args=Array.prototype.slice.call(arguments,0)
args.unshift(storage)
doc.body.appendChild(storage)
storage.addBehavior('#default#userData')
storage.load(localStorageName)
var result=storeFunction.apply(api,args)
doc.body.removeChild(storage)
return result}}
api.set=withIEStorage(function(storage,key,val){storage.setAttribute(key,serialize(val))
storage.save(localStorageName)})
api.get=withIEStorage(function(storage,key){return deserialize(storage.getAttribute(key))})
api.remove=withIEStorage(function(storage,key){storage.removeAttribute(key)
storage.save(localStorageName)})
api.clear=withIEStorage(function(storage){var attributes=storage.XMLDocument.documentElement.attributes
storage.load(localStorageName)
for(var i=0,attr;attr=attributes[i];i++){storage.removeAttribute(attr.name)}
storage.save(localStorageName)})}
return api})()



// http://www.diveintojavascript.com/projects/javascript-sprintf
var sprintf=(function(){function get_type(variable){return Object.prototype.toString.call(variable).slice(8,-1).toLowerCase();}function str_repeat(input,multiplier){for(var output=[];multiplier>0;output[--multiplier]=input){}return output.join('');}var str_format=function(){if(!str_format.cache.hasOwnProperty(arguments[0])){str_format.cache[arguments[0]]=str_format.parse(arguments[0]);}return str_format.format.call(null,str_format.cache[arguments[0]],arguments);};str_format.format=function(parse_tree,argv){var cursor=1,tree_length=parse_tree.length,node_type='',arg,output=[],i,k,match,pad,pad_character,pad_length;for(i=0;i<tree_length;i++){node_type=get_type(parse_tree[i]);if(node_type==='string'){output.push(parse_tree[i]);}else if(node_type==='array'){match=parse_tree[i];if(match[2]){arg=argv[cursor];for(k=0;k<match[2].length;k++){if(!arg.hasOwnProperty(match[2][k])){throw(sprintf('[sprintf] property "%s" does not exist',match[2][k]));}arg=arg[match[2][k]];}}else if(match[1]){arg=argv[match[1]];}else{arg=argv[cursor++];}if(/[^s]/.test(match[8])&&(get_type(arg)!='number')){throw(sprintf('[sprintf] expecting number but found %s',get_type(arg)));}switch(match[8]){case'b':arg=arg.toString(2);break;case'c':arg=String.fromCharCode(arg);break;case'd':arg=parseInt(arg,10);break;case'e':arg=match[7]?arg.toExponential(match[7]):arg.toExponential();break;case'f':arg=match[7]?parseFloat(arg).toFixed(match[7]):parseFloat(arg);break;case'o':arg=arg.toString(8);break;case's':arg=((arg=String(arg))&&match[7]?arg.substring(0,match[7]):arg);break;case'u':arg=Math.abs(arg);break;case'x':arg=arg.toString(16);break;case'X':arg=arg.toString(16).toUpperCase();break;}arg=(/[def]/.test(match[8])&&match[3]&&arg>=0?'+'+arg:arg);pad_character=match[4]?match[4]=='0'?'0':match[4].charAt(1):' ';pad_length=match[6]-String(arg).length;pad=match[6]?str_repeat(pad_character,pad_length):'';output.push(match[5]?arg+pad:pad+arg);}}return output.join('');};str_format.cache={};str_format.parse=function(fmt){var _fmt=fmt,match=[],parse_tree=[],arg_names=0;while(_fmt){if((match=/^[^\x25]+/.exec(_fmt))!==null){parse_tree.push(match[0]);}else if((match=/^\x25{2}/.exec(_fmt))!==null){parse_tree.push('%');}else if((match=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt))!==null){if(match[2]){arg_names|=1;var field_list=[],replacement_field=match[2],field_match=[];if((field_match=/^([a-z_][a-z_\d]*)/i.exec(replacement_field))!==null){field_list.push(field_match[1]);while((replacement_field=replacement_field.substring(field_match[0].length))!==''){if((field_match=/^\.([a-z_][a-z_\d]*)/i.exec(replacement_field))!==null){field_list.push(field_match[1]);}else if((field_match=/^\[(\d+)\]/.exec(replacement_field))!==null){field_list.push(field_match[1]);}else{throw('[sprintf] huh?');}}}else{throw('[sprintf] huh?');}match[2]=field_list;}else{arg_names|=2;}if(arg_names===3){throw('[sprintf] mixing positional and named placeholders is not (yet) supported');}parse_tree.push(match);}else{throw('[sprintf] huh?');}_fmt=_fmt.substring(match[0].length);}return parse_tree;};return str_format;})();var vsprintf=function(fmt,argv){argv.unshift(fmt);return sprintf.apply(null,argv);};



function save_offline() {
  
  
  store.set('billable',  {
    kind: $('#kind').val(),
    company_name: $('#company_name').val(),
    company_info: $('#company_info').val(),
    recipient_info: $('#recipient_info').val(),
    invoice_number_label: $('#invoice_number_label').val(),
    invoice_number: $('#invoice_number').val(),
    invoice_date_label: $('#invoice_date_label').val(),
    description_label: $('#description_label').val(),
    quantity_label: $('#quantity_label').val(),
    price_label: $('#price_label').val(),
    subtotal_label: $('#subtotal_label').val(),
    tax_name: $('#tax_name').val(),
    tax_percentage: $('#tax_percentage').val(),
    total_label: $('#total_label').val(),
    currency_symbol: $('#currency_symbol').val(),
    
    notes_a: $('#notes_a').val(),
    notes_b: $('#notes_b').val(),
  });
  
  
  var items = new Array();
  $('#items tr').not('thead tr, tfoot tr').each(function() {
    items.push({
      'description': $(this).find('textarea').val(),
      'quantity': $(this).find('input').eq(0).val(),
      'price': $(this).find('input').eq(1).val(),
    });
  });
  store.set('billable_items', items);
};




$('a[href=#print]').live('click', function() {
  $('textarea, input').css('background', 'transparent');
  window.print();
  return false;
});

$('a[href=#pdf]').live('click', function() {
  var f = $('form');
  f.attr('action', '/pdf/');
  f.submit();
  return false;
});

$('a[href=#save]').live('click', function() {
  var a = $(this);
  save_offline();
  a.text('Saving...');
  setTimeout(function() {
    a.text('Save');
  }, 300);
  return;
});



$('#items tfoot a').live('click', function() {
  var len = $('#items textarea').length;
  $('#items tfoot')
    .before('<tr>'
          + '<td class="action"></td>'
          + '<td class="description"><textarea name="items.' + len + '.description"></textarea></td>'
          + '<td class="quantity"><input type="text" name="items.' + len + '.quantity" value="1"></td>'
          + '<td class="price"><input type="text" name="items.' + len + '.price" value="00.00"></td>'
          + '<td class="action"><a href="#remove">[ x ]</a></td>'
          + '</tr>');
  $('#items tfoot').prev().find('textarea').elastic();
  return false;
});




$('.quantity input, .price input, #tax_percentage').live('keyup', function() {
  var i = $(this);
  var v = i.val();

  if (isNaN(v)) {
    $(this).addClass('error').animate({'backgroundColor': '#f9c6c7'}, 200);
  } else {
    
    if (i.hasClass('error')) {
      i.removeClass('error').animate({'backgroundColor': '#f9f3a7'}, 200);
    }
    
    
    var subtotal = 0;    
    $('#items tr').each(function() {
      var q = parseFloat($(this).find('.quantity input').val()) * 10;
      var p = parseFloat($(this).find('.price input').val()) * 10;
      
      if (isNaN(q) || isNaN(p)) return;
      
      subtotal += q * p;
    });
    
    // subtotal
    var v = sprintf('%.2f', subtotal / 100);
    $('span.subtotal').text(v);
    $('input.subtotal').val(v);
    // tax    
    var tax_percentage = parseFloat($('#tax_percentage').val(), 10) / 100;
    if (isNaN(tax_percentage)) return;
    var tax_amount = tax_percentage * subtotal;
    var v = sprintf('%.2f', tax_amount / 100);
    $('span.tax_amount').text(v);
    $('input.tax_amount').val(v);
    // total
    var v = sprintf('%.2f', (subtotal + tax_amount) / 100);
    $('span.total').text(v);
    $('input.total').val(v);
  }
});


$('#items a[href="#remove"]').live('click', function() {
  var r = $(this).parent().parent();
  if (confirm('Remove this item?')) {
    r.remove();
    $("#tax_percentage").keyup();
  }
  return false;
});








$(function() {
    
    $('input, textarea').attr('autocomplete', 'off');
  
    //offline storage?
    s = store.get('billable');
    if (!s) {
        s = {
            kind: 'INVOICE',
            company_name: 'Example Co.',
            company_info: 'www.example.com\ninfo@example.com',
            recipient_info: 'Michael Scott Paper Company Inc.\n1725 Slough Avenue\nScranton, Pennsylvania',
            invoice_number_label: 'Invoice #',
            invoice_number: '1',
            invoice_date_label: 'Date',
            description_label: 'Item & Description',
            quantity_label: 'Quantity',
            price_label: 'Price',
            subtotal_label: 'Subtotal',
            tax_name: 'VAT',
            tax_percentage: '14',
            total_label: 'Total',
            currency_symbol: 'R',
            notes_a: '',
            notes_b: '\nCreated with Billable.me',
        };
    }
    
    if (s.invoice_number_label == undefined) {
        s.invoice_number_label = 'Invoice #';
    }
    if (s.invoice_date_label == undefined) {
        s.invoice_date_label = 'Date';
    }
    if (s.description_label == undefined) {
        s.description_label = 'Item & Description';
    }
    if (s.quantity_label == undefined) {
        s.quantity_label = 'Quantity';
    }
    if (s.price_label == undefined) {
        s.price_label = 'Price';
    }
    if (s.subtotal_label == undefined) {
        s.subtotal_label = 'Subtotal';
    }
    if (s.total_label == undefined) {
        s.total_label = 'Total';
    }
    
    
    $('#kind').val(s.kind);
    $('#company_name').val(s.company_name);
    $('#company_info').val(s.company_info);
    $('#recipient_info').val(s.recipient_info);
    $('#invoice_number_label').val(s.invoice_number_label);
    $('#invoice_number').val(s.invoice_number);
    $('#description_label').val(s.description_label);
    $('#quantity_label').val(s.quantity_label);
    $('#price_label').val(s.price_label);
    $('#subtotal_label').val(s.subtotal_label);
    $('#tax_name').val(s.tax_name);
    $('#tax_percentage').val(s.tax_percentage);
    $('#total_label').val(s.total_label);
    $('#currency_symbol').val(s.currency_symbol);
    $('#notes_a').val(s.notes_a);
    $('#notes_b').val(s.notes_b);
    
    var d = new Date();
    var m = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    $('#invoice_date_label').val(s.invoice_date_label);
    $('#invoice_date').val(d.getDate() + ' ' + m[d.getMonth()] + ', ' + d.getFullYear());
    
    var items = store.get('billable_items');
    if (!items) {
      $('#items tfoot a').click();
    } else {
      $(items).each(function(i) {

         $('#items tfoot a').click();
         var tr = $('#items tr').eq(i + 1);
         var i = tr.find('input');
         tr.find('textarea').val(this.description);
         i.eq(0).val(this.quantity);
         i.eq(1).val(this.price);
         i.eq(1).keyup();
      });
    }
    
    
    // elastic!
    $('textarea').elastic();
    // glow events
    $('input, textarea').live('focus', function() {
        $(this).animate({'backgroundColor': '#f9f3a7'}, 200);
        $(this).addClass('focus');
    })
    .live('blur', function() {
        $(this).css('background', 'transparent');
        $(this).removeClass('focus');
    })
    .live('mouseenter', function() {
      if (!$(this).hasClass('focus')) {
        $(this).stop().animate({'backgroundColor': '#f9f5c6'}, 200);
      }
    })
    .live('mouseleave', function() {
        if (!$(this).hasClass('focus')) {
          $(this).stop().animate({'backgroundColor': '#fafbfb'}, 200);
        }
    });
    
    
    
    $(window).unload(function() {
      save_offline();
    });
});