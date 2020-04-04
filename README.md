<h1 style="text-align: center;"><b>Slack Blockify</b></h1>

## Description

`slack-blockify`, is a framework that abstracts the boiler plate code of nesting into the handler functions that handle Slack Interactive Actions, and provides di support to handle large number of actions, using reflection.

## **Why blockify?**

Reaching the function that handles a block-kit interactive action, involves nested conditional checks, which becomes difficult to handle as the number of actions grow. Blockify abstracts all the boiler plate code with conditional checks, providing a clean approach, using DI (Dependency Injection), to organise the Action Handlers in a better way.

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
}
```

Only the required payload data can be accessed inside the handler through parameter decorators

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

Register all the classes in an Array, without fail, using register function.

```typescript
import { register } from "slack-blockify/core";

register([ApprovalActions]);
```

Pass the interactive message payload of type `block_actions` to the handlePayload function,
which a _Generic Function_.

`handlePayload` function searches through the registered handlers and executes the respective handler, if found. Otherwise returns "Unhandled Action".

```typescript
import { handlePayload } from "slack-blockify/core";

const response = await handlePayload<ReturnTypeOfMyFunctionHandler>({
    // ... payload sent by slack
});
```

## **Important things to be noted while creating handlers**

handlePayload searches the registered handlers in the following order,
and only the first found handler is executed.

1. An `action` with a `block` - (handlers registered with both action_id and block_id)
    1. Regex action_id and block_id match
    2. string action_id and block_id match
2. An `action` - (handlers registered with only action_id)
    1. Regex action_id match
    2. string action_id match
3. A `block` - (handlers registered with only block_id)
    1. Regex block_id match
    2. string block_id match
4. A `value` - (handlers registered with value)
    1. Regex value match
    2. string value match
5. Array of `values` - (handlers registered with a list of search values)
    1. Regex values match
    2. string values match
6. A `value` validating function - (handlers registered with value validating function)
    1. The provided function is executed and its boolean result finds the handler

## Prioritising your Actions and Blocks

You can pass the `Configuration options` (optional), as the second parameter to the register function, to achieve high performance.

The below is the default configuration for high performance.

```typescript
register([...classes], {
    priorities: ["ActionsWithBlocks", "Actions", "Blocks", "Value"]
});
```

## Upcoming features

-   Warning messages and Suggestions, for better debugging.
-   View Submission handling, for modal submissions.

## **Authors**

-   Amit Madgula (amitsharmamad@gmail.com)

_**Documentation to this framework would be provided soon.**_
