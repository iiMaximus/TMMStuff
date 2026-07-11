# FSM Tutorial Gap Audit

This compares the cleaned photographed cheat sheet against the PDFs in `FSM/tutorials/`.

## Verdict

The photographed sheet covers the two simulation-test families well:

- truss/frame reactions and diagrams;
- buckling and yielding of rods;
- T-beam centroid/stress/deflection;
- shoulder shaft initial and complete yielding.

But the tutorial folder adds several exam methods that were missing or too thin. I added those methods to:

- `fsm-cheat-sheet-clean.md`
- `fsm-one-page-cheat-sheet.md`

## Missing Or Weak Areas Found

| Tutorial source | Missing method/formula | Why it matters |
| --- | --- | --- |
| Tutorial 04 Failure criteria | Tresca general/plane/simple formulas | Ductile failure questions may ask Tresca, not only Von Mises |
| Tutorial 04 Failure criteria | Rankine for brittle materials | Cast iron examples use brittle failure logic |
| Tutorial 04 Failure criteria | Principal stresses from `sigma_x`, `sigma_y`, `tau_xy` | Needed before Rankine/Tresca in component stress states |
| Tutorial 04 Failure criteria | Strain-gauge conversion using Hooke law | Example 7 starts from strain, not stress |
| Tutorial 05 Cross sections | `I_xy`, principal axes, principal inertias | Needed for L, C, and unsymmetric sections |
| Additional geometry exercises | Holes/negative areas and principal geometry | Geometry-only exam questions can appear |
| Tutorial 06 Bending | Unsymmetrical bending and neutral axis | L/C sections cannot be solved with only T-beam formulas |
| Tutorial 06 Bending | Elastic-line integration method | Deflection questions may not match a memorized formula |
| Tutorial 07 Torsion | Angle of twist `phi = T L/(G J)` | Shaft torsion problems ask relative rotations |
| Tutorial 07 Torsion | Thin-walled torsion and Bredt theory | Closed vs open thin-wall torsion is a major trap |
| Tutorial 08 Shear & Buckling | Beam shear stress `tau = VQ/(Ib)` | Shear stress distribution is separate from shear-force diagrams |
| Tutorial 08 Shear & Buckling | Shear centre and eccentric shear torsion | Loads through the centroid of open sections can still twist |
| Tutorial 9 3D structures | 3D equilibrium and gear-force shaft checks | Gear shafts combine two bending planes, axial force, and torque |

## Exam-Priority Ranking

Highest priority:

1. Failure criteria: Tresca, Von Mises, Rankine.
2. Principal stresses and Von Mises for combined normal/shear stress.
3. Cross-section geometry: centroid, `I_xx`, `I_yy`, `I_xy`, principal axes.
4. Shaft checks with `M_b = sqrt(M_x^2 + M_y^2)`, torque, axial load, and `K_t`.
5. Euler buckling with correct effective length and weak-axis inertia.

Medium priority:

1. Elastic-line integration and boundary conditions.
2. Beam shear stress `tau = VQ/(Ib)`.
3. Thin-walled torsion, especially closed-section Bredt theory.
4. Shear centre for open sections.

Lower priority but still useful:

1. Exact reaction values from tutorial examples.
2. Full drawn distributions for every tutorial cross-section.
3. Material table details, except choosing the correct `S_y`/`S_U` for the diameter range when given.

## Fast Rule Summary

Use these when deciding which formula family applies:

- Ductile material with combined stress: use Tresca or Von Mises, depending on the question.
- Brittle material: use Rankine with principal tensile stress.
- Unsymmetric cross-section: compute `I_xy`, rotate to principal axes, then do bending.
- Deflection: if no exact formula matches, write `E I v'' = M(z)` and integrate by regions.
- Thin-walled closed torsion: use Bredt, `q = T/(2 A_m)`.
- Open section with shear not through shear centre: add torsion `M_t = F e`.
- Gear shaft: solve reactions in 3D, combine bending planes, then combine normal and shear stress.

