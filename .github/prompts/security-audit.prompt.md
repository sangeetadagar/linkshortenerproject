---
name: security-audit
description: Detect potential security vulnerabilities in the codebase and provide recommendations for mitigation.
agent: ask
---

perform a security audit of the codebase, identifying potential vulnerabilities in this project.

Output your findings as a markdown formatted table with the following columns(ID should start at 1 and auto increment, File Path should be actual link to the file): ID, Severity (Low, Medium, High), Issue, File Path, Line Number and Recommendation.

Next, ask the user which issue they want to fix first by either replying all or by providing the comma seperated list of IDs. After their reply, run a separate subagent (#runSubagent) to fix the selected issues. Each subagent should report back with as simple `subAgentSuccess: true|false` response and a brief summary of the changes made.
