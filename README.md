
# Fabrik Action List Pluguin

The `Action List` plugin allows you to add a new action to the actions line of a list. This plugin can work together with a module or with its own code in PHP or Javascript, the registered script will be executed as soon as the user clicks on the button. The action is displayed as per the access level setting.

## Contents
  - [Specifications](#specifications)
  - [Use](#use)

### Specifications

<img src="./.github/1en.png" />

- `Access Level`: Determines the access level of the user who sees the action.

- `Action Type`: `FUNCTION RETURN` prints the result of PHP code, while `FUNCTION RUN` displays a button that executes PHP code.

- `Type of code`: Indicate the language of the code to be executed - PHP or Javascript.

- `Button text`: Button label.

- `Button icon`: The icon displayed on the button (can be blank).

- `PHP Code`: The code to be executed if PHP Type is selected.

- `Javascript Code`: The code to be executed if Javascript Type is selected.

- `Success message`: Message to be displayed after execution if necessary.

### Use

After performing the necessary configurations by inserting the desired parameters and the script, the `Action Button` will appear at the top of the list and, when clicked, it will execute the indicated script (PHP or Javascript), then the `Success message` will be displayed, if configured.


  <img src="./.github/2en.png" />

