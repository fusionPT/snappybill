/*******************************************************************************
 * This notice must be untouched at all times.
 *
 * CSS Sandpaper: smooths out differences between CSS implementations.
 *
 * This javascript library contains routines to implement the CSS transform,
 * box-shadow and gradient in IE.  It also provides a common syntax for other
 * browsers that support vendor-specific methods.
 *
 * Written by: Zoltan Hawryluk. Version 1.0 beta 1 completed on March 8, 2010.
 *
 * Some routines are based on code from CSS Gradients via Canvas v1.2
 * by Weston Ruter <http://weston.ruter.net/projects/css-gradients-via-canvas/>
 *
 * Requires sylvester.js by James Coglan http://sylvester.jcoglan.com/
 *
 * cssSandpaper.js v.1.0 beta 1 available at http://www.useragentman.com/
 *
 * released under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 ******************************************************************************/function RuleList(e){var t=this;t.values=new Array;t.propertyName=e;t.add=function(e,n){t.values.push(new CSSRule(e,t.propertyName,n))}}function CSSRule(e,t,n){var r=this;r.selector=e;r.name=t;r.value=n;r.toString=function(){return StringHelpers.sprintf("%s { %s: %s}",r.selector,r.name,r.value)}}function MSFilterList(e){function i(){var i=r.filter.match(n);if(i!=null)for(var s=0;s<i.length;s++){var o=i[s];t.list.push(new MSFilter(e,o))}}var t=this;t.list=new Array;t.node=e;var n=/[\s\S]*\([\s\S]*\)/g,r=e.style;t.toString=function(){var e=new StringBuffer;for(var n=0;n<t.list.length;n++){e.append(t.list[n].toString());n<t.list.length-1&&e.append(",")}return e.toString()};t.fixFilterStyle=function(){try{t.node.style.filter=t.toString()}catch(e){}};i()}function MSFilter(e,t){function s(){n.name=n.filterCall.match(r)[0].replace("progid:","");var e=t.split("(")[1].replace(")","");n.parameters=e.match(i);for(var s=0;s<n.parameters.length;s++)n.parameters[s]=n.parameters[s].replace("=","")}var n=this;n.node=e;n.filterCall=t;var r=/progid:([^\(]*)/g,i=/([a-zA-Z0-9]+\s*)=/g;n.toString=function(){var e=new StringBuffer;e.append(StringHelpers.sprintf("progid:%s(",n.name));for(var t=0;t<n.parameters.length;t++){var r=n.parameters[t],i=n.node.filters.item(n.name),s=i[r];typeof s=="string"?e.append(StringHelpers.sprintf('%s="%s"',r,i[r])):e.append(StringHelpers.sprintf("%s=%s",r,i[r]));t!=n.parameters.length-1&&e.append(", ")}e.append(")");return e.toString()};s()}function StringBuffer(){var e=this,t=[];e.append=function(n){t.push(n);return e};e.appendBuffer=function(e){t=t.concat(e)};e.toString=function(){return t.join("")};e.getLength=function(){return t.length};e.flush=function(){t.length=0}}function RGBColor(e){function f(e,t,n){var r,i,s,o,u,a;t/=100;n/=100;if(t==0)o=u=a=n*255;else{n<=.5?i=n*(t+1):i=n+t-n*t;r=n*2-i;s=e/360;o=l(r,i,s+1/3);u=l(r,i,s);a=l(r,i,s-1/3)}return{r:Math.round(o),g:Math.round(u),b:Math.round(a)}}function l(e,t,n){var r;n<0?n+=1:n>1&&(n-=1);6*n<1?r=e+(t-e)*n*6:2*n<1?r=t:3*n<2?r=e+(t-e)*(2/3-n)*6:r=e;return 255*r}var t=this;t.ok=!1;e.charAt(0)=="#"&&(e=e.substr(1,6));e=e.replace(/ /g,"");e=e.toLowerCase();var n={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dodgerblue:"1e90ff",feldspar:"d19275",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslateblue:"8470ff",lightslategray:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",metle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",violetred:"d02090",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32"};for(var r in n)e==r&&(e=n[r]);var i=[{re:/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,example:["rgb(123, 234, 45)","rgb(255,234,245)"],process:function(e){return[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])]}},{re:/^(\w{2})(\w{2})(\w{2})$/,example:["#00ff00","336699"],process:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{re:/^(\w{1})(\w{1})(\w{1})$/,example:["#fb0","f0f"],process:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0{0,1}\.\d{1,}|0\.{0,}0*|1\.{0,}0*)\)$/,example:["rgba(123, 234, 45, 22)","rgba(255, 234,245, 34)"],process:function(e){return[parseInt(e[1]),parseInt(e[2]),parseInt(e[3]),parseFloat(e[4])]}},{re:/^hsla\((\d{1,3}),\s*(\d{1,3}%),\s*(\d{1,3}%),\s*(0{0,1}\.\d{1,}|0\.{0,}0*|1\.{0,}0*)\)$/,example:["hsla(0,100%,50%,0.2)"],process:function(e){var t=f(parseInt(e[1]),parseInt(e[2]),parseInt(e[3]),parseFloat(e[4]));return[t.r,t.g,t.b,parseFloat(e[4])]}},{re:/^hsl\((\d{1,3}),\s*(\d{1,3}%),\s*(\d{1,3}%)\)$/,example:["hsl(0,100%,50%)"],process:function(e){var t=f(parseInt(e[1]),parseInt(e[2]),parseInt(e[3]),1);return[t.r,t.g,t.b,1]}}];for(var s=0;s<i.length;s++){var o=i[s].re,u=i[s].process,a=o.exec(e);if(a){channels=u(a);t.r=channels[0];t.g=channels[1];t.b=channels[2];t.a=channels[3];t.ok=!0}}t.r=t.r<0||isNaN(t.r)?0:t.r>255?255:t.r;t.g=t.g<0||isNaN(t.g)?0:t.g>255?255:t.g;t.b=t.b<0||isNaN(t.b)?0:t.b>255?255:t.b;t.a=isNaN(t.a)?1:t.a>255?255:t.a<0?0:t.a;t.toRGB=function(){return"rgb("+t.r+", "+t.g+", "+t.b+")"};t.toRGBA=function(){return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"};t.toHSV=function(){var e=t.r/255,n=t.g/255,r=t.b/255,i=Math.max(e,n,r),s=Math.min(e,n,r),o,u,a=i,f=i-s;u=i==0?0:f/i;if(i==s)o=0;else{switch(i){case e:o=(n-r)/f+(n<r?6:0);break;case n:o=(r-e)/f+2;break;case r:o=(e-n)/f+4}o/=6}return{h:o,s:u,v:a}};t.toHex=function(){var e=t.r.toString(16),n=t.g.toString(16),r=t.b.toString(16),i=Math.floor(t.a*255).toString(16);e.length==1&&(e="0"+e);n.length==1&&(n="0"+n);r.length==1&&(r="0"+r);i=="ff"?i="":i.length==1&&(i="0"+i);return"#"+i+e+n+r}}document.querySelectorAll||(document.querySelectorAll=cssQuery);var cssSandpaper=new function(){function d(){var t=N("opacity").values;for(var n in t){var r=t[n],i=document.querySelectorAll(r.selector);for(var s=0;s<i.length;s++)e.setOpacity(i[s],r.value)}}function v(){var t=N("-sand-transform").values,n=CSS3Helpers.findProperty(document.body,"transform");for(var r in t){var i=t[r],s=document.querySelectorAll(i.selector);for(var o=0;o<s.length;o++)e.setTransform(s[o],i.value)}}function m(){var t=N("-sand-box-shadow").values;for(var n in t){var r=t[n],i=document.querySelectorAll(r.selector);for(var s=0;s<i.length;s++)e.setBoxShadow(i[s],r.value)}}function g(e,t){if(t.colorStops.length==2&&t.colorStops[0].stop==0&&t.colorStops[1].stop==1){var n=new RGBColor(t.colorStops[0].color),r=new RGBColor(t.colorStops[1].color);n=n.toHex();r=r.toHex();var i=CSS3Helpers.addFilter(e,"DXImageTransform.Microsoft.Gradient",StringHelpers.sprintf("GradientType = %s, StartColorStr = '%s', EndColorStr = '%s'",t.IEdir,n,r));i.GradientType=t.IEdir;i.StartColorStr=n;i.EndColorStr=r;e.style.zoom=1}}function y(){var t=N("background").values.concat(N("background-image").values);for(var n in t){var r=t[n],i=document.querySelectorAll(r.selector);for(var s=0;s<i.length;s++)e.setGradient(i[s],r.value)}}function b(){var t=CSS3Helpers.reportColorSpaceSupport("RGBA",colorType.BACKGROUND);if(t==implementation.NATIVE)return;var n=N("background").values.concat(N("background-color").values);for(var r in n){var i=n[r],s=document.querySelectorAll(i.selector);for(var o=0;o<s.length;o++)i.value.indexOf("rgba(")==0?e.setRGBABackground(s[o],i.value):(i.value.indexOf("hsla(")==0||i.value.indexOf("hsl(")==0)&&e.setHSLABackground(s[o],i.value)}}function w(){var t=CSS3Helpers.reportColorSpaceSupport("HSL",colorType.FOREGROUND);if(t==implementation.NATIVE)return;var n=N("color").values,r=["color","border","border-left","border-right","border-bottom","border-top","border-left-color","border-right-color","border-bottom-color","border-top-color"];for(var i=0;i<r.length;i++){var s=N(r[i]).values;n=n.concat(s)}for(var i in n){var u=n[i],a=document.querySelectorAll(u.selector);for(var f=0;f<a.length;f++){var l=u.name.indexOf("border")==0,c=u.value.match(o);if(c){var h;l&&u.name.indexOf("-color")<0?h=u.name:h=u.name;e.setHSLColor(a[f],h,u.value)}}}}function E(e){var t=new StringBuffer;for(var n=0;n<e.length;n++){t.append(StringHelpers.sprintf("color-stop(%s, %s)",e[n].stop,e[n].color));n<e.length-1&&t.append(", ")}return t.toString()}function S(e){var t;switch(e.nodeName.toLowerCase()){case"style":t=StringHelpers.uncommentHTML(e.innerHTML);break;case"link":var n=XMLHelpers.getXMLHttpRequest(e.href,null,"GET",null,!1);t=n.responseText}t=t.replace(u,"").replace(a,"");return t}function x(){t=document.querySelectorAll('style, link[rel="stylesheet"]');for(var e=0;e<t.length;e++)CSSHelpers.isMemberOfClass(t[e],"cssSandpaper-noIndex")||n.push(S(t[e]))}function T(){for(var e=0;e<n.length;e++){var t=n[e];rules=t.match(r);if(rules)for(var s=0;s<rules.length;s++){var o=rules[s].split(i),u=o[0].trim(),a=o[1],f=a.split(";");for(var c=0;c<f.length;c++)if(f[c].trim()!=""){var h=f[c].split(":"),p=h[0].trim().toLowerCase(),d=h[1];l[p]||(l[p]=new RuleList(p));d&&typeof l[p]=="object"&&l[p].add(u,d.trim())}}}}function N(e){var t=l[e];t||(t=new RuleList(e));return t}function C(){var e=document.getElementsByTagName("html")[0],t=["transform","opacity"];for(var n=0;n<t.length;n++){var r=t[n];CSS3Helpers.supports(r)&&CSSHelpers.addClass(e,"cssSandpaper-"+r)}var i=CSSHelpers.getElementsByClassName(document,"cssSandpaper-initiallyHidden");for(var n=0;n<i.length;n++)CSSHelpers.removeClass(i[n],"cssSandpaper-initiallyHidden")}var e=this,t,n=new Array,r=/[^\{]*{[^\}]*}/g,i=/[\{\}]/g,s=/gradient\([\s\S]*\)/g,o=/hsl\([\s\S]*\)/g,u=/\/\/.+?(?=\n|\r|$)|\/\*[\s\S]+?\*\//g,a=/@[^\{\};]*;|@[^\{\};]*\{[^\}]*\}/g,f=/\(\s*/g,l=new Array,c,h,p;e.init=function(e){if(EventHelpers.hasPageLoadHappened(arguments)&&!e)return;p=document.body;h=document.createElement("div");x();T();v();m();y();b();w();d();C()};e.setOpacity=function(e,t){var n=CSS3Helpers.findProperty(document.body,"opacity");if(n=="filter"){e.style.zoom="100%";var r=CSS3Helpers.addFilter(e,"DXImageTransform.Microsoft.Alpha",StringHelpers.sprintf("opacity=%d",t*100));r.opacity=t*100}else e.style[n]!=null&&(e.style[n]=t)};e.setTransform=function(e,t){var n=CSS3Helpers.findProperty(e,"transform");if(n=="filter"){var r=CSS3Helpers.getTransformationMatrix(t);CSS3Helpers.setMatrixFilter(e,r)}else e.style[n]!=null&&(e.style[n]=t)};e.setBoxShadow=function(e,t){var n=CSS3Helpers.findProperty(e,"boxShadow"),r=CSS3Helpers.getBoxShadowValues(t);if(n=="filter"){var i=CSS3Helpers.addFilter(e,"DXImageTransform.Microsoft.DropShadow",StringHelpers.sprintf("color=%s,offX=%d,offY=%d",r.color,r.offsetX,r.offsetY));i.color=r.color;i.offX=r.offsetX;i.offY=r.offsetY}else e.style[n]!=null&&(e.style[n]=t)};e.setGradient=function(e,t){var n=CSS3Helpers.reportGradientSupport(),r=CSS3Helpers.getGradient(t);if(r==null)return;if(e.filters)g(e,r);else if(n==implementation.MOZILLA)e.style.backgroundImage=StringHelpers.sprintf("-moz-gradient( %s, %s, from(%s), to(%s))",r.dirBegin,r.dirEnd,r.colorStops[0].color,r.colorStops[1].color);else if(n==implementation.WEBKIT){var i=StringHelpers.sprintf("-webkit-gradient(%s, %s, %s %s, %s %s)",r.type,r.dirBegin,r.r0?r.r0+", ":"",r.dirEnd,r.r1?r.r1+", ":"",E(r.colorStops));e.style.backgroundImage=i}else if(n==implementation.CANVAS_WORKAROUND)try{CSS3Helpers.applyCanvasGradient(e,r)}catch(s){}};e.setRGBABackground=function(e,t){var n=CSS3Helpers.reportColorSpaceSupport("RGBA",colorType.BACKGROUND);switch(n){case implementation.NATIVE:e.style.value=t;break;case implementation.FILTER_WORKAROUND:g(e,{IEdir:0,colorStops:[{stop:0,color:t},{stop:1,color:t}]})}};e.setHSLABackground=function(e,t){var n=CSS3Helpers.reportColorSpaceSupport("HSLA",colorType.BACKGROUND);switch(n){case implementation.NATIVE:case implementation.FILTER_WORKAROUND:var r=new RGBColor(t);if(r.a==1)e.style.backgroundColor=r.toHex();else{var i=r.toRGBA();g(e,{IEdir:0,colorStops:[{stop:0,color:i},{stop:1,color:i}]})}}};e.camelize=function(e){var t="";for(var n=0;n<e.length;n++)if(e.substring(n,n+1)=="-"){n++;t+=e.substring(n,n+1).toUpperCase()}else t+=e.substring(n,n+1);return t};e.setHSLColor=function(t,n,r){var i=CSS3Helpers.reportColorSpaceSupport("HSL",colorType.FOREGROUND);switch(i){case implementation.NATIVE:case implementation.HEX_WORKAROUND:var s=r.match(o)[0],u=(new RGBColor(s)).toHex(),a=r.replace(o,u);t.style[e.camelize(n)]=a}};e.getProperties=function(e,t){var n="";if(!e)return n;for(var r in e)try{n+=t+"."+r.toString()+" = "+e[r]+", "}catch(i){}return n}},MatrixGenerator=new function(){function n(e){return(e-360)*Math.PI/180}function r(e){var r=parseFloat(e),i=e.match(t);if(e.trim()=="0"){r=0;i="rad"}if(i.length!=1||r==0)return 0;i=i[0];var s;switch(i){case"deg":s=n(r);break;case"rad":s=r;break;default:throw"Not an angle: "+e}return s}var e=this,t=/[a-z]+$/;e.identity=$M([[1,0,0],[0,1,0],[0,0,1]]);e.prettyPrint=function(e){return StringHelpers.sprintf("| %s %s %s | - | %s %s %s | - |%s %s %s|",e.e(1,1),e.e(1,2),e.e(1,3),e.e(2,1),e.e(2,2),e.e(2,3),e.e(3,1),e.e(3,2),e.e(3,3))};e.rotate=function(e){var t=r(e);return Matrix.RotationZ(t)};e.scale=function(e,t){e=parseFloat(e);t?t=parseFloat(t):t=e;return $M([[e,0,0],[0,t,0],[0,0,1]])};e.scaleX=function(t){return e.scale(t,1)};e.scaleY=function(t){return e.scale(1,t)};e.skew=function(e,t){var n=r(e),i;t!=null?i=r(t):i=n;return n!=null&&i!=null?$M([[1,Math.tan(n),0],[Math.tan(i),1,0],[0,0,1]]):null};e.skewX=function(t){return e.skew(t,"0")};e.skewY=function(t){return e.skew("0",t)};e.translate=function(e,t){var n=parseInt(e),r=parseInt(t);return $M([[1,0,n],[0,1,r],[0,0,1]])};e.translateX=function(t){return e.translate(t,0)};e.translateY=function(t){return e.translate(0,t)};e.matrix=function(e,t,n,r,i,s){return $M([[e,n,parseInt(i)],[t,r,parseInt(s)],[0,0,1]])}},CSS3Helpers=new function(){function swapIndices(e,t,n){var r=e[t];e[t]=e[n];e[n]=r}function parseColorStop(e,t){var n=new Object,r=me.getBracketedSubstring(e,"color-stop"),i=me.getBracketedSubstring(e,"from"),s=me.getBracketedSubstring(e,"to");if(r){var o=r.split(",");n.stop=normalizePercentage(o[0].trim());n.color=o[1].trim()}else if(i){n.stop=0;n.color=i.trim()}else if(s){n.stop=1;n.color=s.trim()}else{if(!(t<=1))throw StringHelpers.sprintf('invalid argument "%s"',e);n.color=e;t==0?n.stop=0:n.stop=1}return n}function normalizePercentage(e){return e.substring(e.length-1,e.length)=="%"?parseFloat(e)/100+"":e}function hasIETransformWorkaround(e){return CSSHelpers.isMemberOfClass(e.parentNode,"IETransformContainer")}function addIETransformWorkaround(e){if(!hasIETransformWorkaround(e)){var t=e.parentNode,n,r=document.createElement("div");CSSHelpers.addClass(r,"IETransformContainer");r.style.width=e.offsetWidth+"px";r.style.height=e.offsetHeight+"px";r.xOriginalWidth=e.offsetWidth;r.xOriginalHeight=e.offsetHeight;r.style.position="absolute";r.style.zIndex=e.currentStyle.zIndex;var i=0,s=0;if(e.currentStyle.display=="block"){r.style.left=e.offsetLeft+13-i+"px";r.style.top=e.offsetTop+13+ -s+"px"}else{r.style.left=e.offsetLeft+"px";r.style.top=e.offsetTop+"px"}e.style.top="auto";e.style.left="auto";e.style.bottom="auto";e.style.right="auto";var o=e.cloneNode(!0);o.style.visibility="hidden";e.replaceNode(o);e.style.position="absolute";r.appendChild(e);t.insertBefore(r,o);r.style.backgroundColor="transparent";r.style.padding="0";n=me.addFilter(e,"DXImageTransform.Microsoft.Matrix","M11=1, M12=0, M21=0, M22=1, sizingMethod='auto expand'");var u=e.currentStyle.backgroundImage.split('"')[1]}}function degreesToRadians(e){return(e-360)*Math.PI/180}var me=this,reTransformListSplitter=/[a-zA-Z]+\([^\)]*\)\s*/g,reLeftBracket=/\(/g,reRightBracket=/\)/g,reComma=/,/g,reSpaces=/\s+/g,reFilterNameSplitter=/progid:([^\(]*)/g,reLinearGradient,canvas,cache=new Array;me.supports=function(e){return CSS3Helpers.findProperty(document.body,e)!=null?!0:!1};me.getCanvas=function(){if(canvas)return canvas;canvas=document.createElement("canvas");return canvas};me.getTransformationMatrix=function(CSS3TransformProperty,doThrowIfError){var transforms=CSS3TransformProperty.match(reTransformListSplitter);if(doThrowIfError){var checkString=transforms.join(" ").replace(/\s*/g," "),normalizedCSSProp=CSS3TransformProperty.replace(/\s*/g," ");if(checkString!=normalizedCSSProp)throw"An invalid transform was given."}var resultantMatrix=MatrixGenerator.identity;for(var j=0;j<transforms.length;j++){var transform=transforms[j];transform=transform.replace(reLeftBracket,'("').replace(reComma,'", "').replace(reRightBracket,'")');try{var matrix=eval("MatrixGenerator."+transform);resultantMatrix=resultantMatrix.x(matrix)}catch(ex){if(doThrowIfError){var method=transform.split("(")[0],funcCall=transform.replace(/\"/g,"");throw MatrixGenerator[method]==undefined?"Error: invalid tranform function: "+funcCall:"Error: Invalid or missing parameters in function call: "+funcCall}}}return resultantMatrix};me.getBoxShadowValues=function(e){var t=new Object,n=e.split(reSpaces);if(n[0]=="inset"){t.inset=!0;n=n.reverse().pop().reverse()}else t.inset=!1;t.offsetX=parseInt(n[0]);t.offsetY=parseInt(n[1]);if(n.length>3){t.blurRadius=n[2];n.length>4&&(t.spreadRadius=n[3])}t.color=n[n.length-1];return t};me.getGradient=function(e){var t=new Object;t.colorStops=new Array;var n=me.getBracketedSubstring(e,"-sand-gradient");if(n==undefined)return null;var r=n.match(/[^\(,]+(\([^\)]*\))?[^,]*/g);t.type=r[0].trim();if(t.type=="linear"){t.dirBegin=r[1].trim();t.dirEnd=r[2].trim();var i=t.dirBegin.split(reSpaces),s=t.dirEnd.split(reSpaces);for(var o=3;o<r.length;o++)t.colorStops.push(parseColorStop(r[o].trim(),o-3));if(document.body.filters){if(t.x0==t.x1)switch(i[1]){case"top":t.IEdir=0;break;case"bottom":swapIndices(t.colorStops,0,1);t.IEdir=0}if(t.y0==t.y1)switch(i[0]){case"left":t.IEdir=1;break;case"right":t.IEdir=1;swapIndices(t.colorStops,0,1)}}}else{if(document.body.filters)return null;t.dirBegin=r[1].trim();t.r0=r[2].trim();t.dirEnd=r[3].trim();t.r1=r[4].trim();var i=t.dirBegin.split(reSpaces),s=t.dirEnd.split(reSpaces);for(var o=5;o<r.length;o++)t.colorStops.push(parseColorStop(r[o].trim(),o-5))}t.x0=i[0];t.y0=i[1];t.x1=s[0];t.y1=s[1];return t};me.reportGradientSupport=function(){if(!cache.gradientSupport){var e,t=document.createElement("div");t.style.cssText="background-image:-webkit-gradient(linear, 0% 0%, 0% 100%, from(red), to(blue));";if(t.style.backgroundImage)e=implementation.WEBKIT;else{var n=CSS3Helpers.getCanvas();n.getContext&&n.toDataURL?e=implementation.CANVAS_WORKAROUND:e=implementation.NONE}cache.gradientSupport=e}return cache.gradientSupport};me.reportColorSpaceSupport=function(e,t){if(!cache[e+t]){var n,r=document.createElement("div");switch(t){case colorType.BACKGROUND:switch(e){case"RGBA":r.style.cssText="background-color: rgba(255, 32, 34, 0.5)";break;case"HSL":r.style.cssText="background-color: hsl(0,0%,100%)";break;case"HSLA":r.style.cssText="background-color: hsla(0,0%,100%,.5)";break;default:}var i=document.body;r.style.backgroundColor?n=implementation.NATIVE:i.filters&&i.filters!=undefined?n=implementation.FILTER_WORKAROUND:n=implementation.NONE;break;case colorType.FOREGROUND:switch(e){case"RGBA":r.style.cssText="color: rgba(255, 32, 34, 0.5)";break;case"HSL":r.style.cssText="color: hsl(0,0%,100%)";break;case"HSLA":r.style.cssText="color: hsla(0,0%,100%,.5)";break;default:}r.style.color?n=implementation.NATIVE:e=="HSL"?n=implementation.HEX_WORKAROUND:n=implementation.NONE}cache[e]=n}return cache[e]};me.getBracketedSubstring=function(e,t){var n=e.indexOf(t+"(");if(n!=-1){var r=e.substring(n),i=1;for(var s=t.length+1;s<100||s<r.length;s++){var o=r.substring(s,s+1);switch(o){case"(":i++;break;case")":i--}if(i==0)break}return r.substring(n+t.length+1,s)}};me.setMatrixFilter=function(e,t){hasIETransformWorkaround(e)||addIETransformWorkaround(e);var n=e.parentNode;filter=e.filters.item("DXImageTransform.Microsoft.Matrix");filter.M11=t.e(1,1);filter.M12=t.e(1,2);filter.M21=t.e(2,1);filter.M22=t.e(2,2);var r=me.getIEMatrixOffsets(e,t,n.xOriginalWidth,n.xOriginalHeight);n.style.marginLeft=r.x;n.style.marginTop=r.y;n.style.marginRight=0;n.style.marginBottom=0};me.getTransformedDimensions=function(e,t){var n={};if(hasIETransformWorkaround(e)){n.width=e.offsetWidth;n.height=e.offsetHeight}else{var r=[t.x($V([0,0,1])),t.x($V([0,e.offsetHeight,1])),t.x($V([e.offsetWidth,0,1])),t.x($V([e.offsetWidth,e.offsetHeight,1]))],i=0,s=0,o=0,u=0;for(var a=0;a<r.length;a++)var f=r[a],l=f.e(1),c=f.e(2),o=Math.min(o,l),i=Math.max(i,l),u=Math.min(u,c),s=Math.max(s,c);n.width=i-o;n.height=s-u}return n};me.getIEMatrixOffsets=function(e,t,n,r){var i={},s=parseFloat(n),o=parseFloat(r),u;CSSHelpers.getComputedStyle(e,"display")=="inline"?u=0:u=13;var a=me.getTransformedDimensions(e,t);i.x=(s-a.width)/2-u+t.e(1,3)+"px";i.y=(o-a.height)/2-u+t.e(2,3)+"px";return i};me.addFilter=function(e,t,n){var r;try{r=e.filters.item(t)}catch(i){var s=new MSFilterList(e);s.fixFilterStyle();var o=", ";e.filters.length==0&&(o="");e.style.filter+=StringHelpers.sprintf("%sprogid:%s(%s)",o,t,n);r=e.filters.item(t)}return r};me.findProperty=function(e,t){capType=t.capitalize();var n=cache[t];if(!n){var r=e.style,i=[t,"Moz"+capType,"Webkit"+capType,"O"+capType,"filter"];for(var s=0;s<i.length;s++)if(r[i[s]]!=null){n=i[s];break}n=="filter"&&document.body.filters==undefined&&(n=null);cache[t]=n}return n};me.parseCoordinate=function(e,t){switch(e){case"top":case"left":return 0;case"bottom":case"right":return t;case"center":return t/2}e.indexOf("%")!=-1?e=parseFloat(e.substr(0,e.length-1))/100*t:e=parseFloat(e);if(isNaN(e))throw Error("Unable to parse coordinate: "+e);return e};me.applyCanvasGradient=function(e,t){var n=me.getCanvas(),r=document.defaultView.getComputedStyle(e,null);n.width=parseInt(r.width)+parseInt(r.paddingLeft)+parseInt(r.paddingRight)+1;n.height=parseInt(r.height)+parseInt(r.paddingTop)+parseInt(r.paddingBottom)+2;var i=n.getContext("2d"),s;t.type=="linear"?s=i.createLinearGradient(me.parseCoordinate(t.x0,n.width),me.parseCoordinate(t.y0,n.height),me.parseCoordinate(t.x1,n.width),me.parseCoordinate(t.y1,n.height)):s=i.createRadialGradient(me.parseCoordinate(t.x0,n.width),me.parseCoordinate(t.y0,n.height),t.r0,me.parseCoordinate(t.x1,n.width),me.parseCoordinate(t.y1,n.height),t.r1);for(var o=0;o<t.colorStops.length;o++){var u=t.colorStops[o];s.addColorStop(u.stop,u.color)}i.fillStyle=s;i.fillRect(0,0,n.width,n.height);e.style.backgroundImage="url('"+n.toDataURL()+"')"}},implementation=new function(){this.NONE=0;this.NATIVE=1;this.MOZILLA=2;this.WEBKIT=3;this.IE=4;this.OPERA=5;this.CANVAS_WORKAROUND=6;this.FILTER_WORKAROUND=7;this.HEX_WORKAROUND=8},colorType=new function(){this.BACKGROUND=0;this.FOREGROUND=1};window.StringHelpers||(StringHelpers=new function(){var e=this;e.initWhitespaceRe=/^\s\s*/;e.endWhitespaceRe=/\s\s*$/;e.whitespaceRe=/\s/;e.sprintf=function(e){var t=function(e,t,n){var r="";for(var i=0;i<Math.abs(n);i++)r+=t;return n>0?e+r:r+e},n=function(e,n,r,i){var s=function(e,t,n){t>=0?e.indexOf(" ")>=0?n=" "+n:e.indexOf("+")>=0&&(n="+"+n):n="-"+n;return n},o=parseInt(n,10);if(n.charAt(0)=="0"){var u=0;(e.indexOf(" ")>=0||e.indexOf("+")>=0)&&u++;r.length<o-u&&(r=t(r,"0",r.length-(o-u)));return s(e,i,r)}r=s(e,i,r);r.length<o&&(e.indexOf("-")<0?r=t(r," ",r.length-o):r=t(r," ",o-r.length));return r},r=new Array;r.c=function(e,t,n,r){return typeof r=="number"?String.fromCharCode(r):typeof r=="string"?r.charAt(0):""};r.d=function(e,t,n,i){return r.i(e,t,n,i)};r.u=function(e,t,n,i){return r.i(e,t,n,Math.abs(i))};r.i=function(e,r,i,s){var o=parseInt(i),u=Math.abs(s).toString().split(".")[0];u.length<o&&(u=t(u," ",o-u.length));return n(e,r,u,s)};r.E=function(e,t,n,i){return r.e(e,t,n,i).toUpperCase()};r.e=function(e,t,r,i){iPrecision=parseInt(r);isNaN(iPrecision)&&(iPrecision=6);rs=Math.abs(i).toExponential(iPrecision);rs.indexOf(".")<0&&e.indexOf("#")>=0&&(rs=rs.replace(/^(.*)(e.*)$/,"$1.$2"));return n(e,t,rs,i)};r.f=function(e,t,r,i){iPrecision=parseInt(r);isNaN(iPrecision)&&(iPrecision=6);rs=Math.abs(i).toFixed(iPrecision);rs.indexOf(".")<0&&e.indexOf("#")>=0&&(rs+=".");return n(e,t,rs,i)};r.G=function(e,t,n,i){return r.g(e,t,n,i).toUpperCase()};r.g=function(e,t,r,i){iPrecision=parseInt(r);absArg=Math.abs(i);rse=absArg.toExponential();rsf=absArg.toFixed(6);if(!isNaN(iPrecision)){rsep=absArg.toExponential(iPrecision);rse=rsep.length<rse.length?rsep:rse;rsfp=absArg.toFixed(iPrecision);rsf=rsfp.length<rsf.length?rsfp:rsf}rse.indexOf(".")<0&&e.indexOf("#")>=0&&(rse=rse.replace(/^(.*)(e.*)$/,"$1.$2"));rsf.indexOf(".")<0&&e.indexOf("#")>=0&&(rsf+=".");rs=rse.length<rsf.length?rse:rsf;return n(e,t,rs,i)};r.o=function(e,r,i,s){var o=parseInt(i),u=Math.round(Math.abs(s)).toString(8);u.length<o&&(u=t(u," ",o-u.length));e.indexOf("#")>=0&&(u="0"+u);return n(e,r,u,s)};r.X=function(e,t,n,i){return r.x(e,t,n,i).toUpperCase()};r.x=function(e,r,i,s){var o=parseInt(i);s=Math.abs(s);var u=Math.round(s).toString(16);u.length<o&&(u=t(u," ",o-u.length));e.indexOf("#")>=0&&(u="0x"+u);return n(e,r,u,s)};r.s=function(e,t,r,i){var s=parseInt(r),o=i;o.length>s&&(o=o.substring(0,s));return n(e,t,o,0)};farr=e.split("%");retstr=farr[0];fpRE=/^([-+ #]*)(\d*)\.?(\d*)([cdieEfFgGosuxX])(.*)$/;for(var i=1;i<farr.length;i++){fps=fpRE.exec(farr[i]);if(!fps)continue;arguments[i]!=null&&(retstr+=r[fps[4]](fps[1],fps[2],fps[3],arguments[i]));retstr+=fps[5]}return retstr};e.uncommentHTML=function(e){return e.indexOf("-->")!=-1&&e.indexOf("<!--")!=-1?e.replace("<!--","").replace("-->",""):e}});window.XMLHelpers||(XMLHelpers=new function(){var e=this;e.getXMLHttpRequest=function(t,n){var r=e.getXMLHttpRequest.arguments,i=e.getXMLHttpRequest.arguments.length,s=i>2?r[2]:"GET",o=i>3?r[3]:"",u=i>4?r[4]:!0,a;if(window.XMLHttpRequest)a=new XMLHttpRequest;else{if(!window.ActiveXObject)return null;try{a=new ActiveXObject("Msxml2.XMLHTTP")}catch(f){a=new ActiveXObject("Microsoft.XMLHTTP")}}u&&(a.onreadystatechange=n);s=="GET"&&o!=""&&(t+="?"+o);a.open(s,t,u);a.setRequestHeader("If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT");a.send(o);return a}});window.CSSHelpers||(CSSHelpers=new function(){function n(e){return"\\s"+e+"\\s|^"+e+"\\s|\\s"+e+"$|"+"^"+e+"$"}function n(e){return"\\s"+e+"\\s|^"+e+"\\s|\\s"+e+"$|"+"^"+e+"$"}var e=this,t=new RegExp("\\s");e.getComputedStyle=function(e,t){var n;typeof e.currentStyle!="undefined"?n=e.currentStyle:n=document.defaultView.getComputedStyle(e,null);return n[t]};e.isMemberOfClass=function(e,r){if(t.test(r))return!1;var i=new RegExp(n(r),"g");return i.test(e.className)};e.addClass=function(n,r){if(t.test(r))return;e.isMemberOfClass(n,r)||(n.className+=" "+r)};e.removeClass=function(e,r){if(t.test(r))return;var i=new RegExp(n(r),"g"),s=e.className;e.className&&(e.className=s.replace(i,""))};e.getElementsByClassName=function(e,t){if(e.getElementsByClassName)return DOMHelpers.nodeListToArray(e.getElementsByClassName(t));var r=[],i=new RegExp(n(t)),s=DOMHelpers.getAllDescendants(e);for(var o=0,u=s.length;o<u;o++)i.test(s[o].className)&&r.push(s[o]);return r}});String.prototype.trim=function(){var e=this;if(this.length>6e3){e=this.replace(StringHelpers.initWhitespaceRe,"");var t=e.length;while(StringHelpers.whitespaceRe.test(e.charAt(--t)));return e.slice(0,t+1)}return this.replace(StringHelpers.initWhitespaceRe,"").replace(StringHelpers.endWhitespaceRe,"")};window.DOMHelpers||(DOMHelpers=new function(){var e=this;e.getAllDescendants=function(e){return e.all?e.all:e.getElementsByTagName("*")};e.nodeListToArray=function(e){var t=[];for(var n=0,r=e.length;n<r;n++)t.push(e[n]);return t}});String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.substr(1)};document.write('<style type="text/css">.cssSandpaper-initiallyHidden { visibility: hidden;} </style>');EventHelpers.addPageLoadEvent("cssSandpaper.init");