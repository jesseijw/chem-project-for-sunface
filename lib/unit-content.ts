export type UnitQuestion={id:string;prompt:string;choices:string[];answer:number;feedback:string};
export type Unit={id:string;title:string;subtitle:string;color:string;questions:UnitQuestion[]};
export const units:Unit[]=[
{id:"atomic",title:"Atomic structure",subtitle:"Electrons, spectra, and periodic patterns",color:"sage",questions:[
{id:"a1",prompt:"Which species has 18 electrons?",choices:["K","K⁺","Cl","S⁻"],answer:1,feedback:"K has 19 protons. Losing one electron gives K⁺ 18 electrons."},
{id:"a2",prompt:"Why is the first ionization energy of Mg greater than that of Na?",choices:["Mg has more shielding","Mg has a greater effective nuclear charge","Na has a smaller radius because it has fewer protons","Mg has electrons in a higher shell"],answer:1,feedback:"Across the period, shielding changes little while nuclear charge increases, so Mg holds its valence electrons more strongly."}]},
{id:"bonding",title:"Molecular structure",subtitle:"Bonding, Lewis structures, and geometry",color:"peach",questions:[
{id:"b1",prompt:"What is the molecular geometry of NH₃?",choices:["Trigonal planar","Tetrahedral","Trigonal pyramidal","Bent"],answer:2,feedback:"Four electron domains give tetrahedral electron geometry; one lone pair makes the molecular shape trigonal pyramidal."},
{id:"b2",prompt:"Which bond is expected to be most polar?",choices:["C–H","N–H","O–H","F–H"],answer:3,feedback:"The H–F bond has the greatest electronegativity difference."}]},
{id:"forces",title:"Intermolecular forces",subtitle:"Properties, solutions, and particle models",color:"lilac",questions:[
{id:"f1",prompt:"Which pure substance can form hydrogen bonds between its molecules?",choices:["CH₄","CH₃OH","CO₂","H₂S"],answer:1,feedback:"CH₃OH contains an O–H bond and an oxygen lone pair, enabling hydrogen bonding."},
{id:"f2",prompt:"Why does I₂ have a higher boiling point than Br₂?",choices:["I₂ is ionic","I₂ has stronger London dispersion forces","Br₂ is polar","I₂ forms hydrogen bonds"],answer:1,feedback:"I₂ has a larger, more polarizable electron cloud, so its dispersion forces are stronger."}]},
{id:"reactions",title:"Chemical reactions",subtitle:"Stoichiometry, reactions, and net ionic equations",color:"gold",questions:[
{id:"r1",prompt:"For 2 H₂ + O₂ → 2 H₂O, how many moles of H₂O form from 3.0 mol O₂ with excess H₂?",choices:["1.5 mol","3.0 mol","6.0 mol","9.0 mol"],answer:2,feedback:"The coefficient ratio is 2 mol H₂O per 1 mol O₂, so 3.0 mol O₂ forms 6.0 mol H₂O."},
{id:"r2",prompt:"Which ions are spectators when AgNO₃(aq) reacts with NaCl(aq)?",choices:["Ag⁺ and Cl⁻","Na⁺ and NO₃⁻","Ag⁺ and NO₃⁻","Na⁺ and Cl⁻"],answer:1,feedback:"AgCl precipitates; Na⁺ and NO₃⁻ remain unchanged in solution."}]},
{id:"kinetics",title:"Kinetics",subtitle:"Rates, mechanisms, and energy profiles",color:"rose",questions:[
{id:"k1",prompt:"Doubling [A] makes the rate four times larger. What is the order in A?",choices:["Zero","First","Second","Third"],answer:2,feedback:"A fourfold rate change from doubling concentration means 2ⁿ = 4, so n = 2."},
{id:"k2",prompt:"What does a catalyst change?",choices:["ΔH of reaction","Equilibrium constant","Activation energy","Overall stoichiometry"],answer:2,feedback:"A catalyst provides an alternate pathway with lower activation energy; it does not change ΔH or K."}]},
{id:"thermo",title:"Thermochemistry",subtitle:"Energy transfer, calorimetry, and enthalpy",color:"blue",questions:[
{id:"t1",prompt:"A solution absorbs 500 J of heat. What is q for the reaction?",choices:["+500 J","−500 J","0 J","Cannot be determined"],answer:1,feedback:"Heat gained by the surroundings is lost by the reaction: qreaction = −qsolution."},
{id:"t2",prompt:"Which process is necessarily endothermic?",choices:["Condensation","Freezing","Deposition","Vaporization"],answer:3,feedback:"Vaporization requires energy to overcome intermolecular attractions."}]},
{id:"equilibrium",title:"Equilibrium",subtitle:"K, Q, stress, and solubility",color:"teal",questions:[
{id:"e1",prompt:"If Q < K, which direction does a reaction proceed?",choices:["Toward reactants","Toward products","It is already at equilibrium","K decreases"],answer:1,feedback:"When Q < K, more products must form for the ratio to reach K."},
{id:"e2",prompt:"For N₂O₄(g) ⇌ 2 NO₂(g), decreasing volume favors which side?",choices:["NO₂","N₂O₄","Neither","Both equally"],answer:1,feedback:"Higher pressure favors the side with fewer gas particles: one mole of N₂O₄ rather than two moles of NO₂."}]},
{id:"acidbase",title:"Acids and bases",subtitle:"pH, buffers, titrations, and equilibria",color:"mint",questions:[
{id:"p1",prompt:"What is the pH of 1.0 × 10⁻³ M HCl at 25 °C?",choices:["2.00","3.00","11.00","13.00"],answer:1,feedback:"HCl is strong, so [H₃O⁺] = 1.0 × 10⁻³ M and pH = 3.00."},
{id:"p2",prompt:"A buffer contains comparable amounts of HA and A⁻. What happens after a small amount of strong acid is added?",choices:["A⁻ consumes most added H₃O⁺","HA consumes most added H₃O⁺","The pH becomes 1","Ka increases"],answer:0,feedback:"The conjugate base A⁻ reacts with added acid, limiting the pH change."}]},
];
