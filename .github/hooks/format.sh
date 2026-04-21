# #!/usr/bin/env bash
# # Only run prettier when a file was created or edited.
# # The hook receives context as JSON on stdin; extract toolName with jq.
# INPUT=$(cat)
# TOOL_NAME=$(echo "$INPUT" | jq -r '.toolName')

# if [[ "$TOOL_NAME" == "create" || "$TOOL_NAME" == "edit" ]]; then
#   npx prettier --write .
# fi
