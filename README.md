<h1 style="text-align: center;"><b>Slack Blockify</b></h1>

## Description

`slack-blockify`, is a framework that abstracts the boiler plate code of nesting into the handler functions that handle Slack Interactive Actions, and provides di support to handle large number of actions, using reflection.

## **Why blockify?**

Reaching the function that handles a block-kit interactive action, involves nested conditional checks, which becomes difficult to handle as the number of actions grow. Blockify abstracts all the boiler plate code of conditional checks, giving a clean approach, using DI (Dependency Injection), to organise the Action Handlers better.

# Usage

Import decorators from slack-blockify

```typescript
import {
    Actions,
    ButtonAction,
    SelectOptionAction,
    SelectOptionsAction,
    OverflowAction,
    DatepickerAction,
    ActionByValue
} from "slack-blockify/decorators";
```

Decorate the Actions classes with the Actions decorator

-   `class decorators` are Action Registers

```typescript
@Actions()
class ApprovalActions {}
```

Decorate methods with the respective interactive-action-types

-   `method decorators` are Handler Registers
-   The list of method decorators are:
    1.  ButtonAction
    2.  SelectOptionAction
    3.  SelectOptionsAction
    4.  OverflowAction
    5.  DatepickerAction
    6.  ActionByValue

```typescript
@Actions()
class ApprovalActions {
    // Method to handle the action with the `action_id` approve
    // and block_id approvals
    @ButtonAction("approve", "approvals")
    async handleApproval() {
        // handle the approval action
        return "approved";
    }
    // Method to handle the action with the `action_id` reject
    // and block_id approvals
    @ButtonAction("reject", "approvals")
    async handleRejection() {
        // handle the reject action
        return "rejected";
    }
}
```

Only the required payload data can be accessed inside the handler through property decorators

-   `parameter decorators` are value providers
-   The list of property decorators are:
    1.  UserInfo
    2.  TeamInfo
    3.  Value (Non-Multi Select)
    4.  Values (Multi Select)
    5.  ActionsInfo
    6.  ContainerInfo
    7.  TriggerId
    8.  ResponseUrl
    9.  ApiAppId
    10. PayloadInfo

```typescript
import { User, Team } from "slack-blockify";

@Actions()
class ApprovalActions {
    @ButtonAction("approval", "approvals")
    async handleApproval(@UserInfo() user: User, @TeamInfo() team: Team) {
        // handle the approval action
        user; // Access the user's properties - id, username, name, team_id
        team; // Access the team's properties - id, domain
        return "approved";
    }
}
```

Register all the classes, without fail, using the `register` function.

```typescript
import { register } from "slack-blockify/core";

register(ApprovalActions);
```

Pass the interactive message payload of type `block_actions` to the handlePayload function,
which a _Generic Function_

```typescript
import { handlePayload } from "slack-blockify/core";

// returns the message that is returned by the handler, if exists or
// returns "Unhandled Action"
const response = await handlePayload<ReturnTypeOfMyFunctionHandler>({
    // ... payload sent by slack
});
```

## **Important things to be noted while creating handlers**

handlePayload searches the registered handlers in the following order,
and only the first found handler is executed.

1. A `value` - (handlers registered with value)
    1. Regex value match
    2. string value match
2. Array of `values` - (handlers registered with a list of search values)
    1. Regex values match
    2. string values match
3. An `action` with a `block` - (handlers registered with both action_id and block_id)
    1. Regex action_id and block_id match
    2. string action_id and block_id match
4. An `action` - (handlers registered with only action_id)
    1. Regex action_id match
    2. string action_id match
5. A `block` - (handlers registered with only block_id)
    1. Regex block_id match
    2. string block_id match

## Best Practices

-   Using action_id and block_id, while composing the messages, is highly recommended.
-   Using direct string values while registering an action handler is recommended instead of a RegExp.
-   Using action values is not recommended.
-   Using the combination of action_id and block_id, gives high performance and is a good practice to handle interactive actions.

## Near-Future Usecases

-   Warning messages and Suggestions would be provided, for better debugging.
-   View Submission handling.

## **Authors**

-   Amit Madgula (amitsharmamad@gmail.com)

_**Documentation to this framework would be provided soon.**_
