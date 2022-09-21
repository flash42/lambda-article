// This file was generated by lezer-generator. You probably shouldn't edit it.
import {LRParser} from "@lezer/lr"
import {jsonHighlighting} from "./highlight"
export const parser = LRParser.deserialize({
  version: 14,
  states: "$bOVQPOOOOQO'#Cb'#CbOnQPO'#CeOvQPO'#CjOOQO'#Cp'#CpQOQPOOOOQO'#Cg'#CgO}QPO'#CfO!SQPO'#CrOOQO,59P,59PO![QPO,59PO!aQPO'#CuOOQO,59U,59UO!iQPO,59UOVQPO,59QOqQPO'#CkO!nQPO,59^OOQO1G.k1G.kOVQPO'#ClO!vQPO,59aOOQO1G.p1G.pOOQO1G.l1G.lOOQO,59V,59VOOQO-E6i-E6iOOQO,59W,59WOOQO-E6j-E6j",
  stateData: "#O~OcOS~OQSORSOSSOTSOWQO]ROePO~OVXOeUO~O[[O~PVOg^O~Oh_OVfX~OVaO~OhbO[iX~O[dO~Oh_OVfa~OhbO[ia~O",
  goto: "!kjPPPPPPkPPkqwPPk{!RPPP!XP!ePP!hXSOR^bQWQRf_TVQ_Q`WRg`QcZRicQTOQZRQe^RhbRYQR]R",
  nodeNames: "⚠ JsonText True False Null Number String } { Object Property PropertyName ] [ Array",
  maxTerm: 25,
  nodeProps: [
    ["openedBy", 7,"{",12,"["],
    ["closedBy", 8,"}",13,"]"]
  ],
  propSources: [jsonHighlighting],
  skippedNodes: [0],
  repeatNodeCount: 2,
  tokenData: "+i~RbXY!ZYZ!Z]^!Zpq!Zrs!`wx$l|}'b}!O'g!Q!R'p!R![)O![!])a!}#O)f#P#Q)k#Y#Z)p#b#c*_#h#i*v#o#p+_#q#r+d~!`Oc~~!cUpq!`qr!`rs!us#O!`#O#P!z#P~!`~!zOe~~!}Xrs!`!P!Q!`#O#P!`#U#V!`#Y#Z!`#b#c!`#f#g!`#h#i!`#i#j#j~#mR!Q![#v!c!i#v#T#Z#v~#yR!Q![$S!c!i$S#T#Z$S~$VR!Q![$`!c!i$`#T#Z$`~$cR!Q![!`!c!i!`#T#Z!`~$oVpq$lqr$lsw$lwx%Ux#O$l#O#P%p#P~$l~%ZVe~pq$lqr$lsw$lwx%Ux#O$l#O#P%p#P~$l~%sXrs$l!P!Q$l#O#P$l#U#V$l#Y#Z$l#b#c$l#f#g$l#h#i$l#i#j&`~&cR!Q![&l!c!i&l#T#Z&l~&oR!Q![&x!c!i&x#T#Z&x~&{R!Q!['U!c!i'U#T#Z'U~'XR!Q![$l!c!i$l#T#Z$l~'gOh~~'jQ!Q!R'p!R![)O~'uRT~!O!P(O!g!h(d#X#Y(d~(RP!Q![(U~(ZRT~!Q![(U!g!h(d#X#Y(d~(gR{|(p}!O(p!Q![(v~(sP!Q![(v~({PT~!Q![(v~)TST~!O!P(O!Q![)O!g!h(d#X#Y(d~)fOg~~)kO]~~)pO[~~)sP#T#U)v~)yP#`#a)|~*PP#g#h*S~*VP#X#Y*Y~*_OR~~*bP#i#j*e~*hP#`#a*k~*nP#`#a*q~*vOS~~*yP#f#g*|~+PP#i#j+S~+VP#X#Y+Y~+_OQ~~+dOW~~+iOV~",
  tokenizers: [0],
  topRules: {"JsonText":[0,1]},
  tokenPrec: 0
})