<h1 style="text-align: center;"><b>Slack Blockify</b></h1>

## Description

`slack-blockify`, is a framework that abstracts the boiler plate code of nesting into the handler functions of Slack Interactive Actions, and provides di support to handle large number of actions, using reflection.

## **Before Getting Started**

Using action_id and block_id, while composing a block-kit message,
is the primary thing that has to be done, to use this framework effectively.

Splitting a message into blocks and and giving them meaningful block_id's,
and action_id's, is an effective way of handling block kit
interactive actions.

**Advantages of using this framework**

1. The boilerplate code for nesting into the handler functions (which is clumpsy) is abstracted.
2. Clean Code
3. Ease of Readability
4. Full Type support

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

Decorate your Actions classes with the Actions decorator

Action Registers are `class decorators`

```typescript
@Actions()
class ApprovalActions {}
```

Annotate all the function handlers with the respective interactive-action-types

Handler Registers are `method decorators`

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

Only the required message data can be accessed inside the handler

Value Providers are `parameter decorators`

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
