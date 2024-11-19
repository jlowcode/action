/**
 * List Action
 *
 * @copyright: Copyright (C) 2019-2020, PITT - All rights reserved.
 * @license  : GNU/GPL http           :                              //www.gnu.org/copyleft/gpl.html
 */
define(['jquery', 'fab/fabrik'], function (jQuery, Fabrik) {
    var FbListAction = new Class({
        
        // Implements: [Events],

        initialize: function (options) { 
            // Init options
            this.options = JSON.parse(options);
            // Get the button
            var actionButton = jQuery('.actionButton');

            switch (this.options.functionType) {
                case 'phpReturn':                
                    this.setPHPReturn(actionButton);
                    break;
                
                case 'phpTrigger':
                    this.setPHPTrigger(actionButton);
                    break;
                
                case 'jsReturn':      
                    this.processJavascript(actionButton);
                    break;

                case 'jsTrigger':
                    this.createButtonJSTrigger(actionButton);
                    break;
            }
        },

        /*
        * This function sets the PHP return, 
        * executed on page load in action.php
        */
        setPHPReturn: function (actionButton) {
            // Get the return
            const functionReturnText = this.options.functionReturn;
            // Verify if has any error on executing the Javascript code
            if(functionReturnText == -1) {
                alert('There is an error on executing the PHP code in action plugin.'); 
                return;
            }
            // Create the icon
            var icon = jQuery('<i data-isicon="true" class="'+this.options.frontEndIcon+'"></i>')

            // Append itens
            actionButton.append(icon, '  ');
            actionButton.append(functionReturnText);
        },

        /*
        * This function set the button to trigger
        * the PHP execution on action.php
        */
        setPHPTrigger: function (actionButton) {
            var   self        = this;
            const buttonLabel = this.options.buttonLabel;
             // Create the icon
             var icon = jQuery('<i data-isicon="true" class="'+this.options.frontEndIcon+'"></i>');
             // Append itens
             actionButton.append(icon, '  ');
            actionButton.append(buttonLabel);
            actionButton.css('cursor', 'pointer');
            actionButton.on('click', function () {
                self.runPHPFunction().done(function (retorno) {
                    const done = JSON.decode(retorno);
                    if(done.return) {
                        alert(self.options.successMessage);
                    } else {
                        alert(done.errorMsg);
                    }
                });
            })
        },

        /* 
        * Ajax function to run php code on server 
        */
        runPHPFunction: function () {
            const phpString = this.options.phpCode;
            return jQuery.ajax({
				'url'   : 'index.php',
				'method': 'get',
				'data'  : {
					'option'   : 'com_fabrik',
					'format'   : 'raw',
					'task'     : 'plugin.pluginAjax',
					'plugin'   : 'action',
					'method'   : 'ProcessPHPAction',
					'phpString': phpString,
					'g'        : 'list'
				}
			});
        },

        /*
        * Function to process the execution and append
        * the results to the button
        */
        processJavascript: function (actionButton) {
            // Get the return
            const functionReturnText = this.runJavascriptCode();
            
            // Verify if has any error on executing the Javascript code
            if(functionReturnText == -1) {
                alert('There is an error on executing the Javascript code in action plugin, see console for details.'); 
                return;
            }
            
            // Create the icon
            var icon = jQuery('<i data-isicon="true" class="'+this.options.frontEndIcon+'"></i>');

            // Append itens
            actionButton.append(icon, '  ');
            actionButton.append(functionReturnText);
            
        },

        createButtonJSTrigger: function (actionButton) {
            var   self        = this;
            const buttonLabel = this.options.buttonLabel;
            // Create the icon
            var icon = jQuery('<i data-isicon="true" class="'+this.options.frontEndIcon+'"></i>');
            actionButton.append(icon, '  ');
            actionButton.append(buttonLabel);
            actionButton.css('cursor', 'pointer');
            actionButton.on('click', function () {
                const result = self.runJavascriptCode();
                if(result == -1) {
                    alert('There is an error on executing the Javascript code, see console for details.'); 
                } else {
                    alert(self.options.successMessage);
                }
            })
        },
        
        /* 
        * Function to run a Javascript code from a String
        */
        runJavascriptCode: function () {
            // Get code 
            const jsCode = this.options.jsCode;
            // Put code in function
            
            try {
                var F = new Function (jsCode);
                return(F());
            }
            catch (e) {
                // declarações para manipular quaisquer exceções
                console.log('There is an error on executing the Javascript code: ');
                console.log(e);
                return -1;
            }
        }, 
    });
    return FbListAction;
});
