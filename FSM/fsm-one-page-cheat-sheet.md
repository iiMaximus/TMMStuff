# FSM One-Page Cheat Sheet

Use this as the fast exam checklist. Use `fsm-cheat-sheet-clean.md` when you need the fuller explanation.

## 1. Identify The Problem Type

| If the problem says... | Use... | Main unknowns |
| --- | --- | --- |
| Truss, rods, pin joints | Method of joints | Axial forces `N` only |
| Frame, bent member, hinge | Separate bodies | `N`, `T_y`, `M_x`, reactions |
| Shaft, shoulder, torque | Shaft stress + Von Mises | `M`, `T`, `N`, `K_t` |
| T-section, beam stress | Centroid + inertia first | `y_G`, `I_x`, `sigma` |
| Compression rod/column | Euler buckling | `P_cr`, `L_0`, `I_min` |
| General failure criteria | Tresca/Von Mises/Rankine | `sigma_eq`, safety factor |
| 3D shaft/gears | Two bending planes + torsion | `M_x`, `M_y`, `T`, `N` |

## 2. Reactions First

Always start with equilibrium:

```text
sum F_x = 0
sum F_y = 0
sum M = 0
```

Support reactions:

```text
Pin:                     H + V
Roller on floor:          V only
Roller on vertical wall:  H only
Fixed/clamped support:    H + V + M
Internal hinge:           H + V, equal/opposite on the two bodies
```

## 3. Determinacy

Truss:

```text
h = m + r - 2j
```

Interpretation:

```text
h = 0  isostatic
h > 0  indeterminate
h < 0  mechanism/unstable
```

Rigid-body/frame idea:

```text
available equations = 3 * number_of_bodies
```

## 4. Truss Rules

Truss members have axial force only:

```text
N exists
T_y = 0
M_z = 0
```

Method:

1. Solve external reactions.
2. Pick a joint with max two unknowns.
3. Assume unknown rods are in tension.
4. Use `sum F_x = 0`, `sum F_y = 0`.
5. Positive `N` = tension. Negative `N` = compression.

45 degree component:

```text
N_x = N/sqrt(2)
N_y = N/sqrt(2)
```

## 5. Buckling

Only compression members buckle.

```text
P_cr = pi^2 * E * I_min / L_0^2
n_buckling = P_cr / abs(N_compression)
```

Effective length:

```text
Pin-Pin:           L_0 = L
Clamped-Free:      L_0 = 2L
Clamped-Clamped:   L_0 = 0.5L
Clamped-Pin:       L_0 = 0.7L
```

Traps:

- For diagonal rods use `L*sqrt(2)`.
- Use `I_min`.
- Compare force to `P_cr`, not stress to `S_y`.

## 6. Shaft Stress

Use the small diameter `d` at a shoulder.

```text
A = pi*d^2/4
I = pi*d^4/64
J = pi*d^4/32
```

Nominal stresses:

```text
sigma_nom,b = 32M / (pi*d^3)
tau_nom     = 16T / (pi*d^3)
sigma_nom,a = 4N / (pi*d^2)
```

Initial yielding uses stress concentration:

```text
sigma_max = K_t,b*sigma_nom,b + K_t,a*sigma_nom,a
tau_max   = K_t,s*tau_nom
sigma_VM  = sqrt(sigma_max^2 + 3*tau_max^2)
n_initial = S_y / sigma_VM
```

Complete yielding ignores the notch:

```text
sigma_total = sigma_nom,b + sigma_nom,a
tau_total   = tau_nom
sigma_VM    = sqrt(sigma_total^2 + 3*tau_total^2)
n_complete  = S_y / sigma_VM
```

Memory:

```text
Initial = local crack check = use K_t
Complete = whole section yield = set K_t = 1
```

## 7. T-Beam Stress

Find centroid first:

```text
y_G = sum(A_i*y_i) / sum(A_i)
```

Then inertia:

```text
I_total = sum(I_local + A_i*d_i^2)
I_local rectangle = b*h^3/12
```

Then bending stress:

```text
sigma = M*y/I
```

Check both top and bottom:

```text
y_top = H - y_G
y_bottom = y_G
n = S_y / max(abs(sigma_top), abs(sigma_bottom))
```

## 8. Cantilever With Partial UDL

For load `q` acting only over length `a` from the wall:

```text
Q_tot = q*a
V_A = Q_tot
M_A = Q_tot*(a/2)
```

Deflection at free end `C`, total beam length `L`:

```text
y_C = q*a^3*(4L - a) / (24*E*I)
```

Full-length UDL:

```text
y_free = q*L^4 / (8*E*I)
```

## 9. Frame Diagram Traps

- Use local axes for every member.
- At a hinge, forces are equal and opposite on the two separated bodies.
- At a corner, axial/shear directions rotate.
- Point force: jump in `N` or `T_y`.
- Point moment: jump in `M_x`.
- Distributed load: shear changes linearly, moment changes quadratically.

## 10. Failure Criteria

Ductile materials:

```text
Tresca, principal stresses:
sigma_eq = max(abs(sigma1-sigma2), abs(sigma2-sigma3), abs(sigma3-sigma1))

Von Mises, principal stresses:
sigma_eq = (1/sqrt(2))*sqrt((sigma1-sigma2)^2 + (sigma2-sigma3)^2 + (sigma3-sigma1)^2)
```

Plane stress with known `sigma_x`, `sigma_y`, `tau_xy`:

```text
Von Mises = sqrt(sigma_x^2 + sigma_y^2 - sigma_x*sigma_y + 3*tau_xy^2)
```

Simple shaft point with one normal stress and one shear:

```text
Tresca     = sqrt(sigma^2 + 4*tau^2)
Von Mises = sqrt(sigma^2 + 3*tau^2)
```

Brittle materials use Rankine:

```text
sigma_eq = max(principal tensile stresses)
n = S_U / sigma_eq
```

## 11. Cross-Section Geometry

Composite centroid:

```text
x_G = sum(A_i*x_i) / sum(A_i)
y_G = sum(A_i*y_i) / sum(A_i)
```

Composite inertia:

```text
I_xx = sum(I_xx,local + A_i*dy_i^2)
I_yy = sum(I_yy,local + A_i*dx_i^2)
I_xy = sum(I_xy,local + A_i*dx_i*dy_i)
```

Principal moments:

```text
I_1,2 = (I_xx + I_yy)/2 +/- sqrt(((I_xx - I_yy)/2)^2 + I_xy^2)
tan(2*alpha) = -2*I_xy / (I_xx - I_yy)
```

## 12. Shear And Torsion Extras

Beam shear stress:

```text
tau = V*Q / (I*b)
```

Thin-walled shear flow:

```text
q_s = V*S / I
tau = q_s / t
```

Closed thin-walled torsion, Bredt:

```text
q = T / (2*A_m)
tau = q/t = T/(2*A_m*t)
```

Twist:

```text
phi = T*L/(G*J)
G = E/(2*(1+nu))
```

## 13. 3D Shaft Shortcut

For gear/shaft problems:

```text
T = F_t * R
M_b = sqrt(M_x^2 + M_y^2)
sigma_b = 32*M_b/(pi*d^3)
tau_t = 16*T/(pi*d^3)
sigma_a = 4*N/(pi*d^2)
```

Then use Von Mises/Tresca for ductile material or Rankine for brittle material. For initial yielding at shoulders/grooves, multiply nominal stresses by the correct `K_t` from the chart.
