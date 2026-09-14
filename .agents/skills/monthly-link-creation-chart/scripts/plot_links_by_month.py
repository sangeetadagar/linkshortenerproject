#!/usr/bin/env python3
"""Query monthly link counts and export them as a PNG bar chart."""

from __future__ import annotations

import argparse
import os
from pathlib import Path

import matplotlib.pyplot as plt
import psycopg

QUERY = """
WITH months AS (
    SELECT generate_series(
        date_trunc('month', CURRENT_DATE) - INTERVAL '11 months',
        date_trunc('month', CURRENT_DATE),
        INTERVAL '1 month'
    ) AS month_start
)
SELECT
    months.month_start,
    COUNT(links.id)::integer AS link_count
FROM months
LEFT JOIN links
    ON links.created_at >= months.month_start
    AND links.created_at < months.month_start + INTERVAL '1 month'
GROUP BY months.month_start
ORDER BY months.month_start;
"""


def load_env_file(env_file: Path) -> None:
    """Load simple KEY=VALUE entries without printing their values."""
    if not env_file.is_file():
        return

    for raw_line in env_file.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


def fetch_monthly_counts(database_url: str) -> list[tuple[object, int]]:
    with psycopg.connect(database_url) as connection:
        with connection.cursor() as cursor:
            cursor.execute(QUERY)
            rows = cursor.fetchall()

    if len(rows) != 12:
        raise RuntimeError(f"Expected 12 monthly rows, received {len(rows)}")

    return [(month_start, int(link_count)) for month_start, link_count in rows]


def plot_counts(rows: list[tuple[object, int]], output_path: Path) -> None:
    labels = [month_start.strftime("%b %Y") for month_start, _ in rows]
    counts = [link_count for _, link_count in rows]

    figure, axis = plt.subplots(figsize=(12, 6))
    bars = axis.bar(labels, counts, color="#2563eb", width=0.72)
    axis.set_title("Links created by month - last 12 months")
    axis.set_xlabel("Month")
    axis.set_ylabel("Number of links created")
    axis.tick_params(axis="x", rotation=45)
    axis.set_ylim(bottom=0)
    axis.grid(axis="y", linestyle="--", alpha=0.3)
    axis.set_axisbelow(True)

    for bar, count in zip(bars, counts):
        axis.annotate(
            str(count),
            xy=(bar.get_x() + bar.get_width() / 2, count),
            xytext=(0, 4),
            textcoords="offset points",
            ha="center",
            va="bottom",
        )

    figure.tight_layout()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    figure.savefig(output_path, format="png", dpi=160)
    plt.close(figure)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Export the last 12 months of link creation counts as a PNG."
    )
    parser.add_argument(
        "--env-file",
        type=Path,
        default=Path(".env"),
        help="Path to the env file containing DATABASE_URL (default: .env)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("links-created-last-12-months.png"),
        help="PNG output path",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    load_env_file(args.env_file)
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        raise SystemExit("DATABASE_URL was not found in the environment or env file")

    rows = fetch_monthly_counts(database_url)
    plot_counts(rows, args.output)
    for month_start, link_count in rows:
        print(f"{month_start:%Y-%m}: {link_count}")
    print(f"Chart written to {args.output}")


if __name__ == "__main__":
    main()
