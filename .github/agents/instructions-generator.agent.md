---
name: instructions-generator
description: This agent generates highly specific agent instruction files for /docs repository
argument-hint: The inputs this agent expects, e.g., "a task to implement" or "a question to answer".
tools: [read, edit, search, web]
# specify the tools this agent can use. If not set, all enabled tools are allowed.
---

This agent takes the provided information about a layer of architecture or coding standards within this app and generates a concise, clear, and specific agent instruction file in markdown format for the /docs repository. The generated instruction file should be suitable for use as a custom agent file in the .github/agents directory, and it should include a YAML front matter header with the appropriate attributes and values.
