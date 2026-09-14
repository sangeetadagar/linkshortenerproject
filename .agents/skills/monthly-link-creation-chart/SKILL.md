---
name: monthly-link-creation-chart
description: Query a PostgreSQL database for link records created during the most recent 12 calendar months and export a bar-chart PNG of monthly link totals. Use this skill whenever the user asks for link-creation trends, monthly link counts, a 12-month link report, or a chart/visualization based on the app's links table, even if they do not explicitly mention this skill.
compatibility: Requires Python 3.10+, a PostgreSQL DATABASE_URL available in the project's `.env`, and the Python packages `psycopg[binary]` and `matplotlib`.
---

# Monthly Link Creation Chart

Create a reproducible PNG report from the application's PostgreSQL `links` table. The report covers the current calendar month and the preceding 11 calendar months, for 12 months total.

## Workflow

1. Identify the repository root containing `.env` and confirm that it has a `DATABASE_URL` entry. Never print the URL or any credentials.
2. Ensure the runtime has Python 3.10+ and the dependencies `psycopg[binary]` and `matplotlib`. Install them in the active environment only when missing.
3. Run the bundled script from the repository root:

   ```bash
   python .agents/skills/monthly-link-creation-chart/scripts/plot_links_by_month.py \
     --env-file .env \
     --output links-created-last-12-months.png
   ```

4. Report the created PNG path and the twelve monthly totals. Do not report connection details.
5. Verify that the output exists, is a PNG, and contains twelve bars/month labels before declaring success.

## Data contract

The application stores links in `links` with the creation timestamp in `created_at`. Use the database's current time and calendar-month boundaries. Include empty months with a count of zero; do not omit them or substitute a rolling 365-day bucket. The query must return one row for each of the 12 months in chronological order.

The bundled script uses a parameter-free SQL query with `generate_series` and a left join so that missing months remain visible. It relies on PostgreSQL to interpret the timezone-aware `created_at` values consistently with the database session.

## Output requirements

- Export a real PNG image, not an HTML chart or a text-only report.
- Use an accessible, readable title such as `Links created by month - last 12 months`.
- Label the x-axis with abbreviated month and year, and label the y-axis `Number of links created`.
- Keep bars in chronological order and use integer tick labels where practical.
- Use a tight layout so labels are not clipped.
- If the query or plot fails, preserve the error context while keeping credentials out of logs and output.

## Safety and correctness

- Read `DATABASE_URL` from `.env` or the explicitly supplied env file; do not hard-code it and do not expose it in shell output.
- Use a read-only `SELECT`; never modify schema or application data.
- Close the database connection after fetching the rows.
- Fail clearly when `DATABASE_URL` is absent, the query returns an unexpected number of months, or the output cannot be written.
