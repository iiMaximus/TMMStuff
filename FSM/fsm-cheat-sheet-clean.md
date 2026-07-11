# FSM Clean Cheat Sheet

Cleaned from the photographed "Caveman Cheat Sheet" pages.

Main rule: do not start with formulas. First identify the structure, the support constraints, the local axes, and what failure mode the question is asking for.

## 0. Exam Workflow

1. Draw the free-body diagram.
2. Count constraints and check determinacy.
3. Solve external reactions.
4. Split the structure only when needed:
   - Truss: solve joints.
   - Frame: separate bodies at hinges.
   - Beam: cut sections for N, T, M diagrams.
   - Shaft: collect M, T, and N at the dangerous section.
5. Pick the failure check:
   - Tension/yielding: compare stress to `S_y`.
   - Compression/buckling: compare force to `P_cr`.
   - Combined shaft stress: use Von Mises.
6. Safety factor is always:

```text
n = capacity / demand
```

## 1. Truss Analysis

Use this when all members are pin-jointed rods. Truss members carry axial force only.

### A. Reactions

Determinacy for a planar truss:

```text
h = m + r - 2j
```

Where:

- `m` = number of members/rods
- `r` = number of external reaction components
- `j` = number of joints

Interpretation:

- `h = 0`: isostatic, solvable by statics.
- `h > 0`: statically indeterminate.
- `h < 0`: mechanism or unstable.

Common supports:

- Pin: 2 reactions, usually `H_A` and `V_A`.
- Roller on horizontal ground: 1 vertical reaction.
- Roller on vertical wall: 1 horizontal reaction.

Reaction steps:

1. Treat the whole truss as one rigid body.
2. Take moments about a support to eliminate its reactions.
3. Use `sum F_x = 0`.
4. Use `sum F_y = 0`.

Example pattern from the sheet:

```text
sum M_A = 0:  H_D*h - F*(2L) = 0
H_D = 2F

sum F_x = 0:  H_A + H_D = 0
H_A = -2F

sum F_y = 0:  V_A - F = 0
V_A = F
```

### B. Internal Forces: Method of Joints

Pick a joint with no more than two unknown member forces.

For each joint:

```text
sum F_x = 0
sum F_y = 0
```

Sign convention:

- Assume unknown member forces are tension, pulling away from the joint.
- Positive answer: member is in tension.
- Negative answer: member is in compression.

Typical diagonal at 45 degrees:

```text
N_x = N*cos(45) = N/sqrt(2)
N_y = N*sin(45) = N/sqrt(2)
```

Important truss trap:

```text
Shear T_y = 0
Bending moment M_z = 0
```

Truss rods only have axial force `N`. If the exam asks for truss shear or bending diagrams, draw a flat zero line.

### C. Tension Yielding

For a member in tension:

```text
sigma = N / A
n_yield = S_y / sigma
```

For a hollow circular tube:

```text
A = pi*(D^2 - d^2)/4
I = pi*(D^4 - d^4)/64
```

Use `A` for tensile stress. Use `I` for buckling.

### D. Compression Buckling

For a member in compression, do not compare stress to `S_y` first. Check Euler buckling:

```text
P_cr = pi^2 * E * I / L_0^2
n_buckling = P_cr / abs(N_compression)
```

Effective buckling length:

```text
Pin-Pin:       L_0 = 1.0L
Clamped-Free: L_0 = 2.0L
Clamped-Pin:  L_0 = 0.7L
Clamped-Clamped: L_0 = 0.5L
```

Length trap:

- Horizontal or vertical rod: `L_rod = L`.
- 45 degree diagonal rod: `L_rod = L*sqrt(2)`.

### E. Truss Trap List

- Do not calculate truss shear or bending moment diagrams. They are zero.
- A vertical wall roller gives a horizontal reaction only.
- Diagonal rods are longer than `L`.
- Compression failure uses `P_cr` and force `N`, not `sigma` against `S_y`.
- For buckling use the weakest/least moment of inertia if the cross-section has two different bending axes.

## 2. Frame Structures

Use this when members are connected by hinges but can carry shear and bending.

### A. Separate Bodies At Internal Hinges

If a frame has an internal hinge, explode the structure into separate bodies.

At a hinge `C`:

```text
Body 1 has:  H_C,  V_C
Body 2 has: -H_C, -V_C
```

The internal hinge forces are equal and opposite.

General solving routine:

1. Draw the whole-frame free-body diagram.
2. Use whole-frame equilibrium if it eliminates unknowns cleanly.
3. Separate bodies at the hinge.
4. Take moments about the hinge when possible to remove hinge reactions.
5. Solve `sum F_x = 0` and `sum F_y = 0` on each body.

### B. Determinacy Idea

A planar rigid body has 3 equilibrium equations.

For a structure made of multiple bodies:

```text
available equations = 3 * number_of_bodies
```

The structure is isostatic when the number of independent unknown reaction/hinge components equals the number of available equilibrium equations.

### C. Slanted Forces

Immediately split angled loads into components.

For a force `F*sqrt(2)` at 45 degrees:

```text
F_x = F*sqrt(2)*cos(45) = F
F_y = F*sqrt(2)*sin(45) = F
```

Then use only horizontal and vertical components in equilibrium.

### D. Diagram Strategy: N, T_y, M_x

For bent frames, draw diagrams segment by segment.

Rules from the sheet:

- Start from free ends when possible.
- Use the local axes given in the problem.
- A point force causes a jump in shear or axial force.
- A point moment causes a jump in bending moment.
- A distributed load changes shear linearly and moment quadratically.
- At a corner, forces transfer between local axes:
  - Shear on one segment can become axial on the next.
  - Axial on one segment can become shear on the next.
  - Bending moment stays continuous unless an external point moment is applied.

Common frame trap:

- The sign of `N`, `T_y`, and `M_x` depends on the local axes. Do not copy signs from another segment without rotating the coordinate system.

### E. Two-Force Member Check

A member is a two-force member only when:

- it is loaded at two points only,
- both loads are end forces,
- there are no intermediate loads or applied moments.

If true, the end forces must be equal, opposite, and collinear along the member.

If there is any load or connection in between, it is not a simple two-force member.

## 3. Shaft Analysis

Use this for circular shafts with bending moment `M`, torque `T`, and axial force `N`.

### A. Collect Loads At The Dangerous Section

At the section being checked, usually a shoulder or diameter change:

```text
M = bending moment at the section
T = torque at the section
N = axial force at the section
```

Typical units:

- Use `N` and `mm`.
- Then stresses come out in `N/mm^2 = MPa`.

### B. Use The Small Diameter

For a shaft shoulder, nominal stress is calculated with the small diameter `d`.

Useful circular-section formulas:

```text
A = pi*d^2/4
I = pi*d^4/64
J = pi*d^4/32
c = d/2
```

Nominal stresses:

```text
sigma_nom,b = 32M / (pi*d^3)
tau_nom     = 16T / (pi*d^3)
sigma_nom,a = 4N / (pi*d^2)
```

Equivalent forms:

```text
sigma_b = M*c/I
tau     = T*c/J
sigma_a = N/A
```

### C. Initial Yielding: Local Crack/Ouch Check

Initial yielding is local. Use stress concentration factors.

Geometry ratios for charts:

```text
D/d
r/d
```

From the photographed example:

```text
D = 30 mm
d = 25 mm
r = 3 mm
D/d = 1.2
r/d = 0.12
```

Read the relevant `K_t` values from the chart:

```text
K_t,b = bending factor
K_t,a = axial factor
K_t,s = torsion factor
```

Example approximations from the sheet:

```text
K_t,b approximately 1.6
K_t,a approximately 1.7
K_t,s approximately 1.3
```

Maximum local stresses:

```text
sigma_max = K_t,b*sigma_nom,b + K_t,a*sigma_nom,a
tau_max   = K_t,s*tau_nom
```

Von Mises:

```text
sigma_VM = sqrt(sigma_max^2 + 3*tau_max^2)
n_initial = S_y / sigma_VM
```

### D. Complete Yielding: Mush/Collapse Check

Complete yielding ignores the local notch concentration. Use nominal stresses only.

```text
sigma_total = sigma_nom,b + sigma_nom,a
tau_total   = tau_nom

sigma_VM = sqrt(sigma_total^2 + 3*tau_total^2)
n_complete = S_y / sigma_VM
```

Memory table:

| Check | Meaning | Use K_t? | Result |
| --- | --- | --- | --- |
| Initial yielding | First local damage/crack | Yes | Lower safety factor |
| Complete yielding | Whole section becomes plastic | No, set `K_t = 1` | Higher limit |

### E. Shaft Trap List

- Use the small diameter `d` for stress calculations at a shoulder.
- Use `J` for torsion, not `I`.
- Add bending and axial normal stress before Von Mises.
- Use stress concentration factors only for initial yielding.
- Complete yielding ignores the corner/notch concentration.

## 4. T-Beam And Deflection

Use this when the cross-section is not symmetric, such as a T-section.

### A. Geometry First

You cannot do stress or deflection without the centroid `y_G` and inertia `I`.

For the photographed T-section:

```text
Total height: H
Top flange width: W
Flange/web thickness: s
Web height: H - s
```

Split into two rectangles:

```text
A_flange = W*s
y_flange = H - s/2

A_web = s*(H - s)
y_web = (H - s)/2
```

Centroid measured from the bottom:

```text
y_G = (A_flange*y_flange + A_web*y_web) / (A_flange + A_web)
```

Area moment of inertia about the centroidal x-axis:

```text
I_x =
  W*s^3/12       + A_flange*(y_flange - y_G)^2
+ s*(H - s)^3/12 + A_web*(y_web - y_G)^2
```

Example dimensions visible on the sheet:

```text
W = 100 mm
H = 100 mm
s = 20 mm
web height = 80 mm
```

### B. Cantilever Reactions

For a cantilever clamped at `A` and free at `C`, with load `q` only over length `a`:

```text
Q_tot = q*a
V_A = Q_tot
M_A = Q_tot*(a/2)
```

The maximum moment is at the wall. The moment is zero at the free end.

### C. Bending Stress Safety Factor

Bending stress:

```text
sigma = M_max*y / I_x
```

Because a T-section is not symmetric, check both sides:

```text
y_top = H - y_G
y_bottom = y_G

sigma_top = M_max*y_top / I_x
sigma_bottom = M_max*y_bottom / I_x
```

Pick the biggest absolute stress:

```text
sigma_max = max(abs(sigma_top), abs(sigma_bottom))
n = S_y / sigma_max
```

### D. Deflection

For deflection, use `E*I_x` with the centroidal inertia from Part A.

For the common cantilever case where a uniform load `q` acts only from the wall `A` to point `B`, length `a`, and the unloaded tail continues to free end `C`, total length `L`:

```text
theta_B = q*a^3 / (6*E*I_x)
y_B     = q*a^4 / (8*E*I_x)
y_C     = y_B + theta_B*(L - a)
        = q*a^3*(4L - a) / (24*E*I_x)
```

For a full-length uniform load over the whole cantilever:

```text
y_free = q*L^4 / (8*E*I_x)
theta_free = q*L^3 / (6*E*I_x)
```

Use the sign convention from the diagram. The formulas above give magnitudes.

### E. T-Beam Trap List

- Find `y_G` before calculating stress.
- Use the parallel axis theorem for `I_x`.
- The top and bottom fibers are not equally far from the centroid.
- Moment is largest at the clamped wall.
- If the load is partial, `Q_tot = q*a`, not `q*L`.

## 5. Beam And Frame Internal Diagrams

Use this for `N`, `T_y`, and `M_x` diagrams.

### A. Coordinate Discipline

Follow the local axes in the problem statement.

Typical sign choices:

- Axial `N`: tension positive.
- Shear `T_y`: positive according to the local `y` direction.
- Moment `M_x`: positive according to the local `x` axis/right-hand rule.

Do not mix global and local signs.

### B. What Causes Diagram Changes

| Load/Event | Axial `N` | Shear `T_y` | Moment `M_x` |
| --- | --- | --- | --- |
| Axial point force | Jump | No direct jump | No direct jump |
| Transverse point force | No direct jump | Jump | Slope changes |
| Point moment | No direct jump | No direct jump | Jump |
| Distributed load | No direct jump | Linear change | Curved/quadratic change |
| Hinge | Force transfer possible | Force transfer possible | Moment is zero at ideal hinge |
| Rigid corner | Axes rotate | Axes rotate | Moment continues unless point moment acts |

### C. Frame Free-End Trick

Starting from a free end is often easiest:

- No support reaction to solve at that end.
- Point moments or point loads show immediately.
- Move along the member and update diagrams when you pass a load, hinge, or corner.

## 6. Buckling Reference

Euler buckling:

```text
P_cr = pi^2 * E * I_min / L_0^2
n = P_cr / abs(N_compression)
```

Use `I_min` for weak-axis buckling.

Common `L_0` values:

```text
Pin-Pin:           L_0 = L
Clamped-Free:      L_0 = 2L
Clamped-Clamped:   L_0 = 0.5L
Clamped-Pin:       L_0 = 0.7L
```

Warnings:

- Only compression members buckle.
- Tension members yield or snap; they do not Euler-buckle.
- Compare force to `P_cr`, not stress to `S_y`.

## 7. Fast Decision Table

| Problem phrase | Do this |
| --- | --- |
| "Determine reactions" | Whole-body equilibrium first |
| "Truss" | Method of joints; members have axial `N` only |
| "Internal forces in truss" | Solve joint by joint, max two unknowns per joint |
| "Frame with hinge" | Split bodies at the hinge, use equal/opposite hinge forces |
| "Draw N, T_y, M_x" | Use local axes, work segment by segment |
| "Initial yielding in shaft" | Use `K_t` factors and Von Mises |
| "Complete yielding in shaft" | Use nominal stresses, set `K_t = 1` |
| "Buckling" | Use compression force and Euler `P_cr` |
| "T-section stress" | Find `y_G`, then `I_x`, then top/bottom stress |
| "Partial distributed load" | Use `Q_tot = q*a`, not `q*L` |

## 8. Formula Pocket

Statics:

```text
sum F_x = 0
sum F_y = 0
sum M = 0
```

Truss determinacy:

```text
h = m + r - 2j
```

Axial stress:

```text
sigma = N/A
```

Bending stress:

```text
sigma = M*y/I
```

Torsion shear:

```text
tau = T*c/J
```

Solid circular section:

```text
A = pi*d^2/4
I = pi*d^4/64
J = pi*d^4/32
```

Hollow circular section:

```text
A = pi*(D^2 - d^2)/4
I = pi*(D^4 - d^4)/64
```

Von Mises for one normal stress plus shear:

```text
sigma_VM = sqrt(sigma^2 + 3*tau^2)
```

Safety factor:

```text
n = allowable / actual
n_yield = S_y / sigma_VM
n_buckling = P_cr / abs(N_compression)
```

Euler:

```text
P_cr = pi^2 * E * I_min / L_0^2
```

T-section centroid:

```text
y_G = sum(A_i*y_i) / sum(A_i)
```

Parallel axis theorem:

```text
I_total = sum(I_local + A_i*d_i^2)
```

## 9. Tutorial Additions: What The Original Sheet Was Missing

The tutorials add several exam-solving families that were not fully covered in the photographed sheet. These are worth knowing because the simulation tests mix them freely with trusses, frames, beams, and shafts.

Source tutorials checked:

- `Tutorial 01 - Reactions.pdf`
- `Tutorial 02 - Internal actions.pdf`
- `Tutorial 04 - Failure criteria.pdf`
- `Tutorial 04 - Failure criteria - Synopsys.pdf`
- `Tutorial 05 - Cross sections & axial loading.pdf`
- `Tutorial 06 - Bending.pdf`
- `Tutorial 07 - Torsion.pdf`
- `Tutorial 08 - Shear & Buckling.pdf`
- `Tutorial 9 - 3D structures.pdf`
- `Tutorial 10 - Simulation_Test1.pdf`
- `Tutorial 10 - Simulation_Test1 - Proposal2.pdf`
- `Additional_ex_GeometryAreas.pdf`

### A. Full Failure Criteria

The original cheat sheet mainly used Von Mises for shaft checks. Tutorial 4 also expects Tresca for ductile materials and Rankine for brittle materials.

Safety factor:

```text
n = material_strength / sigma_eq
```

Use:

- Ductile material: yield strength `S_y`, with Tresca or Von Mises.
- Brittle material: ultimate tensile strength `S_U`, usually with Rankine.

Ductile material, principal stresses `sigma1`, `sigma2`, `sigma3`:

```text
Tresca:
sigma_eq = max(
  abs(sigma1 - sigma2),
  abs(sigma2 - sigma3),
  abs(sigma3 - sigma1)
)

Von Mises:
sigma_eq = (1/sqrt(2))*sqrt(
  (sigma1 - sigma2)^2
+ (sigma2 - sigma3)^2
+ (sigma3 - sigma1)^2
)
```

If the principal stresses are ordered as:

```text
sigma1 >= sigma2 >= sigma3
```

Then Tresca simplifies to:

```text
sigma_eq = sigma1 - sigma3
```

Plane stress with known principal stresses `sigmaA`, `sigmaB`, `sigmaC = 0`:

```text
Tresca:
sigma_eq = max(abs(sigmaA - sigmaB), abs(sigmaA), abs(sigmaB))

Von Mises:
sigma_eq = sqrt(sigmaA^2 + sigmaB^2 - sigmaA*sigmaB)
```

Plane stress with components `sigma_x`, `sigma_y`, `tau_xy`:

```text
Von Mises:
sigma_eq = sqrt(sigma_x^2 + sigma_y^2 - sigma_x*sigma_y + 3*tau_xy^2)
```

Simple stress state with one normal stress and one shear stress:

```text
Tresca:
sigma_eq = sqrt(sigma^2 + 4*tau^2)

Von Mises:
sigma_eq = sqrt(sigma^2 + 3*tau^2)
```

Pure shear:

```text
Tresca:
sigma_eq = 2*tau

Von Mises:
sigma_eq = sqrt(3)*tau
```

Brittle material, Rankine criterion:

```text
sigma_eq = max(sigma1, sigma2, sigma3)
n = S_U / sigma_eq
```

For plane stress with known components `sigma_x`, `sigma_y`, `tau_xy`, find the principal stresses first:

```text
sigma_1,2 = (sigma_x + sigma_y)/2
          +/- sqrt(((sigma_x - sigma_y)/2)^2 + tau_xy^2)
```

Then use Rankine:

```text
sigma_eq = max(sigma_1, sigma_2, 0)
```

Tutorial trap:

- Do not use Von Mises for brittle cast iron unless the question explicitly says so. Use Rankine with principal tensile stress.
- For ductile materials, Tresca is usually more conservative than Von Mises.

### B. Strain Gauge To Stress

Tutorial 4 includes a strain-gauge style problem. Convert measured strains to stresses before applying failure criteria.

Shear modulus:

```text
G = E / (2*(1 + nu))
```

Plane stress Hooke law:

```text
sigma_x = E/(1 - nu^2) * (epsilon_x + nu*epsilon_y)
sigma_y = E/(1 - nu^2) * (epsilon_y + nu*epsilon_x)
tau_xy  = G*gamma_xy
```

Then compute principal stresses or directly apply a plane-stress failure criterion.

Unit trap:

- `1000 microm/m = 1000e-6 = 0.001`.
- Do not use microstrain as if it were already dimensionless.

### C. General Cross-Section Geometry

Tutorial 5 and the additional geometry exercises require full composite-section geometry, not only the T-section shortcut.

For composite areas:

```text
A = sum(A_i)
x_G = sum(A_i*x_i) / A
y_G = sum(A_i*y_i) / A
```

Central second moments:

```text
I_xx = sum(I_xx,local + A_i*(y_i - y_G)^2)
I_yy = sum(I_yy,local + A_i*(x_i - x_G)^2)
I_xy = sum(I_xy,local + A_i*(x_i - x_G)*(y_i - y_G))
```

Principal second moments:

```text
I_1,2 = (I_xx + I_yy)/2
      +/- sqrt(((I_xx - I_yy)/2)^2 + I_xy^2)
```

Principal-axis orientation:

```text
tan(2*alpha) = -2*I_xy / (I_xx - I_yy)
```

Use the tutorial sign convention for `alpha`. If your angle seems off by 90 degrees, check whether you are reporting axis 1 or axis 2.

Useful local inertias:

```text
Rectangle:
I_xx = b*h^3/12
I_yy = h*b^3/12

Solid circle:
I_xx = I_yy = pi*d^4/64
J = pi*d^4/32

Hollow circle:
I_xx = I_yy = pi*(D^4 - d^4)/64
J = pi*(D^4 - d^4)/32
```

Area subtraction:

- Holes count as negative areas.
- Their `A_i`, `A_i*x_i`, `A_i*y_i`, and parallel-axis terms are negative.

### D. Unsymmetrical Bending And Neutral Axis

Tutorial 6 asks for stresses on non-symmetric sections such as L-shapes. The safest workflow is:

1. Find centroid `G`.
2. Compute `I_xx`, `I_yy`, and `I_xy`.
3. Rotate to principal axes if `I_xy` is not zero.
4. Resolve bending moments into the principal axes.
5. Compute stress at candidate extreme points.
6. Draw the neutral axis where `sigma = 0`.

In principal axes:

```text
sigma_z = N/A + M_1*y_1/I_1 - M_2*x_1/I_2
```

Signs depend on the local axes in the figure. For safety-factor calculations, identify the largest absolute tensile/compressive stress from the evaluated points.

Neutral axis:

```text
sigma_z = 0
```

So with no axial load:

```text
M_1*y_1/I_1 - M_2*x_1/I_2 = 0
```

Tutorial trap:

- For L, C, and other open sections, the most stressed point is not always the most visually distant corner in the original `x,y` axes. Check corners after using principal axes.

### E. Elastic Line Method

Tutorial 6 includes deflection/rotation problems. The sheet had one specific partial-UDL formula, but the general exam method is integration.

Beam differential relation:

```text
E*I*v''(z) = M(z)
```

Depending on the sign convention, your course may write the negative of this. Stay consistent with the diagram and final displacement sign.

Integration workflow:

```text
alpha(z) = v'(z)
v(z) = displacement
```

1. Write `M(z)` for each region.
2. Integrate once for rotation `alpha(z)`.
3. Integrate again for deflection `v(z)`.
4. Add integration constants.
5. Apply boundary and continuity conditions.

Common boundary conditions:

```text
Clamped end:     v = 0 and alpha = 0
Simple support:  v = 0
Free end:        no imposed v or alpha; use loads to get M and T
Internal point between regions: v_left = v_right and alpha_left = alpha_right
```

Common magnitudes for a cantilever:

```text
End point load F:
theta_free = F*L^2/(2*E*I)
v_free     = F*L^3/(3*E*I)

Full uniform load q:
theta_free = q*L^3/(6*E*I)
v_free     = q*L^4/(8*E*I)
```

Partial uniform load from the wall over length `a`, total beam length `L`:

```text
v_C = q*a^3*(4L - a)/(24*E*I)
```

### F. Beam Shear Stress And Shear Centre

Tutorial 8 adds shear-stress distributions and shear centre. This is different from just drawing the shear-force diagram.

Beam shear formula:

```text
tau = V*Q / (I*b)
```

Where:

- `V` is the shear force at the section.
- `Q` is the first moment of area of the part above/below the point.
- `I` is the relevant second moment of area.
- `b` is the local width at the point.

Thin-walled notation:

```text
q_s = V*S/I
tau = q_s/t
```

Where:

- `q_s` is shear flow.
- `S` is the first moment of area.
- `t` is local wall thickness.

Useful checks:

```text
Rectangle:
tau_max = 3V/(2A)

Solid circle:
tau_max = 4V/(3A)
```

Shear-centre trap:

- In open thin-walled sections such as C-shapes, the shear centre is not generally at the centroid.
- A vertical or horizontal shear force applied at the centroid can create torsion if its line of action does not pass through the shear centre.

Torsional moment from eccentric shear:

```text
M_t = F*e
```

Where `e` is the distance from the shear centre to the load line.

### G. Thin-Walled Torsion

Tutorial 7 includes torsion of thin-walled sections. The shaft part of the original cheat sheet is not enough for these.

Circular shafts:

```text
tau = T*r/J
tau_max = T*R/J
phi = T*L/(G*J)
G = E/(2*(1 + nu))
```

For a solid circular shaft:

```text
J = pi*d^4/32
```

For a hollow circular shaft:

```text
J = pi*(D^4 - d^4)/32
```

Closed thin-walled section, Bredt theory:

```text
q = T/(2*A_m)
tau = q/t = T/(2*A_m*t)
```

Where:

- `A_m` is the area enclosed by the median line of the wall.
- `t` is the wall thickness.
- If thickness varies, shear flow `q` is constant but `tau = q/t` is larger where `t` is smaller.

Open thin-walled section, course approximation:

```text
J_t approximately sum(b_i*t_i^3/3)
tau_i,max approximately T*t_i/J_t
```

Tutorial trap:

- Closed thin-walled sections are much better in torsion than open sections.
- Use Bredt for closed thin-walled sections, not the open-section approximation.

### H. 3D Shaft And Gear Loading

Tutorial 9 adds 3D gear/shaft problems. The workflow is the same shaft logic, but the loads exist in two bending planes plus axial direction.

3D equilibrium:

```text
sum F_x = 0
sum F_y = 0
sum F_z = 0
sum M_x = 0
sum M_y = 0
sum M_z = 0
```

Gear force components:

- `F_t`: tangential force, creates torque.
- `F_r`: radial force, creates bending in one plane.
- `F_a`: axial force, creates axial normal stress and sometimes an extra moment depending on geometry.

Torque from a gear:

```text
T = F_t*R
```

For circular shafts, combine the two bending planes:

```text
M_b = sqrt(M_x^2 + M_y^2)
```

Nominal stresses at the checked section:

```text
sigma_b = 32*M_b/(pi*d^3)
tau_t   = 16*T/(pi*d^3)
sigma_a = 4*N/(pi*d^2)
```

For ductile steel:

```text
sigma_VM = sqrt((sigma_b + sigma_a)^2 + 3*tau_t^2)
n = S_y/sigma_VM
```

For brittle cast iron, compute the principal stresses from `sigma = sigma_b + sigma_a` and `tau = tau_t`, then use Rankine:

```text
sigma_1,2 = sigma/2 +/- sqrt((sigma/2)^2 + tau^2)
sigma_eq = max(sigma_1, sigma_2, 0)
n = S_U/sigma_eq
```

Shoulders and grooves:

- Use charts with `D/d` and `r/d`.
- Read separate `K_t` values for bending, axial loading, and torsion.
- Initial yielding/failure uses `K_t`.
- Complete yielding uses nominal stresses only.

### I. Exam Coverage Check

The photographed sheet already covered:

- truss determinacy, reactions, and method of joints;
- zero shear/moment trap for ideal truss rods;
- frame reactions with internal hinges;
- `N`, `T_y`, `M_x` diagram strategy;
- hollow circular area/inertia for truss rods;
- basic yielding and Euler buckling;
- initial vs complete yielding in shouldered shafts;
- T-section centroid, inertia, stress, and partial-UDL deflection.

The missing or underdeveloped tutorial methods were:

- Tresca, Von Mises general cases, and Rankine;
- stress conversion from strain-gauge data;
- `I_xy`, principal axes, and principal inertias for L/C/general sections;
- unsymmetrical bending and neutral-axis drawing;
- elastic-line integration method and constants;
- shear stress `tau = VQ/(Ib)` and shear flow;
- shear centre and eccentric shear-induced torsion;
- Bredt theory for closed thin-walled torsion;
- angle of twist `phi = TL/(GJ)`;
- 3D shaft/gear loading with two bending planes.
