# Lecture 03 - Mechanical Properties Part 2

Source: `STM/Material(1)/03_Mechanical prop part 2 2025-2026.pdf; STM/Material(2)/Exercise3_text.pdf`

Purpose: open-note exam guide. It prioritizes answer structure, formulas, tutorial methods, and professor-style traps.

## Core Idea

This lecture adds test methods and failure modes: true/engineering curve, necking, compression and bending, creep, fatigue, fracture toughness, hardness, toughness, resilience, Charpy, and ductile-to-brittle transition.

## Tensile Curve Details

- Engineering tensile curve uses original area and original length. After necking, engineering stress can drop even though local true stress in the neck continues to increase.
- Necking sequence: localized plastic instability, pore formation, pore coalescence, crack propagation, fracture.
- Ductility by elongation: A% = 100(lf - l0)/l0.
- A standard ductile metal shows elastic region, yield, plastic region, tensile strength, necking, and fracture. Brittle materials fracture with little or no necking.

## Compression and Bending Tests

- Compression is important for brittle construction materials such as brick, concrete, and ceramics. It can overestimate performance under real complex stresses because flaws are not opened as in tension.
- Compression of ductile samples can show barreling.
- Bending/flexural tests are often used for brittle materials. In bending, the top surface is in compression and the bottom surface is in tension; failure generally starts on the tensile side.
- Three-point and four-point bending allow flexural strength calculation from failure load and specimen dimensions.

## Creep

- Creep is plastic deformation under constant load even when the nominal stress is in the elastic field.
- It is thermally activated: metals above about 0.3-0.4 Tm, ceramics above 0.6-0.7 Tm, amorphous materials above Tg.
- Creep test: constant load, constant high temperature, record strain vs time.
- Primary creep: elastic plus plastic deformation; strain rate decreases due to hardening.
- Secondary creep: steady-state strain rate is low and almost constant because work hardening and annealing balance.
- Tertiary creep: voids/microcracks form, cracks propagate, strain rate accelerates, rupture follows.
- Higher stress and higher temperature shorten creep life. Large grains or single crystals improve creep resistance because there is less grain boundary sliding.

## Fatigue

- Fatigue is failure under cyclic loading. It can occur below yield strength and below tensile strength, so it is dangerous even for ductile materials.
- S-N/Wohler curve: stress S versus number of cycles N to failure. Use it to read fatigue life at a given stress or fatigue strength at a given life.
- Stress amplitude: sigma_a = (sigma_max - sigma_min)/2.
- Fatigue limit: below this stress, some materials do not fail within the considered cycle range. Fe, Ti, and steels can show a limit; Al and Cu alloys are treated differently and may fail after enough cycles.
- Fatigue fracture surfaces show a smoother fatigue propagation region and a rough final catastrophic failure region.
- Improve fatigue resistance by surface strengthening, coatings/environmental protection, better design to avoid notches, and fatigue/fracture mechanics life prediction.

## Fracture Mechanics

- Macro-defects such as pores and cracks are stress concentrators. The local stress at the crack tip is higher than nominal stress.
- Elliptical crack approximation: sigma_m = 2 sigma_0 sqrt(a/r_t). Larger cracks and sharper crack tips are worse.
- Fracture toughness: KIc = Y sigma_c sqrt(pi a). It combines critical stress, crack size, and geometry. Failure occurs when applied K reaches KIc.
- Ductile fracture has plastic deformation at the crack tip and slow/stable crack propagation. Brittle fracture has little plasticity and fast/catastrophic propagation.
- Weibull/statistical scale effect: larger specimens have higher probability of containing a critical flaw, so they can fail at lower stress. Glass fibers can be much stronger than glass slabs because their volume/defect population is smaller.

## Hardness, Toughness, Resilience, Charpy

- Hardness is resistance to localized compressive indentation. It can be measured with spherical or pyramidal indenters.
- Brinell: HB = F/(pi D d). Vickers: HV = 1.854 F/L2. Rockwell measures penetration depth; values outside the scale range are not acceptable.
- Hardness is useful because it is easier and less destructive than tensile testing. For steel, TS is roughly 3.45 HB.
- Toughness is total energy absorbed up to fracture, the whole stress-strain area.
- Resilience is elastic energy absorption. Ur = 1/2 sigma_y e_y = sigma_y2/(2E).
- Charpy test measures absorbed impact energy of a notched sample. It is used to study ductile-to-brittle transition.
- DBTT matters especially for BCC metals such as Fe at low temperature. FCC metals such as Cu and Ni are generally more ductile over temperature.

## Tutorial Method: Creep and Fatigue Questions

- If asked to draw creep curves for different temperatures or stresses, keep the same three stages but shift higher T or higher stress to larger strain and shorter rupture time.
- If asked about microstructure in creep: monocrystalline or large-grain materials resist creep better than fine-grained polycrystals because grain-boundary sliding is reduced.
- If asked to use fatigue curves: compute stress from load and area first, then read N from the S-N curve. With a safety coefficient, reduce allowable stress or increase required diameter accordingly.

## Source Slide Checklist

This is a compact OCR/text extraction from the source PDF. Use it as a searchable reminder of the slide wording, not as a replacement for diagrams.

### Source page 1
- MECHANICAL PROPERTIES
- OF MATERIALS:
- Additional details and testing
- methods

### Source page 2
- “True” engineering curve
- necking Formation of pores
- Pores coalescence
- Crack propagation

### Source page 6
- Metallic samples
- for tensile test
- U4G5kcpcM
- Excellent video on
- tensile test

### Source page 7
- Steel Pure metals
- a) Au and Pb at RT (100% necking), metals and polymer
- at high T
- b) Standard ductility
- c) Brittle fracture (no necking)

### Source page 8
- Yield strength
- (ss, sy, s0,2 )
- (ss, sP(0,2) )
- Yield strength or proportional
- limit (R p0,2 )
- Yield Strength (YS, S y),
- “Yield Strength (offset = 0.2 %)”

### Source page 9
- Upper and lower yield
- strength
- Upper Yield Strength (UYS)
- and Lower Yield Strength
- (LYS)
- In steel we have the solute (Carbon atoms) in Fe as interstitials.
- They cause the dislocations to pin. So it becomes difficult for
- dislocation to move and we need higher load to make them move
- (upper yield point). Then at some point the pinning is gone and
- dislocations can move freely and we need smaller load to keep
- them moving (plastic deformation going) and that would be the
- lower yield point.
- ...

### Source page 10
- (sMAX )
- (R m)
- Tensile Strength (TS, S u, UTS)

### Source page 11
- elongation %
- (A t)
- Maximum elongation (Elmax)
- 0 
- l
- l l
- Ductility

### Source page 12
- Typical stress-strain curves
- failure
- tensile strength
- upper yield point
- lower yield point
- sy
- strain
- stress
- sample ‘necking’
- elastic
- region
- plastic
- ...

### Source page 14
- It is adopted for measuring the strength of materials used in compression
- (the majority of structural materials for Architecture: br ick, concrete…) and
- for calculating the forces required in manufacturing processing
- It is useful for brittle material : pre-existing micro- or macro-defects are not
- enlarged  higher strength and strain than in tensile test. However, th is test
- overestimates the material resistance: the component can r each premature
- failure (in comparison to compression data) under real oper ating conditions
- if complex stresses (e.g. compression + torsion + bending) are present.
- Effect of
- tensile test
- on flaws
- Effect of
- ...

### Source page 15
- Tension Tension
- Compression
- Same material!

### Source page 16
- Warning!
- company/library/test-
- types/compression-test
- «barrelling»

### Source page 17
- COMPRESSION TEST

### Source page 18
- Bending or flexural test

### Source page 19
- It is often used for measuring
- the strength of
- brittle
- materials .
- There are compressive stress
- on the top surface and tensile
- forces on the bottom surface .
- The results of the bending test
- are similar to the stress-strain
- curves obtained by tension
- test;
- the maximum stress at
- ...

### Source page 20
- 3-point or
- 4-point bending test
- Block of concrete
- Highly crystalline polymer

### Source page 21
- Asymmetric 4 point bending for ceramic joined
- materials
- F
- le
- Fe FeFiFi
- F
- li
- Mf
- T
- T = F le - li
- le + l i

### Source page 22
- BENDING TEST on Al 2O3
- and glass
- s (MPa)
- e
- BENDING TEST on materials
- with plastic deformation

### Source page 23
- Flexural strength of ceramics

### Source page 24
- Condition of use!! T ????

### Source page 25
- TEST:
- • Draw e versus t (strain vs time) when a material is
- loaded at s = constant, in the elastic field, in two
- conditions:
- • Room temperature
- • High temperature (e.g. 50% Tm)

### Source page 26
- TEST
- • Draw e versus t (strain vs time) when a material is
- loaded at s = constant, in the elastic field

### Source page 27
- TEST
- • Draw e versus t (strain vs time) when a material is
- loaded at s = constant, in the elastic field

### Source page 28
- CREEP
- Plastic deformation even if stress is in the elastic
- field
- fracture
- Elastic deformation
- Creep I
- Creep III
- Creep II

### Source page 29
- Materiali per l’Ingegneria
- M.Ferraris
- CREEP
- Constant load in the elastic field can g ive to a
- plastic deformation, progressive to fracture.
- •Thermally activated process
- Metals T>0,3-0,4 T
- melting
- Ceramics T> 0,6-0,7 T melting
- Amorphous materials T>T glass
- creep test
- : a constant load is applied at a
- ...

### Source page 30
- Creep test execution: a specimen is subjected to a
- constant load and strain is measured during a
- significant period of time while maintaining the
- temperature high and constant .
- CONSTANT TEMPERATURE
- (FURNACE)
- SAMPLE
- LOAD
- (CONSTANT WEIGHT)

### Source page 31
- Tertiary creep: at grain boundaries some
- microcracks and voids are formed 
- weakness points  cracks propagation 
- material rupture
- Primary creep:
- we have elastic + plastic deformation;
- the latter is favoured by dislocation
- movement. The deformation rate
- (dε/dt) progressively decreases.
- Secondary creep:
- the deformation rate (dε/dt) is low in
- comparison to that of primary creep
- ...

### Source page 32
- (c)2003 Brooks/Cole, a division of Thomson Learning, Inc. Thomson Learning ™ is a trademark used herein under
- license.
- Dislocations can climb (a) when atoms leave the dislocation line to create
- interstitials or to fill vacancies or (b) when atoms are attached to the
- dislocation line by creating vacancies or eliminating interstitials
- Stage I: primary creep

### Source page 33
- Stage II : steady state
- nCRn
- ss AT R
- ECdt
- d
-  
- e
- e  
- 
- 
- 
- 
- ...

### Source page 34
- Stage III: tertiary creep

### Source page 36
- strain
- tIME
- increasing
- load
- Effect of the applied load

### Source page 37
- increasing
- temperature
- strain
- tIME
- Effect of the working temperature

### Source page 38
- °C
- Experimental creep curves for a borosilicate glass
- at 200 and 420 °C, from 18 to 36 MPa)

### Source page 39
- How to increase creep resistance?
- • High melting T and E materials
- • Large grains or mono-crystals (small grains
- increase grain motion at the grain boundaries)
- • Solid solutions (to restrict dislocation glide)
- • Precipitates (to restrict dislocation glide)
- • Second phases (composites) (to restrict
- dislocation glide)
- Effect of grain size on yield strength???

### Source page 40
- Scienza e Tecnologia dei Materiali
- M.Ferraris
- Grain size effect on creep
- dg (average grain
- diameter= 170 microns
- Time (hours)
- Creep tests at 1000 °C,
- 10 hours, 17MPa

### Source page 41
- Scienza e Tecnologia dei Materiali
- M.Ferraris
- Crystalline structure effect on creep
- -large grains can increase creep resistance because there is less grain boundary surface able to slide; several small
- grains slide one on the other one; with a few large grains this is less evident;
- -even longer creep life if you have a single crystal with no grains at all

### Source page 42
- TEST:
- • Apply a tensile stress to a material in the elasti c
- field.
- • Can this material fail?
- • Repeat the test several times.
- • Is it possible to have the material failure ?
- • If yes, draw a graph with the applied stress
- (s) versus the number of cycles (N)
- necessary to achieve the material failure

### Source page 43
- S-N curves: stress (S) vs number of cycles
- (N) to obtain failure
- N
- S Fe, Ti, steels
- Al, Cu
- Dispersion range due
- to experimental
- measurement of fatigue
- Fatigue limit
- Wohler curves

### Source page 44
- Fatigue
- • Failure of materials due to cyclic loading.
- • Main reason of mechanical failure of materials
- • Failure happens at stress lower than sR or sY
- • Catastrophic failure of materials (ALSO FOR DUCTILE
- MATERIALS !)
- • Fatigue tests: materials are cyclically loaded at different
- stresses up to failure.
- • Fatigue limit: when cyclically loaded below this limit,
- materials do not fail (time considered by the graph)

### Source page 45
- Experimental measurement: fatigue testing
- Rotating-bending test: the specimen is rotated and a load perpendicular to
- the rotational axis is imposed.
- This test is very time-consuming  the specimens are tested under several
- millions of stress cycles!

### Source page 46
- S-N curve
- s a s max s min
- S=
- N
- S smax , smin : applied
- stresses during tests
- Fracture zone
- Safe zone
- Fatigue limit

### Source page 47
- Materials and Fatigue
- • Between 35-65% of their tensile strength most of
- metals fail because of fatigue (e.g. Fe, Ti alloys,
- intrinsical fatigue limit)
- • Other metals fail in any case after a given limit (e.g. A l,
- no intrinsical fatigue limit)
- • Fatigue resistance: stress necessary to fracture the
- material after a given number of cycles at this stress
- • Fatigue life: number of cycles necessary to fracture
- the materials at a given load .

### Source page 48
- Materiali per l’Ingegneria
- M.Ferraris
- A 78.5 mm2
- Stress amplitude 127MPa
- A cylindrical component (10 mm diameter) is cyclically loaded at
- 10 kN (compression, tensile stresses). Calculate its fatigue life if
- the component is made of brass, aluminum alloy or steel

### Source page 49
- Fatigue: fracture surface
- Starting point (macroscopic surface
- defect)
- Starting
- point
- Fatigue surface
- (smooth)
- Catastrophic failure,
- rough surface

### Source page 50
- Fatigue: fracture surface
- Fatigue surface, smooth
- Catastrophic brittle failure,
- also on ductile materials,
- rough surface

### Source page 51
- Ductile and brittle fracture
- • Ductile fracture: high plastic deformation at the
- crack tip, slow crack propagation (i.e. stable
- propagation)
- • Brittle fracture: no (or low) plastic deformation at t he
- crack tip, quick crack propagation (i.e. unstable
- propagation), catastrophic failure

### Source page 52
- Static loads Cyclic loads
- Intrusion bands

### Source page 53
- Stress intensity factor
- • Macro-defects (pores, cracks) in
- all materials act as stress
- concentration factors
- • True stress on the material at the
- tip of the crack (s m) is higher than
- the nominal stress (
- s
- 0)
- rt = radius of the crack
- a = length of a crack on the
- surface
- ...

### Source page 54
- Stress intensity factor for elliptical cracks with
- length = 2a and small curvature radius:
- s m  2s 0
- a rt
- 
- 
- 
- 
- 1 2
- Callister
- s0= nominal stress
- sm= stress on material
- ...

### Source page 55
- Materiali per l’Ingegneria
- M.Ferraris
- Crack propagation
- Role of : rt = radius of the crack
- a = length of a crack on the material surface
- - If plastic deformation is possible,
- rt can increase 
- decrease of
- sm
- - If plastic deformation is not possible  catastrophic failure.
- - Griffith Theory (with subsequent Irwin modifications)
- quantifies these issues
- ...

### Source page 56
- KIc = Y sc (p a) 1/2 (MPa m 1/2 )
- Fracture thoughness
- (mode I)
- a = half length of the crack
- Y = geometrical parameter
- Crack propagation and critical parameters
- sc = critical stress, crack propagation
- for s > sc

### Source page 58
- KIC critical
- parameters
- (defect length and
- stress)
- above which there is
- failure ( all materials )
- KIc = Y sc (p a) 1/2
- (ASTM E 399)
- PS-ZrO 2 8-12

### Source page 59
- Materials

### Source page 60
- The strength of materials (for allowing crack propagation) is given
- by the combination of:
- - fracture tiughness
- - crack size
- - sample geometry

### Source page 61
- WEIBULL STATISTICS
- The PROBABILITY of fracture is linked to the
- dimensional distribution of the defects in the material
- volume and to the probability of finding cracks of
- certain dimensions in a sample
- Larger samples statistically fail under lower loads 
- greater probability of containing defects of critical size
- SCALE EFFECT!

### Source page 62
- Mechanical strength - «chain analogy»
- The resistance of a chain depends on the
- weakest element
- If the resistance of each element is
- randomly distributed and the probability
- of NOT BREAKING of a chain of length
- L is P s (L) then the probability of not
- breaking of a chain of length 2L will be:
- Ps(2L) = Ps(L)·P s(L)
- Note on the scale effect (see previous slide):
- as P
- s(L) ranges between 0 and 1, then Ps(2L) < Ps(L))

### Source page 63
- Example: glass fibres
-  Tensile strength of a glass
- slab around 100 MPa
-  For glass fibres  900-1000
- MPa
-  Scale or volume effect 
- Weibull statistics
-  Tensile strength can reach
- values comparable to the
- compressive strength

### Source page 64
- Materiali per l’Ingegneria
- M.Ferraris

### Source page 65
- How to increase materials fatigue
- resistance?
- • Surface strengthening
- methods
- • Environment (corrosion?) 
- coatings
- • Suitable mechanical design
- • Fatigue and fracture
- mechanics to model and
- predict components life !
- Strengthened surface
- Normal surface

### Source page 66
- Notches in engineering components
- How to solve?

### Source page 67
- Finite Element Analysis (FEA)

### Source page 68
- Examples of different r
- and stress concentration
- by Finite Element
- Analysis (FEA)

### Source page 71
- It is a measure of the material resistance to localized compressive
- stress due to INDENTATION .
- The indenter is subjected to a load and causes a localized ela stic
- deformation, followed by a plastic deformation which leads to an
- indentation (imprint ).
- Resulting indentations are observed and measured.
- Different scales of hardness exist; the hardness
- H can be expressed
- as F/A , where A is the area of the indentation (note that H is formally
- expressed in GPa ), or as the depth of the indentation (H is
- expressed in μm or mm ).
- Shape of the indenter:
- ...

### Source page 72
- Basis
- Loads
- (changeable weights)
- Head of the machine
- Lever for load application
- Sample holder
- Indenter
- Sample
- Handwheel
- Test execution

### Source page 73
- Brinell test : spherical indenter
- HB = F/( pDd) = load/indentation area
- Vickers test: pyramidal indenter
- HV = 1.854(F/L 2), where L is the imprint diagonal length
- Indenter
- Sample
- surface
- Indenter is above
- sample surface
- Indenter is subjected to a
- load and it penetrates
- into sample surface
- ...

### Source page 74
- Vickers
- Brinell

### Source page 75
- Rockwell Hardness
- measures penetration depth

### Source page 76
- example: 60 HR30W = superficial Rockwell hardness =
- You measure 60 on a scale 30W, with a Rockwell hardness test

### Source page 77
- Example: 80 HRB= Rockwell hardness = 80 scale B
- Values lower than 20 or higher than 100 are not acceptable

### Source page 78
- Correlation hardness/tensile properties
- Steel TS: about= 3.45 HB
- brass
- Cast iron
- steel
- 78 HB
- σmax
- This correlation is useful because
- hardness test is easier to be
- performed than tensile test and it does
- not fracture the sample.
- This is the reason why the
- ...

### Source page 80
- Vickers micro-hardness
- on a brittle material
- Quality of
- joining

### Source page 81
- AGAIN……..

### Source page 82
- Materiali per l’Ingegneria
- M.Ferraris
- Toughness and resilience
- • Toughness = energy absorbed up to fracture = area of se curve up
- to fracture ) (J / m 3 )
- • Resilience = energy absorbed under mech. impact (notched samples)
- Stress
- strain
- Brittle, low ∫ s de
- Ductile, tough, plastic…..large ∫ s de

### Source page 83
- Stress
- Fracture elastic energy or resilience modulus (U r)
- Ur = ∫ s de( between e0 and
- ey) (ELASTIC FIELD )
- s = E e e ysy / E
- Ur = ½ sy ey  ½ sy
- 2 /E
- strain

### Source page 84
- Charpy test :
- Assessment of the
- resiliency  energy
- necessary to
- fracture a notched
- sample
- (impact of a
- hammer)
- Starting position
- hammer
- scale
- final position
- ...

### Source page 85
- Absorbed impact energy vs. temperature for several steels: ductile to
- brittle transition
- Absorbed impact energy
- Role of C and Fe 3C on dislocation motion and ductile to brittle transition

### Source page 86
- Materiali per l’Ingegneria
- M.Ferraris
- Effect of ductile to brittle transition...
- • 4 °C
- • steel

### Source page 87
- Importance of Brittle to Ductile Transition Temperature
- The Titanic
- P/S too High !
- Mn too low !
- Courtesy of L.L.Snead, ORNL, USA

### Source page 88
- Work of : Leihly, Braamfitt, and Lawrence. Practical Failure Analysis 1(2) 2001.
- Importance of “Ductility ” for Engineering Materials
- Ductile-to-brittle
- transition temperature
- 5 0
- 1 0 0
- 1 5 0
- 2 0 0
- 2 5 0
- 3 0 0
- 3 5 0
- -1 0 0 -5 0 0 5 0 1 0 0 1 5 0 2 0 0
- ...

### Source page 89
- Importance of Brittle to Ductile Transition Temperature
- 120 °C Test, Ductile -32 °C Test, Brittle
- Titanic Hull Plate
- Courtesy of L.L.Snead, ORNL, USA

### Source page 90
- Fracture surfaces after Charpy test (V-
- notched) at given T
- Ductile to brittle transition

### Source page 91
- • Increasing temperature...
- -- increases % EL and KIC
- • Ductile-to-Brittle Transition Temperature (DBTT) ...
- D  B transition temperature
- BCC metals (e.g., iron at T < 914°C)
- Impact Energy
- Temperature
- High strength materials ( sy > E/150)
- polymers
- More Ductile Brittle
- Ductile-to-brittle
- transition temperature
- ...

### Source page 92
- Ex: Cu, Al, Ag, Au
- Ex: Fe, W, Cr
- Ex: Mg, Ti, Zn
- HEXAGONAL
- BCC FCC

### Source page 93
- Materiali per l’Ingegneria
- M.Ferraris
- - https://www.tec-
- science.com/material-
- science/ductility-of-
- metals/influence-of-the-
- lattice-structure-on-the-
- ductility/
- (Cu, Al, Ni, Ag, Au)
- (Fe)

### Source page 94
- CHARPY tests on
- steel at different T:
- at room T
- 2.22 J/mm 2
- at -200 °C
- 0.04 J/mm 2
- CHARPY test on steels
- with same composition
- but different thermal
- treatments:
- C40 steel annealed
- 0.89 J/mm 2
- ...

### Source page 95
- DUCTILITY TEST
- o
- o f
- STRAIN
- l
- l l) ( 100%  o
- o
- necking
- A
- A Af ) ( 100%
- 

### Source page 96
- Materiali per l’Ingegneria
- M.Ferraris

### Source page 97
- T1
- T2
- T3
- T4
- T1<T2<T3<T4
- Effect of T

### Source page 98
- Stress/strain curves vs Temperature
- Fe Polymers (PMMA)
