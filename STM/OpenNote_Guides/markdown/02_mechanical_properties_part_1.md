# Lecture 02 - Mechanical Properties Part 1

Source: `STM/Material(1)/02_Mechanical prop part 1 2025-2026.pdf; STM/Material(2)/Exercise1_text.pdf; Exercise2_solved_Ferraris.pdf`

Purpose: open-note exam guide. It prioritizes answer structure, formulas, tutorial methods, and professor-style traps.

## Core Idea

Mechanical properties are used for material selection and design. The first mechanical lecture builds the elastic/plastic language: stress, strain, Young modulus, Poisson ratio, yield strength, and how to read a tensile curve.

## Stress and Strain

- Normal stress: sigma = F/A. In tensile/compression tests use initial area A0 unless the question asks true stress.
- Engineering strain: e = (l - l0)/l0 = Delta l/l0. A strain of 0.002 is 0.2%.
- Shear stress: tau = F/A0. Shear strain: gamma = tan theta.
- The lecture also labels bending and torsion as stress states. For this exam, most calculations use axial stress/strain and simple sections.

## Elastic Behavior and Young Modulus

- Hooke law: sigma = E e. E is Young modulus/elastic modulus, units MPa or GPa.
- Elastic deformation is recovered immediately after unloading because bonds return to equilibrium length.
- E is proportional to bond energy and melting temperature. Ranking: E_ceramics > E_metals >> E_polymers.
- E is not related to dislocation motion. Low alloying in steels barely changes E; ordinary steel stays near 210 GPa.
- Amorphous materials generally show lower E than comparable crystalline materials.
- Composite E can be estimated by a volumetric mixture rule: Ec = E1 fv1 + E2 fv2 + ... when the loading geometry supports that approximation.

## Poisson Ratio and Elastic Design

- Poisson coefficient: nu = - transverse strain / longitudinal strain. Transverse and longitudinal strains have opposite signs in uniaxial tension/compression.
- Typical values: metals about 0.33; ceramics 0.17-0.27; polymers 0.33-0.5; always below 0.5.
- If a cylinder in tension must reduce diameter by Delta d, compute transverse strain Delta d/d0, then longitudinal strain = - transverse strain / nu, then sigma = E e, then F = sigma A.

## Plastic Deformation and Yield

- When stress is high enough and strain exceeds the proportional elastic region, Hooke law no longer applies. Some bonds break and reform in different positions; after unloading, only the elastic part is recovered.
- Yield strength is the frontier between elastic and plastic behavior.
- In steels, interstitial C pins dislocations. The upper yield point corresponds to first unpinning; the lower yield point is the lower stress needed after dislocations move more freely.
- Some metals/alloys do not show a sharp yield point; then use the 0.2% offset yield strength.

## Tutorial Method: Elastic Tensile Calculations

- Maximum safe load with safety factor: choose sigma_allowed = YS/n, compute area, then Fmax = sigma_allowed A. Exercise 2 example: Al cylinder d = 10 mm, YS = 150 MPa, n = 2 gives A = 78.5 mm2, sigma_allowed = 75 MPa, Fmax = 5890 N.
- Required diameter for allowed elongation: e = Delta l/l0, sigma = E e, A = F/sigma, d = 2 sqrt(A/pi).
- Comparing material elongation under same F, A, and l0: sigma is the same, e = sigma/E, so lower E gives larger elongation. The exercise compares steel, bronze, and polymer: the polymer elongates enormously because E is very low.
- True fracture vs engineering fracture: engineering fracture uses initial area; true fracture uses final area at necking/rupture. If final diameter is one third of the initial diameter, final area is one ninth of initial area, so true fracture stress is much higher.

## Exam Traps

- Do not mix MPa and Pa without converting. 1 N/mm2 = 1 MPa.
- A 0.2% offset strain is 0.002, not 0.2.
- If the question asks "without plastic deformation", compare to yield strength, not tensile strength.
- Elastic modulus controls elastic elongation; yield strength controls onset of plastic deformation; tensile strength is the maximum engineering stress.
- Alloying and heat treatment can change yield and tensile strength a lot but only slightly change E.

## Source Slide Checklist

This is a compact OCR/text extraction from the source PDF. Use it as a searchable reminder of the slide wording, not as a replacement for diagrams.

### Source page 1
- MECHANICAL PROPERTIES
- OF MATERIALS:
- Fundamentals, elastic and plastic
- behaviour

### Source page 2
- Mechanical properties of
- materials
- • Materials choice
- • Design issues
- • Correlation requested properties/class of material
- • Mechanical properties independent of time
- • Mechanical properties dependent on time
- • Mechanical properties dependent on temperature

### Source page 3
-  (STRESS) and e (STRAIN ) : definition
-  (STRESS) = F (force, Newton, N) / A (surface, m 2)
-  = F/A ( N/m 2 = Pa) ( N/mm 2 = MPa )
- DEFORMATION or STRAIN :
- (dimensionless or %)
- e = (l - l0)/l 0 = l/l 0
- sample length = l
- initial sample length = l 0
- tensile stress, compressive stress, bending stress, shear stress

### Source page 4
- Tensile and compression
- stress/strain
- A0
- F
- F
- ll0
- l0
- F
- F
- l
- A0
- Tension Compression
- Stress,  = F/A 0
- Strain, e = (l - l0)/l 0
- ...

### Source page 5
- Shear
- A0
- F
- F
-  (Shear stress),  = F/A 0
- (Shear strain),  = tan 

### Source page 6
- Torsion
- T
- T
- 
- Torsion  = T/A 0
- Shear strain,  = tan 
- Ao

### Source page 7
- Stress-strain curves (tensile test)
- • Standard tests!
- gauge length, 2 in.
- reduced section, 2.25 in.
- diameter, 0.5 in.
- diameter, 0.75 in.
- radius 3/8 in.
- ASTM (American Society for Testing and
- Materials)
- ISO
- UNI EN

### Source page 8
- Standard circular cross-section for tensile tests
- Metallic
- specimens

### Source page 9
- For most of materials, low stresses correspond to
- proportionally low deformations (direct
- proportionality)
-  = E e (Hooke law, E=Young modulus or
- elastic modulus)
-  = F/A
- e = l/l o [E] = MPa or GPa
- F/A = E l/l o

### Source page 10
- Tensile test curve on a metal
- Max. tensile strength
- Elastic field
- Plastic field
-  = E e

### Source page 11
- Elastic behaviour
- • Small stress corresponds to small deformation
- having a direct proportionality between them.
- • Small deformations are immediately recovered
- when stress is removed
- • E =  / e = [N/mm 2] = [MPa]
- Young’s modulus or Elastic Modulus E
- (Hooke law)

### Source page 12
- Elastic modulus and atomic bond
- • E ceramics > E metals >> E polymers
- • Elastic modulus is directly proportional to the
- energy of the atomic bond (and melting
- temperature)
- • No fracture of bonds in the elastic field
- • Increasing of the bond length when stress is
- applied.
- • Immediate recovering of the bond equilibrium
- length after stress removal

### Source page 13
- EQUILIBRIUM STATE
- NO APPLIED LOAD
- THE DISTANCE
- BETWEEN ATOMS IS
- THAT OF THE STABLE
- CHEMICAL BOND
- LOADING
- (in the elastic
- range)
- DURING ELASTIC
- DEFORMATION THE
- BONDS BECOME
- LONGER IN THE
- DIRECTION OF LOAD
- ...

### Source page 14
- Callister
- How atomic
- bonds are
- responsible of
- materials
- properties
- Condon-Morse curves

### Source page 15
- Elastic modulus and bond strength
- E is directly
- proportional to
- (dF/dr) ro
- Strong bonds:
- ceramics
- Weak bonds: polymers

### Source page 16
- Elastic modulus and melting
- temperature
- Material Temp
- melting [° C]
- E
- (GPa)
- TiC 3160 310
- Al 2O3 2045 370
- W 3410 393
- Fe 1536 207
- Cu 1083 111
- Al 660 70
- Pb 327 14
- Polyetilene 130 1
- ...

### Source page 17
- Diamond
- WC
- SiC
- Al 2O3
- TiC
- Ni
- Steel
- CFRP**
- Copper and its alloy
- Ti and its alloy
- Zn and its alloy
- Al and its alloy
- Mg and its alloy
- GFRP
- ...

### Source page 18
- More than 4 orders of magnitude between E of diamond and E of polymers!
- SOLIDI COVALENTI
- VETRI
- Young’s modulus depends
- on some parameters:
- - Bonding energy
- Stronger chemical bonds
-  higher bonding energy
-  higher E
- - Amorphous vs.
- crystalline structure
- Amorphous materials show
- lower E than crystalline
- ones
- ...

### Source page 19
- The elastic modulus E is assumed to be
- (almost) independent of alloying
- elements (e.g. interstitial atoms)  E =
- 210 GPa
- Low amount of alloying elements 
- the mean energy of the bond remains
- constant  E = cost
- High amount of alloying elements  E
- = 190-230 GPa
- THE ELASTIC MODULUS IS NOT
- RELATED TO THE MOVEMENT
- OF DISLOCATIONS!

### Source page 20
- How to measure the elastic
- modulus: from tensile curve
- steel
- Al
- stress
- strain

### Source page 21
- How to measure the elastic
- modulus
- - Drawbacks of tensile tests :
- Sample preparation
- Destructive test
- Unsuitable for brittle materials
- • Measurement of the elastic
- modulus by compression or
- bending tests, indentations…
- • Non destructive tests

### Source page 22
- Elastic modulus by sonic test
- • E= 0.9465 * (  2L4/t 2)
- •  = costant depending on material shape
- •  = sonic wave frequency;
- • L= sample length;
- •  = material density;
- • t = sample thickness.
- For photos and technical specifications pleas visit: www.imce.net/presentation

### Source page 25
- Measuring elastic
- modulus (E)
- by
- GrindoSonic
-  Useful for highly
- porous samples
-  Very useful for quality
- control!
-  No limtiations on size
-  Limitations on
- geometry

### Source page 26
- Elastic modulus vs T
- W
- steel Al
- Elastic modulus, GPa

### Source page 27
- Mixture rule : elastic modulus is a weighted average, based on the
- volumetric fraction, of the elastic moduli of the components:
- Ec = E 1·f v1 + E 2·f v2 + … E n·f vn
- Composite with 50% vol. C fibres + 50% vol. polymeric matrix
- Carbon fibers: E  200 GPa
- Polymer: E  0.6 GPa
- Composite E  (200*0.5+0.6*0.5)  100 GPa
- Composite 30% vol. C fibres + 70% vol. polymeric matrix
- Composite E (200*0.3 + 0.6*0.7)  60 GPa
- ELASTIC MODULUS IN COMPOSITES

### Source page 28
- Elastic modulus of a steel vs T

### Source page 29
- lz/2
- l0x
- lx/2
- l0z
- 
- 
- z
- y
- z
- x
- eeee
- 
-  
-  
- ...

### Source page 30
- Non linear elastic behaviour
- • Some polymers, cast iron, concrete,….
- • E calculated locally
- Strain
- Stress
- 1
- 2
- e1 e2
- Secant modulus at 1 = 1/e1
- Tangent modulus at 2 = d /d e

### Source page 31
- Summary
- Linear elastic
- Behaviour
- (most materials)
- Non linear elastic
- behaviour
- (some polymers,
- cast iron,
- concrete,…)
- Anelastic behaviour
- Time is required to
- recover deformation
- after stress removal
- (some polymers)

### Source page 32
- Plastic deformation and chemical bond
- • When applied stresses increases and corresponding
- deformations are higher than about 0.002, the
- Hooke law does not work any more.
- • Bonds start breaking and, if possible , other bonds
- are formed in different positions
- • If the load is removed, the sample recovers only t he
- elastic deformation, but a plastic, permanent
- deformation is evident.
- • The frontier between elastic and plastic deformati on is
- defined yield strength or limit of proportionality

### Source page 33
- ELASTIC
- DEFORMATION
- PLASTIC
- DEFORMATION
- BRITTLE
- FRACTURE
- (CLEA V AGE)

### Source page 34
- e curve for metals
- fracture
- Tensile
- strength
- Upper
- lower
- y
- strain
- stress
- necking
- Elastic field Plastic field
- Strain at fracture
- Metals follow one
- of the two curves

### Source page 35
- In steel we have interstitial C,
- causing the dislocations to pin (to
- stop).
- Thus, it becomes difficult for
- dislocation to move and we need
- higher load to make them to move
- (upper yield point).
- Then, the pinning will be gone and
- dislocations can move freely and
- we need smaller load to keep them
- moving (plastic deformation going)
-  lower yield point.

### Source page 36
- Yield strength at 0.2 %
- strain (0.002)
- This type of monotonic
- curve is observed, for
- example, in pure metals,
- FCC alloys, Al alloys.

### Source page 37
- Yield strength for different
- materials
-  y [MPa]
- steels 250 -1400
- Ni alloys 200 -1600
- Ti alloys 200 -1300
- Cu alloys 60 -950
- Al alloys 100 -650
- Mg alloys 80 -300
- Epoxy resins 30 -100
- nylon 50 -90
- poly stirene 35 -70
- ABS 50
- poly et hy lene 6-30

### Source page 38
- Dislocations explain the
- 3 orders of magnitute
- between theorethical
- and experimental
- yield strength
- Without dislocations,
- the yield strength would
- be about E/8 (GPa)
- Yield strength and dislocations

### Source page 39
- Material Tensile Yield Stress (psi)
- pure (99.45%) annealed Al 4 x 10 3
- pure (99.45%) cold drawn Al 24 x 10 3
- Al alloy - precipitated, hardened 50 x 10 3
- a "perfect" single crystal of pure Al ca. 10 6
- When you have slipping of crystalline planes in a real crystal (with
- dislocation), a lower amount of chemical bonds will break compared to
- a perfect crystal (without dislocations)  lower yield stress
- Technological implications?
- (1 MPa = 145 psi)

### Source page 41
- Sliding plane
- Shear stress
- Dislocations provide an effective way for bonds to break and re-
- form in another place, when load is applied.
- Dislocation motion is favoured on
- high density sliding planes

### Source page 42
- Es: Cu, Al, Ag, Au
- Es: Fe, W, Cr
- Es: Mg, Ti, Zn
- Hexagonal compact
- BCC FCC

### Source page 43
- • BCC e FCC have at least 12 sliding planes
- • HCP has a maximum of 6 sliding planes
- • FCC metals (Cu, Al, Ni, Ag, Au) and BCC (Fe)
- are ductile, with large plastic deformation
- • HCP metals (Ti, Zn) are more brittle
- plane (111) for CFC,
- with three sliding
- directions <110>

### Source page 44
- • Number of preferred slip
- systems
- - https://www.tec-
- science.com/material-
- science/ductility-of-
- metals/influence-of-the-
- lattice-structure-on-the-
- ductility/
- - FCC (Cu, Al, Ni, Ag, Au)
- and BCC (Fe) metals
- have large plastic
- deformation
- - HCP (Ti, Zn) metals
- have smaller plastic
- ...

### Source page 45
- BCC
- FCC

### Source page 46
- • Plastic deformation of grains in a stainless steel after lamination
- from Callister
- After deformation

### Source page 47
- Stress-strain curve for Al
- Max. tensile strength

### Source page 48
- If we stop loading here a residual plastic deformation ( e res ) is still present

### Source page 49
- Plastic (residual,
- permanent)
- deformation

### Source page 51
- Metal specimens of steel
- (left) and bronze (right)
- before and after the test
- NECKING :
- reduction of the
- resistant section
- (lateral contraction)
- due to a
- rearrangements of the
- material structure

### Source page 52
- Ductile fracture
- Necking Formation of pores
- pore coalescence’
- Propagation
- Coarse surface due to
- plastic deformation
- Orientation 45°

### Source page 53
- Tensile strength
- behaviour for
- different
- materials

### Source page 54
- Stress-strain curves for brittle
- materials
- ceramics, glasses;
- brittle alloys, brittle
- polymers (below Tg),
- brittle composites
- No (or limited) plastic
- deformation

### Source page 55
- Materiali per l’Ingegneria
- M.Ferraris
- Brittle fracture
- • Without plastic deformation
- - Flat fracture surfaces
- - Along crystalline planes for mono-crystalline materials
- (cleavage)
- - Intergranular fracture for poly-crystalline materials

### Source page 56
- Ductile and brittle fracture
- surfaces
- • Ductile fracture: plastic deformation at the crack
- edge, slow crack propagation
- • Brittle fracture: no plastic deformation at the cr ack
- edge, quick crack propagation (catastrophic failure)

### Source page 57
- Tensile strength ( ) and % e
- deformation at fracture
- • Material  (MPa) e (%)
- • steel 400-2500 40-12
- • Al alloys 300-770 8-16
- • Al 2O3 sint. 200-340 negligible
- • SiO 2 glass 110 negligible
- • ZrO 2 sint. 80 negligible
- • Polyesthers 40-80 1-2
- • Nylon 70-160 50-200
- • Epoxy 30-120 3-6

### Source page 58
- How to modify plastic
- properties of materials
- • Make dislocation motion more difficult = increase
- materials mechanical strength (and hardness)
- • Grain size
- • Solid solutions
- • Precipitates and second phases
- • Work hardening
- • Perfect crystals/monocrystals

### Source page 59
- grain boundary grain boundary
-  y  0  kyd1 2
- Hall-Petch law
- d = grain diameter (avg)
- 
- y = yield strength
- Materials related costant
- Grain size can be modified by
- thermal treatment
- Grain size reduction

### Source page 60
- Need for nucleating agents
- (fine ceramic powders in the melt)

### Source page 62
- Solid solutions
- Dislocations motion slowed
- Tensile stresses Compression stresses
- • Metallic solid
- solutions
- (alloys) have
- superior
- mechanical
- strength than
- pure metals

### Source page 63
- Materiali per l’Ingegneria
- M.Ferraris
- Role of alloying elements on
- mechanical properties

### Source page 64
- 1 MPa = 145 psi; 20000
- psi = 137.9 MPa
- The efficacy in increasing the
- yield strength is related to the
- solute/solvent size ratio

### Source page 65
- Second phases

### Source page 66
- Orowan mechanism  ring dislocation around rigid inclusions
- The efficacy of the mechanism is related to the number of particles
- rather than the total mass of particles.

### Source page 67
- Work hardening
- Dislocation density: little-deformed
- metals: 10 6 cm/cm 3 (10,000 m/cm 3);
- highly-deformed metals: 10 12 cm/cm 3
- (10,000,000 km/cm 3)
- The material undergoes successive loading-unloading cylces (“cold working”)
-  formation of new dislocations  accumulation of dislocations  barrier to further
- deformation  strengthening of the material  increase of σy (and hardness).

### Source page 68
- Ramberg-Osgood law
- (plastic field):
- σ = H×εn
- H and n = constant
- n is called work-hardening exponent

### Source page 69
- COLD WORKING OF STEELS
- Increase of σy
- •REVERSIBLE PROCESS:
- •COLD WORKING/ANNEALING

### Source page 70
- Mechanism of multiplication
- of dislocations («forest»)
- Frank-Read mechanism

### Source page 71
- (1)
- (2)
- (3)
- (4)
- (5)
- (6)

### Source page 72
- Work-hardening on metals and alloys

### Source page 73
- 1. Visualize different mechanism of hardening in stress-strain
- curves:
- metals/deformation-process-in-real-crystal-structures/
- 1. Visualize difference between Elastic deformation and
- plastic deformation:
- metals/deformation-process-in-real-crystal-structures/
- metals/fundamentals-of-deformation/
