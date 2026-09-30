"""Regenerates every page of the portfolio from the page scripts.

    python3 portfolio/_build/build.py
"""
import os
import runpy
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
for script in ("index_page.py", "batech_page.py", "cases_page.py"):
    runpy.run_path(os.path.join(HERE, script), run_name="__main__")
