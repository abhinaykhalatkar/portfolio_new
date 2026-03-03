# Security and Upgrade Verification Summary

Date: 2026-03-03

## npm audit comparison

| Scope | Critical | High | Moderate | Low | Total |
|---|---:|---:|---:|---:|---:|
| Before upgrade | 2 | 26 | 19 | 6 | 53 |
| After upgrade (all deps) | 0 | 0 | 0 | 0 | 0 |
| After upgrade (prod only) | 0 | 0 | 0 | 0 | 0 |

## Evidence files

- reports/audit-before.json
- reports/audit-after.json
- reports/audit-prod-after.json
- reports/outdated-before.txt
- reports/outdated-after.txt
- reports/build-before.txt
- reports/build-after.txt
- reports/test-before.txt
- reports/test-after.txt

## Notes

- Toolchain was migrated from Create React App to Vite/Vitest to remove unmaintained transitive dependency risk.
- Runtime dependency vulnerabilities are remediated (npm audit --omit=dev is clean).
- React remains on the latest 18.x line by design for compatibility; React 19 is available but intentionally out of scope.
- Sass source files still emit deprecation warnings for legacy @import and darken() usage; these are non-security warnings and can be addressed in a follow-up style-system cleanup.


