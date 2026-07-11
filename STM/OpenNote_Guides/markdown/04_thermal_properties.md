# Lecture 04 - Thermal Properties

Source: `STM/Material(1)/04_thermal properties_2025-2026.pdf; STM/Material(2)/Exercise4_Q_solved_Ferraris.pdf`

Purpose: open-note exam guide. It prioritizes answer structure, formulas, tutorial methods, and professor-style traps.

## Core Idea

Thermal properties describe how a material responds to heat: temperature rise, dimensional change, energy transport, melting/softening, and thermal stresses. The exam simulation specifically asks heat conduction mechanisms, k ranking, diamond, and thermal expansion/stress calculations.

## Heat Capacity and Specific Heat

- Heat capacity C is the ratio between heat added and temperature increase: C = dQ/dT or DeltaE/DeltaT, units J/K.
- Specific heat c is heat capacity per unit mass: c = dQ/(m dT), units J/(kg K). cp is at constant pressure, cv at constant volume; at room temperature the difference is small for many solids.
- Atomic/molecular heat is per mole and is often about 25 J/(mol K) for many solid elements at sufficiently high temperature.
- During phase transformations, heat can be spent on the transformation without increasing temperature.

## Thermal Conductivity

- Thermal conductivity is the ability to transfer thermal energy from a hotter region to a colder region.
- Formula for 1-D conduction: Q_energy = k A t DeltaT / Delta x. Heat flux q = k DeltaT / Delta x.
- k has units W/(m K). A is area, t is time, Delta x is thickness, DeltaT is temperature difference.
- Mechanisms: free electrons and phonons. k_total = k_lattice + k_electrons.
- Metals: free-electron contribution dominates, so k is high and related to electrical conductivity.
- Ceramics: phonon contribution dominates; usually lower k than metals.
- Glasses: lower k than crystalline ceramics because vibrational waves propagate poorly without long-range order.
- Polymers: very low k because heat is dissipated by vibration/rotation of molecular chains; amorphous polymers are especially low.
- Porous materials have low k because air in pores is a poor heat conductor. Foams and aerogels exploit this.

## Useful k Values and Ranking

- Exercise values: Cu 398 W/mK, Al 247, Fe 81, steel 52, stainless steel 16.
- Ceramics/glasses examples: MgO 38, Al2O3 30, MgAl2O4 15, SiO2 glass about 2, soda-lime glass about 1.7.
- Polymers examples: polyethylene 0.4, nylon 0.24, PTFE 0.25.
- Ranking to state in theory answers: k_metals > k_ceramics >> k_polymers, with glasses below crystalline ceramics.
- Diamond has very high k because of strong bonds, high E, low defects, similar atomic masses, and simple crystalline cell.

## Thermal Expansion

- On heating, atoms vibrate more and average bond distance increases, so solids expand.
- Thermal strain: e_th = DeltaL/L0 = alpha DeltaT.
- Linear expansion: DeltaL = alpha DeltaT L0.
- alpha units: K^-1 or C^-1. It varies somewhat with temperature.
- Typical ranges from slides/exercise: polymers about 50-400 x 10^-6 K^-1 (exercise simplified 100 x 10^-6 K^-1), metals about 5-25 or 15-30 x 10^-6 K^-1, glasses about 0.5-20 x 10^-6 K^-1, ceramics about 0.5-15 or 3-7 x 10^-6 K^-1.
- Strong bonds give high E, high melting temperature, and low thermal expansion coefficient.

## Thermal Stress and Thermal Shock

- If a body is free, it expands or contracts and stress may remain low.
- If expansion/contraction is constrained, thermal stress develops: |sigma| = E alpha |DeltaT|.
- Heating a constrained rod wants to elongate, so the constraint produces compression. Cooling a constrained rod wants to contract, so the constraint produces tension.
- Joined materials with different CTE develop residual stresses during cooling. If alpha_B > alpha_A, material A is in compression after cooling; if alpha_B < alpha_A, material A is in tension.
- Thermal shock resistance first approximation: TSR about sigma_f k / (E alpha). High k and low alpha are favorable; high strength helps; brittle materials often fracture under thermal stresses.

## Tutorial Methods

- Conducted energy: convert thickness to meters, area to m2, time to seconds, then Q = k A t DeltaT / Delta x.
- Example from Exercise 4: polymer component, k = 0.58 W/mK, DeltaT = 30 K, Delta x = 0.002 m, A = 1 mm2 = 1e-6 m2, t = 3600 s. Heat flux = 8700 W/m2, energy = 31.32 J.
- Expansion example: steel alpha = 14 x 10^-6 C^-1, L0 = 50 m, DeltaT = 30 C. DeltaL = 14e-6 x 30 x 50000 mm = 21 mm.
- Constrained stress example: steel E = 207 GPa, alpha = 12e-6 C^-1, DeltaT = 60 C. sigma = 207000 MPa x 12e-6 x 60 = 149 MPa compression.
- Temperature limit example: with constrained brass, sigma = E alpha DeltaT; solve DeltaT = sigma/(E alpha), then add to initial temperature.

## Source Slide Checklist

This is a compact OCR/text extraction from the source PDF. Use it as a searchable reminder of the slide wording, not as a replacement for diagrams.

### Source page 1
- THERMAL PROPERTIES
- OF MATERIALS

### Source page 2
- THERMAL PROPERTIES: knowledge of materials response to the
- application of heat.
- The knowledge of materials behaviour at high temperatures and how
- their properties change with temperature is fundamental for material
- applications
- MATERIAL
-  Temperature rise
-  Dimensions increase
-  Energy transport to cooler regions
-  Melting
- HEAT
- RELEVANT THERMAL PROPERTIES:
-  Heat capacity
-  Thermal conductivity
- ...

### Source page 3
- Mechanisms of heat transfer in a solid material
- If heat is supplied to a solid material:
-  atomic vibrational energy
- increases
-  atoms are not independent (
- due to
- their chemical bonds ): heat is
- transferred through the material
- (crystalline lattice or amorphous
- structure) by vibrational waves called
- PHONONS
- Thermal energy is transferred:
- - both by free electrons (for instance in metals , where there is an
- “electronic cloud”)
- ...

### Source page 4
- The modes of vibration involve the entire crystal
- volume.
- In real crystals, amplitude of vibration is typically
- much smaller than the lattice spacing.

### Source page 5
- 5https://www.youtube.com/watch?v=RgRwHL4P8tU

### Source page 6
- The internal energy of a solid material increases as heat is provided to it.
- Thermal vibration amplitude increases as heat is supplied to the material
- temperature increases  the kinetic energy of electrons increases and
- the interatomic distance increases  the solid changes its size
- Thermal vibrations:
-  Atomic, ionic and molecular vibrations around the
- equilibrium positions of an atom/ion/molecule in the lattice
-  Atomic vibration inside molecules
-  Rotation of molecules
- During phase transformations (e.g. transitions of state of matter)
- heat is spent to do the transformation
- and there is no temperature increase

### Source page 7
- The heat capacity , C (J/K), of a system is the ratio
- between the heat added to a material (dQ) and the
- resultant change in its temperature (dT):
- Practically, it is the ratio between the absorbed
- thermal energy ΔE and the resultant increase in
- temperature ΔT:
- HEAT MATERIAL
- Heat capacity
- This parameter denotes the material ability to absorb heat from the external
- surroundings.
- dT
- dQC 
- T
- EC 
- ...

### Source page 8
- To make a comparison of heat capacities of different materials, we introduce
- a new parameter derived from C:
- the SPECIFIC HEAT (c) represents the heat capacity per unit mass (i.e. 1
- kg) to raise a material’s temperature by 1 degree (1 K)
-  cp: measured with
- constant external pressure
-  cv: maintaining
- specimen volume constant
- cp > c v but the difference is
- very small at room temperature, so we
- can usually define a single value of
- specific heat c.
- dT m
- dQc  (J/kg K)
- ...

### Source page 9
- The heat capacity C (and accordingly the specific heat c) increases as T
- increases (at relatively low temperature):
-  it is necessary to give a bigger amount of heat to raise temper ature of a
- former heated material
-  above a certain temperature it becomes constant
- DEBYE TEMPERATURE
- (below room temperature for many solid materials)

### Source page 10
- If the specific heat, c, is referred to 1 mole of substance (instead of 1 kg we
- consider a number of atoms or molecules equal to the Avogadro ’s number,
- NA = 6×10 32 ), it is called ATOMIC OR MOLECULAR HEAT (J/mole K). This
- parameter is preferably used in chemistry and materials science.
- For most of solid elements the ATOMIC HEAT is about 25 J/mol K.
-  atomic heat depends on
- temperature at low T
-  at high T it is approximately
- constant (or slightly over 25 J/mol
- K)
- Heat capacity and derived parameters
- depend on the atomic weight.

### Source page 11
- Thermal conductivity is the ability of a material to transfer thermal energy
- from a system at high temperature to another system at lower temperature.
- Thermal conductivity
- HEAT
- MATERIAL
- We define the thermal power Q (W) as:
- THERMAL CONDUCTIVITY
- COEFFICIENT
- 1-D situation, e.g. in a wire
- 2 o m
- W dx
- dTkA
- Qq  
- Thermal flow
- ...

### Source page 12
- Example
- Calculate the heat flowed in 1 hour through a 2 mm thick polymeric sheet (1 m 2) when one
- side is at 20 °C and the other side is at 50 °C.
- k = 0.58 W/m K
- Q = 1 × 0.58 × 30 / (2× 10 -3) = 8700 W
- Heat in 1 h = 8700 × 3600 = 3.1 10 7 J
- 1 W=1 J / s

### Source page 13
- Mechanisms of heat conduction
-  Lattice vibration waves ( PHONONS )
-  Free electrons
- k = k l + k eTOTAL
- CONDUCTIVITY
- LATTICE VIBRATION
- CONDUCTIVITY
- Phonon net movement
- ELECTRON
- CONDUCTIVITY
- Kinetic energy transfer

### Source page 14
- First mechanism ( free electrons ) is predominant in metals : it is
- related to electrical conductivity (also in this case we hav e movement
- of electrons) and it is very efficient  metals have high thermal
- conductivity . It can also depend on impurities and alloying elements.
- Second mechanism ( phonons ) is predominant in ceramics and it is
- less efficient  in fact ceramics are insulating materials
- Thermal conductivity of glasses is lower than thermal conductivity
- of ceramics  vibrational waves very hardly propagate without
- crystalline lattice
- Porous materials  low thermal conductivity (air entrapped inside
- the pores is a bad heat conductor  desired thermal insultating effect )
- Thermal conductivity of polymers is lower than thermal
- conductivity of ceramics (heat is partially dissipated by
- vibration/rotation of polymeric chain molecules); it is as much lower if
- ...

### Source page 15
- In general, thermal conductivity depends
- on temperature.
- Random thermal agitation increases with increasing
- temperature  disturbing effect on propagation of phonons
- (for instance kl decreases with the increase of T in the
- case of ceramics ).
- Electrons motion does not change (significantly) with T
- (practically, ke does not change with T in the case of
- metals )
- However, remember that BOTH MECHANISMS are always present
- in solid materials!

### Source page 17
- METALS
- CERAMICS
- In most cases, metals exhibit higher thermal conductivity than ceramics.
- k metals > kceramics >> kpolymers

### Source page 18
- Some practical effects of heat capacity and thermal conductivity
- A component made by using a material with high specific heat t akes
- more time (in other words, more heat ) to increase its temperature in
- comparison with a component made of a material showing a low
- specific heat.
- Example:
- Why is steel cold to touch?
- Because steel has high thermal conductivity and high specif ic heat;
- as a consequence, it is cold to the touch  heat flux from our body is
- significant (high thermal conductivity) and a big amount of heat is
- needed to raise steel’s temperature from room temperature ( 25 °C)
- up to equilibrium with our hand (37 °C) (
- steel has high heat capacity ).

### Source page 19
- k vs Zn % in Cu-Zn alloys

### Source page 20
- POLYMERS
- k ~ 0.3 W/m K
- Vibration and
- rotation of
- molecular chains
- k increases with
- the % of
- crystalline
- structure
- Typical insulating
- materials
- Polymeric Foams:
- role of pores

### Source page 21
- Role of porosity on thermal
- conductivity
- •k (air) = 0.02 W/m K
- Foam glass, k= 0.04 W/mK
- Foam materials

### Source page 22
- Silica aerogel
- • One of the lowest density material
- (1.6-1.9 mg/cm 3)
- • 95% air, 5% SiO 2
- • pore size about 20 nm
- 20 nm

### Source page 23
- Thermal conductivity of Aerogels vs
- other insulating materials
- Air

### Source page 24
- k aerogel < k air: is it possible?
- Pore size in aerogel (20 nm) is lower than free mean
- path for air molecules: heat transmission less effective in
- aerogels than in air (convection)

### Source page 25
- Atoms with similar mass
- High E (diamond E=700-1200GPa)
- Low defects
- Simple crystalline cell (e.g. cubic)
- Diamond 2000 (W .m-1. K-1)
- Graphite anisotropic
-  see next slide
- BN (cubic) 1300
- BeO 300
- AlN 200
- SiC 130
- High-k ceramics

### Source page 26
- Graphite: anisotropy

### Source page 27
- Applications of high k ceramics: SiC heat exchangers
- W.m-1. K-1

### Source page 28
- Thermal conductivity in ceramics: the
- influence of grain size
- • Effect of grain size:
- like in the case of mechanical resistance
- (strength), the increase of thermal resistance,
- k
- -1, is related to the grain size d, being
- inversely proportional to √d :
- k -1  d -1/2
- • For ceramics to have high thermal
- conductivity, MICROSTRUCTURES with
- LARGE GRAINS are useful to minimize the
- effect of phononoic deviation by grain
- boundaries and the effect of phases/impurity
- ...

### Source page 29
- Thermal expansion
- In general, solids increase their
- size when heated and decrease
- their size when cooled .
- We heat the rod up to a temperature T > T0, and its length increases to L
- L L 0 T
- The rod is at a temperature T0 and has a length of L0.
- We shall call the change in temperature:
- T T - T0
- and the corresponding change in length:
- L L - L0
- HEAT

### Source page 30
- Tl
- lT Tl
- l l
- t    
-   
- 0 ) (
- Due to temperature increase ΔT, solids undergo thermal deformation that can
- be defined as:
- Thermal expansion is reflected by an increase in the average
- distance between the atoms with respect to their equilibrium positions
- the increase of volume due to thermal expansion is due to the
- increase of interatomic bond length
-  is called THERMAL EXPANSION COEFFICIENT [K -1 or °C -1]: it indicates
- how a material expands upon heating
- ...

### Source page 31
-  = 10×10 -6 C-1 means that, starting from about
- room temperature, at 1000 °C elongation is 1%
- Note: actually,  Is not constant but (slightly) varies with T
- Metals   5-25 10 -6 K-1
- Ceramics   0.5-15 10 -6 K-1
- Polimers   50-400 10 -6 K-1

### Source page 32
- CTE and bond
- strength
- Lower 
- Strongly
- bonded
- solids,
- high E,
- high melt T

### Source page 33
- Melting temperature (K)
- Relationship between α at 25 °C and
- melting temperature. Metals having
- high melting point tend to show less
- expansion
- Strong chemical bond: high elastic modulus , high melting
- point , low thermal expansion coefficient

### Source page 34
- CTE changes with the crystalline
- structure
- (example: Fe)

### Source page 35
- Examples:
-  to manufacture a metallic joint using polymer resins as joining
- material, additives (glass fibers or ceramics) should be pu t in the polymer
- with the aim of reducing its thermal expansion coefficient
-  Fe/steel reinforcement in
- concrete : coupling between concrete matrix
- (“artificial ceramic”) and metal-
- Material design and choice should take into account the thermal
- expansion of materials that are put in contact
- Careful attention should be devoted to materials in compone nts working at
- high temperature, used as a coating or subjected to sudden te mperature
- changes   mismatch should be reduced and appropriate “voids” might
- be foreseen inside components in order to allow thermal expansion
- Importance of  in materials choice

### Source page 36
- CTE steel = 12 x 10 -6 °C -1
- CTE granite= 8 x 10 -6 °C -1
- CTE steel = 12 x 10 -6 °C -1
- CTE granite= 8 x 10 -6 °C -1

### Source page 37
-  = E   E  l /l o  E  T
-  Ductile materials
-  Brittle materials
- Thermally induced stresses
- Tl
- l
- T Tl
- l l
- t
- t
-  
-  
- 
- 
- ...

### Source page 38
-  Brass cylinder (E= 100 GPa,  y= 172 MPa,  = 20 x
- 10 -6 /K ), no thermal expansion allowed, which is
- the maximum T it can reach without plastic
- deformation? (room T= 20 °C)
- Troom
- Lroom
- T
- L
- compressive  keeps L = 0   E(thermal )  E(T  Troom )
- 100 GPa 20 x 10 -6 /K
- 20 °CT= 106 °C172 MPa
- Thermally induced stresses: example
-  = E   E  l /l o  E  T

### Source page 39
-  B <  A  B >  A
- Joined materials with different thermal expansion
- coefficients- Residual stresses during cooling
-  If α B > α A, during cooling to room T, material
- A is in compression mode
-  If α B < α A , during cooling to room T, material
- A is in tensile mode
- RT RT
- A
- BB
- A

### Source page 41
- Stress at the interface between two solids
- having different CTE
-  = Stress at the interface between two solids having different CTE
- E = Young modulus (M=metal, C=ceramic)
- T = temperature (Tb -Ta =
- T)
-  = CTE (M=metal, C=ceramic)

### Source page 42
- • flexural strength, f
- • coefficient of thermal conductivity, k
- • elastic modulus, E
- • TEC, 
- 
- E
- kTSR
- f
- 
-  First approximation of temperature variation ( T) without
- failure for a given material
- Thermal shock resistance (TSR)
- MPa
- BEST (ideal) MATERIAL: high k and low 
- ...

### Source page 43
- Materiali per l’Ingegneria
- M.Ferraris
- Al
- Cu
- Au
- Fe
- Ni
- Ag
- W
- Steel
- Stainless steel
- brass
- Silica glass
- Soda-lime glass
- ...

### Source page 44
- DUCTILE MATERIALS
- (e.g. metals, polymers)
- Thermal stresses can induce plastic
- deformation (unavoidable)
- BRITTLE MATERIALS
- (e.g. ceramics, glasses)
- Thermal stresses
- often lead
- to
- fracture
- Modification of material properties ( mainly ) by:
-  changing chemical composition (e.g. adding other
- oxides in glasses;
-  fabrication of composites (second phases with
- ...

### Source page 45
- THERMAL PROPERTY MEANING CORRELATION TO
- MATERIAL
- CHARACTERISTICS
- THERMAL CAPACITY Material ability to
- absorb heat from the
- external surroundings
- Depends on atomic weight
- THERMAL
- CONDUCTIVITY
- Material ability to
- transfer thermal energy
- from a system at high
- temperature to another
- system at lower
- ...
