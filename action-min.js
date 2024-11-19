/**
 * List Action
 *
 * @copyright: Copyright (C) 2019-2020, PITT - All rights reserved.
 * @license  : GNU/GPL http           :                              //www.gnu.org/copyleft/gpl.html
 */
define(["jquery","fab/fabrik"],(function(n,t){return new Class({initialize:function(t){this.options=JSON.parse(t);var e=n(".actionButton");switch(this.options.functionType){case"phpReturn":this.setPHPReturn(e);break;case"phpTrigger":this.setPHPTrigger(e);break;case"jsReturn":this.processJavascript(e);break;case"jsTrigger":this.createButtonJSTrigger(e)}},setPHPReturn:function(t){const e=this.options.functionReturn;if(-1!=e){var o=n('<i data-isicon="true" class="'+this.options.frontEndIcon+'"></i>');t.append(o,"  "),t.append(e)}else alert("There is an error on executing the PHP code in action plugin.")},setPHPTrigger:function(t){var e=this;const o=this.options.buttonLabel;var i=n('<i data-isicon="true" class="'+this.options.frontEndIcon+'"></i>');t.append(i,"  "),t.append(o),t.css("cursor","pointer"),t.on("click",(function(){e.runPHPFunction().done((function(n){const t=JSON.decode(n);t.return?alert(e.options.successMessage):alert(t.errorMsg)}))}))},runPHPFunction:function(){const t=this.options.phpCode;return n.ajax({url:"index.php",method:"get",data:{option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"action",method:"ProcessPHPAction",phpString:t,g:"list"}})},processJavascript:function(t){const e=this.runJavascriptCode();if(-1!=e){var o=n('<i data-isicon="true" class="'+this.options.frontEndIcon+'"></i>');t.append(o,"  "),t.append(e)}else alert("There is an error on executing the Javascript code in action plugin, see console for details.")},createButtonJSTrigger:function(t){var e=this;const o=this.options.buttonLabel;var i=n('<i data-isicon="true" class="'+this.options.frontEndIcon+'"></i>');t.append(i,"  "),t.append(o),t.css("cursor","pointer"),t.on("click",(function(){-1==e.runJavascriptCode()?alert("There is an error on executing the Javascript code, see console for details."):alert(e.options.successMessage)}))},runJavascriptCode:function(){const n=this.options.jsCode;try{return new Function(n)()}catch(n){return console.log("There is an error on executing the Javascript code: "),console.log(n),-1}}})}));