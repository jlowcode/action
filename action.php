<?php
/**
 *  Add an action button to run PHP or get a result from a function
 *
 * @package     Joomla.Plugin
 * @subpackage  Fabrik.list.php
 * @copyright   Copyright (C) 2005-2016  Media A-Team, Inc. - All rights reserved.
 * @license     GNU/GPL http://www.gnu.org/copyleft/gpl.html
 */

// No direct access
defined('_JEXEC') or die('Restricted access');

// Require the abstract plugin class
require_once COM_FABRIK_FRONTEND . '/models/plugin-list.php';

/**
 *  Add an action button to run PHP
 *
 * @package     Joomla.Plugin
 * @subpackage  Fabrik.list.php
 * @since       3.0
 */

class PlgFabrik_ListAction extends plgFabrik_List
{

	/*
	* Init function
	*/
	protected function init() {
		$this->aclParam = 'table_action_access';
		// Verify permission to use the plugin
		$canUse = $this->canUse('table_action_access');

		// If can't use just stop
		if(!$canUse) {
			return;
		}
		// Set variable to show button
		$_REQUEST['action']['showButton'] = true;
		// Get the params
		$params = $this->getParams();
		// Get the type: function result or trigger
		$actionType = $params->get('button_type');
		// Create the opts object
		$opts = new StdClass;
		// Verify if is php or javascript @TODO
		$codeType = $params->get('button_action_code_type');
		// Get icon to front-end
		$opts->frontEndIcon = $params->get('list_action_image_name');
		
		
		if($actionType == 0) {
			/* Get the function return and appends to a button */
			// Verify if $codeType has value
			
			if($codeType === NULL || $codeType == '') {
				// @TODO ERROR MSG
				return;
			}

			if($codeType == 1) {
				/* JavaScript */
				// Set the option to js return function
				$opts->functionType = 'jsReturn';
				// Get the JS code
				$jsCode = $params->get('table_action_js_code');
				// Set js code
				$opts->jsCode = $jsCode;
			} else if ($codeType == 0) {
				/* PHP */
				// Set the option to php return function
				$opts->functionType = 'phpReturn';
				// Gets the function return
				$functionReturn = $this->runFunctionGetReturn();
				// Set return to show in button
				$opts->functionReturn = $functionReturn;

			}



		} else if ($actionType == 1){
			/* Run function on click a button */

			// Gets the button label
			$buttonLabel = $params->get('table_action_button_label');
			// Set button label to javascript
			$opts->buttonLabel = $buttonLabel;
			// Set success message
			$opts->successMessage = $params->get('table_action_msg');

			if($codeType == 1) {
				/* JavaScript */
				// Set the option to JS trigger function
				$opts->functionType = 'jsTrigger';
				// Get the JS code
				$jsCode = $params->get('table_action_js_code');
				// Set js code
				$opts->jsCode = $jsCode;
			} else if ($codeType == 0) {
				/* PHP */
				// Set the option to php trigger function
				$opts->functionType = 'phpTrigger';
				// Get php code
				$phpCode = $params->get('table_action_code');
				// Set function string 
				$opts->phpCode = $phpCode;	
			}
			
			
					
		}
		
		// Load the JS code and pass the opts
		$this->loadJS($opts);


	}

	/* 
	* run the php code
	* Ajax functions must to be public 
	*/
	public function onProcessPHPAction() {
		$filter = JFilterInput::getInstance();
		$request = $filter->clean($_REQUEST, 'array');
		$phpCode = $request['phpString'];
		$response = new StdClass;
		try {
			// Run the code
			$functionReturn = eval($phpCode);
			$response->return = true;
			echo json_encode($response);
		} catch (ParseError $e) {
			// Report error
			$response->return = false;
			$response->errorMsg = 'Error on executing PHP: ' .  $e->getMessage() . "\n";
			echo json_encode($response);
		}		
	}


	/*
	* Run PHP code and get the return to button
	*/
	protected function runFunctionGetReturn() {
		// Get the params
		$params = $this->getParams();
		// Gets the code from database
		$phpCode = $params->get('table_action_code');
		
		try {
			// Run the code
			$functionReturn = eval($phpCode);
			return $functionReturn;
			
		} catch (ParseError $e) {
			// Report error
			echo 'Error on executing PHP: ',  $e->getMessage(), "\n";
			return -1;
		}

	}
	
	
	
	/*
	* Function to load the javascript code for the plugin
	*/
	protected function loadJS($opts) {
		$optsJson = json_encode($opts);
		$this->opts = $optsJson;
		$jsFiles = array();
		$jsFiles['Fabrik'] = 'media/com_fabrik/js/fabrik.js';
		$jsFiles['FabrikAction'] = '/plugins/fabrik_list/action/action.js';
		// $script = "var workflow = new FabrikAction($options);";
		$script = "var fabrikAction = new FabrikAction($optsJson);";
		//FabrikHelperHTML::script($jsFiles, $script);
	}
	
	public function onloadJavascriptInstance($args)
    {
		parent::onLoadJavascriptInstance($args);

        $this->jsInstance = "new FbListAction({$this->opts})";

        return true;
    }

    public function loadJavascriptClassName_result()
    {
        return 'FbListAction';
    }

	/*
	* Function run on when list is being loaded
	* Used to trigger the init function
	*/
	public function onLoadData(&$args) {
		$this->init();
	}

	public function canUse($location = null, $event = null) {
		$aclParam = $this->aclParam;
		if ($aclParam == '')
		{
			return true;
		}

		$params = $this->getParams();
		$groups = $this->user->getAuthorisedViewLevels();

		return in_array($params->get($aclParam), $groups);
	}
	
}
